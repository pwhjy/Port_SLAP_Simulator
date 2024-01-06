"""
求解buffer中的集装箱箱位的MIP模型
"""
import os
import time
import logging

import numpy as np
from gurobipy import *
import pandas as pd
from ortools.linear_solver import pywraplp
from ortools.init import pywrapinit
import logging

class Instance_buffer(object):
    def __init__(self, input, ratio = 1):

        # # ========== 外部数据
        self.Contaienrs_in_buffer = {} # buffer中每个集装箱的属性信息 container_id: [ vessel(~str) , weight(~int), size(~int)]
        self.Sumdiff = {}  # 每条航线当前在堆场的总翻箱数 vessel: diff
        self.Contaienrs_num_in_block = {}  # 每条航线当前在不同箱区的总数 vessel: { block: connum } block 为vessel对应的全部适配箱区
        self.Baylimit = {} # 每个贝位可用的剩余箱位数量 {block:  { bay: baylimit(~int) } }
        self.size_confilct = {} # 可能因为放入新箱相互冲突的贝位 {block: [ confilct_bays(~list)]}  存储完整的贝位冲突情况, 涉及的bay多于Slot_available_contaienrs_bay中的

        self.Coninfo_lowerstack = {} # 每个可用箱位下方的(与buffer中航线相关的)集装箱信息 slot_position: [ (tier(~int)), weight(~int)) ] tier降序排列

        self.Conattr_available_slot_block = {}  ## { vessel: { size: { block: [ slot_position ] } }}
        self.Contaienrs_available_slot = {}  ## 每个集装箱可用的列信息 container_id: {  block: [ slot_position(~list) ] } 其中tier为已有的层数信息
        self.Conattr_available_slot_bay = {}  ### { vessel: { size: { block: { bay: [ slot_position ] } } }}
        self.Contaienrs_available_slot_bay = {}  ### 每个集装箱可用的列信息 container_id: {  block: {bay: [ slot_position(~list) ] }} 其中tier为已有的层数信息

        # # ========== 处理后的数据(用于构建MIP)  ## 位置索引只包含buffer中集装箱实际可以放置的位置
        self.Vessel_container = {}  # buffer中某条航线相关的集装箱id vessel: [ container_id(~str) ]
        self.Contaienrs_meannum_afterslot = {}  # buffer落位后每条航线的block内箱数均值和总数 vessel: [mean（~int）, sum（~int）]
        self.Add_diff_container_stack = {}  # 集装箱i放在某个stack顶部将增加的翻箱数 container_id: { slot_position: diff }
        self.Slot_available_contaienrs = {}  # 每个箱位允许存放的集装箱id  block: { slot_position: [container_id] }
        self.Slot_available_contaienrs_bay = {}  # 每个箱位允许存放的集装箱id  block: { bay: {slot_position: [container_id]} }

        # # ==========
        self.input_cache_from_env(input, ratio)
        self.bulid_instance()


    def input_cache_from_env(self, input, ratio):
        Contaienrs_in_buffer, Contaienrs_available_slot, Coninfo_lowerstack, Contaienrs_num_in_block, Sumdiff, Baylimit, size_confilct = input
        self.Contaienrs_in_buffer = Contaienrs_in_buffer
        self.Sumdiff = Sumdiff
        self.Contaienrs_num_in_block = Contaienrs_num_in_block
        self.Baylimit = Baylimit
        self.size_confilct = size_confilct
        # ====== self.Coninfo_lowerstack
        for vessel in Coninfo_lowerstack:
            for block in Coninfo_lowerstack[vessel]:
                for size in Coninfo_lowerstack[vessel][block]:
                    lowerstacks = Coninfo_lowerstack[vessel][block][size]
                    slot_positions = Contaienrs_available_slot[vessel][block][size]
                    for slot_position, lowerstack in zip(slot_positions, lowerstacks):
                        greater_than_minus = lowerstack[lowerstack > -1]
                        indices = np.where(lowerstack > -1)[0]
                        sorted_tuples = sorted(zip(greater_than_minus, indices + 1), key=lambda x: x[1], reverse=True)
                        self.Coninfo_lowerstack[slot_position[0], int(slot_position[1]), int(slot_position[2]), int(slot_position[3])] = list(sorted_tuples)
        # ====== self.Contaienrs_available_slot
        # ====== self.Conattr_available_slot_bay
        for vessel in Contaienrs_available_slot:
            self.Conattr_available_slot_block[vessel] = {}
            self.Conattr_available_slot_block[vessel][1] = {}
            self.Conattr_available_slot_block[vessel][2] = {}
            self.Conattr_available_slot_bay[vessel] = {}
            self.Conattr_available_slot_bay[vessel][1] = {}
            self.Conattr_available_slot_bay[vessel][2] = {}
            for block in Contaienrs_available_slot[vessel]:
                for size, slot_positions_array in Contaienrs_available_slot[vessel][block].items():
                    size = 1 if size == "20teu" else 2
                    slot_positions_array = slot_positions_array[:, 1:].astype(int)
                    # 随机选取一部分可用位置(减少决策变量数目, 防止超过学生版的gurobi规模)
                    slot_num = slot_positions_array.shape[0]
                    slot_left_num = int(slot_num * ratio)
                    if slot_left_num == 0:
                        continue
                    random_indices = np.random.choice(slot_num, size = min(slot_left_num, slot_num), replace = False)
                    random_indices.sort()
                    slot_positions_array = slot_positions_array[random_indices, :]
                    #
                    self.Conattr_available_slot_block[vessel][size][block] = slot_positions_array.tolist() #
                    #
                    bay_groups_array = np.split(slot_positions_array, np.unique(slot_positions_array[:, 0], return_index=True)[1][1:])
                    self.Conattr_available_slot_bay[vessel][size][block] = {}
                    for bay_group_array in bay_groups_array:
                        bay = bay_group_array[0,0]
                        self.Conattr_available_slot_bay[vessel][size][block][bay] = bay_group_array.tolist() #
        #
        for container_id, container_info  in self.Contaienrs_in_buffer.items():
            vessel, size = container_info[0], container_info[2]
            self.Contaienrs_available_slot[container_id] = self.Conattr_available_slot_block[vessel][size] #
            self.Contaienrs_available_slot_bay[container_id] = self.Conattr_available_slot_bay[vessel][size] #
        # print(self.Contaienrs_available_slot)
        # print(self.Conattr_available_slot_bay)
        logging.info(f"Input cache for instance_{len(Contaienrs_in_buffer)} containers with ratio {ratio} done")



    def _init_Vessel_container(self):
        for container_id, container_info in self.Contaienrs_in_buffer.items():
            vessel = container_info[0]  # 获取集装箱所属的船舶信息
            if vessel not in self.Vessel_container:
                self.Vessel_container[vessel] = []
            self.Vessel_container[vessel].append(container_id)

    def _init_Contaienrs_meannum_afterslot(self):
        for vessel, block_info in self.Contaienrs_num_in_block.items():
            sumcon = sum(block_info.values())
            sumcon_after_slot = sumcon +  len(self.Vessel_container[vessel])
            mean = sumcon_after_slot / len(block_info)
            self.Contaienrs_meannum_afterslot[vessel] = [mean, sumcon_after_slot]

    def _init_Add_diff_container_stack(self):
        def cal_add_diff(tier_weight, stackcon):
            """
            tier_weight: (tier, weight)
            stackcon_vessel: [(tier,weight)]
            """
            add_diff = 0
            tier, weight = tier_weight[0], tier_weight[1]
            for j in range(len(stackcon)):
                if weight < stackcon[j][-1]:
                    add_diff += tier - stackcon[j][-2]
            # print(tier_weight, stackcon_vessel, add_diff)
            return add_diff

        for container_id, slot_info in self.Contaienrs_available_slot.items():
            self.Add_diff_container_stack[container_id] = {}
            for block, slots_list in slot_info.items():
                self.Add_diff_container_stack[container_id][block] = {}
                for slot_position in slots_list:
                    slot_position = tuple(slot_position)
                    weight, tier = self.Contaienrs_in_buffer[container_id][1], slot_position[2] + 1
                    stackcon = self.Coninfo_lowerstack[block, slot_position[0], slot_position[1], slot_position[2]]
                    add_diff = cal_add_diff((tier, weight), stackcon) if len(stackcon) > 0 else 0
                    self.Add_diff_container_stack[container_id][block][slot_position] = add_diff
        # print(self.Add_diff_container_stack)


    def _init_Slot_available_contaienrs(self):
        for container_id, slot_info in self.Contaienrs_available_slot.items():
            for block, slots_list in slot_info.items():
                if block not in self.Slot_available_contaienrs:
                    self.Slot_available_contaienrs[block] = {}
                for slot_position in slots_list:
                    slot_position = tuple(slot_position)
                    if slot_position not in self.Slot_available_contaienrs[block]:
                        self.Slot_available_contaienrs[block][slot_position] = []
                    self.Slot_available_contaienrs[block][slot_position].append(container_id)

    def _init_Slot_available_contaienrs_bay(self):
        for container_id, block_data in self.Contaienrs_available_slot_bay.items():
            for block, bay_data in block_data.items():
                for bay, slot_positions in bay_data.items():
                    for slot_position in slot_positions:
                        if block not in self.Slot_available_contaienrs_bay:
                            self.Slot_available_contaienrs_bay[block] = {}
                        if bay not in self.Slot_available_contaienrs_bay[block]:
                            self.Slot_available_contaienrs_bay[block][bay] = {}
                        slot_position = tuple(slot_position)
                        if slot_position not in self.Slot_available_contaienrs_bay[block][bay]:
                            self.Slot_available_contaienrs_bay[block][bay][slot_position] = []
                        self.Slot_available_contaienrs_bay[block][bay][slot_position].append(container_id)


    def bulid_instance(self):
        self._init_Vessel_container()
        self._init_Contaienrs_meannum_afterslot()
        self._init_Slot_available_contaienrs()
        self._init_Slot_available_contaienrs_bay()
        self._init_Add_diff_container_stack()
        logging.info(f"Bulid instance for solver done")


