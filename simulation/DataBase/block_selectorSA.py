import math
import random
import copy
import numpy as np
import matplotlib.pyplot as plt
import logging
import pickle
from simulation.DataBase.utils.block_selector import *
from simulation.DataBase.base import *

"""
箱区分配
使用模拟退火进行箱区箱位分配
调用方法：
    a = Block_selector(data_core) #传入数据库
    block,_ = a.get_available_block(N) # N:dict 输入各航线箱量{"v1":100,"v2":500,"v3":300}，注 必须与配置内的同顺序 得到分配的箱区。
    第二个返回值debug 用,为具体方案x
UNDO：
    特征需优化。目前特征：场泊对应度控制范围，散度保证选择多个箱区(取消)，箱区数量控制少选箱区，均衡度保证不会极端选区,。
    当前的只能处理1teu，因为2teu的箱位不可控
"""


class plan(object):
    def __init__(self):
        self.alloc = []  # list of dict 每个航线已分配的箱区箱位
        self.block = {}  # 当前所有航线已分配的箱区箱位

    def change(self, vessel, block1, num, block2):
        """
        移动vessel航线的num1个箱位 从 block1 到 block2
        """
        self.alloc[vessel][block1] -= num
        self.alloc[vessel][block2] += num
        self.block[block1] -= num
        self.block[block2] += num


