import numpy as np
import logging
import configparser
from simulation.DataBase.core import *

class PortSimBuffer(object):
    def __init__(
        self,
        config_path: str,
        reInit: bool=False
    ) -> None:
        super(PortSimBuffer, self).__init__()
        self.config_path = config_path
        self.DataCore = DB(self.config_path)
        if reInit:
            self.DataCore.Initall()
        else:
            self.DataCore.reset(cpsql=True)
        cf = configparser.ConfigParser()
        cf.read(self.config_path, "utf-8")

        self.immediate_block_Equilibrium = float(cf.get("Reward", "immediate_block_Equilibrium"))
        self.immediate_berth_block = float(cf.get("Reward", "immediate_berth_block"))
        self.immediate_weight_diff = float(cf.get("Reward", "immediate_weight_diff"))
        self.immediate_concentration = float(cf.get("Reward", "immediate_concentration"))
        self.immediate_lower_to_higher = float(cf.get("Reward", "immediate_lower_to_higher"))
        self.final_block_Equilibrium = float(cf.get("Reward", "final_block_Equilibrium"))
        self.final_berth_block = float(cf.get("Reward", "final_berth_block"))
        self.final_concentration = float(cf.get("Reward", "final_concentration"))
        self.final_weights_diff = float(cf.get("Reward", "final_weights_diff"))
        self.final_block_density = float(cf.get("Reward", "final_block_density"))
        self.final_lower_to_higher = float(cf.get("Reward", "final_lower_to_higher"))
        self.immediate_block_density = float(cf.get("Reward", "immediate_block_density"))

        self.final_block_weights_diff = float(cf.get("Reward", "final_block_weights_diff"))
        self.final_block_concentration = float(cf.get("Reward", "final_block_concentration"))
        self.target_vessel = cf.get("VESSEL", "target_vessel")
        self.block_list = cf.get("BLOCK", self.target_vessel)      

    def step(
        self,
        action,
    ):
        next_state, reward_higher, reward_lower, done, rewards = self._step(action)
        return next_state, reward_higher, reward_lower, done, rewards

    def reset(
        self,
    ):
        self.DataCore.reset()
        next_container_list = self._get_container_ten()
        state = {
            "container_list": next_container_list,
            "cur_stack": self._get_cur_stack()
        }
        return state
    
    def invalid_block_mask(
        self,
        container,
        blocks_list,
    ):
        blocks_list = list(blocks_list.values())
        mask = []
        if container.size == 1:
            mask = [0 if block[6] < 1 else 1 for block in blocks_list]
        else:
            mask = [0 if block[7] < 1 else 1 for block in blocks_list]
        mask = np.array(mask)
        mask = 1 - mask
        return mask, blocks_list
    
    def get_available_slot_list_in_block(
        self,
        container,
        block,
    ):
        slots_list = {}
        if container == 0:
            logging.debug("Container is None, get available slot list failed")
            return slots_list
        candidate_slots = None
        if block is not None:
            candidate_slots, _, _, _ = self.DataCore.get_candidate_slots_all_mask(container, block=block)  # 带mask的全部箱位
            slots_fea = self.DataCore.cal_slot_features_cache_allblock(container, block=block)  ###
            slots_list = dict(zip(candidate_slots, list(slots_fea)))
        return slots_list
    
    def invalid_slot_mask(
        self,
        container,
        slots_list,
        block_action,
    ):
        """  
        将所有非法动作作MASK处理  
        非法动作包括：上层模型输出的约束箱区外的所有位置；不符合尺寸要求的位置等。  
        输出按照输入的slots_list的顺序
        """
        candidate_slot_in_block_action, _, _, mask = self.DataCore.get_candidate_slots_all_mask(
            container, block_action)

        merged_dict = {k: v for k, v in zip(candidate_slot_in_block_action, mask)}

        mask_return = [merged_dict.get(candidate_slot, 0) for candidate_slot in slots_list]
        mask_return = np.array(mask_return)
        mask_return = 1 - mask_return
        slots_list_value = list(slots_list.values())
        return mask_return, slots_list_value

    def _get_cur_stack(
        self,
    ):
        """
        返回stack的特征
        """
        return []

    def _get_container_ten(
        self,
    ):
        """
        提供接下来的十个集装箱，如果剩下不足10个，就有几个返回几个，一个都没有的话，返回None
        """
        container_list = self.DataCore.next_ten_container()
        if len(container_list) < 10:
            logging.info("container_list left smaller than 10")
        elif len(container_list) == 10:
            logging.info("container_list length is 10")
        else:
            logging.info("WRONG!!!!!")
        return container_list

    def _cal_Rewards(
        self,
        curcon=None,
        slot=None,
        done=False,
    ):
        if done:
            reward_lower, reward_higher, rewards = self._cal_final_Reward()
            reward_lower_imme, reward_higher_imme, rewards_imme = self._cal_immediate_reward()
            rewards.update(rewards_imme)
            return reward_lower + reward_lower_imme, reward_higher + reward_higher_imme, rewards
        else:
            return self._cal_immediate_reward()

    def _cal_immediate_reward(
        self,
        curcon,
        slot,
    ):
        yard_rewards = self.DataCore.cal_immediate_yard_features_cache(curcon, slot)
        fea_block_Equilibrium = yard_rewards[0]
        fea_weight_diff = yard_rewards[2]
        reward_lower = fea_weight_diff * self.immediate_weight_diff
        reward_higher = fea_block_Equilibrium * self.immediate_block_Equilibrium
        return reward_lower, reward_higher, {"im_block_Equilibrium": fea_block_Equilibrium,
                                              "im_weight_diff": fea_weight_diff}

    def _cal_final_Reward(
        self,
    )
        # 落位的是最后一个箱子，计算全局reward
        yard_features = self.DataCore.cal_yard_features_cache(vessel=self.target_vessel)

    def _step(
        self,
        action,
    ):
        """
        原先的action是一个container和一个candidate_slot_action:
            e.g. {container:***, candidate_slot_action:***}
        现在是n个container和n和candidate_slot_action
            e.g. {container1:candidate_slot_action1, ..., containern:candidate_slot_actionn}
        """
        reward_higher = 0.0
        reward_lower = 0.0
        rewards = []
        done = 0
        # 遍历dict并落位
        for key, value in action.items():
            outcons = self.DataCore.updata_and_slot(key, value)
            reward_lower, reward_higher, rewards = self._cal_Rewards(key, value)
            reward_higher += reward_higher
            reward_lower += reward_lower
        next_container_list = self._get_container_ten()
        if next_container_list is None:
            done = 1
        next_state = {
            "container_list": next_container_list,
            "cur_stack": self._get_cur_stack()
        }
        return next_state, reward_higher, reward_lower, done, rewards
    
