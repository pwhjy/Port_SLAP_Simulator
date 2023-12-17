#
import os
import sys

from algorithm.rl_based.model.SAC_discrete_ptr import SAC_Ptr_High_Level, SAC_Ptr_Low_Level
from algorithm.rl_based.utils.configfileparser import myconf
from algorithm.rl_based.model.H_SLAP_base_model import HierarchicalSLAPBase

config_parser = myconf()

class H_SAC_Agent(HierarchicalSLAPBase):
    def __init__(self, agent_low, agent_high, device, buffer_size) -> None:
        # 对于上层和下层的模型来说，参数是不同的
        super().__init__(agent_low, agent_high, device, buffer_size)


def init_agent(device, buffer_size, MLP_actor=False, only_high=False):
    # parameter config file
    config_path = "./config/model_param_sac.ini"
    config_parser.read(config_path, "utf-8")

    # High_Level Netowrk parameters
    high_input_dim = int(config_parser.get("High_Level", "input_dim"))
    high_embedding_dim = int(config_parser.get("High_Level", "embedding_dim"))
    high_hidden_size = int(config_parser.get("High_Level", "hidden_size"))
    high_tau = float(config_parser.get("High_Level", "tau"))
    high_state_dim = int(config_parser.get("High_Level", "state_dim"))
    high_dropout = float(config_parser.get("High_Level", "dropout"))
    high_actor_lr = float(config_parser.get("High_Level", "actor_lr"))
    high_critic_lr = float(config_parser.get("High_Level", "critic_lr"))
    high_alpha_lr = float(config_parser.get("High_Level", "alpha_lr"))
    high_target_entropy = float(config_parser.get("High_Level", "target_entropy"))
    high_gamma = float(config_parser.get("High_Level", "gamma"))
    high_alpha = float(config_parser.get("High_Level", "alpha"))
    high_hidden_dim = int(config_parser.get("High_Level", "hidden_dim"))
    high_rnn_layer = int(config_parser.get("High_Level", "rnn_layer"))

    # Low_Level Network parameters
    low_input_dim = int(config_parser.get("Low_Level", "input_dim"))
    low_embedding_dim = int(config_parser.get("Low_Level", "embedding_dim"))
    low_hidden_size = int(config_parser.get("Low_Level", "hidden_size"))
    low_tau = float(config_parser.get("Low_Level", "tau"))
    low_state_dim = int(config_parser.get("Low_Level", "state_dim"))
    low_dropout = float(config_parser.get("Low_Level", "dropout"))
    low_alpha_lr = float(config_parser.get("Low_Level", "alpha_lr"))
    low_target_entropy = float(config_parser.get("Low_Level", "target_entropy"))
    low_actor_lr = float(config_parser.get("Low_Level", "actor_lr"))
    low_critic_lr = float(config_parser.get("Low_Level", "critic_lr"))
    low_gamma = float(config_parser.get("Low_Level", "gamma"))
    low_alpha = float(config_parser.get("Low_Level", "alpha"))
    low_hidden_dim = int(config_parser.get("Low_Level", "hidden_dim"))
    low_rnn_layer = int(config_parser.get("Low_Level", "rnn_layer"))

    agent_low = SAC_Ptr_Low_Level(low_input_dim, low_embedding_dim, low_hidden_size,
                                  low_tau, low_state_dim, low_dropout,
                                  low_actor_lr, low_critic_lr, low_alpha_lr, low_target_entropy,
                                  low_gamma, low_alpha, low_hidden_dim, low_rnn_layer, device, "High", MLP_actor, only_high)

    agent_high = SAC_Ptr_High_Level(high_input_dim, high_embedding_dim, high_hidden_size,
                                    high_tau, high_state_dim, high_dropout,
                                    high_actor_lr, high_critic_lr, high_alpha_lr, high_target_entropy,
                                    high_gamma, high_alpha, high_hidden_dim, high_rnn_layer, device, "Low", MLP_actor)

    agent = H_SAC_Agent(agent_low, agent_high, device, buffer_size)
    return agent

if __name__ == "__main__":
    pass