class Block_selector(object):
    def __init__(self, config_path, t_start=0.0005, t_end=0.00005, one_times=20000, all_times=60000, is_plot=False,
                 test_without_db=False, f=None, debug=False):

        # ======
        self.config_path = config_path
        self.cf = myconf()
        self.cf.read(self.config_path, "utf-8")
        if test_without_db is False:
            self.BasicConfig = BasicConfigForDB0(self.cf)
            self.engine = create_engine(self.BasicConfig, False)
            self.session = create_session(self.engine)
            self.block = BlockForDB(self.cf)  # 船舶可选箱区
            self.berth = BerthForDB(self.cf)  # 船舶泊位

        # ====== 退火系数
        self.t_start = t_start  # 温度初始值
        self.t_end = t_end  # 温度终止值
        self.one_times = one_times  # 一次退火迭代次数
        self.all_times = all_times  # 总迭代次数

        # ====== 方案缓存与中间数值
        self.x_best = None  # 当前最好方案
        self.z_x_value = 0  # 缓存计算z值 减少计算
        self.z_best_value = 0  # 缓存计算z_best值 减少计算

        # ====== 计算特征的系数
        self.theta_1 = self.cf.getfloat("SELECT_BLOCK", "theta_1") # f1 场泊对应度系数
        self.theta_2 = self.cf.getfloat("SELECT_BLOCK", "theta_2") # f2 箱区数量系数
        self.theta_3 = self.cf.getfloat("SELECT_BLOCK", "theta_3")  # f3 均衡度系数

        # ====== 箱区等信息
        self.vacancy = None  # 每个航线的对应当前箱区空位 list of dict [{"51":20,"5A":40},{}...]
        self.amount_of_containers = None  # 每船需求位置 一维数组 [n1,n2,n3] 顺序为航线箱位需求的输入顺序
        self.vessels = None  # 对应航线 list ["v1","v2","v3"...]
        self.berth_block_distance = None  # 每个航线的泊位 箱区距离表 list of dict[{"51":761},{}...] 用以计算场泊对应度
        self.block_vacancy_size = None  # 每个箱区空位大小 dict {"51":20},从vacancy获得
        self.block_vacancy_size_sum = []  # 每个航线对应的箱区空位和 list
        self.data_of_berth_block = None  # 数据库场泊对应度计算缓存 list of tuple [(30,761),()] 前为箱子数，后为场泊距离和.用以计算f1 场泊对应度
        self.max_block_berth_dis = []  # 最远场泊距离 list 用以计算f1 场泊对应度
        self.data_of_containersd_in_block = None  # 数据库计算均衡度缓存 dict of dict {vessel:{'block':int,...},...}
        self.vacancy_size = None  # 每个航线对应的箱区数量  list
        self.vessels_size = 0  # 航线数量

        # ====== 测试用
        self.is_plot = is_plot  # 是否将退火过程绘图
        self.TEST_WITHOUT_DB = test_without_db  # 是否脱离数据库测试
        self.filename = f  # 脱离数据库测试用文件
        self.debug = debug

    def f1(self, x):
        """
        特征值计算 f1 场泊对应度，越小越好
        """
        f1_value = 0
        for i in range(self.vessels_size):
            if self.amount_of_containers[i] == 0:
                continue
            tmp = self.data_of_berth_block[i][1]
            for k, v in x.alloc[i].items():
                tmp += v * self.berth_block_distance[i][k]
            f1_value += tmp / (
                    (self.data_of_berth_block[i][0] + self.amount_of_containers[i]) * self.max_block_berth_dis)
        f1_value /= self.vessels_size  # 求平均
        return f1_value

    def f2(self, x):
        """
        特征值计算 f2 箱区散度，越小越好。计算为每个航线箱区已分配数量的倒数的平均值。
        """
        vessel_alloc_block_size = []
        for i in x.alloc:
            vessel_alloc_block_size.append(max(1, len([b for b in i.values() if b > 0])))  # 计算该航线箱位分配大于0的箱区数量
        # f2_value = np.average(1 / np.array(vessel_alloc_block_size))  # 倒数并求平均
        for i in range(len(self.vacancy_size)):
            vessel_alloc_block_size[i] /= self.vacancy_size[i]
        f2_value = np.average(np.array(vessel_alloc_block_size))  # 直接求数量 分母为总箱区数
        return f2_value

    def f3(self, x):
        """
        特征值计算 f3 箱位均衡度，越小越好。计算为每个航线每个校区箱位分配后的箱位数量的标准差平均值
        """
        vessel_alloc_block_containers_equilibrium = []
        for i in range(self.vessels_size):
            if self.amount_of_containers[i] == 0:
                continue
            blocks = []
            for k, v in x.alloc[i].items():
                sum_after_slot = self.data_of_containersd_in_block[i].get(k, 0) + v
                if sum_after_slot != 0:
                    blocks.append(sum_after_slot)
            blocks = np.array(blocks)
            vessel_alloc_block_containers_equilibrium.append(np.std(blocks))
        f3_value = np.average(vessel_alloc_block_containers_equilibrium)  # 求平均
        return f3_value

    def cal_z(self, x):
        """
        计算方案x的特征值，由场泊对应度、箱区散度、箱位均衡度三部分组成，具体可看文档

        Parameters
        ----------
        x : plan
            待计算特征值方案

        Returns
        -------
        float
            计算得到的特征值
        """
        f1_value = self.f1(x)
        f2_value = self.f2(x)
        f3_value = self.f3(x)

        return f1_value * self.theta_1 + f2_value * self.theta_2 + f3_value * self.theta_3

    def step(self, x, temperature):
        """
        迭代的一步退火过程，可能会得到新方案，并更新最优方案

        Parameters
        ----------
        x:plan
            当前方案
        temperature:float
            当前退火温度
        Returns
        -------
        x_new:plan
            老方案或者新方案
        """
        x_new = self.generate(x)  # 根据x生成新方案
        while x_new is None:
            x_new = self.generate(x)
        z_new = self.cal_z(x_new)
        delta_z = self.z_x_value - z_new
        # 若不比当前方案好 概率当作当前方案
        if delta_z < 0:
            if random.random() > math.exp(delta_z / temperature):
                return x
        # 与全局最优方案做比较。
        self.z_x_value = z_new
        if self.z_x_value < self.z_best_value:
            self.z_best_value = self.z_x_value
            self.x_best = x_new
        return x_new

    def generate(self, x):
        """
        由x生成新方案。随机选择某箱区，分配随机箱量给其他随机同船箱区，生成新的可行方案为x_new。

        Parameters
        ----------
        x:plan
            当前方案
        Returns
        -------
        x_new:plan
            新方案，与旧方案最多两处箱区箱量不同
        """
        # 随机选择某船某箱区
        vessel = random.randint(0, self.vessels_size - 1)
        block_key_list = list(x.alloc[vessel].keys())
        block = random.choice(block_key_list)

        # 若分配c = 0,或者除了当前block，其他block已满则方案无效。
        sum_block_alloc = 0
        for k in x.alloc[vessel]:
            sum_block_alloc += x.block[k]
        cnt = 0
        while x.alloc[vessel][block] == 0 or sum_block_alloc - x.block[block] == self.block_vacancy_size_sum[vessel] - \
                self.block_vacancy_size[block]:
            block = random.choice(block_key_list)
            cnt += 1
            # 防止当前船无可用箱区导致无限循环
            if cnt == self.vacancy_size[vessel]:
                return None

        # 选择同船第二个有余位的箱区
        block2 = random.choice(block_key_list)
        while block2 == block or x.block[block2] == self.block_vacancy_size[block2]:
            block2 = random.choice(block_key_list)
        alloc = random.randint(1, x.alloc[vessel][block])

        # 若分配后超过箱区上限，只分配刚好到上限。
        if alloc + x.block[block2] > self.block_vacancy_size[block2]:
            alloc = self.block_vacancy_size[block2] - x.block[block2]

        x_new = copy.deepcopy(x)
        x_new.change(vessel, block, alloc, block2)
        return x_new

    def initial_generator(self):
        """
        生成初始方案，根据按顺序箱区有余位就放原则

        Returns
        -------
        x:plan
            当前方案 plan:x = [alloc:[{'81':20,'55':81},{...}],block:{'81':20,'55':81}]
        """
        # 方案组成 plan:x = [alloc:[{'81':20,'55':81},{...}],block:{}]
        # 初始化 x
        x = plan()
        for i in self.vacancy:
            tmp_dict = {}
            for k, v in i.items():
                tmp_dict[k] = int(0)
            x.alloc.append(tmp_dict)
        for k, v in self.block_vacancy_size.items():
            x.block[k] = 0
        # 按航线顺序 随机选取箱区 有空位就放
        for i in range(0, self.vessels_size):
            aoc = self.amount_of_containers[i]
            block_key_list = list(x.alloc[i].keys())
            count = 0
            # 先随机选取
            while aoc > 0:
                k = random.choice(block_key_list)
                tmp = self.block_vacancy_size[k] - x.block[k]
                if aoc >= tmp:
                    aoc -= tmp
                    x.alloc[i][k] += tmp
                    x.block[k] += tmp
                else:
                    x.alloc[i][k] += aoc
                    x.block[k] += aoc
                    aoc = 0
                    break
                count += 1
                if count > self.vacancy_size[i]:
                    break
            # 随机一定次数若未放完则顺序判断
            if aoc > 0:
                for k in x.alloc[i].keys():
                    tmp = self.block_vacancy_size[k] - x.block[k]
                    if aoc >= tmp:
                        aoc -= tmp
                        x.alloc[i][k] += tmp
                        x.block[k] += tmp
                    else:
                        x.alloc[i][k] += aoc
                        x.block[k] += aoc
                        aoc = 0
                        break
            # 若依旧未放完说明初始化失败
            if aoc > 0:
                # 说明未放置完
                logging.error(f"initial_generator:vessel block sum:{self.block_vacancy_size_sum[i]}")
                logging.error(f"initial_generator:vessel {self.vessels[i]}:lack of containers{aoc}")
                return None
        return x

    def get_available_block(self, amount_of_containers=None):
        """
        根据船的箱量和泊位，自动分配箱区

        Parameters
        ----------
        amount_of_containers:dict
            各航线需求空位数量 {"v1":n1,"v2":n2,"v3":n3...}, V的顺序需要与数据库config相同

        Returns
        -------
        blocks:dict of list
            箱区分配方案
        x:plan
            箱区箱位方案,debug用
        """
        self.session = create_session(self.engine)
        x = self.get_available_block_SA(amount_of_containers)
        self.session.close()

        if x is None:
            blocks = {}
            for i in range(self.vessels_size):
                tmp = []
                blocks[self.vessels[i]] = tmp
                logging.error(f"Not enough vacancy! vessel {self.vessels[i]} blocks:{tmp}")
            return blocks, None
        blocks = {}
        for i in range(self.vessels_size):
            tmp = []
            for k, v in x.alloc[i].items():
                if v > 0:
                    tmp.append(k)
            blocks[self.vessels[i]] = tmp
            logging.info(f"vessel {self.vessels[i]} blocks:{tmp}")
        return blocks, x

    def initial_SA(self, amount_of_containers):
        """
        初始化一些必要信息，加速模型

        Parameters
        ----------
        amount_of_containers:dict
            每船需求位置 [v1:n1,v2:n2,v3:n3]
        """
        amount_of_outcontainers = {}
        if self.TEST_WITHOUT_DB is True:
            if self.filename is None:
                # 若无输入文件，直接使用以下数据
                # 获取各箱区空位 顺序与配置相关
                self.vacancy = [
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436}]
                # 获取场泊距离 顺序与配置相关
                self.berth_block_distance = [
                    {'51': 3249, '52': 3249, '53': 3184, '54': 3184, '55': 3126, '56': 3075, '57': 3070, '58': 3063,
                     '59': 3019, '5A': 3014, '5B': 2963, '5E': 935, '5F': 2958, '5G': 2916, '5H': 2916, '5K': 2907,
                     '5N': 2902, '5S': 2865, '61': 2851, '62': 2846, '63': 2807, '64': 2795, '65': 2790, '66': 2756,
                     '67': 2751, '68': 2739, '69': 2700, '6A': 2695, '6B': 940, '6C': 2644, '6F': 2639, '6G': 2607,
                     '6H': 2588, '6M': 2583, '6N': 2583, '6S': 2579, '71': 2532, '72': 2532, '73': 2527, '74': 2527,
                     '75': 2484, '76': 2476, '77': 3487, '78': 3552, '79': 3552, '7A': 705, '7L': 980, '7M': 705,
                     '81': 761,
                     '82': 761, '83': 812, '84': 812, '85': 817, '86': 817, '87': 868, '88': 868, '89': 873, '8A': 873,
                     '8M': 924, '91': 929, '92': 929, '96': 935, '97': 940, '98': 980, '99': 980, '9A': 985, '9B': 985,
                     '9L': 991, '9M': 996},
                    {'51': 3249, '52': 3249, '53': 3184, '54': 3184, '55': 3126, '56': 3075, '57': 3070, '58': 3063,
                     '59': 3019, '5A': 3014, '5B': 2963, '5E': 935, '5F': 2958, '5G': 2916, '5H': 2916, '5K': 2907,
                     '5N': 2902, '5S': 2865, '61': 2851, '62': 2846, '63': 2807, '64': 2795, '65': 2790, '66': 2756,
                     '67': 2751, '68': 2739, '69': 2700, '6A': 2695, '6B': 940, '6C': 2644, '6F': 2639, '6G': 2607,
                     '6H': 2588, '6M': 2583, '6N': 2583, '6S': 2579, '71': 2532, '72': 2532, '73': 2527, '74': 2527,
                     '75': 2484, '76': 2476, '77': 3487, '78': 3552, '79': 3552, '7A': 705, '7L': 980, '7M': 705,
                     '81': 761,
                     '82': 761, '83': 812, '84': 812, '85': 817, '86': 817, '87': 868, '88': 868, '89': 873, '8A': 873,
                     '8M': 924, '91': 929, '92': 929, '96': 935, '97': 940, '98': 980, '99': 980, '9A': 985, '9B': 985,
                     '9L': 991, '9M': 996},
                    {'51': 3249, '52': 3249, '53': 3184, '54': 3184, '55': 3126, '56': 3075, '57': 3070, '58': 3063,
                     '59': 3019, '5A': 3014, '5B': 2963, '5E': 935, '5F': 2958, '5G': 2916, '5H': 2916, '5K': 2907,
                     '5N': 2902, '5S': 2865, '61': 2851, '62': 2846, '63': 2807, '64': 2795, '65': 2790, '66': 2756,
                     '67': 2751, '68': 2739, '69': 2700, '6A': 2695, '6B': 940, '6C': 2644, '6F': 2639, '6G': 2607,
                     '6H': 2588, '6M': 2583, '6N': 2583, '6S': 2579, '71': 2532, '72': 2532, '73': 2527, '74': 2527,
                     '75': 2484, '76': 2476, '77': 3487, '78': 3552, '79': 3552, '7A': 705, '7L': 980, '7M': 705,
                     '81': 761,
                     '82': 761, '83': 812, '84': 812, '85': 817, '86': 817, '87': 868, '88': 868, '89': 873, '8A': 873,
                     '8M': 924, '91': 929, '92': 929, '96': 935, '97': 940, '98': 980, '99': 980, '9A': 985, '9B': 985,
                     '9L': 991, '9M': 996},
                    {'51': 665, '52': 665, '53': 716, '54': 716, '55': 721, '56': 721, '57': 772, '58': 772, '59': 777,
                     '5A': 777, '5B': 828, '5E': 940, '5F': 833, '5G': 833, '5H': 884, '5K': 889, '5N': 940, '5S': 940,
                     '61': 1418, '62': 1423, '63': 1423, '64': 1432, '65': 1432, '66': 1441, '67': 1446, '68': 1452,
                     '69': 1452, '6A': 1474, '6B': 1418, '6C': 1474, '6F': 1479, '6G': 1479, '6H': 1497, '6M': 1498,
                     '6N': 1498, '6S': 1502, '71': 1541, '72': 1553, '73': 1558, '74': 1558, '75': 1586, '76': 1591,
                     '77': 1609, '78': 1609, '79': 1807, '7A': 1843, '7L': 1418, '7M': 1843, '81': 1849, '82': 1854,
                     '83': 1899, '84': 1899, '85': 1904, '86': 1904, '87': 1905, '88': 1910, '89': 1954, '8A': 1955,
                     '8M': 1960, '91': 1961, '92': 1966, '96': 2011, '97': 2016, '98': 2016, '99': 2017, '9A': 2067,
                     '9B': 2075, '9L': 2075, '9M': 2140}]
                # 获取场泊对应度计算缓存 顺序与配置相关
                self.data_of_berth_block = [(391, 1030427), (179, 473328), (673, 1711393), (30, 31726)]
                self.max_block_berth_dis = 3552
                self.data_of_containersd_in_block = [
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436},
                    {'51': 179, '52': 85, '53': 109, '54': 113, '55': 122, '56': 179, '57': 196, '58': 333, '59': 122,
                     '5A': 117, '5E': 184, '5F': 168, '5G': 344, '5H': 343, '5K': 196, '5N': 625, '5S': 668, '61': 387,
                     '62': 191, '63': 189, '64': 181, '65': 115, '66': 40, '67': 183, '68': 49, '69': 159, '6A': 157,
                     '6B': 182, '6C': 130, '6F': 174, '6G': 274, '6H': 1033, '6M': 517, '6N': 408, '6S': 406, '71': 237,
                     '72': 120, '73': 89, '74': 51, '75': 172, '76': 136, '77': 102, '78': 125, '79': 500, '7A': 102,
                     '7L': 3597, '7M': 464, '81': 34, '82': 57, '83': 58, '84': 89, '85': 239, '86': 193, '87': 253,
                     '88': 92, '89': 260, '8A': 104, '8M': 1797, '91': 423, '92': 669, '96': 168, '97': 117, '98': 132,
                     '99': 104, '9A': 416, '9L': 1308, '9M': 436}]
                amount_of_outcontainers = amount_of_containers
            else:
                # 使用文件信息输入
                f = open(self.filename, "rb")
                self.vacancy = pickle.load(f)
                self.berth_block_distance = pickle.load(f)
                self.data_of_berth_block = pickle.load(f)
                self.max_block_berth_dis = 3552
                amount_of_outcontainers = amount_of_containers
        else:
            # 正常渠道 数据库输入
            # 此处的block和berth与数据库config配置有关.
            self.vacancy = get_vslot_1teu(self.session, self.block)
            self.berth_block_distance = get_block_berth_dis(self.session, self.berth, self.block)
            self.data_of_berth_block, self.max_block_berth_dis, self.data_of_containersd_in_block = get_berth_block(
                self.session, self.berth, self.block)
            amount_of_outcontainers = get_containers_outyard(self.session, self.block.keys())

        # 箱区空位信息 转换dict为list [40,30,100,70]
        aoc = []
        self.vessels = []
        for k, v in amount_of_outcontainers.items():
            self.vessels.append(k)
            aoc.append(v)
        self.amount_of_containers = np.array(aoc)
        logging.info(f"amount_of_outcontainers: {aoc}")
        # 获取航线数量 各航线箱区数量等信息
        self.vessels_size = len(self.amount_of_containers)
        self.vacancy_size = []
        for i in range(0, self.vessels_size):
            self.vacancy_size.append(len(self.vacancy[i]))

        # block_vacancy_size：每个箱区的空位数量 dict 箱区:空位
        # block_vacancy_size_sum: 每个航线对应箱区空位数量和 list
        self.block_vacancy_size = {}
        for i in self.vacancy:
            sum = 0
            for k, v in i.items():
                self.block_vacancy_size[k] = v
                sum += v
            self.block_vacancy_size_sum.append(sum)

    def get_available_block_SA(self, amount_of_containers):
        """
        运行模拟退火算法，获取箱区箱位分配数量

        Parameters
        ----------
        amount_of_containers:dict
            每船需求位置 {"v1":n1,"v2":n2,"v3":n3...}, V的顺序需要与数据库config相同
        Returns
        -------
        x_best:plan
            箱区箱位分配方案
        """
        # 初始化信息
        self.initial_SA(amount_of_containers)

        # t_end = t_start*cool_rate^(one_times-1)，保证温度下降刚好one_times次
        cool_rate = math.pow(self.t_end / self.t_start,
                             1.0 / (self.one_times - 1))

        # 初始化最优方案
        x = self.initial_generator()
        none_try_times = 3
        while x is None and none_try_times != 0:
            logging.info(f"Plan generation failed,{none_try_times} to last generation.")
            none_try_times -= 1
            x = self.initial_generator()
        if x is None:
            return None
        self.x_best = copy.deepcopy(x)
        self.z_best_value = self.cal_z(self.x_best)
        self.z_x_value = self.z_best_value

        # 绘图用
        z_list = []

        # 模拟退火过程
        end_flag = False
        count = 0
        while end_flag is not True:
            t = self.t_start
            x = self.initial_generator()  # 初始化方案
            while x is None:
                x = self.initial_generator()
            self.z_x_value = self.cal_z(x)
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
        return self.x_best

    def plot(self, all_times, z_list):
        """
        将方案z值变化过程绘图
        """
        # x = np.linspace(1, all_times, all_times)
        plt.plot(z_list)
        plt.show()
        return 0


if __name__ == '__main__':
    alloc_block = {"EMCGD8": 0,
                   "COSCR13": 1000,
                   "CMADA8": 1000,
                   "EMCRL14": 1000, }
    config_path = "../config/env_test.ini"
    a = Block_selector(config_path, is_plot=True, test_without_db=True)
    # block, x = a.get_available_block(alloc_block)

    config_path = "../config/demo.ini"
    # a = Block_selector(config_path, is_plot=True, test_without_db=False)
    block, x = a.get_available_block(alloc_block)

    for k, v in block.items():
        print(k, ":", v)
    print(x.alloc)
    print(x.block)
    print(a.f1(x), " ", a.f2(x), " ", a.f3(x))
