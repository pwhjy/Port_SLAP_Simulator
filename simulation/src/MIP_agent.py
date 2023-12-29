"""
求解buffer中的集装箱箱位的MIP模型
"""
import os
import time
import logging
from gurobipy import *
import pandas as pd
# from ortools.linear_solver import pywraplp
# from ortools.init import pywrapinit


class Instance_buffer(object):
    def __init__(self):
        # # ========== 外部数据 todo 从env中获取
        self.Contaienrs_in_buffer = {"con1":["v1", 3]} # buffer中每个集装箱的属性信息 container_id: [ vessel(~str) , weight(~int)]
        self.Coninfo_lowerstack = {("block1",1,2,4): [("v1",2,1), ("v1",1,4)], ("block2",1,1,3):[] } # 每个可用箱位下方的(与buffer中航线相关的)集装箱信息 slot_position: [ (vessel(~str) , tier(~int)), weight(~int)) ] tier降序排列

        self.Contaienrs_available_slot = {"con1": {"block1": [(1,2,4)], "block2": [(1,1,3)]} }  # 每个集装箱可用的列信息 container_id: {  block: [ slot_position(~tuple) ] } 其中tier为已有的层数信息
        self.Sumdiff = {"v1": 20} # 每条航线当前在堆场的总翻箱数 vessel: diff
        self.Contaienrs_num_in_block = {"v1": {"block1": 20, "block2": 0}} # 每条航线当前在不同箱区的总数 vessel: { block: connum } block 为vessel对应的全部适配箱区

        # # ========== 处理后的数据(用于构建MIP)
        self.Slot_available_contaienrs = {}  # 每个箱位允许存放的集装箱id  block: { slot_position: [container_id] }
        self.Vessel_container = {}  # buffer中某条航线相关的集装箱id vessel: [ container_id(~str) ]
        self.Add_diff_container_stack = {}  # 集装箱i放在某个stack顶部将增加的翻箱数 container_id: { slot_position: diff }
        self.Contaienrs_meannum_afterslot = {}  # buffer落位后每条航线的block内箱数均值 vessel: num

        # # ========== todo: 尺寸关系约束（图)

        # # ==========
        self.bulid_instance()

    def _init_Slot_available_contaienrs(self):
        for container_id, slot_info in self.Contaienrs_available_slot.items():
            for block, slots_list in slot_info.items():
                if block not in self.Slot_available_contaienrs:
                    self.Slot_available_contaienrs[block] = {}
                for slot_position in slots_list:
                    if slot_position not in self.Slot_available_contaienrs[block]:
                        self.Slot_available_contaienrs[block][slot_position] = []
                    self.Slot_available_contaienrs[block][slot_position].append(container_id)

    def _init_Vessel_container(self):
        for container_id, container_info in self.Contaienrs_in_buffer.items():
            vessel = container_info[0]  # 获取集装箱所属的船舶信息
            if vessel not in self.Vessel_container:
                self.Vessel_container[vessel] = []
            self.Vessel_container[vessel].append(container_id)

    def _init_Contaienrs_meannum_afterslot(self):
        for vessel, block_info in self.Contaienrs_num_in_block.items():
            sumcon = sum(block_info.values())
            mean =  (sumcon +  len(self.Vessel_container[vessel]))/ len(block_info)
            self.Contaienrs_meannum_afterslot[vessel] = mean

    def _init_Add_diff_container_stack(self):
        def cal_add_diff(tier_weight, stackcon_vessel):
            """
            tier_weight: (tier, weight)
            stackcon_vessel: [(tier,weight)]
            """
            add_diff = 0
            tier, weight = tier_weight[0], tier_weight[1]
            for j in range(len(stackcon_vessel)):
                if weight < stackcon[j][1]:
                    add_diff += tier - stackcon[j][0]
            return add_diff

        for container_id, slot_info in self.Contaienrs_available_slot.items():
            self.Add_diff_container_stack[container_id] = {}
            for block, slots_list in slot_info.items():
                self.Add_diff_container_stack[container_id][block] = {}
                for slot_position in slots_list:
                    vessel, weight, tier = self.Contaienrs_in_buffer[container_id][0], self.Contaienrs_in_buffer[container_id][1], slot_position[2] + 1
                    stackcon = self.Coninfo_lowerstack[block,slot_position[0],slot_position[1],slot_position[2]]
                    stackcon_vessel = [con for con in stackcon if con[0] == vessel]
                    add_diff = cal_add_diff((tier, weight), stackcon_vessel)
                    self.Add_diff_container_stack[container_id][block][slot_position] = add_diff


    def bulid_instance(self):
        self._init_Slot_available_contaienrs()
        self._init_Vessel_container()
        self._init_Contaienrs_meannum_afterslot()
        self._init_Add_diff_container_stack()


