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

    def _step(
        self,
        action,
        random_action=False,
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

    def step(
        self,
        action,
    ):
        pass

    def reset(
        self,
    ):
        self.DataCore.reset()
        self.

    def _get_container_ten(
        self,
    ):
        container_list = []
        cur_container, next_container = self.DataCore.cur_container()
        while type(cur_container) != int and type(next_container) != int \
                                        and len(container_list) <= 10:
            container_list.append(cur_container)
            logging.info("container list add new container {}".format(cur_container))
            cur_container, next_container = self.DataCore.cur_container()
        if len(container_list) < 10:
            container_list.append(cur_container)
        return container_list