class MIP_solver(object):
    def __init__(self, Instance, weight):
        self.weight = weight
        self.model = Model("MIP")
        self.instacne = Instance

        # ========== Model parameters
        self.Xiabr = {}  # 决策变量 i: {a: {(b,r): Xiabr } } 集装箱i是否放在了位置（a,b,r）
        self.Con_X_i = {} # 每个集装箱只能且必须放在一个位置
        self.Con_X_abr = {} # 每个位置最多放置一个集装箱

        self.Yva = {}  # 决策变量 v: {a: Yva } 每个block放入的vessel航线集装箱数目
        self.Zva = {}  # 辅助决策变量 v: {a: Zva } |  Yva - mean  |
        self.Con_X_Y = {}
        self.Con_Y_Z = {}

        self.Kab = {}  # 决策变量 a: {b : Kab } 每个bay中放入的buffer中的集装箱数目（不区分航线）ub = 贝内总数限制
        self.Jab = {}  # 决策变量 a: {b : Jab } 每个bay是否被buffer中的集装箱使用（不区分航线）
        self.Con_X_K = {}
        self.Con_K_J = {}
        self.Con_J_conflict = {} # 相互冲突的bay不能同时启用


    ## ========== Variables
    def init_Variables_Xiabr(self):
        i = 0
        for container_id, position_dict in self.instacne.Contaienrs_available_slot.items():
            self.Xiabr[container_id] = {}
            for block, position_list in position_dict.items():
                self.Xiabr[container_id][block] = {}
                for position in position_list:
                    position = tuple(position)
                    name = "X%s_%s_%s"%(container_id, block, position)
                    vtype = GRB.BINARY
                    self.Xiabr[container_id][block][position] = self.model.addVar(vtype=vtype, name=name)
                    i += 1
        logging.info(f"Init {i} Variables Xiabr done")

    def init_Variables_Yva_Zva(self):
        i = 0
        for vessel, block_connum_dict in self.instacne.Contaienrs_num_in_block.items():
            self.Yva[vessel] = {}
            self.Zva[vessel] = {}
            for block, connum in block_connum_dict.items():
                Yname = "Y%s_%s"%(vessel, block)
                Yvtype = GRB.INTEGER
                Ylb = connum
                Yub = Ylb + len(self.instacne.Vessel_container[vessel])
                self.Yva[vessel][block] = self.model.addVar(lb=Ylb, ub=Yub, vtype=Yvtype, name=Yname)
                #
                Zname = "Y%s_%s"%(vessel, block)
                Zvtype = GRB.CONTINUOUS
                Zlb = 0
                Zub = Yub - self.instacne.Contaienrs_meannum_afterslot[vessel][0]
                self.Zva[vessel][block] = self.model.addVar(lb=Zlb, ub=Zub, vtype=Zvtype, name=Zname)
                i += 1
        logging.info(f"Init {i} Variables Yva Zva done")

    def init_Variables_Kab_Jab(self):
        i = 0
        for block, block_data in self.instacne.Slot_available_contaienrs_bay.items():
            self.Kab[block] = {}
            self.Jab[block] = {}
            for bay in block_data:
                Kname = "K{}_{}".format(block, bay)
                Kvtype = GRB.INTEGER
                Klb = 0
                Kub = self.instacne.Baylimit[block][bay]
                self.Kab[block][bay] = self.model.addVar(lb=Klb, ub=Kub, vtype=Kvtype, name=Kname)
                #
                Jname = "J{}_{}".format(block, bay)
                Jtype = GRB.BINARY
                self.Jab[block][bay] = self.model.addVar(vtype=Jtype, name=Jname)
                i += 1
        logging.info(f"Init {i} Variables Kab Jab done")


    ## ========== Constraint
    def set_Constraint_X_i(self):
        i = 0
        for container_id, position_dict_dict in self.Xiabr.items(): #  i: {a: {(b,r): Xiabr } }
            name = "ConX_i{}".format(container_id)
            Expr = LinExpr(0)
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    Expr.addTerms(1, self.Xiabr[container_id][block][position])
            self.Con_X_i[container_id] = self.model.addConstr(Expr == 1, name=name)
            i += 1
            Expr.clear()
        logging.info(f"Set {i} Constraint X_i done")

    def set_Constraint_X_abr(self):
        i = 0
        for block, position_container_list in self.instacne.Slot_available_contaienrs.items():
            self.Con_X_abr[block] = {}
            for position, container_list in position_container_list.items():
                name = "ConX_abr{}".format(position)
                Expr = LinExpr(0)
                for container_id in container_list:
                    Expr.addTerms(1, self.Xiabr[container_id][block][position])
                self.Con_X_abr[block][position] = self.model.addConstr(Expr <= 1, name=name)
                i += 1
                Expr.clear()
        logging.info(f"Set {i} Constraint X_abr done")

    def set_Constraint_X_Y(self):
        i = 0
        for vessel, block_connum_dict in self.instacne.Contaienrs_num_in_block.items():
            self.Con_X_Y[vessel] = {}
            for block, connum in block_connum_dict.items():
                name = "ConX_Y_{}_{}".format(vessel, block)
                Expr = LinExpr(0)
                Expr.addTerms(1, self.Yva[vessel][block])
                Expr.addConstant(-1 * connum)
                for container_id in self.instacne.Vessel_container[vessel]:
                    if block in self.Xiabr[container_id]:
                        for position in self.Xiabr[container_id][block]:
                            Expr.addTerms(-1, self.Xiabr[container_id][block][position])
                self.Con_X_Y[vessel][block] = self.model.addConstr(Expr == 0, name=name)
                i += 1
                Expr.clear()
        logging.info(f"Set {i} Constraint X_Y done")

    def set_Constraint_Y_Z(self):
        i = 0
        for vessel, block_connum_dict in self.Yva.items():
            self.Con_Y_Z[vessel] = {}
            for block, connum in block_connum_dict.items():
                self.Con_Y_Z[vessel][block] = {}
                name = "ConY_Z_{}_{}".format(vessel, block)
                #
                Expr1 = LinExpr(0)
                Expr1.addTerms(1, self.Zva[vessel][block])
                Expr1.addTerms(-1, self.Yva[vessel][block])
                Expr1.addConstant(self.instacne.Contaienrs_meannum_afterslot[vessel][0])
                self.Con_Y_Z[vessel][block][1] = self.model.addConstr(Expr1 >= 0, name=name + "1")
                Expr1.clear()
                #
                Expr2 = LinExpr(0)
                Expr2.addTerms(1, self.Zva[vessel][block])
                Expr2.addTerms(1, self.Yva[vessel][block])
                Expr2.addConstant(-1 * self.instacne.Contaienrs_meannum_afterslot[vessel][0])
                self.Con_Y_Z[vessel][block][2] = self.model.addConstr(Expr2 >= 0, name=name + "2")
                Expr2.clear()
                i += 1
        logging.info(f"Set {2 * i} ConstraintY_Z done")

    def set_Constraint_X_K(self):
        i = 0
        for block, block_data in self.instacne.Slot_available_contaienrs_bay.items():
            self.Con_X_K[block] = {}
            for bay, bay_data in block_data.items():
                name = "ConX_K_{}_{}".format(block, bay)
                Expr = LinExpr(0)
                Expr.addTerms(1, self.Jab[block][bay])
                for position, container_id_list in bay_data.items():
                    for container_id in container_id_list:
                        Expr.addTerms(-1, self.Xiabr[container_id][block][position])
                self.Con_X_K[block][bay] = self.model.addConstr(Expr == 0, name=name)
                i += 1
                Expr.clear()
        logging.info(f"Set {i} Constraint X_K done")

    def set_Constraint_K_J(self):
        i = 0
        for block, block_data in self.Jab.items():
            self.Con_K_J[block] = {}
            for bay in block_data:
                self.Con_K_J[block][bay] = {}
                name = "ConK_J_{}_{}".format(block, bay)
                #
                Expr1 = LinExpr(0)
                Expr1.addTerms(self.instacne.Baylimit[block][bay] , self.Jab[block][bay])
                Expr1.addTerms(-1, self.Kab[block][bay])
                self.Con_K_J[block][bay][1] = self.model.addConstr(Expr1 >= 0, name=name + "1")
                Expr1.clear()
                #
                Expr2 = LinExpr(0)
                Expr2.addTerms(-1, self.Jab[block][bay])
                Expr2.addTerms(1, self.Kab[block][bay])
                self.Con_K_J[block][bay][1] = self.model.addConstr(Expr2 >= 0, name=name + "2")
                Expr2.clear()
                i += 1
        logging.info(f"Set Constraint {2*i} K_J done")

    def set_Constraint_J_conflict(self):
        i = 0
        for block, confilct_bays_list in self.instacne.size_confilct.items():
            if block in self.Jab:
                self.Con_J_conflict[block] = {}
                for confilct_bays in confilct_bays_list:
                    name = "J_conflict_{}_{}".format(block, confilct_bays)
                    Expr = LinExpr(0)
                    for bay in confilct_bays:
                        if bay in self.Jab[block]:
                            Expr.addTerms(1, self.Jab[block][bay])
                    self.Con_J_conflict[block][tuple(confilct_bays)] = self.model.addConstr(Expr <= 1, name=name)
                    i += 1
                    Expr.clear()
        logging.info(f"Set Constraint {i} J_conflict done")

    ## ========== Objective
    def cal_Objective_diff(self):
        Expr_allves = LinExpr(0)
        for vessel in self.instacne.Vessel_container:
            Expr = LinExpr(0)
            Expr.addConstant(self.instacne.Sumdiff[vessel])
            for container_id in self.instacne.Vessel_container[vessel]:
                for block, position_dict in self.Xiabr[container_id].items():
                    for position in position_dict:
                        Diabr = self.instacne.Add_diff_container_stack[container_id][block][position]
                        Expr.addTerms(Diabr, self.Xiabr[container_id][block][position])
            Expr = Expr / self.instacne.Contaienrs_meannum_afterslot[vessel][1]  #
            Expr_allves.add(Expr)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_diff done")
        return Expr_allves

    def cal_Objective_Equilibrium(self):
        Expr_allves = LinExpr(0)
        for vessel in self.instacne.Vessel_container:
            Expr = LinExpr(0)
            for block in self.Zva[vessel]:
                Expr.addTerms(1, self.Zva[vessel][block])
            Expr = Expr / self.instacne.Contaienrs_meannum_afterslot[vessel][1]  #
            Expr_allves.add(Expr)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_Equilibrium done")
        return Expr_allves

    def set_Obiective(self):
        obj = self.weight["final_weights_diff"] * self.cal_Objective_diff() + self.weight["final_block_Equilibrium"] * self.cal_Objective_Equilibrium()
        self.model.setObjective(obj, GRB.MINIMIZE)
        logging.info(f"Cal Objective done")

    ## ========== Solution
    def parse_Solution(self):
        logging.info(f"ObjVal of MIP Model = {self.model.ObjVal}")
        Solution = {}
        for container_id, position_dict_dict in self.Xiabr.items():
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    if self.Xiabr[container_id][block][position].x:
                        Solution[container_id] = (block, position[0], position[1], position[2])
        logging.info(f"parse Solution of Model done")
        return Solution

    ## ========== Model
    def build_Model(self):
        logging.info(f"--------------------- Start build MIP Model by gurobi---------------------")
        self.init_Variables_Xiabr()
        self.init_Variables_Yva_Zva()
        self.init_Variables_Kab_Jab()
        #
        self.set_Constraint_X_i()
        self.set_Constraint_X_abr()
        self.set_Constraint_X_Y()
        self.set_Constraint_Y_Z()
        self.set_Constraint_X_K()
        self.set_Constraint_K_J()
        self.set_Constraint_J_conflict()
        #
        self.set_Obiective()
        #
        # self.model.Params.TimeLimit = 360
        self.model.setParam('OutputFlag', 0)
        self.model.optimize()
        if self.model.status == GRB.INFEASIBLE:
            logging.warning(f"--------------------- MIP Model INFEASIBLE ---------------------")
            Solution = None
            self.model.computeIIS()
            self.model.write("MIP.ilp")
            # for c in self.model.getConstrs():
            #     if c.IISConstr:
            #         logging.warning(f"{c.constrName}")
        else:
            # self.model.write("MIP.lp")
            Solution = self.parse_Solution()
        logging.info(f"Solution = {Solution}")
        return Solution


