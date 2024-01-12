"""
缓存计算箱位、箱区特征、优化指标
"""
import logging
import math
import numpy
import numpy as np
import pandas as pd
# from ypstruct import structure
import pickle
from simulation.DataBase.utils.reward_calculator import cal_diff, cal_stack_concentration, cal_immediate_stack_concentration


def Density_Ubias(vessel_connum, Density, bound):
    """
    Parameters
    ----------
    vessel_connum: int 航线预计(实际)总箱量
    Density: tuple (connum, block_Density) 当前堆场中该航线的(箱量, 箱区数目)
    Returns
    -------
    Ubias: float
    """
    min_blocknum = bound[0]
    max_blocknum = bound[1]

    if Density[1] > max_blocknum:
        Ubias = Density[1] - max_blocknum
    else:
        Ubias = 0

    return Ubias


def decode_block(block):
    block_code2 = str(ord(block[1]) - 48)
    block_code = int(block[0] + block_code2)
    return block_code


def decode_vessel(vessel, cur_vessel, tier):
    """
    同航线1 非同航线0 空位-1
    Parameters
    ----------
    vessel: vessel of stack where current container slot
    cur_vessel: current container belong to cur_vessel
    tier: container num of the stack

    Returns
    -------
    """
    if tier == 0:
        return vessel[1:]  # [-1] * 6
    else:
        exist_vessel = (vessel[1: tier + 1] == cur_vessel).astype(int)
        decoded_vessel = np.hstack((exist_vessel, vessel[tier + 1:]))
        return decoded_vessel


