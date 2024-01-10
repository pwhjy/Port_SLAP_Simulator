"""
获取mask
"""
from simulation.DataBase.table_define import *
import numpy as np
import logging
import networkx as nx

def get_blockmask(session, block, size):
    """
    获取单个箱区内特定size的箱位mask
    Parameters
    ----------
    block: str
    size: int 1_2

    Returns
    -------
    blockmask: list 0_1
    """
    stackfilter = sa.and_(Yard_bay.block == block, Yard_bay.block == Yard_stack.block,
                          Yard_bay.bay == Yard_stack.bay)
    slots_mask_size = session.query(Yard_bay.exist
                                         * (Yard_bay.limit - Yard_bay.sum_ctn)
                                         * (Yard_stack.maxtier - Yard_stack.tier)
                                         * ((1 + int(size) + Yard_bay.bay) % 2)) \
        .filter(stackfilter) \
        .order_by(Yard_stack.bay, Yard_stack.stack).all()
    # blockmask = list(np.sign([f[0] for f in slots_mask_size]))
    # blockmask = [f[0]>0  for f in slots_mask_size]
    blockmask = [1 if f[0]>0 else 0  for f in slots_mask_size]
    return blockmask


def get_baymask(session, blockbay, size):
    """
    获取单个bay内特定size的箱位mask
    Parameters
    ----------
    blockbay: (block, bay)
    size: int 1_2

    Returns
    -------
    baymask: list 0_1
    """
    block, bay = blockbay[0], blockbay[1]
    stackfilter = sa.and_(Yard_bay.block == block, Yard_bay.block == Yard_stack.block,
                          Yard_bay.bay == bay, Yard_bay.bay == Yard_stack.bay)
    slots_mask_size = session.query(Yard_bay.exist
                                         * (Yard_bay.limit - Yard_bay.sum_ctn)
                                         * (Yard_stack.maxtier - Yard_stack.tier)
                                         * ((1 + int(size) + Yard_bay.bay) % 2)) \
        .filter(stackfilter) \
        .order_by(Yard_stack.stack).all()
    # baymask = list(np.sign([f[0] for f in slots_mask_size]))
    # baymask = [f[0]>0 for f in slots_mask_size]
    baymask = [1 if f[0]>0 else 0 for f in slots_mask_size]
    return baymask


def get_slotmask(session, Stack, size):
    """
    获取单列针对特定size的mask
    Parameters
    ----------
    Stack: (block, bay, stack)
    size: int 1_2

    Returns
    -------
    baymask: list 0_1
    """
    block, bay, stack = Stack[0], Stack[1], Stack[2]
    stackfilter = sa.and_(Yard_bay.block == block, Yard_bay.block == Yard_stack.block,
                          Yard_bay.bay == bay, Yard_bay.bay == Yard_stack.bay,
                          Yard_stack.stack == stack)
    slots_mask_size = session.query(Yard_bay.exist
                                         * (Yard_bay.limit - Yard_bay.sum_ctn)
                                         * (Yard_stack.maxtier - Yard_stack.tier)
                                         * ((1 + size + Yard_bay.bay) % 2)) \
        .filter(stackfilter).all()
    # baymask = list(np.sign([f[0] for f in slots_mask_size]))
    # baymask = [f[0]>0 for f in slots_mask_size]
    baymask = [1 if f[0]>0 else 0 for f in slots_mask_size]
    return baymask


def init_candidate_slots(session, allblocks):
    """
    获取完整的初始信息用于 候选箱位与mask更新
    Returns
    -------
    candidate ccccccccccfhff 6[-p0=['p][=][[-[=[]=[-[=[=[=[_slots
    """
    candidate_slots = {}
    for block in allblocks:
        candidate_slots[block] = {}
        bay_groups = session.query(sa.func.count(Yard_stack.bay)) \
            .filter(Yard_stack.block == block) \
            .group_by(Yard_stack.block, Yard_stack.bay) \
            .order_by(Yard_stack.block, Yard_stack.bay).all()
        block_groups = session.query(sa.func.count(Yard_stack.block)) \
            .filter(Yard_stack.block == block) \
            .group_by(Yard_stack.block) \
            .order_by(Yard_stack.block).all()
        candidate_slots[block]["bay_groups"] = [g[0] for g in bay_groups]
        candidate_slots[block]["block_groups"] = [g[0] for g in block_groups]

        slots = session.query(Yard_stack.block, Yard_stack.bay, Yard_stack.stack, Yard_stack.tier) \
            .filter(Yard_stack.block == block) \
            .order_by(Yard_stack.block, Yard_stack.bay, Yard_stack.stack).all()
        candidate_slots[block]["candidate_stacks"] = slots

        slots_mask = {}
        slots_mask["20teu"] = get_blockmask(session, block, 1)
        slots_mask["40teu"] = get_blockmask(session, block, 2)
        candidate_slots[block]["slots_mask"] = slots_mask
    logging.info(f"Cache candidate_slots of {len(candidate_slots)} blocks")
    return candidate_slots
