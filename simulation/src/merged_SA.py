import os
import random
import sys
# import matplotlib
# import matplotlib.pyplot as plt
import math
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../Env"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from Env.DataBase import DB

import configparser
import logging
import copy
# matplotlib.use("TkAgg")


class SA_Agent(object):
    def __init__(self, input, config_path,  t_start=0.0005, t_end=0.00005, one_times=100, all_times=400):
        # ====== 退火系数
        self.t_start = t_start  # 温度初始值
        self.t_end = t_end  # 温度终止值
        self.one_times = one_times  # 一次退火迭代次数
        self.all_times = all_times  # 总迭代次数
        self.is_plot = True
        # =======
        self.p_mutate = 0.5  # 方案mutate的概率
        self.ex_vessel = False # 是否考虑vessel限制，True则考虑
        # self.db = DB(config_path)
        # self.db.reset(cpsql=True)


        # ====== 方案缓存与中间数值
        self.x_best = None  # 当前最好方案
        self.z_x_value = 0  # 缓存计算z值 减少计算
        self.z_best_value = 0  # 缓存计算z_best值 减少计算
        cf = configparser.ConfigParser()
        cf.read(config_path, "utf-8")
        self.immediate_block_Equilibrium = float(cf.get("Reward", "immediate_block_Equilibrium"))
        self.immediate_weight_diff = float(cf.get("Reward", "immediate_weight_diff"))

        self.initial_SA(input)
    
    def initial_SA(self, input):
        """
        初始化，读入需要的数据(buffer, available)并作预处理
        """
        # 需要接口
        # ================================================
        self.Contaienrs_in_buffer, self.Contaienrs_available_slot, self.Coninfo_lowerstack, \
            self.Contaienrs_num_in_block, self.Sumdiff, self.Baylimit, self.size_confilct = input
        self.x_best = None  # 当前最好方案
        self.z_x_value = 0  # 缓存计算z值 减少计算
        self.z_best_value = 0  # 缓存计算z_best值 减少计算
        # ========= self.buffer
        # buffer的每一项表示一个container的属性 {ctn_id(~str), vessel(~str) , weight(~int), size(~int)}
        self.buffer = []
        for key in self.Contaienrs_in_buffer.keys():
            container_in_key = self.Contaienrs_in_buffer[key]
            container = {'ctn_no':key, "vessel":container_in_key[0], "weight":container_in_key[1], "size":container_in_key[2]}
            self.buffer.append(container)

        self.n = len(self.buffer)

        # ================================================
        self.preprocessing_slot()
        self.get_vessel_list()

    def initial_generator(self):
        """
        初始化一个解返回 x:[slot1,slot2,...,slotn]
        """
        x = []
        check_x = False
        while not check_x:
            x = []
            for idx in range(self.n):
                slot = self.candidate_slot_list[idx][random.randint(0,len(self.candidate_slot_list[idx])-1)]
                x.append(slot)
            check_x  = self.check_slot(self.output(x))
        return x

    def preprocessing_slot(self):
        """
        预处理每个container可以放的slot的集合
        self.candidate_slot_list:[[slot1,slot2.....],[],...]
        每个slot=[block, bay, stack, tier, stack_info(~list)]
        """
        candidate_slot_list = []
        for container in self.buffer:
            candidate_pre_slot = []
            cur_available_pos = self.Contaienrs_available_slot[container["vessel"]]
            for block in cur_available_pos.keys():

                size = "40teu" if container["size"]==2 else "20teu"

                slot_list = cur_available_pos[block][size].tolist()
                diff_list = self.Coninfo_lowerstack[container["vessel"]][block][size].tolist()
                for idx in range(len(slot_list)):
                    a = slot_list[idx]
                    b = diff_list[idx]
                    a.append(b)
                    candidate_pre_slot.append(a)
                # for size in cur_available_pos[block].keys():
                #     slot_list = cur_available_pos[block][size].tolist()
                #     diff_list = self.Coninfo_lowerstack[container["vessel"]][block][size].tolist()
                #     for idx in range(len(slot_list)):

                #         a = slot_list[idx]
                #         b = diff_list[idx]
                #         a.append(b)
                #         candidate_pre_slot.append(a)
                    # slot = np.concatenate(slot, self.Coninfo_lowerstack[container["vessel"]][block][size])
                    # s_l = slot.tolist()
                    # s_l.append(self.Coninfo_lowerstack[container["vessel"]][block][size])
                    # candidate_pre_slot.append(s_l)
            candidate_slot_list.append(candidate_pre_slot)

        self.candidate_slot_list = candidate_slot_list


    def get_vessel_list(self):
        """
        vessel_list:{vessel1:[con1,con2...],vessel2:[..],..}
        """
        vessel_list = {}
        for container in self.buffer:
            cur_vessel = container['vessel']
            if vessel_list.get(cur_vessel) is None:
                l = []
                l.append(container)
                vessel_list[cur_vessel] = l
            else:
                vessel_list[cur_vessel].append(container)
        self.vessel_list = vessel_list

    def crossover(self, solution):
        """
        input:
            solution:[slot1,slot2,...,slotn]
        output:
            x:[slot1,slot2,...,slotn]
        """
        logging.info(f"function: crossover, 1")
        x = copy.deepcopy(solution)
        # =======debug todo: 分别同时交叉不同尺寸类型
        size_crossover = random.choice([1, 2])
        # =======debug
        _type = {}
        for i in range(self.n):
            k = (self.buffer[i]['vessel'] if self.ex_vessel else '')
            if k not in _type.keys():
                _type[k]=[]
            # =======debug
            if self.buffer[i]['size'] == size_crossover:
                _type[k].append(i)
            # =======debug
        reserve_type = []
        for v in _type.values():
            if len(v) > 1:
                reserve_type.append(v)
        if len(reserve_type) == 0:
            return x
        i = 0
        logging.info(f"reverse: {reserve_type}")
        i = random.randint(0,len(reserve_type)-1)
        a,b = random.sample(reserve_type[i], 2)
        logging.info(f"a: {a},  b: {b}")
        x[a], x[b] = x[b], x[a]
        logging.info(f"function: crossover, 2")
        # =======debug
        # debug = {con['ctn_no']: (int(slot[1]), con["size"]) for con, slot in zip(self.buffer,x) if
        #          (int(slot[1]) + con["size"]) % 2 == 1}
        # print("crossover:", debug)
        # =======debug
        return x
        
    # [{position:[block,bay,row], 
    # tiers:int, 
    # vesselSet:set(str), 
    # type
    def mutate(self, solution):
        """
        input:
            solution:[slot1,slot2,...,slotn]
        output:
            x:[slot1,slot2,...,slotn]
        """
        check_x = False
        x = copy.deepcopy(solution)
        # x = solution.copy()
        container_idx = random.randint(0,len(self.buffer)-1)
        candidate_pre_slot = self.candidate_slot_list[container_idx]
        # 判断可选slot个数是否大于1
        while len(candidate_pre_slot) < 2:
            logging.info(f"function: mutate, 1")
            container_idx = random.randint(0,len(self.buffer)-1)
            candidate_pre_slot = self.candidate_slot_list[container_idx]


        while not check_x:
            logging.info(f"function: mutate, 2")
            slot = random.sample(candidate_pre_slot, 1)
            slot = slot[0]
            # logging.info(f"new slot gened {slot}, slot_list size: {len(candidate_pre_slot)}")
            # slot_idx = random.randint(0, len(candidate_pre_slot)-1)
            # print(candidate_pre_slot)
            # logging.info(slot_idx)

            # while candidate_pre_slot[slot_idx] == x[container_idx]:
            #     logging.info(f"function: mutate, 3")
            #     slot_idx = random.randint(0, len(candidate_pre_slot)-1)
            # x[container_idx] = candidate_pre_slot[slot_idx]

            while slot == x[container_idx]:
                logging.info(f"function: mutate, 3")
                slot = random.sample(candidate_pre_slot, 1)
                slot = slot[0]
            x[container_idx] = slot

            # print(x[container_idx])
            # print(container_idx)
            out_put = self.output(x)
            logging.info(f"new solution gened {out_put}")
            check_x = self.check_slot(out_put)
            if not check_x:
                candidate_pre_slot = self.candidate_slot_list[container_idx]
        return x


    def output(self, solution):
        """
        input:
            solution:[slot1,slot2,...,slotn]
        output:
            x:[pos1,pos2,...,posn] pos:[block,bay,row]
        """
        x = []
        for slot in solution:
            x.append(slot[0:3])
        return x


    def step(self, x, temperature):
        """
        退火一步
        input:
            x:[slot1,slot2,...,slotn]
            temperature:float

        """
        print("--------------------------------------- start step ---------------------------------------")
        generate = self.crossover if random.random() < self.p_mutate else self.mutate
        new_x = generate(x)  # 根据x生成新方案

        # 需要接口
        # ===========================================================
        check_x = False
        while not check_x:
            check_x = self.check_slot(self.output(new_x))
            new_x = generate(x)
        z_new = self.Get_reward(new_x)
        # ===========================================================

        delta_z = self.z_x_value - z_new
        if delta_z < 0:
            if random.random() > math.exp(delta_z / temperature):
                return x
        self.z_x_value = z_new
        if self.z_x_value < self.z_best_value:
            self.z_best_value = self.z_x_value
            self.x_best = new_x
        return new_x


    def annealing(self):
        """
        模拟退火算法,最优解保存在self.x_best
        """
        times = 0
        print("----------------------------------------------------------------------start annealing--------------------------------------------------------------------")

        # t_end = t_start*cool_rate^(one_times-1),保证温度下降刚好one_times次
        cool_rate = math.pow(self.t_end / self.t_start,
                             1.0 / (self.one_times - 1))

        # 初始化最优方案
        x = self.initial_generator()
        self.x_best = x


        # 需要接口
        # =====================================================
        self.z_best_value = self.Get_reward(self.x_best)
        # =====================================================



        self.z_x_value = self.z_best_value

        # 绘图用
        z_list = []

        # 模拟退火过程
        end_flag = False
        count = 0
        while end_flag is not True:

            t = self.t_start

            # 需要接口
            # =====================================================
            self.z_x_value = self.Get_reward(x)
            # =====================================================

            z_list.append(self.z_x_value)
            for i in range(0, self.one_times):
                logging.info(f"function: annealing, times: {times} ,reward: {self.z_x_value}")
                times += 1
                x = self.step(x, t)
                if self.is_plot is True:
                    z_list.append(self.z_x_value)  # 绘图相关
                t *= cool_rate
                count += 1
                if count >= self.all_times:
                    end_flag = True
                    break
            # logging.info(f"Initialize Yard_stack,  {self.session.query(Yard_stack).count()} rows ")

            # print("times: " + times + ", reward: "+ self.z_x_value)

        if self.is_plot is True:  # 绘图相关
            self.plot(self.all_times, z_list)


    def plot(self, all_times, z_list):
        """
        将方案z值变化过程绘图
        """
        # x = np.linspace(1, all_times, all_times)
        # plt.plot(z_list)
        # plt.show()
        return 0
    

    
    def f1(self, solution):
        """
        计算箱翻箱率
        """
        vessel_diff = []

        for cur_vessel in self.vessel_list:
            cur_container_diff = 0
            # =====================
            cur_vessel_diff = self.Sumdiff[cur_vessel]
            # ======================

            for container in self.vessel_list[cur_vessel]:
                for i in range(len(self.buffer)):
                    if self.buffer[i] == container:
                        # ==================
                        cur_container_diff += self.cal_slot_diff(container, solution[i])
                        # ==================
                        break
            
            cur_vessel_container_size = self.get_vessel_ctn_no(cur_vessel)
            cur_buffer_container_size = 0
            for i in range(self.n):
                if self.buffer[i]['vessel'] == cur_vessel:
                    cur_buffer_container_size += 1
            # cur_buffer_container_size = sum(vessel_diff[cur_vessel])
            vessel_diff.append( 1.0 * (cur_container_diff + cur_vessel_diff) / (cur_vessel_container_size + cur_buffer_container_size))

        return sum(vessel_diff)


    def f2(self, solution):
        """
        计算箱区均衡度
        Yva:方案A执行前航线v在箱区a的箱数{vessel:{block:箱数}}
        Mv:航线v的预期分布箱区数目{vessel:m}
        """
        # ====================
        Yva = self.Contaienrs_num_in_block.copy()
        Mv = {}
        for vessel, blocks in self.Contaienrs_num_in_block.items():
            Mv[vessel] = len(blocks)
        # ====================

        x = self.output(solution)
        vessel_diff = []
        for i in range(self.n):
            Yva[self.buffer[i]['vessel']][x[i][0]] += 1

        for cur_vessel in self.vessel_list:
            cur_diff = 0
            cur_sumv = 0
            for k in Yva[cur_vessel].keys():
                cur_sumv += Yva[cur_vessel][k]
            # cur_sumv = sum(Yva[cur_vessel].values)
            for k in Yva[cur_vessel].keys():
            # for value in Yva[cur_vessel].values():
                cur_diff += abs(1.0*Yva[cur_vessel][k] - cur_sumv/Mv[cur_vessel])
            vessel_diff.append(cur_diff/cur_sumv)

        return sum(vessel_diff)

    def check_slot(self, solution):
        """
        solution = [[block, bay, row],....] => List(List)
        Baylimit = {block: { bay: baylimit(~int) } }
        size_conflilct = { block: [ confilct_bays(~list)]}
        """
        Baylimit = copy.deepcopy(self.Baylimit)
        size_confilct = self.size_confilct

        # check是否在同一(block, bay, row)
        # print(solution)
        if len(solution) > len(set(tuple(sublist) for sublist in solution)):
            logging.info("Repeated pos False")
            return False


        # todo: 翻箱预留检验 ~ solution 放在bay内的总箱数不能超过baylimit
        # 如 Baylimit ={'64':{34: 2 }} block'64'_bay34中最多再放入2个箱子
        tmp = {}
        for pos in solution:
            if pos[0] not in tmp:
                tmp[pos[0]] = []
            tmp[pos[0]].append(int(pos[1]))


            if(str(pos[0]) not in Baylimit):
                logging.warning('Baylimit key error pos0')
                return False
            if(int(pos[1]) not in Baylimit[str(pos[0])]):
                logging.warning('Baylimit key error pos1')
                return False
            if Baylimit[str(pos[0])][int(pos[1])] == 0:
                logging.info(f"Baylimit False")
                return False
            Baylimit[str(pos[0])][int(pos[1])]-=1



        # todo: 尺寸冲突验 ~ confilct_bays内最多同时有一个bay被solution使用(但是可以放入多个集装箱)
        # 如 size_confilct = {64': [[34,33],[34,35]]} 如果有箱子放入 block'64'_bay34  则 block'64'_bay33 和 block'64'_bay35 都不能使用
        for blk, bays in tmp:
            if blk not in size_confilct:
                continue
            for confilct_bays in size_confilct[blk]:
                if len(set(bays) & set(confilct_bays))>1:
                    logging.info(f"Size conflict False")
                    input()
                    return False
        logging.info(f"check_slot: {True}")
        return True

    def get_vessel_ctn_no(self, vessel):
        num = 0
        for block in self.Contaienrs_num_in_block[vessel].keys():
            num += self.Contaienrs_num_in_block[vessel][block]
        return num

    def Get_reward(self, solution):
        """
        计算最终的reward
        """
        return self.immediate_block_Equilibrium * self.f2(solution) + self.immediate_weight_diff * self.f1(solution)
    
    def cal_slot_diff(self, container, slot):
        """
        计算翻箱率   sum_ 集装箱i放在列s将导致的翻箱数
        """
        slot_size = len(slot[4])
        if slot_size < 1:
            return 0
        diff = 0
        for i in range(slot_size):
            if slot[4][i] == -1:
                return diff

            if slot[4][i] > container['weight']:
                diff += 1
        return diff


