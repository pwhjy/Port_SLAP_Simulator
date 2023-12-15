"""
计算优化指标
"""
from simulation.DataBase.table_define import *
import time
import logging
import numpy as np
import os
import pandas as pd


# ====== 栈箱量均衡度
def cal_stack_Equilibrium(session, Block,  thre=1):
    """
    计算优化目标_栈箱量均衡度
    Parameters
    ----------
    Block: 箱区考虑范围
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    fea_stacks: int 栈箱量均衡度
    sumcon: int 总箱量
    """
    start = time.time()

    # tiers = session.query(Yard_slot.tier) \
    #     .filter(Yard_slot.block.in_(Block)) \
    #     .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
    #                               Containers.schedule_frame > thre - 1)).all()
    tiers = session.query(Containers.tier) \
        .filter(Containers.block.in_(Block),
                Containers.schedule_frame > thre - 1).all()
    if len(tiers) > 0:
        fea_stacks = sum([tier[0] ** 2 for tier in tiers]) / len(tiers)
        # logging.info(f"schedule_frame= {self.schedule_frame}: Equilibrium_stack = {fea_stacks} (sumcon = {sumcon})")
    else:
        logging.info("No container in the yard")
        fea_stacks = 0
    logging.debug(f"cal_stack_Equilibrium: {time.time() - start}")
    return fea_stacks, len(tiers)


# ====== 箱区均衡度
def cal_block_Equilibrium(session, Block, vessels, thre=1):
    """
    计算优化目标_箱区均衡度(分航线/船舶)
    Parameters
    ----------
    Block: 箱区考虑范围
    vessels : list of vessel
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    fea_blocks: { vessel1 : [fea_block1,sum1],  vessel2 : [fea_block2,sum2],....}
    """
    start = time.time()
    # # 不指定航线则计算全部在场箱的航线
    # if vessels == None:
    #     # 堆场内的全部航线
    #     vessels = self.session.query(sa.distinct(Containers.vessel)) \
    #         .join(Yard_slot, sa.and_(Containers.ctn_no == Yard_slot.ctn_no)).all()
    #     vessels = [v[0] for v in vessels]

    fea_blocks = {}
    for vessel in vessels:
        # 特定航线箱子所堆放的箱区
        blocks = session.query(sa.func.distinct(Yard_slot.block)) \
            .filter(Yard_slot.block.in_(Block)) \
            .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                      Containers.vessel == vessel,
                                      Containers.schedule_frame > thre - 1)).all()
        if len(blocks) == 0:
            fea_blocks[vessel] = [0, 0]
            continue
        Sumcon = np.array([])
        for block in blocks:
            # 船舶在特定箱区的总箱量
            sumcon = session.query(Yard_slot.ctn_no) \
                .filter(Yard_slot.block == block[0]) \
                .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                          Containers.vessel == vessel,
                                          Containers.schedule_frame > thre - 1)).count()
            Sumcon = np.append(Sumcon, sumcon)
        s = sum(Sumcon)
        # fea_block = Sumcon.std()
        # fea_block = sum(abs(Sumcon-Sumcon.mean()))
        fea_block = sum(abs(Sumcon - Sumcon.mean())) / s
        # fea_block = 1-fea_block/sum(Sumcon)
        fea_blocks[vessel] = [fea_block, s]
        # logging.debug(f"Equilibrium_{vessel}: blocks={blocks} ; Sumcon={Sumcon} ; fea_block = {fea_block}")
    # logging.info(f"schedule_frame= {self.schedule_frame}: Equilibrium_blocks = {fea_blocks}")
    logging.debug(f"cal_block_Equilibrium: {time.time() - start}")
    return fea_blocks

