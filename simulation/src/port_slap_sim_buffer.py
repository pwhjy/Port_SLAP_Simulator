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
        vessel,
    ):
        pass

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

        # 遍历dict并落位
        for key, value in action.items():
            outcons = self.DataCore.updata_and_slot(key, value)
        reward_higher = 0.0
        reward_lower = 0.0
        rewards = []
        done = 0
        container = list(action.keys())[-1]
        container = list(action.values())[-1]
        reward_lower, reward_higher, rewards = self._cal_Rewards(vessel=self.target_vessel)
        next_container_list = self._get_container_ten()
        if next_container_list is None:
            done = 1
        next_state = {
            "container_list": next_container_list,
            "cur_stack": self._get_cur_stack()
        }
        return next_state, reward_higher, reward_lower, done, rewards