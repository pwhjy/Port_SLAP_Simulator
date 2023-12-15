import numpy as np
import logging
import configparser
from simulation.DataBase.core import *

class PortSim(object):
    def __init__(
        self,
        config_path: str,
        reInit: bool=False
    ) -> None:
        super(PortSim, self).__init__()
        self.config_path = config_path
        self.DataCore = DB(self.config_path)
        # if reInit:
            # self.DataCore.Initall()
        # else:
            # self.DataCore.reset(cpsql=True)
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
        cur_container = action["cur_container"]
        pos = action['candidate_slot_action']
        outcons = self.DataCore.updata_and_slot(cur_container, pos)
        reward_higher = 0.0
        reward_lower = 0.0
        rewards = []
        done = 0
        if random_action:
            logging.info("random action is {} and is_slot is {}".format(pos, outcons))
        elif self.next_container != 0:
            reward_lower, reward_higher, rewards = self._cal_Rewards(vessel=self.target_vessel,
                                                curcon=cur_container, slot=pos)
        if self.next_container == 0:
            logging.info("[Env.step] next Container is None, end this epoch")
            reward_lower, reward_higher, rewards = self._cal_Rewards(vessel=self.target_vessel, curcon=cur_container,
                                                                   slot=pos, done=True)
            done = 1
            next_state = {
                "cur_container": None,
                "candidate_slots": [],
                "candidate_blocks": []  # Using list comprehension
            }
            return next_state, reward_higher, reward_lower, done, rewards

        next_state = {
            "cur_container": self.next_container,
            "candidate_slots": [],
        }
        if self.next_container.vessel == self.target_vessel:
            next_state["candidate_block"] = self._get_available_block_list(next_container=True)
        self._get_container()
        return next_state, reward_higher, reward_lower, done, rewards

    def step(
        self,
        action,
    ):
        next_state, reward_higher, reward_lower, done, rewards = self._step(action)
        if done == 1:
            return next_state, reward_higher, reward_lower, done, rewards
        cur_vessel = self.cur_container.vessel
        while cur_vessel != self.target_vessel and done != 1:
            random_action = self._step_container_random(cur_container)
            action_step = {
                "cur_container": cur_container,
                "candidate_slot_action": random_action
            }
            next_state, _, _, done, _ = self._step(action_step, random_step=True)
            if done != 1:
                cur_vessel = self.cur_container.vessel
        if done == 1:
            reward_lower, reward_higher, rewards = self._cal_Rewards(vessel=self.target_vessel,
                                                                   curcon=action["cur_container"],
                                                                   slot=action["candidate_slot_action"], done=True)
        return next_state, reward_higher, reward_lower, done, rewards

    def reset(
        self,
    ):
        self.DataCore.reset()
        self._get_container()
        done = 0
        cur_vessel = self.cur_container.vessel
        while cur_vessel != self.target_vessel and done != 1:
            random_action = self._step_container_random(self.cur_container)
            action = {
                "cur_container": self.cur_container,
                "candidate_slot_action": random_action
            }
            next_state, _, _, done, _ = self._step(action, random_action=True)
            if done != 1:
                cur_vessel = self.cur_container.vessel
        state = {
            "cur_container"   : self.cur_container,
            "candidate_slots" : self._get_all_slot_list(),
            "candidate_blocks": self._get_available_block_list()
        }
        return state

    def sample_action(
        self,
        container,
    ):
        random_action = self._step_container_random(container)
        action = {
            "cur_container": container,
            "candidate_slot_action": random_action
        }
        next_state, _, _, done, _ = self._step(action)
        state = {
            "cur_container"   : self.cur_container,
            "candidate_slots" : self._get_all_slot_list(),
            "candidate_blocks": self._get_available_block_list()
        }
        return state

    def _cal_Rewards(
        self,
        vessel,
        curcon=None,
        slot=None,
        done=False,
    ):
        if done:
            # done的时候将结果加上final的
            reward_lower, reward_higher, rewards = self._cal_final_Reward(vessel)
            reward_lower_imme, reward_higher_imme, rewards_imme = self._cal_immediate_reward(curcon, slot)
            rewards.update(rewards_imme)
            return reward_lower + reward_lower_imme, reward_higher + reward_higher_imme, rewards
        else:
            return self._cal_immediate_reward(curcon, slot)

    def _cal_final_Reward(
        self,
        vessel,
    ):
        # 落位的是最后一个箱子，计算全局reward
        logging.info("last container cal final rewards")
        yard_features = self.DataCore.cal_yard_features_cache(vessel=vessel)

        fea_blocks = sum(v[0] for v in yard_features.values())
        Berth_block = sum(v[1] for v in yard_features.values())
        fea_weights = sum(v[2] for v in yard_features.values())
        fea_concentration = sum(v[3] for v in yard_features.values())
        fea_Density = sum(v[4] for v in yard_features.values())

        reward_lower = -1 * self.final_weights_diff * fea_weights + -1 * (
                    self.final_concentration) * fea_concentration
        reward_higher = -1 * self.final_block_Equilibrium * fea_blocks + \
                        self.final_berth_block * Berth_block + \
                        -1 * self.final_block_density * fea_Density + \
                        self.final_lower_to_higher * reward_lower

        return 0, reward_higher, {"fi_blocks": fea_blocks, "fi_Berth_block": Berth_block, "fi_weights": fea_weights,
                                  "fi_concentration": fea_concentration, "fi_Density": fea_Density}

    def _cal_immediate_reward(
        self,
        curcon,
        slot,
    ):
        """
        return sum of immediate rewards [block_Equilibrium, berth_block, weight_diff, concentration]
        """
        yard_rewards = self.DataCore.cal_immediate_yard_features_cache(curcon, slot)
        fea_block_Equilibrium = yard_rewards[0]
        fea_berth_block = yard_rewards[1]
        fea_weight_diff = yard_rewards[2]
        fea_concentration = yard_rewards[3]
        fea_block_density = yard_rewards[4]

        reward_lower = fea_weight_diff * self.immediate_weight_diff + fea_concentration * self.immediate_concentration
        reward_higher = fea_block_Equilibrium * self.immediate_block_Equilibrium + \
                        fea_berth_block * self.immediate_berth_block + \
                        reward_lower * self.immediate_lower_to_higher + \
                        fea_block_density * self.immediate_block_density

        return reward_lower, reward_higher, {"im_block_Equilibrium": fea_block_Equilibrium,
                                             "im_berth_block": fea_berth_block, "im_weight_diff": fea_weight_diff,
                                             "im_concentration": fea_concentration, "im_density": fea_block_density}

    def _get_container(
        self,
    ) -> None:
        self.cur_container, self.next_container = self.DataCore.current_container()
        if type(self.cur_container) == int or type(self.next_container) == int:
            logging.info("only left one container")
        else:
            logging.info("curContainer is {} and nextContainer is {}".format(self.cur_container.ctn_no,
                                                                             self.next_container.ctn_no))

    def _get_all_slot_list(
        self,
        next_container : bool = False,
    ):
        container = self.next_container if next else self.cur_container
        if type(self.cur_container) == int:
            logging.debug("Container is None, get available slot list failed")
            return {}
        candidate_blocks = self.DataCore.block[container.vessel]
        candidate_slots, _, _, _ = self.DataCore.get_candidate_slots_all_mask(container, block=candidate_blocks)
        slots_fea = self.DataCore.cal_slot_features_cache_allblock(container, block=candidate_blocks)
        slots_list = dict(zip(candidate_slots, list(slots_fea)))
        return slots_list

    def _get_available_block_list(
        self,
        next_container : bool = False,
    ):
        """
        e.g.:{'51': [0, 3249, 85, 0.4340909090909091, 5.0], '52': [5, 3249, 0, 0.51875, 0.0]}
        """
        container = self.next_container if next else self.cur_container
        if type(self.cur_container) == int:
            logging.debug("Container is None, get available slot list failed")
            return {}
        candidate_blocks = self.DataCore.block[container.vessel]
        block_list = self.DataCore.cal_block_features_cache(container, candidate_blocks)
        return block_list

    def _step_container_random(
        self,
        container,
        block=None,
        candidate_num=100
    ):
        slot = self.DataCore.get_one_candidate_slot(container, block=block, candidate_num=candidate_num)
        return slot