# ====== 场泊对应度
def cal_berth_block(session, Block, vessel_berth, thre=1, outfolder=None, filename = None):
    """
    计算优化目标_场泊对应度(分航线/船舶)
    Parameters
    ----------
    Block: 箱区考虑范围
    vessel_berth: dict {vessel1:berth1,vessel2:berth2}
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果
    outfolder: dir of rescsv
    filename: name of rescsv

    Returns
    -------
    Berth_block: { vessel1 : [berth_block1,sum1],  vessel2 : [berth_block2,sum2],....}

    """
    start = time.time()
    if outfolder:
        if not os.path.exists(outfolder):
            os.mkdir(outfolder)
        outfile = os.path.join(outfolder, filename)  # 输出路径
        writer = pd.ExcelWriter(outfile, engine='openpyxl')

    Berth_block = {}
    for vessel in vessel_berth:
        # 每个箱子所堆放箱区与箱量
        blocknum = session.query(Yard_slot.block, sa.func.count(Yard_slot.block)) \
            .filter(Yard_slot.block.in_(Block)) \
            .join(Containers, sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                                      Containers.vessel == vessel,
                                      Containers.schedule_frame > thre - 1)) \
            .group_by(Yard_slot.block).all()
        if len(blocknum) == 0:
            Berth_block[vessel] = [1, 0]
            continue

        if outfolder:
            blocknumdict = {}
            blocknumdict["block"] = [b[0] for b in blocknum]
            blocknumdict["num"] = [b[1] for b in blocknum]
            output = pd.DataFrame(blocknumdict)
            output.to_excel(writer, sheet_name=vessel, index=False, encoding="utf_8_sig")

        logging.debug(f"{vessel}_blocknum = {blocknum}")
        blocks = [b[0] for b in blocknum]
        nums = np.array([b[1] for b in blocknum])
        # 泊位与堆区的最大距离
        maxdis = session.query(sa.func.max(Yard_block.distance)).first()[0]
        # 船舶停靠的泊位
        berth = vessel_berth[vessel]
        # 箱区与泊位的距离
        dis = session.query(Yard_block.distance) \
            .filter(Yard_block.berth == berth, Yard_block.block.in_(blocks)).all()
        dis = np.array([d[0] for d in dis])
        # 场泊对应度
        s = sum(nums)
        berth_block = 1 - sum(dis * nums) / (maxdis * s)
        Berth_block[vessel] = [berth_block, s]
        # logging.debug(f"berth_block_{vessel}: blocks={blocks} ; nums={nums} ; berth_block = {berth_block}")
    # logging.info(f"schedule_frame= {self.schedule_frame}: berth_block_vessel = {Berth_block}")
    if outfolder:
        writer.save()
        writer.close()

    logging.debug(f"cal_berth_block: {time.time() - start}")
    return Berth_block


