import os
import random
import sys
import argparse
import time
import logging
from tqdm import tqdm
import numpy as np
import matplotlib.pyplot as plt
import math
sys.path.append(os.path.join(os.path.dirname(__file__), "../utils"))
sys.path.append(os.path.join(os.path.dirname(__file__), "../Env"))
sys.path.append(os.path.join(os.path.dirname(__file__),
                             "../../../../../下载/weixin/WeChat Files/wxid_x8r3n0zu746612/FileStorage/File"))
from logger import config_logging
import torch

"""
接口函数的定义，和env对接后删除
"""
class Env(object):

    def __init__(self, config):
        pass

    def input(self):
        buffer = []
        candidate_slots = []
        return buffer, candidate_slots
    
    def check(self, x):
        return True
    
    def get_vessel_diff(self, cur_vessel):
        """
        获取航线 cur_vessel 在堆场中的总翻箱数
        """
        return 0
    def get_Yva_Mv():
        """
        Yva:方案A执行前航线v在箱区a的箱数{vessel:{block:箱数}}
        Mv:航线v的预期分布箱区数目{vessel:m}
        """
        return 0


    def function1(self, container, slot):
        """
        input      container: 集装箱对应的信息      slot:当前槽对应的信息
        集装箱i放在列s将导致的翻箱数
        """
        return 0

    def get_vessel_containers(self, vessel):
        """
        获取当前 堆场中航线v的集装箱总数
        """
        return 0