class MIP_solver_ortools(object):
    def __init__(self, Instance, weight):
        self.weight = weight
        self.model = pywraplp.Solver.CreateSolver("SCIP")
        # self.model = pywraplp.Solver.CreateSolver("GLOP")
        self.instacne = Instance

        # ========== Model parameters
        self.Xiabr = {}  # 决策变量 i: {a: {(b,r): Xiabr } } 集装箱i是否放在了位置（a,b,r）
        self.Con_X_i = {} # 每个集装箱只能且必须放在一个位置
        self.Con_X_abr = {} # 每个位置最多放置一个集装箱

        self.Yva = {}  # 决策变量 v: {a: Yva } 每个block放入的vessel航线集装箱数目
        self.Zva = {}  # 辅助决策变量 v: {a: Zva } |  Yva - mean  |
        self.Con_X_Y = {}
        self.Con_Y_Z = {}

        self.Kab = {}  # 决策变量 a: {b : Kab } 每个bay中放入的buffer中的集装箱数目（不区分航线）ub = 贝内总数限制
        self.Jab = {}  # 决策变量 a: {b : Jab } 每个bay是否被buffer中的集装箱使用（不区分航线）
        self.Con_X_K = {}
        self.Con_K_J = {}
        self.Con_J_conflict = {} # 相互冲突的bay不能同时启用


    ## ========== Variables
    def init_Variables_Xiabr(self):
        i = 0
        for container_id, position_dict in self.instacne.Contaienrs_available_slot.items():
            self.Xiabr[container_id] = {}
            for block, position_list in position_dict.items():
                self.Xiabr[container_id][block] = {}
                for position in position_list:
                    position = tuple(position)
                    name = "X%s_%s_%s"%(container_id, block, position)
                    self.Xiabr[container_id][block][position] = self.model.BoolVar(name)
                    i += 1
        logging.info(f"Init {i} Variables Xiabr done")

    def init_Variables_Yva_Zva(self):
        i = 0
        for vessel, block_connum_dict in self.instacne.Contaienrs_num_in_block.items():
            self.Yva[vessel] = {}
            self.Zva[vessel] = {}
            for block, connum in block_connum_dict.items():
                Yname = "Y%s_%s"%(vessel, block)
                Ylb = connum
                Yub = Ylb + len(self.instacne.Vessel_container[vessel])
                self.Yva[vessel][block] = self.model.IntVar(Ylb, Yub, Yname)
                #
                Zname = "Y%s_%s"%(vessel, block)
                Zlb = 0
                Zub = Yub - self.instacne.Contaienrs_meannum_afterslot[vessel][0]
                self.Zva[vessel][block] = self.model.NumVar(Zlb, Zub, Zname)
                i += 1
        logging.info(f"Init {i} Variables Yva Zva done")

    def init_Variables_Kab_Jab(self):
        i = 0
        for block, block_data in self.instacne.Slot_available_contaienrs_bay.items():
            self.Kab[block] = {}
            self.Jab[block] = {}
            for bay in block_data:
                Kname = "K{}_{}".format(block, bay)
                Klb = 0
                Kub = self.instacne.Baylimit[block][bay]
                self.Kab[block][bay] = self.model.IntVar(Klb, Kub, Kname)
                #
                Jname = "J{}_{}".format(block, bay)
                self.Jab[block][bay] = self.model.BoolVar(Jname)
                i += 1
        logging.info(f"Init {i} Variables Kab Jab done")


    ## ========== Constraints
    def set_Constraint_X_i(self):
        i = 0
        for container_id, position_dict_dict in self.Xiabr.items(): #  i: {a: {(b,r): Xiabr } }
            name = "ConX_i{}".format(container_id)
            Expr = []
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    Expr.append(self.Xiabr[container_id][block][position])
            Expr = self.model.Sum(Expr)
            self.Con_X_i[container_id] = self.model.Add(Expr == 1, name=name)
            i += 1
        logging.info(f"Set {i} Constraint X_i done")

    def set_Constraint_X_abr(self):
        i = 0
        for block, position_container_list in self.instacne.Slot_available_contaienrs.items():
            self.Con_X_abr[block] = {}
            for position, container_list in position_container_list.items():
                name = "ConX_abr{}".format(position)
                Expr = []
                for container_id in container_list:
                    Expr.append(self.Xiabr[container_id][block][position])
                Expr = self.model.Sum(Expr)
                self.Con_X_abr[block][position] = self.model.Add(Expr <= 1, name=name)
                i += 1
        logging.info(f"Set {i} Constraint X_abr done")

    def set_Constraint_X_Y(self):
        i = 0
        for vessel, block_connum_dict in self.instacne.Contaienrs_num_in_block.items():
            self.Con_X_Y[vessel] = {}
            for block, connum in block_connum_dict.items():
                name = "ConX_Y_{}_{}".format(vessel, block)
                Expr = []
                Expr.append(self.Yva[vessel][block])
                Expr.append(-1 * connum)
                for container_id in self.instacne.Vessel_container[vessel]:
                    if block in self.Xiabr[container_id]:
                        for position in self.Xiabr[container_id][block]:
                            Expr.append(self.Xiabr[container_id][block][position] * -1)
                Expr = self.model.Sum(Expr)
                self.Con_X_Y[vessel][block] = self.model.Add(Expr == 0, name=name)
                i += 1
        logging.info(f"Set {i} Constraint X_Y done")

    def set_Constraint_Y_Z(self):
        i = 0
        for vessel, block_connum_dict in self.Yva.items():
            self.Con_Y_Z[vessel] = {}
            for block, connum in block_connum_dict.items():
                self.Con_Y_Z[vessel][block] = {}
                name = "ConY_Z_{}_{}".format(vessel, block)
                #
                Expr1 = []
                Expr1.append(self.Zva[vessel][block])
                Expr1.append(self.Yva[vessel][block])
                Expr1.append(self.instacne.Contaienrs_meannum_afterslot[vessel][0])
                Expr1 = self.model.Sum(Expr1)
                self.Con_Y_Z[vessel][block][1] = self.model.Add(Expr1 >= 0, name=name + "1")
                #
                Expr2 = []
                Expr2.append(self.Yva[vessel][block])
                Expr2.append(self.Zva[vessel][block])
                Expr2.append(self.instacne.Contaienrs_meannum_afterslot[vessel][0] * -1)
                Expr2 = self.model.Sum(Expr2)
                self.Con_Y_Z[vessel][block][2] = self.model.Add(Expr2 >= 0, name=name + "2")
                i += 1
        logging.info(f"Set {2 * i} ConstraintY_Z done")

    def set_Constraint_X_K(self):
        i = 0
        for block, block_data in self.instacne.Slot_available_contaienrs_bay.items():
            self.Con_X_K[block] = {}
            for bay, bay_data in block_data.items():
                name = "ConX_K_{}_{}".format(block, bay)
                Expr = []
                Expr.append(self.Jab[block][bay] * 1)
                for position, container_id_list in bay_data.items():
                    for container_id in container_id_list:
                        Expr.append(self.Xiabr[container_id][block][position] * -1)
                Expr = self.model.Sum(Expr)
                self.Con_X_K[block][bay] = self.model.Add(Expr == 0, name=name)
                i += 1
        logging.info(f"Set {i} Constraint X_K done")

    def set_Constraint_K_J(self):
        i = 0
        for block, block_data in self.Jab.items():
            self.Con_K_J[block] = {}
            for bay in block_data:
                self.Con_K_J[block][bay] = {}
                name = "ConK_J_{}_{}".format(block, bay)
                #
                Expr1 = []
                Expr1.append(self.Jab[block][bay] * self.instacne.Baylimit[block][bay])
                Expr1.append(self.Kab[block][bay] * -1)
                Expr1 = self.model.Sum(Expr1)
                self.Con_K_J[block][bay][1] = self.model.Add(Expr1 >= 0, name=name + "1")
                #
                Expr2 = []
                Expr2.append(self.Jab[block][bay] * -1)
                Expr2.append(self.Kab[block][bay] * 1)
                Expr2 = self.model.Sum(Expr2)
                self.Con_K_J[block][bay][1] = self.model.Add(Expr2 >= 0, name=name + "2")
                i += 1
        logging.info(f"Set Constraint {2*i} K_J done")

    def set_Constraint_J_conflict(self):
        i = 0
        for block, confilct_bays_list in self.instacne.size_confilct.items():
            if block in self.Jab:
                self.Con_J_conflict[block] = {}
                for confilct_bays in confilct_bays_list:
                    name = "J_conflict_{}_{}".format(block, confilct_bays)
                    Expr = []
                    for bay in confilct_bays:
                        if bay in self.Jab[block]:
                            Expr.append(self.Jab[block][bay] * 1)
                    Expr = self.model.Sum(Expr)
                    self.Con_J_conflict[block][tuple(confilct_bays)] = self.model.Add(Expr <= 1, name=name)
                    i += 1
        logging.info(f"Set Constraint {i} J_conflict done")

    ## ========== Objective
    def cal_Objective_diff(self):
        Expr_allves = []
        for vessel in self.instacne.Vessel_container:
            Expr = []
            Expr.append(self.instacne.Sumdiff[vessel])
            for container_id in self.instacne.Vessel_container[vessel]:
                for block, position_dict in self.Xiabr[container_id].items():
                    for position in position_dict:
                        Diabr = self.instacne.Add_diff_container_stack[container_id][block][position]
                        Expr.append(self.Xiabr[container_id][block][position] * Diabr)
            Expr = self.model.Sum(Expr)
            Expr = Expr / self.instacne.Contaienrs_meannum_afterslot[vessel][1]  #
            Expr_allves.append(Expr)
        Expr_allves = self.model.Sum(Expr_allves)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_diff done")
        return Expr_allves

    def cal_Objective_Equilibrium(self):
        Expr_allves = []
        for vessel in self.instacne.Vessel_container:
            Expr = []
            for block in self.Zva[vessel]:
                Expr.append(self.Zva[vessel][block] * 1)
            Expr = self.model.Sum(Expr)
            Expr = Expr / self.instacne.Contaienrs_meannum_afterslot[vessel][1]  #
            Expr_allves.append(Expr)
        Expr_allves = self.model.Sum(Expr_allves)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_Equilibrium done")
        return Expr_allves

    def set_Obiective(self):
        obj = self.weight["final_weights_diff"] * self.cal_Objective_diff() + self.weight["final_block_Equilibrium"] * self.cal_Objective_Equilibrium()
        self.model.Minimize(obj)
        logging.info(f"Cal Objective done")

    ## ========== Solution
    def parse_Solution(self):
        logging.info(f"ObjVal of MIP Model = {self.model.Objective().Value()}")
        Solution = {}
        for container_id, position_dict_dict in self.Xiabr.items():
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    if self.Xiabr[container_id][block][position].solution_value():
                        Solution[container_id] = (block, position[0], position[1], position[2])
        logging.info(f"parse Solution of Model done")
        return Solution

    ## ========== Model
    def build_Model(self):
        logging.info(f"--------------------- Start build MIP Model by ortools---------------------")
        self.init_Variables_Xiabr()
        self.init_Variables_Yva_Zva()
        self.init_Variables_Kab_Jab()
        logging.info(f"NumVariables = {self.model.NumVariables()}")
        #
        self.set_Constraint_X_i()
        self.set_Constraint_X_abr()
        self.set_Constraint_X_Y()
        self.set_Constraint_Y_Z()
        self.set_Constraint_X_K()
        self.set_Constraint_K_J()
        self.set_Constraint_J_conflict()
        logging.info(f"NumConstraints = {self.model.NumConstraints()}")
        #
        self.set_Obiective()
        #
        status = self.model.Solve()
        if status == pywraplp.Solver.OPTIMAL or status == pywraplp.Solver.FEASIBLE:
            Solution = self.parse_Solution()
        else:
            logging.warning(f"--------------------- MIP Model INFEASIBLE ---------------------")
            Solution = None
        logging.info(f"Solution = {Solution}")
        return Solution