# ====== 重量等级差异造成的翻箱
def cal_diff(stackcon):
    """
    # 计算单列
    Parameters
    ----------
    stackcon: [(tier,weight)]

    Returns
    -------
    diff: int 表征翻箱情况
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
                Containers.schedule_frame > thre - 1,
                Containers.block == stack[0],
                Containers.bay == stack[1],
                Containers.stack == stack[2]) \
        .order_by(Containers.tier.desc()).all()
    return stackcon

def cal_weight(session, Block,  vessels, thre=1):
    """
    计算优化目标_重量等级差异造成的翻箱(分航线/船舶)
    Parameters
    ----------
    Block: 箱区考虑范围
    vessels: list of vessel
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    fea_weights: { vessel1 : [fea_weight1,sum1],  vessel2 : [fea_weight2,sum2],....}
    """
    start = time.time()
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
        sum = len(stacks)  # 总箱数
        stacks = set(stacks)
        sumdiff = 0
        if sum == 0:
            fea_weights[vessel] = [0, 0]
            continue
        # 计算每一列的重量等级差异
        for stack in stacks:
            stackcon = get_stack_cons(session, vessel, stack, thre=1)
            sumdiff += cal_diff(stackcon)
        # fea_weights[vessel] = [sumdiff / sum, sum]
        fea_weights[vessel] = [sumdiff, sum]
    # logging.info(f"Weight_diff = {fea_weights}")
    logging.debug(f"cal_weight: {time.time() - start}")
    return fea_weights


# ====== 航线(+卸货港) 集中度 贝内
def cal_stack_concentration(stackcon, con_maxsum, k1, k2):
    """
    列内的 航线(+卸货港) 集中度
    Parameters
    ----------
    stackcon: [type], type = (vessel ,des_port)
    con_maxsum: stack内 集装箱总数上限(最大栈高)
    Returns
    -------
    """
    con_sum = len(stackcon) # stack内 集装箱总数(当前栈高)
    if con_sum > 0:
        types = len(set(stackcon))  # stack内 集装箱种类数
        type_most = stackcon.count(max(stackcon, key=stackcon.count))  # stack内 个数最多的种类的数

        concentration = k1 * (types - 1) / con_sum + k2 * (1 - type_most / con_maxsum)
        # concentration = k1 * (ves_types-1) / con_sum + k2 * (1 - ves_most / con_sum)
        # concentration = 1 - ves_most / con_sum

        logging.debug(f"con_maxsum, con_sum, types, type_most, stack_concentration"
                      f" = {con_maxsum}, {con_sum}, {types}, {type_most}, {concentration}")
    else:
        concentration = 0
        logging.debug("con_sum = 0")
    return concentration

def cal_immediate_stack_concentration(stackcon):
    """
    列内的 航线(+卸货港) 集中度
    Parameters
    ----------
    stackcon: [type], type = (vessel ,des_port)
    Returns
    -------
    """
    if len(stackcon) < 2:
        concentration = 0
    else:
        concentration = stackcon.count(stackcon[0]) - 1 # 和最上层同航线（卸货港的箱数）
    return concentration

def get_stack_cons_type(session, stack, thre=1):
    """
    获取bay内集装箱数据, 用于计算航线集中度
    Parameters
    ----------
    stack: (block, bay, stack)

    Returns
    -------
    stackcon: [type] , type = (vessel ,des_port)
    """
    stackcon = session.query(Containers.vessel, Containers.vessel) \
        .filter(Containers.block == stack[0],
                Containers.bay == stack[1],
                Containers.schedule_frame > thre - 1,) \
        .order_by(Containers.schedule_frame.desc()).all()
    return stackcon

def cal_concentration(session, Block, thre=1, k1 = 0.5, k2 = 0.5):
    """
    计算优化目标_航线(+卸货港) 集中度
    Parameters
    ----------
    Block: 箱区考虑范围
    thre = 1 只考虑测试航线T时刻后堆存效果
    thre = 0 考虑测试航线全部集装箱堆存效果

    Returns
    -------
    fea_concentration: int 集中度
    sum: int 总箱量
    """
    start = time.time()

    stacks = session.query(Yard_slot.block, Yard_slot.bay) \
        .filter(Yard_slot.block.in_(Block)) \
        .join(Containers,
              sa.and_(Containers.ctn_no == Yard_slot.ctn_no,
                      Containers.schedule_frame > thre - 1)).all()
    sum = len(stacks)  # 总箱数
    stacks = set(stacks)

    if sum == 0:
        return [0, 0]
    sumconc = 0
    # 计算每一列的集中度
    for stack in stacks:
        con_maxsum = session.query(Yard_stack.maxtier).filter(Yard_stack.block == stack[0],
                                                              Yard_stack.bay == stack[1]).first()[0]
        stackcon = get_stack_cons_type(session, stack, thre=1)
        sumconc += cal_stack_concentration(stackcon, con_maxsum = con_maxsum, k1 = k1, k2 = k2)
    # fea_concentration = sumconc / sum
    fea_concentration = sumconc
    logging.debug(f"concentration = {fea_concentration}")
    logging.debug(f"cal_weight: {time.time() - start}")
    return fea_concentration, sum