class SA_Agent(object):
    def __init__(self, config_path, t_start=0.0005, t_end=0.00005, one_times=100, all_times=400, is_plot=False):
        # ====== 退火系数
        self.t_start = t_start  # 温度初始值
        self.t_end = t_end  # 温度终止值
        self.one_times = one_times  # 一次退火迭代次数
        self.all_times = all_times  # 总迭代次数

        # =======
        self.p_mutate = 0.5  # 方案mutate的概率
        self.ex_vessel = False # 是否考虑vessel限制，True则考虑
        self.env = Env(config=config_path)


        # ====== 方案缓存与中间数值
        self.x_best = None  # 当前最好方案
        self.z_x_value = 0  # 缓存计算z值 减少计算
        self.z_best_value = 0  # 缓存计算z_best值 减少计算
        self.immediate_block_Equilibrium = float(cf.get("Reward", "immediate_block_Equilibrium"))
        self.immediate_weight_diff = float(cf.get("Reward", "immediate_weight_diff"))

        self.initial_SA()
    
    def initial_SA(self):
        """
        初始化，读入需要的数据(buffer, available)并作预处理
        """
        # 需要接口
        # ================================================
        self.buffer, self.available = db.input()
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
            for idx in range(self.n):
                slot = self.candidate_slot_list[random.randint(len(self.candidate_slot_list[idx]))]
                x.append(slot)
            check_x = check(self.output(x))
        return x

    
    def preprocessing_slot(self):
        """
        预处理每个container可以放的slot的集合
        self.candidate_slot_list:[[slot1,slot2.....],[],...]
        """
        candidate_slot_list = []
        for container in self.buffer:
            candidate_pre_slot = []
            for slot in self.available:
                if (not ex_vessel or container['vessel'] in slot['vesselSet']):
                    if slot['type'] == 0 or slot['type'] == container['type']:
                        candidate_pre_slot.append(slot)
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
        x =  solution.copy()
        type = {}
        for i in range(self.m):
            
            k = (self.buffer[i]['vessel'] if self.ex_vessel else '')+str(buffer[i]['type'])
            if k not in type:
                type[k]=[]
            type[k].append(i)
        reserve_type = []
        for v in type.values():
            if len(v) > 1:
                reserve_type.append(v)
        if len(reserve_type) == 0:
            return x
        i = random.randint(len(reserve_type))
        a,b = random.sample(reserve_type[i], 2)
        x[a], x[b] = x[b], x[a]
        return x
        
    # [{position:[block,bay,row], 
    # tiers:int, 
    # vesselSet:set(str), 
    # type:int(0,2,4)}, {}....]
    def mutate(self, solution):
        """
        input:
            solution:[slot1,slot2,...,slotn]
        output:
            x:[slot1,slot2,...,slotn]
        """
        check_x = False
        x =  solution.copy()
        container_idx = random.randint(len(self.buffer))
        candidate_pre_slot = self.candidate_slot_list[container_idx]
        # 判断可选slot个数是否大于1
        while len(candidate_pre_slot) < 2:
            container_idx = random.randint(len(self.buffer))
            candidate_pre_slot = self.candidate_slot_list[container_idx]


        while not check_x:

            slot_idx = random.randint(len(candidate_pre_slot))
            while candidate_pre_slot[slot_idx] == x[container_idx]:
                slot_idx = random.randint(len(candidate_pre_slot))
            x[container_idx] = candidate_pre_slot[slot_idx]

            check_x = check(self.output(x))

        return x


    def output(self, solution):
        """
        input:
            solution:[slot1,slot2,...,slotn]
        output:
            x:[pos1,pos2,...,posn] pos:[block,bay,row]
        """
        x = []
        for s in solution:
            x.append(s['position'])
        return x


    def step(self, x, temperature):
        """
        退火一步
        input:
            x:[slot1,slot2,...,slotn]
            temperature:float

        """
        generate = self.crossover if random.random() < self.p_mutate else self.mutate
        new_x = generate(x)  # 根据x生成新方案

        # 需要接口
        # ===========================================================
        while not check(new_x):
            new_x = generate(x)
        z_new = Get_reward(x_new)
        # ===========================================================



        delta_z = self.z_x_value - z_new
        if delta_z < 0:
            if random.random() > math.exp(delta_z / temperature):
                return x
        self.z_x_value = z_new
        if self.z_x_value < self.z_best_value:
            self.z_best_value = self.z_x_value
            self.x_best = x_new
        return x_new


    def annealing(self, states):
        """
        模拟退火算法,最优解保存在self.x_best
        """
        self.initial_SA()

        # t_end = t_start*cool_rate^(one_times-1)，保证温度下降刚好one_times次
        cool_rate = math.pow(self.t_end / self.t_start,
                             1.0 / (self.one_times - 1))

        # 初始化最优方案
        x = self.initial_generator()
        self.x_best = x



        # 需要接口
        # =====================================================
        self.z_best_value = Get_reward(self.x_best)
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
            self.z_x_value = Get_reward(x)
            # =====================================================

            z_list.append(self.z_x_value)
            for i in range(0, self.one_times):
                x = self.step(x, t)
                if self.is_plot is True:
                    z_list.append(self.z_x_value)  # 绘图相关
                t *= cool_rate
                count += 1
                if count >= self.all_times:
                    end_flag = True
                    break
        if self.is_plot is True:  # 绘图相关
            self.plot(self.all_times, z_list)


    def plot(self, all_times, z_list):
        """
        将方案z值变化过程绘图
        """
        # x = np.linspace(1, all_times, all_times)
        plt.plot(z_list)
        plt.show()
        return 0
    

    
    def f1(self, solution):
        """
        计算箱翻箱率
        """
        vessel_diff = []

        for cur_vessel in self.vessel_list:
            cur_container_diff = 0
            # =====================
            cur_vessel_diff = env.get_vessel_diff(cur_vessel)
            # ======================

            for container in self.vessel_list[cur_vessel]:
                for i in len(self.buffer):
                    if self.buffer[i] == container:
                        # ==================
                        cur_container_diff += env.function1(container, solution[i])
                        # ==================
                        break
            
            cur_container_size = env.get_vessel_containers(vessel)
            cur_buffer_container_size = len(vessel_diff[cur_vessel])
            vessel_diff.append( 1.0 * (cur_container_diff + cur_vessel_diff)  / (cur_container_size + cur_buffer_container_size))

        return sum(vessel_diff)


    def f2(self, solution):
        """
        计算箱区均衡度
        Yva:方案A执行前航线v在箱区a的箱数{vessel:{block:箱数}}
        Mv:航线v的预期分布箱区数目{vessel:m}
        """
        # ====================
        Yva, Mv = env.get_Yva_Mv()
        # ====================

        x = self.output(solution)
        vessel_diff = []
        for i in range(self.n):
            Yva[buffer[i]['vessel']][x[0]] += 1

        for cur_vessel in self.vessel_list:
            cur_diff = 0
            cur_sumv = sum(Yva['cur_vessel'].values)
            for value in Yva[cur_vessel].values():
                cur_diff += abs(1.0*value - cur_sumv/Mv['cur_vessel'])
            vessel_diff.append(cur_diff/cur_sumv)

        return sum(vessel_diff)



    def Get_reward(self, solution):
        return self.immediate_block_Equilibrium * self.f2(solution) + self.immediate_weight_diff * self.f1(solution)