class Yard_cache(object):
    def __init__(self, yardconfig, vessels, weightclass=12):
        self.vesselid = {ves: i + 1 for i, ves in enumerate(vessels)}  # 不在dict内的vessel统一用 0 id表示
        self.blockid = None  # {block: i}
        yardconf = pd.read_csv(yardconfig, index_col=False, usecols=["block", "maxbay", "maxstack", "maxtier"])
        yardconf["capacity"] = yardconf[["maxbay", "maxstack", "maxtier"]].values.tolist()
        yardconf = yardconf.set_index("block")["capacity"].to_dict()
        self.yardconfig = dict(yardconf, **{"default": [99, 5, 6]})  # 各个箱区的容量规格
        self.weightclass = weightclass  # 重量等级的数量

        # ====== 缓存特征
        self.blocks = {}  # {blockid: block_cache}
        self.blocks_vesssel = None  # array (1 + len(self.blockid)) * (1 + len(self.vesselid))

        # ====== 缓存场泊距离
        self.Yard_block_distance = None  # dataframe__block, berth
        self.maxdis = None  # int

        # ====== 缓存优化指标
        # 只考虑schedule_frame > 0 的集装箱
        # 栈箱量均衡度  = sum(tier^2) / 【sumcon_allvessel】
        self.stack_Equilibrium = {"stack_Equilibrium": 0, "sum_blocks_vesssel": 0, "sum_tiers2": 0}
        # 箱区均衡度 (分航线) = sum|【blocksum】 - mean_【sumcon】| / 【sumcon】
        self.block_Equilibrium = {vid: {"block_Equilibrium": 0} for vid in self.vesselid.values()}
        # 箱区密度 (分航线)  = 【sumcon】/ len（【blocksum】）
        self.block_Density = {vid: {"block_num": 0, "con_num": 0, "block_Density": 0} for vid in self.vesselid.values()}
        # 场泊对应度 (分航线) = 1 - sum( blockdis * 【blocksum】) / (maxdis * 【sumcon】)
        self.berth_block = {vid: {"berth_block": 1} for vid in self.vesselid.values()}
        # 翻箱 (分航线) = 【sumdiff】/【sumcon】
        self.current_weight_diff_gap = 0
        self.weight_diff = {vid: {"weight_diff": 0, "sumdiff": 0} for vid in self.vesselid.values()}
        # 集中度 (航线&卸货港) = 【sumconc】/【sumcon_allvessel】
        self.ck1 = 0.5  #
        self.ck2 = 0.5  #
        self.concentration = {"concentration": 0, "sumconc": 0}

    def init_yard(self):
        pass

    def slot_and_update(self, curcon, slot, existflag=(0, 0)):
        block = slot[0]
        self.blocks.setdefault(block, block_cache(self.vesselid, block,
                                                  self.yardconfig[block] if block in self.yardconfig else
                                                  self.yardconfig["default"],
                                                  self.weightclass))
        self.blocks[block].slot_and_update(curcon, slot, existflag)

    def updata_reward(self, curcon, slot, tier_weight, stack_contype):
        """
        更新优化指标
        Parameters
        ----------
        curcon: 刚落位的集装箱
        slot: 集装箱落位位置
        tier_weight: 堆存情况更新了的列内vessel集装箱信息 [(tier_desc, weight)]
        stack_contype: 堆存情况更新了的列内集装箱信息[(vessel,des_port)]
        """

        def update_weight_diff(tier_weight):
            old_tier_weight = tier_weight.copy()[1:]
            new = cal_diff(tier_weight)
            old = cal_diff(old_tier_weight)
            logging.debug(f"Reward_weight_diff: before = {old} | after = {new}")
            return new - old

        def update_concentration(stack_contype, con_maxsum=6, k1=0.5, k2=0.5):
            new = cal_stack_concentration(stack_contype, con_maxsum=con_maxsum, k1=k1, k2=k2)
            old = cal_stack_concentration(stack_contype[1:], con_maxsum=con_maxsum, k1=k1, k2=k2)
            logging.debug(f"Reward_concentration: before = {old} | after = {new}")
            return new - old

        if curcon.vessel in self.vesselid:
            vessel = self.vesselid[curcon.vessel]
        else:
            return None

        block, tier = slot[0], slot[3]
        # # 更新堆存信息
        self.blocks_vesssel[self.blockid[block], vessel] += 1
        self.blocks_vesssel[0, vessel] += 1

        # # 更新优化指标
        # 栈箱量均衡度
        self.stack_Equilibrium["sum_blocks_vesssel"] += 1
        self.stack_Equilibrium["sum_tiers2"] += tier ** 2
        self.stack_Equilibrium["stack_Equilibrium"] = self.stack_Equilibrium["sum_tiers2"] / self.stack_Equilibrium[ "sum_blocks_vesssel"]
        # 箱区均衡度
        blocksum = self.blocks_vesssel[1:, vessel].ravel()[np.flatnonzero(self.blocks_vesssel[1:, vessel])]  # 无vessel的block不参与计算
        self.block_Equilibrium[vessel]["block_Equilibrium"] = np.sum(abs(blocksum - np.mean(blocksum))) \
                                                              / self.blocks_vesssel[0, vessel]
        # 箱区密度
        self.block_Density[vessel]["block_num"] = len(blocksum)
        self.block_Density[vessel]["con_num"] = self.blocks_vesssel[0, vessel]
        self.block_Density[vessel]["block_Density"] = self.block_Density[vessel]["con_num"] / \
                                                      self.block_Density[vessel]["block_num"]
        # 场泊对应度
        self.berth_block[vessel]["berth_block"] = 1 - np.dot(np.array(self.Yard_block_distance[curcon.berth].values)
                                                             , self.blocks_vesssel[1:, vessel]) \
                                                  / (self.maxdis * self.blocks_vesssel[0, vessel])
        # 翻箱
        self.current_weight_diff_gap = update_weight_diff(tier_weight)
        self.weight_diff[vessel]["sumdiff"] += self.current_weight_diff_gap
        self.weight_diff[vessel]["weight_diff"] = self.weight_diff[vessel]["sumdiff"] / self.blocks_vesssel[0, vessel]

        # 集中度 (航线&卸货港) = 【sumconc】/【sumcon_allvessel】
        self.immediate_concentration = cal_immediate_stack_concentration(stack_contype)
        self.concentration["sumconc"] += update_concentration(stack_contype, con_maxsum=self.blocks[block].maxtier,
                                                              k1=self.ck1, k2=self.ck2)
        self.concentration["concentration"] = self.concentration["sumconc"] / self.stack_Equilibrium[
            "sum_blocks_vesssel"]

    def get_reward(self, vessel):
        """

        Parameters
        ----------
        Returns
        -------
        [fea1,fea2,fea3,fea4]
        """
        if vessel in self.vesselid.keys():
            return [
                # self.stack_Equilibrium["stack_Equilibrium"], # 去掉栈箱量均衡度
                self.block_Equilibrium[self.vesselid[vessel]]["block_Equilibrium"],
                self.berth_block[self.vesselid[vessel]]["berth_block"],
                self.weight_diff[self.vesselid[vessel]]["weight_diff"],
                self.concentration["concentration"],

                # ["block_num"]箱区数 、["con_num"]箱数 、["block_Density"]箱数目/箱区数
                (self.block_Density[self.vesselid[vessel]]["con_num"],
                 self.block_Density[self.vesselid[vessel]]["block_num"])
            ]
        else:
            return [0, 1, 0, 0, 0]

    def get_immediate_reward(self, curcon, slot, target_block, num_vessel):
        """
        Parameters
        ----------
        Returns
        -------
        [block_Equilibrium, berth_block, weight_diff, concentration]
        """
        if curcon.vessel in self.vesselid.keys():
            vessel = self.vesselid[curcon.vessel]
            ub = num_vessel / int(target_block[0])
            connum_curblock = self.blocks_vesssel[self.blockid[slot[0]], vessel]