def gen_solution_MIP(input, weight, ratio: float, decay_rate: float, Solver = "gurobi"):
    """
    调用gurobi构建MIP模型, 进行箱位规划
    Parameters
    ----------
    input: DB.init_instance_for_baseline 返回的缓存tuple
    weight: 多目标的权重
    ratio: 可选箱位的选择比例
    decay_rate: ratio的折扣系数
    Solver: 求解器类型 gurobi和ortools的规模上限不同

    Returns
    -------
    solution: dict of slot_tuple { conid: ( block, bay, stack, tier) }
    """
    try:
        instance_buffer = Instance_buffer(input, ratio=ratio)
        if Solver == "gurobi":
            solver = MIP_solver(instance_buffer, weight)
        elif Solver == "ortools":
            solver = MIP_solver_ortools(instance_buffer, weight)
        solution = solver.build_Model()
        return solution
    except Exception as ex:
        logging.warning(f"Failed to build MIP Model: {ex}")
        Ratio = ratio * decay_rate
        solution = gen_solution_MIP(input, weight, ratio=Ratio, decay_rate=decay_rate, Solver = Solver)
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
        solution = gen_solution_MIP(input,
                                    weight = {"final_block_Equilibrium":0.5, "final_weights_diff":0.5},
                                    ratio = 1,
                                    decay_rate = 0.9,
                                    Solver = "gurobi")
        # ====== 放置集装箱
        for curcon in container_list:
            db.updata_and_slot(curcon=curcon, slot=solution[curcon.ctn_no], plan=False)
        # ====== 计算指标
        yard_features_cache = db.cal_yard_features_cache(vessel = None) # 缓存计算 dict of list
        # ====== 获取buffer
        container_list = db.next_ten_container(num = buffer_size)
    logging.info(f"{time.time() - start}")

    db.close()


