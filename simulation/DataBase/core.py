import logging
import numpy as np
import pandas as pd
import sqlalchemy as sa
from sqlalchemy import text
import os
from datetime import timedelta,datetime
import time
import random
from simulation.DataBase.base import DB0, BlockForDB, BerthForDB
from simulation.DataBase.block_selectorSA import Block_selector
from simulation.DataBase.utils.yard_fea_cache import *
from simulation.DataBase.utils.stack_mask import *
from simulation.DataBase.utils.reward_calculator import *

class DB(DB0):
    """simulate yard
    """
    def __init__(
        self, 
        config_path : str
    ):
        super(DB, self).__init__(config_path)
        # ===== [INIT]
        self.confpath = self.cf.get("INIT", "CONFPATH") # 堆场空间配置-箱区、贝、列、层高限制
        self.bdispath = self.cf.get("INIT", "BDISPATH") # 泊位配置-泊位、泊位箱区距离
        self.b_dispath = self.cf.get("INIT", "B_DISPATH") # 泊位配置-泊位、泊位箱区距离
        self.conpath = self.cf.get("INIT", "CONPATH") # 初始状态集装箱信息
        self.outconpath = self.cf.get("INIT", "OUTCONPATH") # 待入场集装箱信息
        self.outexpand = self.cf.getint("INIT", "OUTEXPAND") # 待入场集装箱扩充
        self.shuffle = self.cf.getboolean("INIT", "SHUFFLE") # 是否打乱进场顺序
        self.Yard_cache_path = os.path.join(self.resetpath, self.cf.get("INIT", "CACHEINIT"))
        self.candidate_slots_path = self.cf.get("INIT", "SLOTINIT")

        ## ====== [RENDER]
        self.synrender = self.cf.get("RENDER", "SYNRENDER")  # 是否与unity_client保持同步(render结束后才落位更新)
        self.serverip = self.cf.get("RENDER", "IP")  # server ip
        self.serverport = self.cf.get("RENDER", "PORT")  # server port

        ## ====== [BLOCK] 船舶预选箱区
        # .ini中配置每条航线的箱区可选范围, initall/reset时执行self.Block_selector规划箱区
        # 规划箱区内没有 self.min_slotnum 个可用箱位时会自动在其他箱区内查找空位
        # 调用self.Block_selector可随时基于目前的堆存情况重新规划箱区
        self.preselect = self.cf.get("SELECT_BLOCK", "PRESELECT")
        self.block = BlockForDB(self.cf)
        self.Block_selector = Block_selector(config_path) # 箱区规划功能
        self.connum_vessel = {}
        self.blocknum_bound = (self.cf.getint("VESSEL", "target_block_lb"),self.cf.getint("VESSEL", "target_block_ub"))
        ## ====== [PLAN] 规划外箱区选择范围
        self.disthre = self.cf.getint("SELECT_BLOCK", "DIS_THRE") # 箱区泊位距离限制
        self.avecons = self.cf.getint("SELECT_BLOCK", "AVECONS") # 单个箱区内的理想（特定航线流向）箱量
        ## ====== [BERTH] 船舶泊位(只存储测试集装箱的情况)
        # self.berth =  dict(BerthForDB(self.cf), **{"DEFAULT":"1L"} ) # 增加默认值
        self.berth =  BerthForDB(self.cf) # 增加默认值

        ## ====== cache
        self.weightclass = 12
        self.Yard_cache = Yard_cache(self.confpath, self.block.keys(), self.weightclass)
        self.Yard_cache.set_weight_diff_block(self.block)
        print(self.Yard_cache.weight_diff_block)
        self.candidate_slots = {}

    def Yard_distance(self):
        """
        数据库导入Yard_block信息, 缓存场泊距离
        Returns
        -------
        """
        bdisconf = pd.read_csv(self.bdispath, index_col=False, usecols=["berthLR", "block", "distance"])
        for index, row in bdisconf.iterrows():
            berth = str(bdisconf["berthLR"][index])
            block = str(bdisconf["block"][index])
            # distance = int(bdisconf["distance"][index])
            bdisconf["distance"][index] = abs(int(berth[0]) - int(block[0]))
            distance = bdisconf["distance"][index]
            self.add_rows(Yard_block(berth, block, distance))
        #
        blockdiff = list(set(bdisconf["block"].drop_duplicates()) - set(self.allblocks))
        bdisconf = bdisconf.drop(bdisconf[bdisconf["block"].isin(blockdiff)].index)
        blocks = bdisconf["block"].drop_duplicates().sort_values(ascending=True)
        berth = bdisconf["berthLR"].drop_duplicates()
        Yb_dis = []
        for b in berth:
            Yb_dis.append(bdisconf[bdisconf["berthLR"] == b][["block","distance"]].copy().sort_values(by="block", ascending=True)["distance"].tolist())

        Yard_block_distance = pd.DataFrame(data = Yb_dis,
                                           index = berth.tolist(),
                                           columns = blocks)
        Yard_block_distanceT = pd.DataFrame(data = Yard_block_distance.values.T,
                                           index = Yard_block_distance.columns,
                                           columns = Yard_block_distance.index)
        print(Yard_block_distanceT)
        Yard_block_distanceT.to_csv(self.b_dispath)
        self.Yard_cache.Yard_block_distance = Yard_block_distanceT # 和 self.allblocks 保持一致
        self.Yard_cache.maxdis = bdisconf["distance"].max()
        logging.info(f"Init distance between berth and block done")
    
    def Yard_vinit(self):
        """
        初始化空堆场(初始化Yard_stack、Yard_bay,生成Yard_block)
        Parameters
        ----------
        [INIT] CONFPATH : dir of yardconfig file
        [INIT] BDISPATH : dir of Berth_block dis file
        """
        # 初始化空堆场Yard_stack、Yard_bay
        vyardconf = pd.read_csv(self.confpath,index_col=False,usecols= ["block","maxbay","maxstack","maxtier"])
        vyardconf = vyardconf.drop_duplicates(subset = "block").sort_values(by = "block", ascending=True)
        logging.info("start yard vinit")
        self.allblocks = vyardconf["block"].values
        for block_index, row in vyardconf.iterrows():
            block = vyardconf["block"][block_index]
            maxbay = int(vyardconf["maxbay"][block_index])
            maxstack = int(vyardconf["maxstack"][block_index])
            maxtier = int(vyardconf["maxtier"][block_index])
            maxbay = maxbay+1 if maxbay%2==0 else maxbay
            logging.info("current row is {}".format(row))
            for bay in range(1,maxbay+1):
                limit = (maxstack -1) * maxtier + 1
                self.add_rows(Yard_bay(block,bay,limit))

                for stack in range(1,maxstack+1):
                    self.add_rows(Yard_stack(block,bay,stack,maxtier))

        logging.info(f"Initialize Yard_stack,  {self.session.query(Yard_stack).count()} rows ")
        logging.info(f"Initialize Yard_bay, {self.session.query(Yard_bay).count()} rows ")

        # 导入Yard_block信息
        self.Yard_distance()


    def Containers_slot_init(self):
        """
        初始化堆存状态(初始化Containers、Yard_slot)
        Parameters
        ----------
        [INIT] CONPATH : dir of containers file

        Returns
        -------
        """
        coninfo = pd.read_csv(self.conpath,
                              index_col = False,
                              usecols = ["ctn_no","category","ctn_size","vessel_reference","ctn_status","ctn_weight","destination_port_code",
                                        "first_inyard_time","last_outyard_time","actual_position_block","bay","stack","tier"])
        failcon = []
        for con_index, row in coninfo.iterrows():
            ctn_no = coninfo["ctn_no"][con_index]
            category = coninfo["category"][con_index]
            size = coninfo["ctn_size"][con_index]
            vessel = coninfo["vessel_reference"][con_index]
            status = coninfo["ctn_status"][con_index]
            weight = coninfo["ctn_weight"][con_index]

            des_port = None if pd.isna(coninfo["destination_port_code"][con_index]) \
                else coninfo["destination_port_code"][con_index]
            inyard_time = None if pd.isna(coninfo["first_inyard_time"][con_index]) \
                else coninfo["first_inyard_time"][con_index]
            outyard_time = None if pd.isna(coninfo["last_outyard_time"][con_index]) \
                else coninfo["last_outyard_time"][con_index]

            block = None if pd.isna(coninfo["actual_position_block"][con_index]) \
                else coninfo["actual_position_block"][con_index]
            bay = None if pd.isna(coninfo["bay"][con_index]) else coninfo["bay"][con_index]
            stack = None if pd.isna(coninfo["stack"][con_index]) else coninfo["stack"][con_index]
            tier = None if pd.isna(coninfo["tier"][con_index]) else coninfo["tier"][con_index]
            if block == None or bay == None or stack == None or tier == None:
                continue


            filter_bay = sa.and_(Yard_bay.block == block, Yard_bay.bay == bay)
            filter_stack = sa.and_(Yard_stack.block == block, Yard_stack.bay == bay, Yard_stack.stack == stack)
            baycols = self.session.query(Yard_bay.limit, Yard_bay.exist, Yard_bay.sum_ctn, Yard_bay.bay).filter(filter_bay).first()
            if baycols == None: continue
            vacant = baycols.sum_ctn
            stackcols = self.session.query(Yard_stack.tier, Yard_stack.maxtier).filter(filter_stack).first()
            if stackcols == None: continue
            slot_available = (baycols.exist == 1 # 尺寸重叠约束
                              and baycols.sum_ctn < baycols.limit # bay容量约束
                              and int(baycols.bay + size) % 2 == 0 # 尺寸约束
                              and stackcols.tier < stackcols.maxtier # 列容量约束
                              )
            # #更新堆场情况，有明确箱位且箱位可用才插入
            if slot_available:
                logging.debug(f"Start to place container {ctn_no} in slot {block, bay, stack, tier}")
                # 插入Containers
                curcon = Containers(ctn_no = ctn_no, category = category, size = size,
                                          vessel = vessel, status = status, weight = weight,
                                          schedule_frame = self.schedule_frame, des_port = des_port,
                                          inyard_time = inyard_time, outyard_time = outyard_time,
                                         block=block, bay=bay, stack=stack, tier=tier)
                self.add_rows(curcon)
                # 插入Yard_slot
                self.add_rows(Yard_slot(block=block, bay=bay, stack=stack, tier=tier, ctn_no=ctn_no))

                # 更新Yard_stack
                tiers = self.session.query(Yard_slot). \
                    filter(Yard_slot.block == block, Yard_slot.bay == bay, Yard_slot.stack == stack).count()
                self.update_rows(Yard_stack, filter_stack, {"tier": tiers})

                # 更新Yard_bay
                ctns = self.session.query(Yard_slot).filter(Yard_slot.block == block, Yard_slot.bay == bay).count()
                self.update_rows(Yard_bay, filter_bay, {"sum_ctn": ctns})
                # 空贝变非空要考虑更新周围贝位的状态
                existflag = (0, 0)
                if vacant == 0:
                    banfilter = sa.and_(Yard_bay.bay.in_([bay - 2, bay - 1, bay + 1, bay + 2]),
                                        Yard_bay.block == block) if size > 1 \
                        else sa.and_(Yard_bay.bay.in_([bay - 1, bay + 1]), Yard_bay.block == block)
                    self.update_rows(Yard_bay, banfilter, {"exist": 0})
                    logging.debug(f"forbid {2 * int(curcon.size)} bays near to {block, bay}")
                    existbay = np.array(self.session.query(Yard_bay.bay, Yard_bay.exist).filter(Yard_bay.block == block).all())
                    exist20teu = np.dot((existbay[:, 0] % 2), existbay[:, 1])
                    exist40teu = np.dot((1 - (existbay[:, 0] % 2)), existbay[:, 1])
                    existflag = (exist20teu, exist40teu)
                logging.debug(f"Place container {ctn_no} in slot {block, bay, stack, tier}")

                ### 同步更新特征缓存
                self.Yard_cache.slot_and_update(curcon, (block, bay, stack, tier), existflag)
            else:
                failcon.append(ctn_no)
                logging.warning(f"Failed to place container {ctn_no} in yard, slot_available = {slot_available}")


        logging.info(f"schedule_frame = {self.schedule_frame} "
                     f"Containers has { self.session.query(Containers).count()} rows ")
        logging.info(f"schedule_frame = {self.schedule_frame} "
                     f"Yard_slot has {self.session.query(Yard_slot).count()} rows ")
        return failcon

    def add_vcontainers(self, init = True):
        """
        修正悬浮情况，填充空位
        Parameters
        ----------
        init: 是否填充为初始状态的集装箱

        Returns
        -------

        """
        logging.debug(f"Containers has {self.session.query(Containers).count()} rows before add_vcontainers")
        logging.debug(f"Yard_slot has {self.session.query(Yard_slot).count()} rows before add_vcontainers")
        # 查看不同列的集装箱实际层数/最高层数
        realtiers = self.session.query(Yard_slot.block,Yard_slot.bay,Yard_slot.stack,sa.func.max(Yard_slot.tier))\
            .group_by(Yard_slot.block,Yard_slot.bay,Yard_slot.stack).all()
        for s in realtiers:
            explicit_cons = self.session.query(Yard_stack.tier).filter(
                Yard_stack.block == s[0], Yard_stack.bay == s[1], Yard_stack.stack == s[2]).first()[0]

            # # 列内有记录的con数量 < stack实际应有层数
            if explicit_cons < s[3]:
                logging.debug(f"{explicit_cons} cons in {s[0],s[1],s[2]} expected {s[3]}, "
                      f"insert {s[3]-explicit_cons} containers with similar property")

                # # 填充悬浮箱
                slotfilter = sa.and_(Yard_slot.block == s[0],
                                     Yard_slot.bay == s[1],
                                     Yard_slot.stack == s[2]) # 列定位筛选器

                for t in range(s[3],1,-1):
                    cur = self.session.query(Yard_slot.ctn_no)\
                        .filter(slotfilter,Yard_slot.tier == t).first()[0]
                    curlower = self.session.query(Yard_slot.ctn_no)\
                        .filter(slotfilter,Yard_slot.tier == t-1).first()

                    # 下层缺少箱子
                    if curlower == None:
                        basecon = self.session.query(Containers)\
                            .filter(Containers.ctn_no ==cur).first()
                        frame = 0 if init else basecon.schedule_frame
                        # 创建新的con
                        curcon = Containers(cur+str(t), basecon.category, basecon.size,
                                                 basecon.vessel, basecon.status, basecon.weight,
                                                 frame, None, basecon.des_port,
                                                 basecon.inyard_time, basecon.outyard_time,
                                                 basecon.block, basecon.bay, basecon.stack, basecon.tier-1)
                        self.add_rows(curcon)

                        # 放入堆场
                        self.add_rows(Yard_slot(block=s[0], bay=s[1], stack=s[2], tier=t-1,ctn_no=cur+str(t)))

                        logging.debug(f"create container {cur + str(t)} in {s[0], s[1], s[2], t - 1}, "
                              f"similar to {cur} in {s[0], s[1], s[2], t} ")
                        self.Yard_cache.slot_and_update(curcon, (basecon.block, basecon.bay, basecon.stack, basecon.tier-1))  ### 同步更新特征缓存
                # 更新Yard_stack
                self.update_rows(Yard_stack,
                                 sa.and_(Yard_stack.block == s[0], Yard_stack.bay == s[1],Yard_stack.stack == s[2]),
                                 # {"tier": s[3]})
                                 {"tier": self.session.query(Yard_slot).filter(slotfilter).count()})
                # 更新Yard_bay
                self.update_rows(Yard_bay,
                                 sa.and_(Yard_bay.block == s[0], Yard_bay.bay == s[1]),
                                 {"sum_ctn":self.session.query(Yard_slot).
                                 filter(Yard_slot.block == s[0], Yard_slot.bay == s[1]).count()})

        logging.info(f"Containers has {self.session.query(Containers).count()} rows after add_vcontainers done")
        logging.info(f"Yard_slot has {self.session.query(Yard_slot).count()} rows after add_vcontainers done")

    def reset_outcons_order(self):
        con_num = self.session.query(Containers_outyard).count()
        new_order = list(range(con_num))
        all_cons = self.session.query(Containers_outyard.ctn_no).order_by(Containers_outyard.inyard_time).all()
        if self.shuffle:
            random.seed(10)
            random.shuffle(new_order)
            logging.debug(f"new_order of Containers_outyard = {new_order}")
        for order, ctn_no in zip(new_order, all_cons):
            self.update_rows(Containers_outyard, Containers_outyard.ctn_no == ctn_no[0], {"order": order})
        logging.info(f"Set order for all Containers_outyard done, shuffle = {self.shuffle}")

    def get_final_state(self):
        return self.Yard_cache.get_block_state(list(self.block.values())[0], list(self.block.keys())[0])

    def set_berth(self):
        """
        给每一艘船指派泊位，写入self.berth和Contaienrs_outyard
        Returns
        -------
        """
        BerthConfig = BerthForDB(self.cf)
        allberth = self.session.query(sa.func.distinct(Yard_block.berth)).all()
        allvessel = self.session.query(sa.func.distinct(Containers_outyard.vessel)).all()
        for vessel in allvessel:
            vessel = vessel[0]
            # 读取预先配置的船舶泊位_config.ini[BERTH]
            berth = BerthConfig[vessel] if (vessel in BerthConfig.keys()) \
                else random.choice(allberth)[0]  # 没有预先配置船舶泊位则随机指派
            self.berth.setdefault(vessel, berth)
            self.update_rows(Containers_outyard, (Containers_outyard.vessel == vessel), {"berth": berth})
        logging.info(f"Set berth for each vessel: {self.berth}")

    def add_Curcons(self, conpath = None):
        """
        录入全部待入场的集装箱信息
        Parameters
        ----------
        [INIT] OUTCONPATH  dir of outyard_containers file
        [INIT] OUTEXPAND  复制属性，扩充箱量为原来的expand倍
        [BERTH] 配置船舶泊位
        -------
        """

        def cal_sumcon():
            """
            计算每艘船的总箱量(区分流向)，写入Containers_outyard
            Returns
            -------

            """
            sumcon = self.session.query(Containers_outyard.vessel,
                                        Containers_outyard.category,
                                        sa.func.count(Containers_outyard.ctn_no)) \
                .group_by(Containers_outyard.vessel,
                          Containers_outyard.category).all()
            for v in sumcon:
                vesfilter = sa.and_(Containers_outyard.vessel == v[0], Containers_outyard.category == v[1])
                self.update_rows(Containers_outyard, vesfilter, {"sum_con": v[2]})
            logging.info(f"Calculate sum_con of each vessel done")

        conpath = conpath if conpath else self.outconpath
        confiles = os.listdir(conpath)
        Concount = self.session.query(Containers_outyard).count()
        logging.info(f"Containers_outyard has {Concount} rows, expand = {self.outexpand}")

        for confile in confiles:
            confile = os.path.join(conpath,confile)
            logging.info(f"Start load Containers_outyard in {confile}")
            Concount1 = self.session.query(Containers_outyard).count()
            coninfo = pd.read_csv(confile,
                                  index_col=False,
                                  usecols=["ctn_no", "category", "ctn_size", "vessel_reference",
                                           "ctn_status", "ctn_weight", "order", "destination_port_code",
                                           "first_inyard_time", "last_outyard_time", "actual_position_block", "bay",
                                           "stack", "tier"]
                                  )

            for con_index, row in coninfo.iterrows():
                ctn_no = coninfo["ctn_no"][con_index]
                existed = self.session.query(Containers.ctn_no).filter(Containers.ctn_no == ctn_no).first()
                if existed:
                    logging.info(f"skip container_outyard {ctn_no} which exist in the yard")
                    continue
                category = coninfo["category"][con_index]
                size = coninfo["ctn_size"][con_index]

                vessel = coninfo["vessel_reference"][con_index]
                status = coninfo["ctn_status"][con_index]
                weight = coninfo["ctn_weight"][con_index]
                order = int(coninfo["order"][con_index])

                des_port = None if pd.isna(coninfo["destination_port_code"][con_index]) \
                    else coninfo["destination_port_code"][con_index]
                inyard_time = None if pd.isna(coninfo["first_inyard_time"][con_index]) \
                    else datetime.strptime(coninfo["first_inyard_time"][con_index], "%Y/%m/%d %H:%M")
                end_time = None if pd.isna(coninfo["last_outyard_time"][con_index]) \
                    else coninfo["last_outyard_time"][con_index]

                block = None if pd.isna(coninfo["actual_position_block"][con_index]) \
                    else coninfo["actual_position_block"][con_index]
                bay = None if pd.isna(coninfo["bay"][con_index]) else coninfo["bay"][con_index]
                stack = None if pd.isna(coninfo["stack"][con_index]) else coninfo["stack"][con_index]
                tier = None if pd.isna(coninfo["tier"][con_index]) else coninfo["tier"][con_index]

                # 插入Containers_outyard
                for e in range(self.outexpand):
                    # 集装箱数量变为expand倍(属性复制)
                    self.add_rows(Containers_outyard(ctn_no=ctn_no + e * "0", category=category, size=size,
                                                     vessel=vessel, status=status,
                                                     weight=weight, des_port=des_port,
                                                     inyard_time=inyard_time + timedelta(
                                                         hours=random.randint(-6, 6) * e),
                                                     end_time=end_time, order=order + e * 10000,
                                                     block=block, bay=bay, stack=stack, tier=tier))
            Concount2 = self.session.query(Containers_outyard).count()
            logging.info(f"Load {Concount2 - Concount1} Containers_outyard in {confile} done")

        Concount = self.session.query(Containers_outyard).count()
        logging.info(f"Containers_outyard has {Concount} rows, expand = {self.outexpand}")
        # 标记最后一个集装箱
        maxorder = self.session.query(sa.func.max(Containers_outyard.order)).first()[0]
        self.update_rows(Containers_outyard, Containers_outyard.order == maxorder, {"ctn_no": "finalcon"})
        # 计算每艘船的总箱量
        cal_sumcon()
        # 设置泊位
        self.set_berth()

    def check_Container_outyard_left(self, vessel):
        """
        查询vessel航线剩余待进场箱数
        Parameters
        ----------
        vessel: str

        Returns
        -------
        conleft: int
        """
        conleft = self.session.query(Containers_outyard.ctn_no).filter(Containers_outyard.vessel == vessel).count()
        logging.info(f"Containers_outyard has {conleft} {vessel}_records left ")
        return conleft


    def Initall(self, dump = True, copy = True):
        """
        堆场初始化接口
        Parameters
        ----------
        dump: 是否导出.sql文件备份数据库
        copy: 是否在原数据库中拷贝副本
        """
        # 删除数据库内全部表(包括副本)
        self.drop_db()
        logging.info("drop db done")
        # # 创建不存在的表(不包括副本)
        self.init_db([Containers.__table__,
                      Yard_slot.__table__,
                      Yard_stack.__table__,
                      Yard_bay.__table__,
                      Containers_outyard.__table__,
                      Yard_block.__table__
                      ])
        logging.info("init db done")
        # 初始化空堆场(初始化Yard_stack、Yard_bay,生成Yard_block,Yard_rtg_train)
        self.Yard_vinit()
        logging.info("Yard_vinit done")
        # # 初始化堆存状态(初始化Containers、Yard_slot,修改Yard_stack、Yard_bay)
        self.Containers_slot_init()
        logging.info("Containers_slot_init done")
        # 修正悬浮情况，填充空位(插入Containers、Yard_slot,修改Yard_stack、Yard_bay)
        self.add_vcontainers()
        logging.info("add_vcontainers done")
        # # 录入全部待入场的集装箱信息和泊位配置等信息(初始化Containers_outyard，修改Yard_block)
        self.add_Curcons()
        self.reset_outcons_order()
        logging.info("reset_outcons_order done")
        connum_vessel = self.session.query(Containers_outyard.vessel, sa.func.count(Containers_outyard.vessel)).group_by(Containers_outyard.vessel).all()
        self.connum_vessel = {v[0]: v[1]for v in connum_vessel}
        # # 保留堆场原始状态副本
        if copy:
            self.copy()
        logging.info("copy done")
        # # 保留原始Yard_cache
        self.Yard_cache.blockid = {block: i+1  for i, block in enumerate(self.allblocks)}
        self.Yard_cache.blocks_vesssel = np.zeros((1 + len(self.Yard_cache.blockid), 1 + len(self.berth)))
        pickle.dump(self.Yard_cache, open(self.Yard_cache_path, 'wb'), True)
        logging.info(f"Dump Yard_cache.pkl done")
        # 备份数据库
        if dump:
            # mysql8 初始化数据库的时候（修改配置或重启无效）应设置参数 lower_case_table_names = 1 (使大小写不敏感)
            self.dump(self.BasicConfig["USER"], self.sqlpath)
        # # 创建指令模拟器
        # blockname = self.session.query(sa.distinct(Yard_bay.block)).all()
        # self.Code_simulator = Code_simulator([b[0] for b in blockname])
        # # 为每条航线选择箱区
        if self.preselect == "True":
            self.block, _ = self.Block_selector.get_available_block()
            logging.info(f"Select blocks for each vessel: {self.block}")
        # # mask
        self.candidate_slots = init_candidate_slots(self.session, self.allblocks)
        pickle.dump(self.candidate_slots, open(self.candidate_slots_path, 'wb'), True)
        logging.info(f"Dump Slot_cache.pkl done")

    def reset(self, reset = "dump", cpsql = False):
        """
        恢复到初始堆场状态
        reset:
             copy: 用数据表副本覆盖原表
             dump: 用备份过的数据库替代原数据库
             cpsql: 首次使用dump方式要拷贝sql文件到容器目录中
        """
        self.schedule_frame = 0  # 调度次数重新从0开始

        if reset == "copy":
            # 用副本覆盖现在的状态
            inittable = [Containers, Yard_slot, Yard_stack, Yard_bay, Containers_outyard]
            sinittable = ["Containers", "Yard_slot", "Yard_stack", " Yard_bay", "Containers_outyard"]
            for stable, table in zip(sinittable, inittable):
                try:
                    self.session.query(table).delete()
                    self.session.execute(text("INSERT INTO %s SELECT * FROM %s" % (stable, stable + "0")))
                    self.session.commit()
                    logging.info(f"Reset yard done, init tables {stable}")
                except Exception as ex:
                    logging.info(f"Failed to reset table {table}: {ex}")
                    self.session.rollback()
        if reset == "dump":
            # 直接用备份过的数据库覆盖原来的
            resetdone = self.loadsql(self.BasicConfig["USER"], self.sqlpath, cpsql = cpsql)
            if not resetdone:
                return

        # self.add_Curcons(r"Env/yarddata/initdata/test_vessel/484.csv")
        # self.add_Curcons(r"Env/yarddata/initdata/test_vessel/576.csv")
        # self.set_berth()
        # self.dump(self.BasicConfig["USER"], self.sqlpath)

        self.reset_outcons_order()
        connum_vessel = self.session.query(Containers_outyard.vessel, sa.func.count(Containers_outyard.vessel)).group_by(Containers_outyard.vessel).all()
        self.connum_vessel = {v[0]: v[1]for v in connum_vessel}
        # maxorder = self.session.query(sa.func.max(Containers_outyard.order)).first()[0]
        # self.update_rows(Containers_outyard, Containers_outyard.order == maxorder, {"ctn_no": "finalcon"})
        logging.info(f"Containers_outyard has {self.session.query(Containers_outyard.ctn_no).count()} init records ")

        logging.info(f"Containers has {self.session.query(Containers.ctn_no).count()} init records ")
        logging.info(f"Yard_slot has {self.session.query(Yard_slot).count()} init records ")
        logging.info(f"Yard_stack has {self.session.query(Yard_stack).count()} init records ")
        logging.info(f"Yard_bay has {self.session.query(Yard_bay).count()} init records ")

        # 缓存全部箱区list
        Block = self.session.query(sa.func.distinct(Yard_bay.block)).all()
        self.allblocks = [B[0] for B in Block]
        # 读取初始Yard_cache
        print("self.Yard_cache_path is {}".format(self.Yard_cache_path))
        self.Yard_cache = pickle.load(open(self.Yard_cache_path, "rb"))
        self.Yard_cache.set_weight_diff_block(self.block)
        self.Yard_cache.Yard_block_distance = pd.read_csv(self.b_dispath, index_col=0) #
        logging.info(f"Load Yard_cache.pkl done")

        # 创建指令模拟器
        # blockname = self.session.query(sa.distinct(Yard_bay.block)).all()
        # self.Code_simulator = Code_simulator([b[0] for b in blockname])
        # 为每条航线重新选择箱区
        if self.preselect == "True":
            self.block, _ = self.Block_selector.get_available_block()
            logging.info(f"Select blocks for each vessel: {self.block}")
        # # mask
        self.candidate_slots = init_candidate_slots(self.session, self.allblocks)
        pickle.dump(self.candidate_slots, open(self.candidate_slots_path, 'wb'), True)
        logging.info(f"Dump Slot_cache.pkl done")
        self.candidate_slots = pickle.load(open(self.candidate_slots_path, "rb"))
        logging.info(f"Load Slot_cache.pkl done")

    def init_instance_for_baseline(self, num=10):
        """
        用于baseline的agent初始化信息
        """
        # # ================== input
        vessel_in_buffer = list(self.block.keys())  # test vessel 只有一个

        # ===== Contaienrs_in_buffer  buffer中集装箱的属性 {container_id: [ vessel(~str) , weight(~int), size(~int)]}
        next_ten_container = self.next_ten_container(num)
        Contaienrs_in_buffer = {con.ctn_no: [con.vessel, con.weight, int(con.size)] for con in next_ten_container}
        # print(Contaienrs_in_buffer)

        # ===== Contaienrs_available_slot
        # 每个集装箱可用的列信息 { vessel: {block:  { size: slot_positions(~array) } } }
        # 每一个slot_position格式为 [block, bay, stack, tier] 其中tier为已有的层数信息而非可放置层
        # ===== Coninfo_lowerstack
        # 每个可用箱位下方的(与buffer中航线相关的)集装箱信息  { vessel: {block:  { size: stack_info(~array) } } }
        # stack_info 和 slot_position 顺序是对应的
        # 每一个stack_info 内容为 [ tier1的箱重, tier2的箱重, tier3的箱重, tier4的箱重, tier5的箱重, tier6的箱重 ], 箱重为-1 表示非vessel航线或空位无箱
        Contaienrs_available_slot = {}
        Coninfo_lowerstack = {}
        for vessel in vessel_in_buffer:
            Contaienrs_available_slot[vessel] = {}
            Coninfo_lowerstack[vessel] = {}
            for block in self.block[vessel]:
                mask40teu = np.array(self.candidate_slots[block]["slots_mask"]["40teu"]) == 1
                mask20teu = np.array(self.candidate_slots[block]["slots_mask"]["20teu"]) == 1
                #
                Contaienrs_available_slot[vessel][block] = {}
                available_slot_40teu = np.array(self.candidate_slots[block]["candidate_stacks"])[mask40teu]
                available_slot_20teu = np.array(self.candidate_slots[block]["candidate_stacks"])[mask20teu]
                Contaienrs_available_slot[vessel][block]["40teu"] = available_slot_40teu
                Contaienrs_available_slot[vessel][block]["20teu"] = available_slot_20teu
                #
                Coninfo_lowerstack[vessel][block] = {}
                lowerstack_40teu = self.Yard_cache.get_tier_weight_for_diff(block)[mask40teu]
                lowerstack_20teu = self.Yard_cache.get_tier_weight_for_diff(block)[mask20teu]
                Coninfo_lowerstack[vessel][block]["40teu"] = lowerstack_40teu
                Coninfo_lowerstack[vessel][block]["20teu"] = lowerstack_20teu
        # print(Contaienrs_available_slot)
        # print(Coninfo_lowerstack)

        # ===== Contaienrs_num_in_block  每条航线当前在不同箱区的总数 {vessel: { block: connum }}
        # block 为航线v的预期分布箱区
        Contaienrs_num_in_block = {vessel:
                                       {block:
                                            self.Yard_cache.blocks_vesssel[
                                                self.Yard_cache.blockid[block], self.Yard_cache.vesselid[vessel]]
                                        for block in self.block[vessel]}
                                   for vessel in vessel_in_buffer}
        # print(Contaienrs_num_in_block)

        # ===== Sumdiff 每条航线当前在堆场的总翻箱数 {vessel: diff}
        Sumdiff = {vessel:
                       self.Yard_cache.weight_diff[self.Yard_cache.vesselid[vessel]]["sumdiff"]
                   for vessel in vessel_in_buffer}
        # print(Sumdiff)

        # # ================== check
        # ===== Baylimit 每个贝位可用的剩余箱位数量 {block:  { bay: baylimit(~int) } }
        Baylimit = {}
        vessel = vessel_in_buffer[0]
        for block in self.block[vessel]:
            Baylimit[block] = {}
            filter = sa.and_(Yard_bay.block == block, Yard_bay.exist)
            baylimit = self.session.query(Yard_bay.bay, (Yard_bay.limit - Yard_bay.sum_ctn)).filter(filter).all()
            Baylimit[block].update(baylimit)

        # print(Baylimit)

        # ===== size_confilct 可能因为放入新箱相互冲突的贝位 {block: [ confilct_bays(~list)]}
        # 这种潜在的冲突只存在于 Yard_bay.sum_ctn = 0 的可用bay之间, confilct_bays内最多同时有一个bay被使用(但是可以放入多个集装箱)
        def find_complete_subgraphs(graph):
            G = nx.Graph(graph)
            cliques = nx.find_cliques(G)
            unique_cliques = []
            for clique in cliques:
                is_unique = True
                for unique_clique in unique_cliques:
                    if set(clique).issubset(set(unique_clique)):
                        is_unique = False
                        break
                if is_unique and len(clique) > 1:
                    unique_cliques.append(clique)
            return unique_cliques

        size_confilct = {}
        vessel = vessel_in_buffer[0]
        for block in self.block[vessel]:
            filter = sa.and_(Yard_bay.block == block, Yard_bay.exist, Yard_bay.sum_ctn == 0)
            vacant_bays = self.session.query(Yard_bay.bay).filter(filter).all()
            risky_bays = [bay[0] for bay in vacant_bays]
            #
            conflict_graph = {}
            for i in range(len(risky_bays)):
                conflict_graph[risky_bays[i]] = []
                for j in range(len(risky_bays)):
                    if abs(risky_bays[i] - risky_bays[j]) <= (2 - risky_bays[i] % 2) and risky_bays[i] != risky_bays[j]:
                        conflict_graph[risky_bays[i]].append(risky_bays[j])
            confilct_bays_list = find_complete_subgraphs(conflict_graph)
            if len(confilct_bays_list) > 0:
                size_confilct[block] = confilct_bays_list
                # print(risky_bays, conflict_graph, confilct_bays_list)
        # print(size_confilct)
        return (
        Contaienrs_in_buffer, Contaienrs_available_slot, Coninfo_lowerstack, Contaienrs_num_in_block, Sumdiff, Baylimit,
        size_confilct)

    def current_container(self):
        """
        提取下一个、下下个进场的集装箱
        Returns
        -------
        （current_container1，current_container2 ）: tuple of object 'SQLconfig.Containers_outyard
        （current_container1，0 ）: 只剩下一个Containers_outyard
        （0, 0）: 没有Containers_outyard
        """
        current_containers  = self.session.query(Containers_outyard)\
                                          .order_by(Containers_outyard.order).limit(2).all()
        if len(current_containers) == 0:
            current_container1, current_container2 = 0, 0
            logging.info(f"No container left")
        else:
            existed = self.session.query(Containers.ctn_no).filter(Containers.ctn_no == current_containers[0].ctn_no).first()
            if existed:
                logging.info(f"skip {current_containers[0].ctn_no} which existed in the yard")
                self.del_rows(Containers_outyard, Containers_outyard.ctn_no == current_containers[0].ctn_no)
                current_container1, current_container2 = self.current_container()
            elif len(current_containers) == 2:
                current_container1, current_container2 = current_containers[0], current_containers[1]
                logging.info( f"current container1, current container2 = {current_container1.ctn_no}, {current_container2.ctn_no} ")
            elif len(current_containers) == 1:
                current_container1, current_container2 = current_containers[0], 0
                logging.info(f"Only one container {current_container1.ctn_no} left")
        return current_container1, current_container2

    def next_ten_container(self, num=10):
        current_containers = self.session.query(Containers_outyard) \
            .order_by(Containers_outyard.order).limit(num).all()
        container_list = None
        if len(current_containers) == 0:
            logging.info(f"No container left")
            return container_list
        else:
            exist_bool = False
            for i in range(len(current_containers)):
                existed = self.session.query(Containers.ctn_no).filter(
                    Containers.ctn_no == current_containers[i].ctn_no).first()
                if existed:
                    exist_bool = True
                    logging.info(f"skip {current_containers[i].ctn_no} which existed in the yard")
                    self.del_rows(Containers_outyard, Containers_outyard.ctn_no == current_containers[i].ctn_no)
            if exist_bool:
                container_list = self.current_container()
            else:
                container_list = current_containers
        return container_list

    def get_candidate_slots_all_mask(self, current_container, block = None):
        """
        获取block内全部箱位, 并返回合法与否的mask
        Parameters
        ----------
        current_container: class 'SQLconfig.Containers_outyard'  待入场的Container
        block == None: 采用预先指派好的或箱区规划算法指定的箱区范围
        block == list of string 或 string_blockname: 采用人工临时指派的箱区

        Returns
        -------
        candidate_stacks: list of tuple 可用箱位
        bay_groups_flag: numpy.ndarray可用箱位在不同bay的数量标记
        block_groups_flag: numpy.ndarray可用箱位在不同block的数量标记
        mask: numpy.ndarray 1_0 candidate_stacks 是否合法
        """
        if current_container == 0:
            logging.info("No current_container")
            return False

        if block == None:
            Block = self.block[current_container.vessel]
        else:
            Block = block if (type(block) == list) else [block]
        if Block[0] == "all":
            Block = self.allblocks

        logging.info(f"pre-set candidate_blocks for {current_container.ctn_no}_{current_container.vessel} = {Block}")

        candidate_stacks = []
        bay_groups = [0]
        block_groups = [0]
        mask = []

        for b in Block:
            candidate_stacks.extend(self.candidate_slots[b]["candidate_stacks"])
            bay_groups.extend(self.candidate_slots[b]["bay_groups"])
            block_groups.extend(self.candidate_slots[b]["block_groups"])
            mask.extend(self.candidate_slots[b]["slots_mask"]["20teu" if current_container.size < 2 else "40teu"])

        bay_groups_flag = np.cumsum(bay_groups)
        block_groups_flag = np.cumsum(block_groups)
        logging.info(f"Select {len(candidate_stacks)} candidate_slots with {np.count_nonzero(np.array(mask) > 0)} stacks available")
        return candidate_stacks, bay_groups_flag, block_groups_flag, mask

    # def get_candidate_slots_nopre(self, current_container, block = None, slotnum = None):
    def get_candidate_slots_all(self, current_container, block=None, slotnum=None):
        """
        筛选可进入的箱位,无优先级
        Parameters
        ----------
        用法同get_candidate_slots
        """
        def get_cslots(block):
            stack_filter = sa.and_(Yard_stack.tier < Yard_stack.maxtier) # 容量限制-层高
            bay_filter = sa.and_(Yard_bay.block == Yard_stack.block,
                                 Yard_bay.bay == Yard_stack.bay,
                                 Yard_bay.block if block[0] == "all" else Yard_bay.block.in_(block) , # 指定箱区范围
                                 Yard_bay.forbid == 0, ### 可以修改定义去除该属性
                                 Yard_bay.exist == 1,  # 有真实空位
                                 Yard_bay.sum_ctn < Yard_bay.limit,  # 容量限制-预留翻箱空位
                                 (Yard_bay.bay + current_container.size) % 2 < 1  # 尺寸限制
                                 )
            candidate_stacks, bay_groups, block_groups = [],[],[]
            pre2_candidate_stacks = self.session.query(Yard_stack.block, Yard_stack.bay, Yard_stack.stack,Yard_stack.tier) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .order_by(Yard_stack.block, Yard_stack.bay) \
                .all()
            candidate_stacks.extend(pre2_candidate_stacks)

            bay_groups2 = self.session.query(sa.func.count(Yard_stack.bay)) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .group_by(Yard_stack.block, Yard_stack.bay) \
                .order_by(Yard_stack.block, Yard_stack.bay) \
                .all()
            bay_groups.extend(bay_groups2)

            block_groups2 = self.session.query(sa.func.count(Yard_stack.bay)) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .group_by(Yard_stack.block) \
                .order_by(Yard_stack.block) \
                .all()
            block_groups.extend(block_groups2)
            return candidate_stacks, bay_groups, block_groups

        if current_container == 0:
            logging.info("No current_container")
            return False

        if block == None:
            Block = self.block[current_container.vessel]
        else:
            Block = block if (type(block) == list) else [block]
        if Block[0] == "all":
            Block = self.allblocks

        logging.info(f"pre-set candidate_blocks for {current_container.ctn_no}_{current_container.vessel} = {Block}")

        candidate_stacks, bay_groups, block_groups = get_cslots(Block)
        if len(candidate_stacks) == 0:
            logging.warning(f"No available slots in block: {Block}")
            return candidate_stacks, bay_groups, block_groups

        # num = slotnum if slotnum else 1000
        num = slotnum if slotnum else self.session.query(Yard_stack.stack).filter(Yard_stack.block if Block[0] == "all" else Yard_stack.block.in_(Block)).count()
        diff = num - len(candidate_stacks)
        if diff > 0:
            bay_groups = [0] + [g[0] for g in bay_groups]
            bay_groups_flag = list(np.cumsum(bay_groups))
            block_groups = [0] + [g[0] for g in block_groups]
            block_groups_flag = list(np.cumsum(block_groups))
        else:
            candidate_stacks = candidate_stacks[:num]
            bay_groups = [g[0] for g in bay_groups]
            bay_groups_flag = [sum(bay_groups[:i]) for i in range(len(bay_groups)) if sum(bay_groups[:i]) < num]
            block_groups = np.array([g[0] for g in block_groups])
            block_groups_flag = [sum(block_groups[:i]) for i in range(len(block_groups)) if sum(block_groups[:i]) < num]
        logging.info(f"Select {len(candidate_stacks)} candidate_slots")
        return candidate_stacks, bay_groups_flag, block_groups_flag

    def get_candidate_slots(self, current_container, slotnum=None, block=None, limit=False):
        """
        筛选可进入的箱位, 不定长, 四个优先级
        Parameters
        ----------
        current_container: class 'SQLconfig.Containers_outyard'  待入场的Container
        slotnum == None: 返回全部的可用箱位
        slotnum == int: 返回前slotnum个(不到slotnum就返回全部)可用箱位

        block == None: 采用预先指派好的或箱区规划算法指定的箱区范围
        block == list of string 或 string_blockname: 采用人工临时指派的箱区

        limit == False: 返回全部/多个可用箱位
        limit == True: 直接返回一个可用箱位

        Returns
        -------
        1. limit=True
        bestslot
          1. bestslot = None   没用任何可用箱位时返回该值
          2. bestslot = (block, bay, stack, tier)  一个可用箱位tuple
        2. limit=False
            candidate_stacks: list of tuple 可用箱位
            bay_groups_flag:  list of int可用箱位在不同bay的数量标记
            block_groups_flag: list of int可用箱位在不同block的数量标记
        """
        def get_block(pre=True):
            """
            用于选择箱区
            Parameters
            ----------
            pre == True 筛选出距离较近的箱区
            pre == False 筛选出全部距离阈值内的箱区

            Returns
            -------
            """
            candidate_blocks = self.session.query(Yard_block.block) \
                .filter(Yard_block.berth ==current_container.berth, # 用于测试
                # .filter(Yard_block.berth == self.berth[current_container.vessel],
                        # Yard_block.category == current_container.category, # 预设箱区堆放的流向类型
                        Yard_block.distance < self.disthre) \
                .order_by(Yard_block.distance) \
                .all()
            block = [block[0] for block in candidate_blocks]
            # 根据箱量选择就近的箱区
            if pre:
                block = block[:1 + current_container.sum_con // self.avecons]
                logging.info(f"candidate_blocks for {current_container.ctn_no} "
                             f"relate to vessel_{current_container.vessel}")
            # 全部距离在阈值内的箱区
            else:
                logging.info(f"all candidate_blocks for {current_container.ctn_no} "
                          f"relate to vessel_{current_container.vessel} = {block}")
            return block

        def get_cslots(block,num):
            """
            用于筛选空位，4个优先级
            Parameters
            ----------
            block: 预设箱区
            num: 返回的空位数量

            Returns
            -------
            candidate_stacks: 可用空位（列）
            bay_groups: 列分组

            """
            # 可用筛选条件
            stack_filter = sa.and_(Yard_stack.tier < Yard_stack.maxtier,  # 容量限制-层高
                                   )
            bay_filter = sa.and_(Yard_bay.block == Yard_stack.block,
                                 Yard_bay.bay == Yard_stack.bay,
                                 Yard_bay.block if block[0] == "all" else Yard_bay.block.in_(block) ,  # 指定箱区范围
                                 Yard_bay.forbid == 0,
                                 Yard_bay.exist == 1,  # 有真实空位
                                 Yard_bay.sum_ctn < Yard_bay.limit,  # 容量限制-预留翻箱空位
                                 (Yard_bay.bay + current_container.size) % 2 < 1  # 尺寸限制
                                 )

            # 属性匹配筛选条件(非空)
            slot_filter = sa.and_(Yard_slot.block == Yard_stack.block,
                                  Yard_slot.bay == Yard_stack.bay,  # 非空贝
                                  Yard_slot.stack == Yard_stack.stack,  # 非空列
                                  Yard_slot.tier == Yard_stack.tier,  # 与lowercon属性对比（注释掉则筛选条件为列内有）
                                  )
            containers_filter1 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.category == current_container.category,
                                         # 下层同流向（可缺省，箱区选择可保证同流向）/（列内同流向）
                                         Containers.status == current_container.status,  # 下层同状态（空箱/重箱）/（列内有同状态）
                                         Containers.vessel == current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         Containers.weight <= current_container.weight,
                                         # 下层更轻/（列内有更轻）#同vessel时weight才有比较意义
                                         )
            containers_filter2 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.category == current_container.category,
                                         # 下层同流向（可缺省，箱区选择可保证同流向）/（列内同流向）
                                         Containers.status == current_container.status,  # 下层同状态（空箱/重箱）/（列内有同状态）
                                         Containers.vessel == current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         # 同vessel时weight和des_port才有比较意义
                                         # Containers.weight <= current_container.weight,  # 下层更轻/（列内有更轻）
                                         )

            candidate_stacks, bay_groups, block_groups = [],[],[]
            # 优先级1——可用&非空&下层集装箱属性适配
            pre11_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .join(Yard_slot, slot_filter) \
                .join(Containers, containers_filter1) \
                .order_by(Yard_stack.block, Yard_stack.bay) \
                .all()

            if len(pre11_candidate_stacks) > 0:
                candidate_stacks.extend(pre11_candidate_stacks)
                logging.info(f"Select {len(pre11_candidate_stacks)} pre11_candidate_stacks "
                             f"for {current_container.ctn_no}")

                ##
                bay_groups11 = self.session.query(sa.func.count(Yard_stack.bay)) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .join(Containers, containers_filter1) \
                    .group_by(Yard_stack.block, Yard_stack.bay) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .all()
                bay_groups.extend(bay_groups11)

                block_groups11 = self.session.query(sa.func.count(Yard_stack.bay)) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .join(Containers, containers_filter1) \
                    .group_by(Yard_stack.block) \
                    .order_by(Yard_stack.block) \
                    .all()
                block_groups.extend(block_groups11)


            if len(candidate_stacks) < num:
                # 优先级12——可用&非空&下层集装箱属性适配
                pre12_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .join(Containers, containers_filter2) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .all()

                if pre12_candidate_stacks != []:
                    candidate_stacks.extend(pre12_candidate_stacks)
                    # candidate_stacks = pre12_candidate_stacks
                    logging.info(f"Select {len(pre12_candidate_stacks)} pre12_candidate_stacks"
                                 f" for {current_container.ctn_no} ")
                    ##
                    bay_groups12 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter) \
                        .join(Yard_bay, bay_filter) \
                        .join(Yard_slot, slot_filter) \
                        .join(Containers, containers_filter2) \
                        .group_by(Yard_stack.block, Yard_stack.bay) \
                        .order_by(Yard_stack.block, Yard_stack.bay) \
                        .all()
                    bay_groups.extend(bay_groups12)
                    # candidate_groups = candidate_groups12

                    block_groups12 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter) \
                        .join(Yard_bay, bay_filter) \
                        .join(Yard_slot, slot_filter) \
                        .join(Containers, containers_filter2) \
                        .group_by(Yard_stack.block) \
                        .order_by(Yard_stack.block) \
                        .all()
                    block_groups.extend(block_groups12)

            if len(candidate_stacks) < num:
                # 优先级2——可用&空列
                pre2_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter, Yard_stack.tier == 0) \
                    .join(Yard_bay, bay_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .all()
                if pre2_candidate_stacks != []:
                    candidate_stacks.extend(pre2_candidate_stacks)
                    logging.info(f"Select {len(pre2_candidate_stacks)} pre2_candidate_stacks"
                                 f" for {current_container.ctn_no}")
                    ##
                    bay_groups2 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter, Yard_stack.tier == 0) \
                        .join(Yard_bay, bay_filter) \
                        .group_by(Yard_stack.block, Yard_stack.bay) \
                        .order_by(Yard_stack.block, Yard_stack.bay) \
                        .all()
                    bay_groups.extend(bay_groups2)

                    block_groups2 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter, Yard_stack.tier == 0) \
                        .join(Yard_bay, bay_filter) \
                        .group_by(Yard_stack.block) \
                        .order_by(Yard_stack.block) \
                        .all()
                    block_groups.extend(block_groups2)

            if len(candidate_stacks) < num:
                # 优先级3——可用（未考虑有无指令）&非空
                pre3_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .all()
                if pre3_candidate_stacks != []:
                    candidate_stacks.extend(pre3_candidate_stacks)
                    logging.info(f"Select {len(pre3_candidate_stacks)} pre3_candidate_stacks"
                                 f" for {current_container.ctn_no}")
                    ##
                    bay_groups3 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter) \
                        .join(Yard_bay, bay_filter) \
                        .join(Yard_slot, slot_filter) \
                        .group_by(Yard_stack.block, Yard_stack.bay) \
                        .order_by(Yard_stack.block, Yard_stack.bay) \
                        .all()
                    bay_groups.extend(bay_groups3)

                    block_groups3 = self.session.query(sa.func.count(Yard_stack.bay)) \
                        .filter(stack_filter) \
                        .join(Yard_bay, bay_filter) \
                        .join(Yard_slot, slot_filter) \
                        .group_by(Yard_stack.block) \
                        .order_by(Yard_stack.block) \
                        .all()
                    block_groups.extend(block_groups3)


            end = time.time()
            return candidate_stacks, bay_groups, block_groups

        start = time.time()
        if current_container == 0:
            logging.info("No current_container")
            return False

        # 不人工指定箱区
        if block == None:
            #有预先配置使用箱区,直接采用船舶预设范围
            if current_container.vessel in self.block:
                Block = self.block[current_container.vessel]
                logging.info(f"pre-set candidate_blocks for {current_container.ctn_no} = {Block}")
            # 没有预先配置使用箱区,根据船舶泊位和总箱量筛选较近的箱区
            else:
                Block = get_block()
        else:
            Block = block if (type(block) == list) else [block]
            logging.info(f"extemp-set candidate_blocks for {current_container.ctn_no} = {Block}")
        if Block[0] == "all":
            Block = self.allblocks

        num = slotnum if slotnum else 1000 # 返回箱位数量上限
        candidate_stacks, bay_groups, block_groups = get_cslots(Block,num)
        # 人工临时指定的/初始时为船舶配置的/箱区泊位距离前n的箱区找不到足够可用箱位
        if len(candidate_stacks) < 5:
            # 在全部距离在阈值内的箱区中筛选箱位
            Block = get_block(pre = False)
            candidate_stacks, bay_groups, block_groups = get_cslots(Block,num)
            if candidate_stacks == []:
                return None


        if limit:
            if candidate_stacks != []:
                bestSlot = random.choice(candidate_stacks)
                bestslot = (bestSlot[0], bestSlot[1], bestSlot[2], bestSlot[3])
            else:
                # 没有任何可用箱位
                bestslot = None
            return bestslot

        end = time.time()
        logging.debug(f"cost time for select {len(candidate_stacks)} candidate_stacks: {end - start}")

        candidate_stacks = candidate_stacks[:num]
        bay_groups = np.array([g[0] for g in bay_groups])
        bay_groups_flag = np.array([sum(bay_groups[:i]) for i in range(len(bay_groups)) if sum(bay_groups[:i]) < num])
        block_groups = np.array([g[0] for g in block_groups])
        block_groups_flag = np.array([sum(block_groups[:i]) for i in range(len(block_groups)) if sum(bay_groups[:i]) < num])
        # 用Yard_stack表示candidate_slot，实际可选的slot是筛选出的stack内最上层
        return candidate_stacks, bay_groups_flag, block_groups_flag

    def get_one_candidate_slot(self, current_container, block=None, candidate_num = 100):
        """
        随机选择某个可进入的箱位
        Parameters
        ----------
        current_container: class 'SQLconfig.Containers_outyard'  待入场的Container
        candidate_num: int 随机选择箱位的范围(四个优先级)
        block
          1. = None: 采用.ini中配置的或箱区规划算法指定的箱区范围, 没有事先规划则在整个堆场范围内筛选
          2. = list_blockname 或 string_blockname: 人工传参指派箱区

        Returns
        -------
        bestslot
          1. None   没用任何可用箱位 或 current_container 不存在
          2. (block, bay, stack, tier)  一个可用箱位tuple
        """
        def get_cslots(block, num):
            """
            筛选空位，4个优先级
            Parameters
            ----------
            block: 预设箱区
            num: 返回的空位数量

            Returns
            -------
            candidate_stacks: 可用空位（列）
            """
            # 可用筛选条件
            stack_filter = sa.and_(Yard_stack.tier < Yard_stack.maxtier,  # 容量限制-层高
                                   )
            bay_filter = sa.and_(Yard_bay.block == Yard_stack.block,
                                 Yard_bay.bay == Yard_stack.bay,
                                 Yard_bay.block.in_(block) ,  # 指定箱区范围
                                 Yard_bay.exist == 1,  # 有真实空位
                                 Yard_bay.sum_ctn < Yard_bay.limit,  # 容量限制-预留翻箱空位
                                 (Yard_bay.bay + current_container.size) % 2 < 1  # 尺寸限制
                                 )

            # 属性匹配筛选条件(非空)
            slot_filter = sa.and_(Yard_slot.block == Yard_stack.block,
                                  Yard_slot.bay == Yard_stack.bay,  # 非空贝
                                  Yard_slot.stack == Yard_stack.stack,  # 非空列
                                  Yard_slot.tier == Yard_stack.tier,  # 与lowercon属性对比（注释掉则筛选条件为列内有）
                                  )
            containers_filter1 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.category == current_container.category,
                                         Containers.status == current_container.status,  # 下层同状态（空箱/重箱）/（列内有同状态）
                                         Containers.vessel == current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         Containers.weight <= current_container.weight,
                                         # 下层更轻/（列内有更轻）#同vessel时weight才有比较意义
                                         )
            containers_filter2 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.category == current_container.category,
                                         Containers.status == current_container.status,  # 下层同状态（空箱/重箱）/（列内有同状态）
                                         Containers.vessel == current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         )

            candidate_stacks = []
            # 优先级1——可用&非空&下层集装箱属性适配 filter1
            pre11_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .join(Yard_slot, slot_filter) \
                .join(Containers, containers_filter1) \
                .order_by(Yard_stack.block, Yard_stack.bay) \
                .limit(num).all()
            if len(pre11_candidate_stacks) > 0:
                candidate_stacks.extend(pre11_candidate_stacks)
                logging.info(f"Select {len(pre11_candidate_stacks)} pre11_candidate_stacks "
                             f"for {current_container.ctn_no}")

            if len(candidate_stacks) < num:
                # 优先级12——可用&非空&下层集装箱属性适配 filter2
                pre12_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .join(Containers, containers_filter2) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre12_candidate_stacks != []:
                    candidate_stacks.extend(pre12_candidate_stacks)
                    logging.info(f"Select {len(pre12_candidate_stacks)} pre12_candidate_stacks"
                                 f" for {current_container.ctn_no} ")

            if len(candidate_stacks) < num:
                # 优先级2——可用&空列
                pre2_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter, Yard_stack.tier == 0) \
                    .join(Yard_bay, bay_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre2_candidate_stacks != []:
                    candidate_stacks.extend(pre2_candidate_stacks)
                    logging.info(f"Select {len(pre2_candidate_stacks)} pre2_candidate_stacks"
                                 f" for {current_container.ctn_no}")

            if len(candidate_stacks) < num:
                # 优先级3——可用（未考虑有无指令）&非空
                pre3_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre3_candidate_stacks != []:
                    candidate_stacks.extend(pre3_candidate_stacks)
                    logging.info(f"Select {len(pre3_candidate_stacks)} pre3_candidate_stacks"
                                 f" for {current_container.ctn_no}")

            return candidate_stacks

        if current_container == 0:
            logging.info("No current_container")
            return None

        if block == None:
            if current_container.vessel in self.block:
                Block = self.block[current_container.vessel]
            else:
                Block = self.allblocks
        else:
            Block = block if (type(block) == list) else [block]
        if Block[0] == "all":
            Block = self.allblocks
        logging.info(f"pre-set candidate_blocks for {current_container.ctn_no} = {Block}")

        candidate_stacks = get_cslots(Block, candidate_num)

        if len(candidate_stacks) >0:
            bestSlot = random.choice(candidate_stacks)
            bestslot = (bestSlot[0], bestSlot[1], bestSlot[2], bestSlot[3])
        else:
            bestslot = None
        # slot实际是筛选出的stack内最上层位置
        logging.info(f"Randomly choose slot {bestslot} for Container {current_container.ctn_no}")
        return bestslot

    def get_one_candidate_slot_Hierarchical(self, current_container, block=None, candidate_num = 10, rule = 1):
        """
        分层按规则选位
        rule = 0 则选择不同航线的列
        Returns
        -------
        (block, bay, stack, tier)  一个可用箱位tuple
        """
        def balance_block(Block):
            Block0 = {b:0 for b in Block}
            # Block范围内每个箱区的集装箱数量
            block_num = self.session.query(Containers.block, sa.func.count(Containers.block)).filter(Containers.block.in_(Block),
                                                                                   Containers.vessel == current_container.vessel,
                                                                                   Containers.schedule_frame>0)\
                                                                           .group_by(Containers.block).all()
            addblock = {b[0]:b[1] for b in block_num}
            newblock = {b: n + addblock.get(b, 0) for b,n in Block0.items()}
            min_key = min(newblock, key= newblock.get)
            print(min_key, newblock)
            return [min_key]

        def get_cslots(block, num):
            # 可用筛选条件
            stack_filter = sa.and_(Yard_stack.tier < Yard_stack.maxtier,  # 容量限制-层高
                                   )
            bay_filter = sa.and_(Yard_bay.block == Yard_stack.block,
                                 Yard_bay.bay == Yard_stack.bay,
                                 Yard_bay.block.in_(block) ,  # 指定箱区范围
                                 Yard_bay.exist == 1,  # 有真实空位
                                 Yard_bay.sum_ctn < Yard_bay.limit,  # 容量限制-预留翻箱空位
                                 (Yard_bay.bay + current_container.size) % 2 < 1  # 尺寸限制
                                 )

            # 属性匹配筛选条件(非空)
            slot_filter = sa.and_(Yard_slot.block == Yard_stack.block,
                                  Yard_slot.bay == Yard_stack.bay,  # 非空贝
                                  Yard_slot.stack == Yard_stack.stack,  # 非空列
                                  Yard_slot.tier == Yard_stack.tier   # 与lowercon属性对比（rule != 1筛选条件为列内有）
                                  )
            containers_filter1 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.vessel == current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         Containers.weight <= current_container.weight, # 下层更轻/（列内有更轻）#同vessel时weight才有比较意义
                                         )
            containers_filter2 = sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                         Containers.vessel == current_container.vessel if rule == 1
                                         else Containers.vessel != current_container.vessel,  # 下层同船舶/（列内有同船舶）
                                         )

            candidate_stacks = []
            # 优先级1——可用&非空&下层集装箱属性适配 filter1
            pre11_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                .filter(stack_filter) \
                .join(Yard_bay, bay_filter) \
                .join(Yard_slot, slot_filter) \
                .join(Containers, containers_filter1) \
                .order_by(Yard_stack.block, Yard_stack.bay) \
                .limit(num).all()
            if len(pre11_candidate_stacks) > 0:
                candidate_stacks.extend(pre11_candidate_stacks)
                logging.info(f"Select {len(pre11_candidate_stacks)} pre11_candidate_stacks "
                             f"for {current_container.ctn_no}")

            if len(candidate_stacks) < num:
                # 优先级2——可用&空列
                pre2_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter, Yard_stack.tier == 0) \
                    .join(Yard_bay, bay_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre2_candidate_stacks != []:
                    candidate_stacks.extend(pre2_candidate_stacks)
                    logging.info(f"Select {len(pre2_candidate_stacks)} pre2_candidate_stacks"
                                 f" for {current_container.ctn_no}")

            if len(candidate_stacks) < num:
                # 优先级12——可用&非空&下层集装箱属性适配 filter2
                pre12_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .join(Containers, containers_filter2) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre12_candidate_stacks != []:
                    candidate_stacks.extend(pre12_candidate_stacks)
                    logging.info(f"Select {len(pre12_candidate_stacks)} pre12_candidate_stacks"
                                 f" for {current_container.ctn_no} ")

            if len(candidate_stacks) < num:
                # 优先级3——可用（未考虑有无指令）&非空
                pre3_candidate_stacks = self.session.query(Yard_stack.block,Yard_stack.bay,Yard_stack.stack,Yard_stack.tier) \
                    .filter(stack_filter) \
                    .join(Yard_bay, bay_filter) \
                    .join(Yard_slot, slot_filter) \
                    .order_by(Yard_stack.block, Yard_stack.bay) \
                    .limit(num-len(candidate_stacks)).all()
                if pre3_candidate_stacks != []:
                    candidate_stacks.extend(pre3_candidate_stacks)
                    logging.info(f"Select {len(pre3_candidate_stacks)} pre3_candidate_stacks"
                                 f" for {current_container.ctn_no}")

            return candidate_stacks

        if current_container == 0:
            logging.info("No current_container")
            return None

        if block == None:
            if current_container.vessel in self.block:
                Block = self.block[current_container.vessel]
            else:
                Block = self.allblocks
        else:
            Block = block
        seBlock = balance_block(Block)
        logging.info(f"pre-set candidate_blocks for {current_container.ctn_no} = {seBlock}")

        candidate_stacks = get_cslots(seBlock, candidate_num)

        if len(candidate_stacks) >0:
            bestSlot = random.choice(candidate_stacks)
            bestslot = (bestSlot[0], bestSlot[1], bestSlot[2], bestSlot[3])
        else:
            bestslot = self.get_one_candidate_slot_Hierarchical(current_container, block = list(set(Block)-set(seBlock)))
        # slot实际是筛选出的stack内最上层位置
        logging.info(f"Randomly choose slot {bestslot} for Container {current_container.ctn_no}")
        return bestslot




    def cal_slot_features_cache_allblock(self, curcon, block = None):
        """
        计算新定义的特征
        计算指定箱区内的【全部箱位】的特征
        Parameters
        ----------
        curcon: class 'SQLconfig.Containers_outyard' 待入场的Container
        block == None: 采用预先指派好的或箱区规划算法指定的箱区范围
        block == list of string 或 string_blockname: 获取指派的箱区的全部箱位的特征

        Returns
        -------
        features: nparrays 箱位特征 顺序同candidate_slots
        """
        start = time.time()


        if block == None:
            Block = self.block[curcon.vessel]
        else:
            Block = block if (type(block) == list) else [block]
        if Block[0] == "all":
            Block = self.allblocks
        logging.debug(f"Cal features of all stack_slots for {curcon.ctn_no}_{curcon.vessel} = {Block}")

        features = []
        for b in Block:
            allblock_tier_weight_features = self.Yard_cache.blocks[b].get_allblock_tier_weight_features(curcon) #  tier，max_weight, min_weight, mean_weight
            allblock_features = self.Yard_cache.blocks[b].get_allblock_features(curcon)
            # block_busyness = self.Code_simulator.get_blockcode(b) * np.ones((len(allblock_features), 1), dtype=int) ###
            # block_id = decode_block(b) * np.ones((len(allblock_features), 1), dtype=int)
            candidate_stacks = self.candidate_slots[b]["candidate_stacks"]
            bay_stack_tier = np.array(np.array(candidate_stacks)[:,1:], dtype = int)
            # block_berth_dis = self.Yard_cache.Yard_block_distance.loc[b, curcon.berth] * np.ones((len(allblock_features), 1), dtype=int) ###
            # allblock_features = np.concatenate((block_id, block_berth_dis, bay_stack_tier, allblock_features), axis=1)
            allblock_features = np.concatenate(( bay_stack_tier, allblock_features), axis=1)
            features.append(allblock_features)
        features = np.concatenate((features), axis=0)
        confea = np.array([curcon.size, curcon.weight]) * np.ones((len(features), 1), dtype=int)
        features = np.concatenate((features,confea), axis=1)
        logging.info(f"-----------cal {features.shape} features_allblock: {round((time.time() - start), 3)}s-----------")
        return features

    def cal_slot_features_cache(self, curcon, candidate_slots):
        """
        计算新定义的特征
        缓存堆场特征, 进行局部更新与查找
        """
        start = time.time()
        features = {}
        # features = []

        if len(candidate_slots) == 0:
            logging.info(f"No candidate_slots input")
            return features

        for i, slot in enumerate(candidate_slots[0]):
            feature = []
            #
            # if i in candidate_slots[2]:
            #     # block_busyness = self.Code_simulator.get_blockcode(slot[0]) if slot[0] != "-1" else -2 ###
            #     block_id = decode_block(slot[0])
            #     block_berth_dis = self.Yard_cache.Yard_block_distance.loc[slot[0], curcon.berth]
            # feature.extend([block_id,block_berth_dis])
            #
            fea = self.Yard_cache.get_block_features(curcon, slot) if slot[0] != "-1" else [-2] * (2 * self.weightclass + 9)
            feature.extend(fea)
            #
            # feature.extend([curcon.category, curcon.size, curcon.weight])
            #
            features[slot] = feature
            # features.append(feature)
        logging.info(f"-----------cal {len(features)} features: {round((time.time() - start), 3)}s-----------")
        return features
        # return np.array(features)

    def cal_block_features_cache(self, curcon, candidate_blocks = None):
        """
        计算箱区（缓存）特征
        Parameters
        ----------
        curcon:
        candidate_blocks: list of str_blockname [block1, block2, ......] None则计算全部箱区的特征

        Returns
        -------
        features: list of list [[ fea1,fea2, ......]]
        """
        if candidate_blocks == None or candidate_blocks[0] == "all":
            candidate_blocks = self.allblocks

        left_connum = self.connum_vessel[curcon.vessel] - curcon.order - 1 # 剩余箱量
        # features = []
        features = {}
        for block in candidate_blocks:
            feature = [left_connum]
            #
            # block_busyness = self.Code_simulator.get_blockcode(block)
            block_id = decode_block(block)
            block_berth_dis = self.Yard_cache.Yard_block_distance.loc[block, curcon.berth]
            feature.extend([block_id,block_berth_dis])
            #
            fea = self.Yard_cache.get_block_feas(curcon, block)
            feature.extend(fea)
            # features.append(feature)
            features[block] = feature
        return features

    def merge_features_cache(self, curcon, candidate_slots):
        """
        聚合箱区特征和箱位特征
        Parameters
        ----------
        curcon
        candidate_slots: DB.get_candidate_slots_all_mask的输出
                         [candidate_stacks, bay_groups_flag, block_groups_flag, mask]

        Returns
        -------
        features: { slot_tuple: feature_list}
        """
        start = time.time()
        features = {}

        if len(candidate_slots) == 0:
            logging.info(f"No candidate_slots input")
            return features

        left_connum = self.connum_vessel[curcon.vessel] - curcon.order - 1  # 剩余箱量
        for i, slot in enumerate(candidate_slots[0]):
            feature = []
            if i in candidate_slots[2]:
                blockfeature = [left_connum]
                block_id = decode_block(slot[0])
                block_berth_dis = self.Yard_cache.Yard_block_distance.loc[slot[0], curcon.berth]
                blockfeature.extend([block_id, block_berth_dis])
                fea = self.Yard_cache.get_block_feas(curcon, slot[0])
                blockfeature.extend(fea)
            feature.extend(blockfeature)
            fea = self.Yard_cache.get_block_features(curcon, slot) if slot[0] != "-1" else [-2] * (2 * self.weightclass + 9)
            feature.extend(fea)
            features[slot] = feature
        logging.info(f"-----------cal {len(features)} features: {round((time.time() - start), 3)}s-----------")
        return features




    def cal_yard_features_cache(self, vessel = None):
        """
        计算全部堆场特征/优化目标(不考虑初始状态时存在的相关航线集装箱)
        Parameters
        ----------
        # block: [Block1,Block2,.... ] 指定箱区查询范围
        # block == None 计算测试航线相关箱区
        vessel: list of str 或 str 查询部分航线
        vessel == None 查询全部航线

        Returns
        -------
        yard_features   { ves1: [fea1,fea2,fea3,fea4], ves2: [fea1,fea2,fea3,fea4] }
        """
        yard_features = {}
        if vessel == None:
            Vessel = self.berth.keys()
        else:
            Vessel = vessel if (type(vessel) == list) else [vessel]

        for v in Vessel:
            yard_features[v] = self.Yard_cache.get_reward(v) # [block_Equilibrium, berth_block, weight_diff, concentration]
            yard_features[v][4] = Density_Ubias(self.connum_vessel[v], yard_features[v][4], self.blocknum_bound)

        logging.info(f"schedule_frame = {self.schedule_frame} yard_features = {yard_features}")
        return yard_features

    def cal_yard_features_block(self, vessel, block):
        """
        计算单个箱区的 翻箱率和集中度
        Parameters
        ----------
        block: str
        vessel: str
        Returns
        -------
        yard_features: [fea1, fea2]
        """
        Vessel = [vessel]
        Block = [block]
        fea_weights = cal_weight(self.session, Block, Vessel, thre=1)
        concentration, _ = cal_concentration(self.session, Block, thre = 1, k1 = 0.5, k2 = 0.5)
        yard_features = [fea_weights[vessel][0], concentration]
        logging.info(f"yard_features_block of {vessel, block} = {yard_features}")
        return yard_features

    def cal_immediate_yard_features_cache(self, curcon, slot):
        """
        即时奖励 [block_Equilibrium, berth_block, weight_diff, concentration]
        """
        yard_features = self.Yard_cache.get_immediate_reward(curcon, slot, self.blocknum_bound, self.connum_vessel[curcon.vessel])
        logging.info(f"schedule_frame = {self.schedule_frame} yard_immediate_features = {yard_features}")
        return yard_features



    def update_candidate_slots(self, slot, size, vacant = 1):
        """
        堆存情况更新后用于更新可用箱位信息与mask
        Parameters
        ----------
        slot: (block, bay, stack, tier) 最近落位的箱位
        size: int 集装箱尺寸
        vacant: bay的exist是否可能发生变化

        Returns
        -------
        """
        block, bay, stack = slot[0], slot[1], slot[2]
        # self.candidate_slots[block]["slots_mask"]["20teu"] = self.get_blockmask(block, 1)
        # self.candidate_slots[block]["slots_mask"]["40teu"] = self.get_blockmask(block, 2)
        # slots = self.session.query(Yard_stack.block, Yard_stack.bay, Yard_stack.stack, Yard_stack.tier) \
        #     .filter(Yard_stack.block == block) \
        #     .order_by(Yard_stack.block, Yard_stack.bay, Yard_stack.stack).all()
        # self.candidate_slots[block]["candidate_stacks"] = slots

        stacks_eachbay = self.candidate_slots[block]["bay_groups"][0]
        # bay_start = np.sum(self.candidate_slots[block]["bay_groups"][ :bay-1])
        bay_start = (bay-1) * self.candidate_slots[block]["bay_groups"][0]

        # 局部修改candidate_stacks
        self.candidate_slots[block]["candidate_stacks"][bay_start + stack - 1] = slot

        # 局部修改mask
        newmask = get_baymask(self.session, (block, bay), size)
        Size = "20teu" if size ==1 else "40teu"
        for s, index in enumerate(range(bay_start, bay_start + stacks_eachbay)):
            self.candidate_slots[block]["slots_mask"][Size][index] = newmask[s]
            # if newmask[s] != self.candidate_slots[block]["slots_mask"][Size][index]:
            #     input(f"""Press Enter to continue...{newmask[s]} != {self.candidate_slots[block]["slots_mask"][Size][index]}""")

        # 改变周围贝mask
        if vacant==0:
            stacks_allbay = self.candidate_slots[block]["block_groups"][0]
            for index in list(range(max(0, bay_start - size * stacks_eachbay), bay_start)) \
                       + list(range(bay_start + stacks_eachbay, min(stacks_allbay-1, bay_start + stacks_eachbay + size * stacks_eachbay))):
                self.candidate_slots[block]["slots_mask"]["20teu"][index] =  0
                self.candidate_slots[block]["slots_mask"]["40teu"][index] =  0
                # if self.candidate_slots[block]["slots_mask"]["40teu"][index] + self.candidate_slots[block]["slots_mask"]["20teu"][index] > 0:
                #     input(f"""Press Enter to continue...{self.candidate_slots[block]["candidate_stacks"][index]}""")

        logging.info(f"Update mask and candidate_slots around {slot}")

    def updata_and_slot(self, curcon, slot = None, plan = False):
        """
        落箱并修改对应数据表
        Parameters
        ----------
        curcon: object 'SQLconfig.Containers_outyard' 即将进场的container
        slot
          = None: 不指定具体箱位则随机指派一个可用箱位进入
          = (block,bay,stack,tier)  指派的可用箱位tuple
        plan = True : 放入计划位置（历史真实位置）

        Returns
        -------
        con_no: 箱号
        None: 落箱失败
        """
        def checkcurcon(con):
            """
            核对候选集装箱
            Parameters
            ----------
            con: object

            Returns
            -------
            bool

            """
            con_no = con.ctn_no
            # 同一个（同箱号）集装箱不能重复进入堆场落位
            existed = self.session.query(Containers.ctn_no).filter(Containers.ctn_no == con_no).first()
            if existed:
                logging.info(f"Skip containers {con_no}")
                return con_no
            else:
                return None

        def insertcon(con, slotpos):
            """
            集装箱落位, 但是不修改堆存状态
            Parameters
            ----------
            con: object
            slotpos: 实际落下的箱位 tier = stack层数+1 (block, bay, stack, tier)

            """
            try:
                if self.synrender == "True":
                    Check_Render('{}:{}'.format(self.serverip, self.serverport))  ###

                block, bay, stack, tier = slotpos[0], slotpos[1], slotpos[2], slotpos[3]
                # 对应记录插入Containers
                self.schedule_frame += 1
                current_container = Containers(ctn_no=con.ctn_no, category=con.category,
                                               size=con.size, vessel=con.vessel,
                                               status=con.status, weight=con.weight, des_port=con.des_port,
                                               schedule_frame=self.schedule_frame, schedule_frame2=None,
                                               inyard_time=datetime.now(),  # 实时时间作为入场时间
                                               outyard_time=None,
                                               block=block, bay=bay, stack=stack, tier=tier)
                self.add_rows(current_container)

                # 对应记录插入yard_slot
                current_slot = Yard_slot(block=block, bay=bay, stack=stack, tier=tier, ctn_no=con_no)
                self.add_rows(current_slot)
                # if not self.session.query(Containers.ctn_no).filter(Containers.ctn_no == con.ctn_no).first():
                #     return False
                return con_no
            except Exception as ex:
                logging.warning(f"Failed to insert container {con_no} in {slotpos}: {ex}")
                return None

        def checkslot(c,s,p):
            """
            核对候选箱位
            Parameters
            ----------
            c: object 集装箱
            s: 箱位 (block, bay, stack, tier)
            p: bool 是否按照历史箱位堆放

            Returns
            -------

            """
            if p:
                # 放入curcon的计划箱位中(录入集装箱数据时就已经指定)
                bestslot = (c.block, c.bay, c.stack, c.tier - 1)
            else:
                # 不指定具体箱位则放入随机的可用箱位中
                # bestslot = self.get_candidate_slots(c, slotnum=1, limit=True) if s == None else s
                bestslot = self.get_one_candidate_slot(c, candidate_num = 100) if s == None else s
            if bestslot:
                # 堆场中有箱位不能插入
                block, bay, stack, tier = bestslot[0], bestslot[1], bestslot[2], bestslot[3] + 1
                filled = self.session.query(Yard_slot.ctn_no).filter(Yard_slot.block == block,
                                                                   Yard_slot.bay == bay,
                                                                   Yard_slot.stack == stack,
                                                                   Yard_slot.tier == tier).first()
                if filled:
                    if p:
                        # 强制删除原位置箱子(先不考虑该箱子非顶层)
                        self.schedule_frame += 1
                        self.update_rows(Containers, (Containers.ctn_no == filled[0]),{"schedule_frame2": self.schedule_frame})
                        self.del_rows(Yard_slot,Yard_slot.ctn_no == filled[0])
                        logging.info(f"schedule_frame = {self.schedule_frame} "
                                     f"Delete container {filled[0]} in {block, bay, stack, tier}")
                        # 强制落箱
                        insertcon(curcon, (block, bay, stack, tier))
                        logging.info(f"schedule_frame = {self.schedule_frame} "
                                     f"Place container {con_no} in {block, bay, stack, tier} done forcely")
                    else:
                        # 已经被占用不能给位
                        logging.warning(f"Fail to slot {con_no}, {bestslot} is fillled, skip {con_no}")

                    # 不强制落位的话待入场箱子也直接删除（推进流程）
                    self.del_rows(Containers_outyard, Containers_outyard.ctn_no == c.ctn_no)

                    # 确保后续不会对bestslot落位
                    bestslot = None
            else:
                logging.warning(f"Fail to slot {con_no}, no slot available")
            return bestslot

        con_no = curcon.ctn_no
        # 核对候选集装箱
        if checkcurcon(curcon):
            logging.warning(f"Fail to slot {con_no}, which existed in the yard")
            self.del_rows(Containers_outyard, Containers_outyard.ctn_no == con_no)
            return None

        # 核对候选箱位
        bestslot = checkslot(curcon, slot, plan)
        # 堆场中无适用箱位不能插入
        if not bestslot:
            return None
        else:
            block, bay, stack, tier = bestslot[0], bestslot[1], bestslot[2], bestslot[3]+1
            filter_bay = sa.and_(Yard_bay.block == block,
                                 Yard_bay.bay == bay)
            filter_stack = sa.and_(Yard_stack.block == block,
                                   Yard_stack.bay == bay,
                                   Yard_stack.stack == stack)
            baycols = self.session.query(Yard_bay).filter(filter_bay).first()
            vacant = baycols.sum_ctn
            stackcols = self.session.query(Yard_stack).filter(filter_stack).first()

            # 箱位编号是否存在
            if stackcols:
                # 落位处是否符合进箱条件约束
                slot_available = (baycols.forbid == 0
                                  and baycols.exist == 1
                                  and baycols.sum_ctn < baycols.limit
                                  and int(baycols.bay + curcon.size) % 2 < 1
                                  and stackcols.tier < stackcols.maxtier
                                  # 确保箱位为空且下层堆满
                                  and (self.session.query(Yard_stack.tier).filter(filter_stack).first()[0] == tier - 1))
                # 按照计划箱位落位则允许悬空
                planslot_available = False
                if plan:
                    planslot_available = (baycols.forbid == 0
                                          and baycols.exist == 1
                                          and baycols.sum_ctn < baycols.limit
                                          and int(baycols.bay + curcon.size) % 2 < 1
                                          and stackcols.tier < stackcols.maxtier)

                if slot_available or planslot_available:
                    start = time.time()  #
                    # 对应记录插入Containers和Yard_slot
                    insertcon(curcon, (block, bay, stack, tier))
                    # 更新Yard_stack
                    tiers = self.session.query(Yard_slot) \
                        .filter(Yard_slot.block == block, Yard_slot.bay == bay, Yard_slot.stack == stack).count()
                    self.update_rows(Yard_stack, filter_stack, {"tier": tiers})
                    # 更新Yard_bay
                    ctns = self.session.query(Yard_slot) \
                        .filter(Yard_slot.block == block, Yard_slot.bay == bay).count()
                    self.update_rows(Yard_bay, filter_bay, {"sum_ctn": ctns})
                    # 空贝变非空要考虑更新周围贝位的状态
                    existflag = (0,0)
                    if vacant == 0:
                        banfilter = sa.and_(Yard_bay.block == block, Yard_bay.bay != bay,
                                            Yard_bay.bay <= (bay + int(curcon.size)),
                                            Yard_bay.bay >= (bay - int(curcon.size)))
                        self.update_rows(Yard_bay, banfilter, {"exist": 0})
                        existbay = np.array(self.session.query(Yard_bay.bay, Yard_bay.exist).filter(Yard_bay.block == block).all())
                        exist20teu = np.dot((existbay[:,0] % 2), existbay[:,1])
                        exist40teu = np.dot((1 - (existbay[:,0] % 2)), existbay[:,1])
                        existflag = (exist20teu, exist40teu)
                        logging.info(f"forbid {2 * int(curcon.size)} bays near to {block, bay}")

                    ### 同步更新特征缓存
                    self.Yard_cache.slot_and_update(curcon, (block, bay, stack, tier), existflag)
                    tier_weight = get_stack_cons(self.session, curcon.vessel, (block, bay, stack), thre=1)  #
                    stack_contype = get_stack_cons_type(self.session, (block, bay, stack), thre=1)  #
                    self.Yard_cache.updata_reward(curcon, (block, bay, stack, tier), tier_weight, stack_contype)  #
                    ### 更新整个堆场的指令
                    # self.Code_simulator.update_code([block])
                    ### 更新stack的合法mask
                    self.update_candidate_slots((block, bay, stack, tier), 2 - bay%2, vacant)

                    # 删除Containers_outyard中对应记录
                    self.del_rows(Containers_outyard, Containers_outyard.ctn_no == con_no)

                    logging.info(f"schedule_frame = {self.schedule_frame} "
                                 f"Place container {con_no} in {block, bay, stack, tier} done")
                    logging.debug(f"update tables + update mask + update cache: {time.time() - start}") #
                    return con_no
                else:
                    if plan:
                        # 计划位置不可用直接跳过不进场
                        self.del_rows(Containers_outyard, Containers_outyard.ctn_no == con_no)
                    logging.warning(f"Fail to slot {con_no} and skip it, {bestslot} available = {slot_available}")
                    input("Fail to slot")

                    # TODO: 查找mask的问题
                    slotmask = get_slotmask(self.session, (block, bay, stack), curcon.size)
                    logging.warning(f"slotmask = {slotmask}")
                    baymask = get_baymask(self.session, (block, bay), curcon.size)
                    logging.warning(f"baymask = {baymask}")
                    logging.warning(f"logic in updatafun:"
                          f"{(self.session.query(Yard_stack.tier).filter(filter_stack).first()[0] == tier - 1)} "
                          f"{baycols.forbid == 0} "
                          f"{baycols.exist == 1} " 
                          f"{baycols.sum_ctn < baycols.limit} " 
                          f"{int(baycols.bay + curcon.size) % 2 < 1} " 
                          f"{stackcols.tier < stackcols.maxtier}"
                          )
                    newblockmask = get_blockmask(self.session, block, curcon.size)
                    print(len(newblockmask), newblockmask == self.candidate_slots[block]["slots_mask"]["40teu" if curcon.size > 1 else "20teu"])
                    # input("mask error")
                    logging.warning("mask error")
                    self.del_rows(Containers_outyard, Containers_outyard.ctn_no == con_no)
                    return None
            else:
                logging.warning(f"Fail to slot {con_no}, no {bestslot} in the yard ")
                return None


    def generate_renderpb_offline(self, respath):
        """
        生成用于离线演示的pb文件, 调用时查询Containers数据表中全部进箱记录
        Parameters
        ----------
        respath: 输出路径 如 "epoch2"
        """
        respath = os.path.join("Env/Render/render_offline", respath)
        utils_port_simulate.generate_renderpb_offline(self.config_path, respath)