class MIP_solver(object):
    def __init__(self, Instance):
        self.weight = [0.5, 0.5]
        self.model = Model("MIP")
        self.instacne = Instance

        # ========== Model parameters
        self.Xiabr = {}  # 决策变量 i: {a: {(b,r): Xiabr } }
        self.Yva = {}  # 决策变量 v: {a: Yva }
        self.Zva = {}  # 辅助决策变量 v: {a: Zva }

        self.Con_X_i = {}
        self.Con_X_abr = {}
        self.Con_X_Y = {}
        self.Con_Y_Z = {}

    ## ========== Variables
    def init_Variables_Xiabr(self):
        for container_id, position_dict in self.instacne.Contaienrs_available_slot.items():
            self.Xiabr[container_id] = {}
            for block, position_list in position_dict.items():
                self.Xiabr[container_id][block] = {}
                for position in position_list:
                    name = "X%s_%s_%s".format(container_id, block, position[1:])
                    vtype = GRB.BINARY
                    self.Xiabr[container_id][block][position[1:]] = self.model.addVar(vtype=vtype, name=name)
        logging.info(f"Init Variables Xiabr done")

    def init_Variables_Yva_Zva(self):
        for vessel, block_connum_dict in self.instacne.Contaienrs_num_in_block.items():
            self.Yva[vessel] = {}
            self.Zva[vessel] = {}
            for block, connum in block_connum_dict.items():
                Yname = "Y%s_%s".format(vessel, block)
                Yvtype = GRB.INTEGER
                Ylb = connum
                Yub = Ylb + len(self.instacne.Vessel_container[vessel])
                self.Yva[vessel][block] = self.model.addVar(lb=Ylb, ub=Yub, vtype=Yvtype, name=Yname)
                #
                Zname = "Y%s_%s".format(vessel, block)
                Zvtype = GRB.CONTINUOUS
                Zlb = 0
                Zub = Yub - self.instacne.Contaienrs_meannum_afterslot[vessel]
                self.Zva[vessel][block] = self.model.addVar(lb=Zlb, ub=Zub, vtype=Zvtype, name=Zname)
        logging.info(f"Init Variables Yva Zva done")

    ## ========== Constraintsss
    def set_Constraint_X_i(self):
        for container_id, position_dict_dict in self.Xiabr.items(): #  i: {a: {(b,r): Xiabr } }
            name = "ConX_i%s".format(container_id)
            Expr = LinExpr(0)
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    Expr.addTerms(1, self.X[container_id][block][position])
            self.Con_X_i[container_id] = self.model.addConstr(Expr == 1, name=name)
            Expr.clear()
        logging.info(f"Set Constraint X_i done")

    def set_Constraint_X_abr(self):
        for block, position_container_list in self.instacne.Slot_available_contaienrs.items():
            self.Con_X_abr[block] = {}
            for position, container_list in position_container_list.items():
                name = "ConX_abr%s".format(position)
                Expr = LinExpr(0)
                for container_id in container_list:
                    Expr.addTerms(1, self.X[container_id][block][position])
                self.Con_X_abr[block][position] = self.model.addConstr(Expr == 1, name=name)
                Expr.clear()
        logging.info(f"Set Constraint X_abr done")

    def set_Constraint_X_Y(self):
        for vessel, block_connum_dict in self.Yva.items():
            self.Con_X_Y[vessel] = {}
            for block, connum in block_connum_dict.items():
                name = "ConX_Y%s_%s".format(vessel, block)
                Expr = LinExpr(0)
                Expr.addTerms(1, self.Yva[vessel][block])
                Expr.addConstant(-1 * connum)
                for container_id in self.instacne.Vessel_container[vessel]:
                    if block in self.Xiabr[container_id]:
                        for position in self.Xiabr[container_id][block]:
                            Expr.addTerms(-1, self.Xiabr[container_id][block][position])
                self.Con_X_Y[vessel][block] = self.model.addConstr(Expr == 0, name=name)
                Expr.clear()
        logging.info(f"Init Constraint X_Y done")

    def set_Constraint_Y_Z(self):
        for vessel, block_connum_dict in self.Yva.items():
            self.Con_Y_Z[vessel] = {}
            for block, connum in block_connum_dict.items():
                self.Con_Y_Z[vessel][block] = {}
                name = "ConY_Z%s_%s".format(vessel, block)
                #
                Expr1 = LinExpr(0)
                Expr1.addTerms(1, self.Zva[vessel][block])
                Expr1.addTerms(-1, self.Yva[vessel][block])
                Expr1.addConstant(self.instacne.Contaienrs_meannum_afterslot[vessel])
                self.Con_Y_Z[vessel][block][1] = self.model.addConstr(Expr1 >= 0, name=name + "1")
                Expr1.clear()
                #
                Expr2 = LinExpr(0)
                Expr2.addTerms(1, self.Zva[vessel][block])
                Expr2.addTerms(1, self.Yva[vessel][block])
                Expr2.addConstant(-1 * self.instacne.Contaienrs_meannum_afterslot[vessel])
                self.Con_Y_Z[vessel][block][2] = self.model.addConstr(Expr2 >= 0, name=name + "2")
                Expr2.clear()
        logging.info(f"Init Constraint X_Y done")

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
            Expr = Expr / self.instacne.Contaienrs_num_in_block_afterslot[vessel]  #
            Expr_allves.add(Expr)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_diff  done")
        return Expr_allves

    def cal_Objective_Equilibrium(self):
        Expr_allves = LinExpr(0)
        for vessel in self.instacne.Vessel_container:
            Expr = LinExpr(0)
            for block in self.Zva[vessel]:
                Expr.addTerms(1, self.Zva[vessel][block])
            Expr = Expr / self.instacne.Contaienrs_num_in_block_afterslot[vessel]  #
            Expr_allves.add(Expr)
        Expr_allves = Expr_allves / len(self.instacne.Vessel_container)
        logging.info(f"Cal Objective_Equilibrium done")
        return Expr_allves

    def set_Obiective(self):
        obj = self.weight[0] * self.cal_Objective_diff() + self.weight[1] * self.cal_Objective_Equilibrium()
        self.model.setObjective(obj, GRB.MINIMIZE)
        logging.info(f"Set Objective done")

    ## ========== Solution
    def parse_Solution(self):
        logging.info(f"ObjVal ={self.model.ObjVal}")
        Solution = {}
        for container_id, position_dict_dict in self.Xiabr.items():
            for block, position_dict in position_dict_dict.items():
                for position in position_dict:
                    if self.Xiabr[container_id][block][position].x:
                        Solution[container_id] = (block, position[0], position[1])
        logging.info(f"parse Solution of Model done")
        return Solution

    ## ========== Model
    def build_Model(self):
        logging.info(f"")
        self.init_Variables_Xiabr()
        self.init_Variables_Yva_Zva()
        self.set_Constraint_X_i()
        self.set_Constraint_X_abr()
        self.set_Constraint_X_Y()
        self.set_Constraint_Y_Z()
        #
        self.set_Obiective()
        #
        # self.model.write("MIP.ilp")
        self.model.Params.TimeLimit = 360
        # self.model.Params.MIPGap = self.MIPGap
        self.model.optimize()
        if self.model.status == GRB.INFEASIBLE:
            self.model.computeIIS()
            conflicts = self.model.getAttr("IISConflict")
            for conflict in conflicts:
                print(conflict)
        Solution = self.parse_Solution()
        return Solution


if __name__ == "__main__":
    Instance = Instance_buffer()
    MIP = MIP_solver(None, Instance)
    MIP.build_Model()