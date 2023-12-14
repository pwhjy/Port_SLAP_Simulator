"""
用于箱区规划算法
用于baseline
"""

from simulation.DataBase.table_define import *
import numpy as np


def get_berth_block(session, vessel_berth, serblock):
    """
    辅助计算场泊对应度
    Parameters
    ----------
    session
    vessel_berth: {vessel: berth}
    serblock: {vessel: [block1,block2,...],... }

    Returns
    -------
    Berth_block: [(sumcon, berth_block)] 每条航线在相关箱区的 堆存总数sumcon 与 场泊距离和berth_block
    maxdis: int 整个堆场的场泊距离最大值
    Block_sumcon: [{block: consum}] 每条航线在相关箱区的 单个箱区内堆存数量consum
    """
    Berth_block = []
    Block_sumcon = []
    maxdis = session.query(sa.func.max(Yard_block.distance)).first()[0]
    for vessel,berth in vessel_berth.items():
        blocknum = session.query(Yard_slot.block, sa.func.count(Yard_slot.block))\
                .filter(Yard_slot.block if serblock[vessel][0] == "all"
                                        else Yard_slot.block.in_(serblock[vessel])) \
                .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                          Containers.vessel == vessel)) \
                .group_by(Yard_slot.block).all()
        if len(blocknum) == 0:
            Berth_block.append((0,0))
            Block_sumcon.append({})
            continue

        block_sumcon = {b[0]:b[1] for b in blocknum}
        Block_sumcon.append(block_sumcon)

        nums = np.array(list(block_sumcon.values()))
        blocks = list(block_sumcon.keys())
        dis = session.query(Yard_block.distance) \
            .filter(Yard_block.berth == berth, Yard_block.block.in_(blocks)).all()
        dis = np.array([d[0] for d in dis])
        sumcon = sum(nums)
        berth_block = sum(dis * nums)
        Berth_block.append((sumcon,berth_block))
    return Berth_block, maxdis, Block_sumcon


def get_vslot_1teu(session, serblock):
    """
    获取每个堆区的1teu空位容量
    Returns
    -------
    service_block_capacity: [{block: capacity}]
    """
    vslotsum_1teu = session.query(Yard_bay.block, sa.func.sum(Yard_bay.limit), sa.func.sum(Yard_bay.sum_ctn))\
        .filter(Yard_bay.exist == 1, Yard_bay.forbid == 0,
                Yard_bay.bay % 2 == 1)\
        .group_by(Yard_bay.block).all()
    vslot_1teu = {b[0]: int(b[1]-b[2]) for b in vslotsum_1teu}
    service_block_capacity = []
    for ser_block in serblock.values():
        vslotsum_1teu_1 = vslot_1teu if ser_block[0] == "all"\
            else {k: v for k, v in vslot_1teu.items() if k in ser_block}
        service_block_capacity.append(vslotsum_1teu_1)
    return service_block_capacity


def get_block_berth_dis(session, vessel_berth, serblock):
    """
    获取场泊距离
    Returns
    -------
    service_block_capacity: [{block: dis}] 每条航线相关箱区的场泊距离
    """
    berth_block_ditance = []
    for s,b in vessel_berth.items():
        filter_dis = (Yard_block.berth == b) if serblock[s][0] == "all" \
            else sa.and_(Yard_block.berth == b, Yard_block.block.in_(serblock[s]))
        dis = session.query(Yard_block.block, Yard_block.distance)\
                     .filter(filter_dis).all()
        dis = {d[0]: d[1] for d in dis}
        berth_block_ditance.append(dis)
    return berth_block_ditance


def get_containers_outyard(session,vessel):
    """
    获取不同航线各个尺寸的箱量（待入场）
    Parameters
    ----------
    session:
    vessel: [v1,v2,v3,...]

    Returns
    -------
    outcons: {vessel1: [cum_1teu, cum_2teu],.....}
    outcons: {vessel1: cum_1teu + cum_2teu * 3,.....}
    """
    outcons = {}
    for ves in vessel:
        con_num = session.query(Containers_outyard.size, sa.func.count(Containers_outyard.ctn_no))\
                          .filter(Containers_outyard.vessel == ves)\
                          .group_by(Containers_outyard.size).all()
        con_num = np.array(con_num, dtype = int) if len(con_num)>0 else np.array([[2, 0], [1, 0]])
        con_teu = [np.sum(con_num[np.where(con_num[:,0] == 1)],axis=0)[1],
                   np.sum(con_num[np.where(con_num[:,0] == 2)],axis=0)[1]]
        # outcons[ves] = con_teu
        outcons[ves] = con_teu[0] + con_teu[1] * 3 # 只返回"1teu"箱量
    return outcons


def cal_stack_diff(stackcon):
        """
        计算单列内的翻箱数
        Parameters
        ----------
        stackcon: [(tier,weight)]  (tier ~ desc)

        Returns
        -------
        diff: int 翻箱数

        """
        diff = 0
        while (stackcon != []):
            for j in range(1, len(stackcon)):
                if stackcon[0][1] < stackcon[j][1]:
                    diff += stackcon[0][0] - stackcon[j][0]
            del (stackcon[0])
        return diff


def get_stack_cons(session, vessel, stack, thre=1):
    """
    获取stack列内vessel航线相关的集装箱数据, 用于计算翻箱数
    Parameters
    ----------
    stack: (block, bay, stack)
    vessel : str 具体航线

    Returns
    -------
    stackcon: [(tier,weight)]  (tier ~ desc)

    """
    stackcon = session.query(Containers.tier, Containers.weight) \
        .filter(Containers.vessel == vessel,
                Containers.schedule_frame > thre - 1) \
        .join(Yard_slot, sa.and_(Yard_slot.ctn_no == Containers.ctn_no,
                                 Yard_slot.block == stack[0],
                                 Yard_slot.bay == stack[1],
                                 Yard_slot.stack == stack[2])) \
        .order_by(Containers.tier.desc()).all()
    return stackcon


def cal_weight_diff(session, Block,  vessels, thre=1):
    """
    计算各个航线在堆场的总翻箱数, 总箱数
    Parameters
    ----------
    Block: list of str_block 箱区考虑范围
    vessels : list of str_vessel
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    fea_weights: { vessel1 : [sumdiff1,sum1],  vessel2 : [sumdiff2,sum2],....} [航线总翻箱数, 航线总箱数]
    """

    fea_weights = {}
    # 分别计算不同航线箱子
    for vessel in vessels:
        # 特定航线箱子所堆放的列
        stacks = session.query(Yard_slot.block, Yard_slot.bay, Yard_slot.stack)\
            .filter(Yard_slot.block.in_(Block))\
            .join(Containers,
                  sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                          Containers.vessel == vessel,
                          Containers.schedule_frame > thre - 1)).all()
        sum = len(stacks)  # 该航线总箱数
        stacks = set(stacks)
        sumdiff = 0
        if sum == 0:
            continue
        # 计算每一列的重量等级差异
        for stack in set(stacks):
            stackcon = get_stack_cons(session, vessel, stack, thre)
            sumdiff += cal_stack_diff(stackcon)
        fea_weights[vessel] = [sumdiff, sum]
    return fea_weights


def get_stack_Equilibrium(session, Block, thre=1):
    """
    计算总箱数
    Parameters
    ----------
    Block: list of str_block 箱区考虑范围
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    sumcon: int总箱数
    """
    sumcon = session.query(Yard_slot.tier) \
        .filter(Yard_slot.block.in_(Block)) \
        .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                  Containers.schedule_frame > thre - 1)).count()
    return sumcon