def gen_solution_SA(input,  config_path_env):
    sa = SA_Agent(input, config_path_env)
    sa.annealing()
    solution = {conid: (slot[0], int(slot[1]), int(slot[2]), int(slot[3])) for conid, slot in zip(sa.Contaienrs_in_buffer, sa.x_best)}
    return solution




if __name__ == "__main__":
    # 测试例程
    from simulation.DataBase.core import *
    config_path = "config/demo.ini"
    db = DB(config_path)
    # db.Initall()
    db.reset(reset="dump")
    start = time.time()

    # ====== 测试baseline 减小MIP规模措施：减小buffer_size、ratio、decay_rate
    buffer_size = 10
    container_list = db.next_ten_container(num = buffer_size)
    while container_list:
        # ====== 规划箱位
        input = db.init_instance_for_baseline(num = buffer_size)
        solution = gen_solution_SA(input, config_path_env = config_path)
        # ====== 放置集装箱
        for curcon in container_list:
            db.updata_and_slot(curcon=curcon, slot=solution[curcon.ctn_no], plan=False)
        # ====== 计算指标
        yard_features_cache = db.cal_yard_features_cache(vessel = None) # 缓存计算 dict of list
        # ====== 获取buffer
        container_list = db.next_ten_container(num = buffer_size)
    logging.info(f"{time.time() - start}")

    db.close()

