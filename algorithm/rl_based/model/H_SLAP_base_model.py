# 分层算法基类
import torch
from torch import nn
from algorithm.rl_based.utils.buffers import ReplayBufferForHSLAP
import logging
import time
from algorithm.rl_based.utils.configfileparser import myconf

config_parser = myconf()


class HierarchicalSLAPBase(nn.Module):
    def __init__(self, agent_low, agent_high, device, buffer_size) -> None:
        super(HierarchicalSLAPBase, self).__init__()
        # 对于上层和下层的模型来说，参数是不同的
        self.HSLAP = [agent_low, agent_high]
        self.replay_buffer = [ReplayBufferForHSLAP(buffer_size), ReplayBufferForHSLAP(buffer_size)]
        self.device = device
        self.done = False
        self.low_level_state = None
        self.low_level_state_mask = None
        self.low_level_action = None
        self.low_level_reward = None
        self.k_level = 2
        self.block_slots_features = {}
        self.slot_result = None

    def after_done(self):
        pass

    def run(self, env, i_level, state, action_rewards_log_file, mask=None, rsample=True, only_high=False):
        # logging.info("-------------------------------run H-SLAP-----------------------------")
        # high level policy: select block
        if i_level == 1:
            state_blocks = state["candidate_blocks"]
            # state_slots = state["candidate_slots"]
            container = state["cur_container"]
            # logging.info("state_blocks is {}".format(state_blocks))
            mask, state_blocks_list = env.invalid_block_mask(container, state_blocks)
            action = self.HSLAP[i_level].select_action(state_blocks, mask, rsample)
            logging.info("action_high is {}".format(action))
            state_slots_action = env.get_available_slot_list_in_block(state["cur_container"], action[
                "candidate_block_action"])  # 只需要action中的slots
            # state_slots_action = state_slots  # 所有的slots都传到下层
            state_for_low = {"state_slots": state_slots_action,
                             "container": state["cur_container"],
                             "block": action["candidate_block_action"]}  # state_slots是所有箱区的所有位置
            with open(action_rewards_log_file, 'a') as f:
                f.write(f"[High Level Action]:{action}:\n")
            next_state, reward_higher, reward_lower, done = self.run(env, i_level - 1, state_for_low,
                                                                     action_rewards_log_file,
                                                                     action["candidate_block_action"], rsample=rsample,
                                                                     only_high=False)
            logging.info("[hign level Action]action is {}".format(action))
            # next_mask, next_state_list = list(next_state["candidate_blocks"].values())
            if done != 1:
                next_mask, next_state_list = env.invalid_block_mask(next_state['cur_container'],
                                                                    next_state['candidate_blocks'])
            else:
                next_mask, next_state_list = mask, state_blocks_list

            if rsample:
                self.replay_buffer[i_level].add_mask((torch.FloatTensor(state_blocks_list), torch.BoolTensor(mask),
                                                      action['action'], reward_higher,
                                                      torch.FloatTensor(next_state_list), torch.BoolTensor(next_mask),
                                                      done))
        # low level policy: select slot
        else:
            container = state["container"]
            state_slots = state["state_slots"]
            block = state["block"]

            mask_return, state_slots_list = env.invalid_slot_mask(container, state_slots, mask)
            action = self.HSLAP[i_level].select_action(state_slots, mask_return, rsample and not only_high)

            if block in self.block_slots_features.keys() and rsample and not only_high:
                old_state = self.block_slots_features[block]
                self.replay_buffer[i_level].add_mask((torch.FloatTensor(old_state['state']),
                                                      torch.BoolTensor(old_state['mask']),
                                                      old_state['action'],
                                                      old_state['reward'], torch.FloatTensor(state_slots_list),
                                                      torch.BoolTensor(mask_return), self.done))
            with open(action_rewards_log_file, 'a') as f:
                f.write("[Low Level Action]:{}\n".format(action))
            action["cur_container"] = container
            next_state, reward_higher, reward_lower, done, rewards = env.step(action)
            # pos = action['candidate_slot_action']
            self.block_slots_features[block] = {'state': state_slots_list, 'mask': mask_return, 'reward': reward_lower,
                                                'action': action['action']}
            # self.slot_result = self.slot_result.append(
            #     {'Block': pos[0], 'Bay': pos[1], 'Stack': pos[2], 'Layer': pos[3], 'Weight': state_slots[pos][-1]}, ignore_index=True, )
            with open(action_rewards_log_file, 'a') as f:
                f.write(f"Rewards:{rewards}\n")
                f.write(f"Higher:{reward_higher},Lower:{reward_lower}\n")
            self.done = done
        logging.info("i_level is {}, return success".format(i_level))

        return next_state, reward_higher, reward_lower, done

    def add_low_buffer_of_last_container_in_block(self, env, action_rewards_log_file):
        # 认为每个箱区的最后一个入场箱都是done=1
        reward_sum = 0
        for block, state in self.block_slots_features.items():
            # 加上当前箱区的箱区reward
            block_done_reward, rewards = env.cal_block_reward(block)
            block_done_reward += state['reward']
            reward_sum += block_done_reward
            self.replay_buffer[0].add_mask((torch.FloatTensor(state['state']),
                                            torch.BoolTensor(state['mask']),
                                            state['action'],
                                            block_done_reward, torch.FloatTensor(state['state']),
                                            torch.BoolTensor(state['mask']), 1))
            with open(action_rewards_log_file, 'a') as f:
                f.write(f"Block{block} final -- {block_done_reward}:\nRewards:{rewards}\n")
        return reward_sum

    def update(self, n_iter, batch_size, buffer_size):
        for i in range(self.k_level):
            logging.info("replay buffer {} size is {}".format(i, self.replay_buffer[i].size()))
        for i in range(self.k_level):
            if self.replay_buffer[i].size() == 0:
                continue
            self.HSLAP[i].update(self.replay_buffer[i], n_iter,
                                 int(batch_size * (1 + self.replay_buffer[i].size() / buffer_size)))

    def save(self, directory, name, reload_data=None):
        for i in range(self.k_level):
            self.HSLAP[i].save(directory, name + '_level_{}'.format(i), reload_data)

    def load(self, directory, name, reload_data=None):
        for i in range(self.k_level):
            self.HSLAP[i].load(directory, name + '_level_{}'.format(i), reload_data)

    def load_for_eval(self, actor_file0, actor_file1):
        if actor_file0 is not None:
            self.HSLAP[0].load_for_eval(actor_file0)
        if actor_file1 is not None:
            self.HSLAP[1].load_for_eval(actor_file1)


def init_agent(device, buffer_size):
    pass