<<<<<<< HEAD
            block_Equilibrium = max(0, connum_curblock - ub) # 超出上限的集装箱数
            # block_Equilibrium = 0 if block_Equilibrium <= 1 else block_Equilibrium
            block_Equilibrium = -1 * np.log(1 + block_Equilibrium) #-1 * log(1 + 超出上限的集装箱数)
            # block_Equilibrium = -1 * (block_Equilibrium * block_Equilibrium) # -1 * (超出上限的集装箱数的平方)
            block_overflow = -1 * max(0, (np.sum(np.array(list(self.blocks_vesssel[1:, vessel]>0))!=0) - int(target_block[1])))\
                if connum_curblock == 1 else 0 # 落位箱区总数超过合适的箱区数量上限
=======
            block_Equilibrium = max(0, connum_curblock - ub)  # 超出上限的集装箱数
            block_Equilibrium = -1 * np.log(1 + block_Equilibrium)  # -1 * log(1 + 超出上限的集装箱数)
            block_overflow = -1 * max(0, (
                        np.sum(np.array(list(self.blocks_vesssel[1:, vessel] > 0)) != 0) - int(target_block[1]))) \
                if connum_curblock == 1 else 0  # 落位箱区总数超过合适的箱区数量上限
>>>>>>> a8e2f2f78fb56a006c6036bc6fb5272b73bccd51

            berth_block = -1 * self.Yard_block_distance.loc[slot[0], curcon.berth]  # -1 * distance
            berth_block = 0.5 if berth_block == 0 else berth_block

            weight_diff = -1 * self.current_weight_diff_gap  # -1 * (new翻箱数目 - old翻箱数目)
            weight_diff = 0.5 if weight_diff == 0 else weight_diff

            concentration = self.immediate_concentration  # +相同个数 #  (下层无集装箱:0 不同:-1 有相同:+相同个数)
            concentration = -0.1 if concentration == 0 else 1 + np.log(concentration)  #
            return [block_Equilibrium, berth_block, weight_diff, concentration, block_overflow]
        else:
            return [0, 0, 0, 0, 0]

    def get_immediate_reward_ten(self, vessel, block):
        pass

    def get_block_feas(self, curcon, block):
        """
        获取箱区特征
        """
        if block not in self.blocks:  # 箱区不存在
            return [-2] * 17
        features = self.blocks[block].get_block_feas(curcon)
        return features

    def get_block_features(self, curcon, slot):
        """
        获取箱位特征
        """
        block = slot[0]
        if block not in self.blocks:  # 箱区不存在
            return [-2] * 19
        features = self.blocks[block].get_block_features(curcon, slot)
        return features

    def get_tier_weight_for_diff(self, block):
        allfeas = self.blocks[block].get_tier_weight_for_diff()
        return allfeas


class block_cache(object):
    def __init__(self, vesselid, block, capacity, weightclass=12):
        self.vesselid = vesselid  # 不在dict内的vessel统一用 0 id表示

        self.block = block
        self.maxbay = capacity[0] + 1 if capacity[0] % 2 == 0 else capacity[0]
        self.stacknum = capacity[1]
        self.maxtier = capacity[2]
        self.weightclass = weightclass
        self.baylimit = 1 + (self.stacknum - 1) * self.maxtier
        self.capacity = ((1 + self.maxbay) / 2) * self.stacknum * self.maxtier  # 容量teu #########

        # ====== 缓存特征
        self.stackpiling_20TEU = {"existbay": self.maxbay, "consum": 0}
        self.stackpiling_40TEU = {"existbay": self.maxbay // 2, "consum": 0}  #
        self.stackpiling_rate = (self.stackpiling_20TEU["consum"] + 2 * self.stackpiling_40TEU[
            "consum"]) / self.capacity  # 56 堆存率
        self.capacity20 = None  # 20TEU箱位余量
        self.capacity40 = None  # 40TEU箱位余量
        self.bays = {}  # {bayid: bay_cache}
        self.block_vesssel = [0] * (len(self.vesselid) + 2)  # 箱区内各航线数量
        self.vbayflag = ["0"] * (self.maxbay + 8)
        self.blockweight = np.zeros((1 + len(self.vesselid), self.weightclass), dtype=int)  # 箱区内各航线重量等级

    def init_block(self):
        pass

    def slot_and_update(self, curcon, slot, existflag):
        bay = slot[1]
        if bay > self.maxbay or bay == 0:  # error bay不存在
            logging.info(f"Fail to update block_cache, no available bay in {slot}")
            return None

        # vessel = curcon[0]
        vessel, weight = curcon.vessel, curcon.weight
        vessel = self.vesselid[vessel] if vessel in self.vesselid else 0
        self.blockweight[vessel, weight] += 1

        self.bays.setdefault(bay,
                             bay_cache(self.vesselid, self.block, bay, self.stacknum, self.maxtier, self.weightclass))
        self.bays[bay].slot_and_update(curcon, slot)
        self.vbayflag[bay + 3] = "1"  # 1_被占用
        self.block_vesssel[vessel] += 1
        self.block_vesssel[-1] += 1

        if bay % 2 == 1:
            self.stackpiling_20TEU["consum"] += 1
        else:
            self.stackpiling_40TEU["consum"] += 1
        self.stackpiling_rate = (self.stackpiling_20TEU["consum"] + 2 * self.stackpiling_40TEU[
            "consum"]) / self.capacity
        if existflag[0] + existflag[1] > 0:
            self.stackpiling_20TEU["existbay"], self.stackpiling_40TEU["existbay"] = existflag[0], existflag[1]
        self.capacity20 = self.stackpiling_20TEU["existbay"] * self.baylimit - self.stackpiling_20TEU["consum"]
        self.capacity40 = self.stackpiling_40TEU["existbay"] * self.baylimit - self.stackpiling_40TEU["consum"]

    def get_block_feas(self, curcon):
        """
        获取箱区特征
        """
        vessel = curcon.vessel
        vessel = self.vesselid[vessel] if vessel in self.vesselid else 0
        block_vessel = self.block_vesssel[vessel]  # 3 block内vessel航线的集装箱数量
        stackpiling_rate = self.stackpiling_rate  # 4 堆存率
        # num_vbay = 1 - sum([(2-b % 2) for b in self.bays])/ ((1 + self.maxbay) / 2) # 空贝比例(TEU)
        num_vbay = (1 + self.maxbay) / 2 - sum([(2 - b % 2) for b in self.bays])  # 空贝数量(20TEU)
        capacity20 = self.capacity20
        capacity40 = self.capacity40
        features = [block_vessel, stackpiling_rate, num_vbay, capacity20, capacity40]
        features.extend(self.blockweight[vessel, :])
        return features

    def get_block_features(self, curcon, slot):
        """
         获取箱位特征
         """
        bay = slot[1]
        features = []
        if bay in self.bays:
            bay_fea = self.bays[bay].get_bay_features(curcon, slot)
            features.extend(bay_fea)
            return features
        else:
            if bay > self.maxbay or bay == 0:  # error
                logging.warning(f"No available bay in {slot}")
                return [-2] * 19
            else:  # 空bay
                return [slot[1], slot[2], slot[3], 0, 0] + [-1] * 12 + [curcon.size, curcon.weight]

    def get_allblock_features(self, curcon):
        """
        获取箱区内全部箱位的特征
        """
        bayfeas = []
        for bay in range(1, self.maxbay + 1):
            allbay_fea = self.bays[bay].get_allbay_features(curcon) if bay in self.bays \
                else np.array([-2] * 14) * np.ones((self.stacknum, 1), dtype=int)
            bayfeas.append(allbay_fea)
        allfeas = np.concatenate((bayfeas), axis=0)
        return allfeas

    def get_allblock_tier_weight_features(self, curcon):
        """
        获取箱区内每一列的层数和重量相关特征
        """
        bayfeas = []
        for bay in range(1, self.maxbay + 1):
            allbay_fea = self.bays[bay].get_allbay_tier_weight_features() if bay in self.bays \
                else np.array([-2] * 4) * np.ones((self.stacknum, 1), dtype=int)
            bayfeas.append(allbay_fea)
        allfeas = np.concatenate((bayfeas), axis=0)
        return allfeas

    def get_tier_weight_for_diff(self):
        bayfeas = []
        for bay in range(1, self.maxbay + 1):
            allbay_fea = self.bays[bay].get_tier_weight_for_diff() if bay in self.bays \
                else np.array([-1] * 6) * np.ones((self.stacknum, 1), dtype=int)
            bayfeas.append(allbay_fea)
        allfeas = np.concatenate((bayfeas), axis=0)
        return allfeas




class bay_cache(object):
    def __init__(self, vesselid, block, bay, stacknum=5, maxtier=6, weightclass=12):
        self.vesselid = vesselid
        self.block = block
        self.bay = bay
        self.stacknum = stacknum
        self.maxtier = maxtier
        self.weightclass = weightclass

        # ====== 缓存特征
        # 0行为bay内总数, 行下标对应stack标号; -1列表示各个stack内总数, 列下标对应vessel的id
        self.bayvessel = np.zeros((1 + self.stacknum, len(self.vesselid) + 2), dtype=int)
        # 0行列无意义, 行下标对应stack标号; 列下标对应层数
        self.bayvessel_tier = -1 * np.ones((1 + self.stacknum, 1 + 6), dtype=int)
        # 0行列无意义, 行下标对应stack标号; 列下标对应层数
        self.bayweight_tier = -1 * np.ones((1 + self.stacknum, 1 + 6), dtype=int)

    def init_bay(self):
        pass

    def slot_and_update(self, curcon, slot):
        stack, tier = slot[2], slot[3]
        if stack > self.stacknum or stack == 0:  # error查询列不存在
            logging.warning(f"Fail to update bay_cache, no available stack in {slot}")
            return None

        vessel, weight = curcon.vessel, curcon.weight
        vessel = self.vesselid[vessel] if vessel in self.vesselid else 0

        if self.bayvessel[stack, -1] < self.maxtier:
            self.bayvessel[stack, -1] += 1  # stack内总箱数
            self.bayvessel[stack, vessel] += 1  # stack内航线为vessel的箱数
            self.bayvessel[0, -1] += 1  # bay内总箱数
            self.bayvessel[0, vessel] += 1  # bay内航线为vessel的箱数
            self.bayvessel_tier[stack, tier] = vessel  # 记录航线
            if vessel > 0:  # 仅记录测试航线
                self.bayweight_tier[stack, tier] = curcon.weight
            logging.debug(f"Update bay_cache done, place con_{(vessel, weight)} in {slot}")
        else:  # stack 堆满
            logging.warning(f"Fail to update bay_cache, no available slot in {slot}")

    def get_bay_features(self, curcon, slot):
        bay, stack, tier = slot[1], slot[2], slot[3]
        if stack > self.stacknum or stack == 0:  # error列不存在
            logging.warning(f"Fail to get_bay_features, no stack {slot}")
            return [-2] * 19

        vessel, weight = curcon.vessel, curcon.weight
        vessel = self.vesselid[vessel] if vessel in self.vesselid else 0
        features = [bay, stack, tier]  # 1、2、3

        stack_sum = self.bayvessel[stack, -1]  # 4 列内箱数
        stack_vessel_sum = self.bayvessel[stack, vessel]  # 5 stack内vessel航线的集装箱数量
        stack_vessel = decode_vessel(self.bayvessel_tier[stack], vessel, tier)  # 7 stack内vessel航线的集装箱数量 # TODO

        stack_weight = self.bayweight_tier[stack, 1:]  # 6 stack内自下而上每层的集装箱重量 空箱则为-1 6维

        features.extend([stack_sum, stack_vessel_sum])
        features.extend(stack_weight)
        features.extend(stack_vessel)
        features.extend([curcon.size, curcon.weight])  # 8、9
        return features

    def get_allbay_features(self, curcon):
        """
        获取贝内全部箱位的特征
        """
        vessel, weight = curcon.vessel, curcon.weight
        vessel = self.vesselid[vessel] if vessel in self.vesselid else 0

        stack_sum = self.bayvessel[1:, -1].reshape(-1, 1)  # 4  列内箱数
        stack_vessel = self.bayvessel[1:, vessel].reshape(-1, 1)  # 5 stack内vessel航线的集装箱数量
        stack_weight = self.bayweight_tier[1:, 1:]  # 6 stack内自下而上每层的集装箱重量 空箱则为-1 6维
        Stack_vessel_tier = []  # 7 stack内vessel航线的集装箱数量
        for stack in range(1, self.stacknum + 1):
            stack_vessel_tier = [int(v == vessel) if v > -1 else -1 for v in self.bayvessel_tier[stack, 1:]]
            Stack_vessel_tier.append(stack_vessel_tier)
        allfeatures = np.concatenate((stack_sum, stack_vessel, stack_weight, np.array(Stack_vessel_tier)), axis=1)
        return allfeatures

    def get_allbay_tier_weight_features(self):
        """
        获取贝内每一列的层数和重量相关特征
        （没有区分航线，但是因为测试航线只有一条所以效果相同）
        """
        stack_sum = self.bayvessel[1:, -1].reshape(-1, 1)  # 4  列内箱数
        bay_weight_feature = []
        for stack_weight_tier in self.bayweight_tier[1:, 1:]:
            stack_weight = stack_weight_tier[stack_weight_tier > 0]  # 非测试航线箱子weight为 -1
            stack_weight_feature = [np.max(stack_weight), np.min(stack_weight), np.mean(stack_weight)] if len(
                stack_weight) > 0 else [-1, -1, -1]
            bay_weight_feature.append(stack_weight_feature)
        allfeatures = np.concatenate((stack_sum, np.array(bay_weight_feature)), axis=1)
        return allfeatures

    def get_tier_weight_for_diff(self):
        return self.bayweight_tier[1:, 1:]

