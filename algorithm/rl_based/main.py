import logging
import time
import numpy as np
import argparse
import torch
from tqdm import trange
import pickle
from simulation.utils.logger import config_logging
from simulation.src import *
from algorithm.rl_based.model import H_SLAP_SAC

def h_save_reload(reload_data, i_episode, return_list_higher, return_list_lower, log_file, action_rewards_log_file,
                  filename, directory):
    reload_data["i_episode"] = i_episode
    reload_data["return_list_higher"] = return_list_higher
    reload_data["return_list_lower"] = return_list_lower
    reload_data["log_file"] = log_file
    reload_data["action_rewards_log_file"] = action_rewards_log_file
    reload_data["save_filename"] = filename
    reload_data["directory"] = directory


def s_save_reload(reload_data, i_episode, return_list, log_file, action_rewards_log_file,
                  filename, directory):
    reload_data["i_episode"] = i_episode
    reload_data["return_list"] = return_list
    reload_data["log_file"] = log_file
    reload_data["action_rewards_log_file"] = action_rewards_log_file
    reload_data["save_filename"] = filename
    reload_data["directory"] = directory

if __name__ == "__main__":
    logname = "./train_logs/train_" + time.strftime('%Y_%m_%d_%H_%M_%S', time.localtime(time.time())) + ".log"
    config_logging(logname, logging.INFO, logging.INFO)
    parser = argparse.ArgumentParser()  
    
    parser.add_argument('--eval', type=bool, default=False, help='是否只进行测试')  
    parser.add_argument('--actor_file', type=str, default='./model_file/actor.pth', help='测试用的上层actor模型参数')
    parser.add_argument('--actor_file2', type=str, default='./model_file/actor.pth', help='测试用的下层actor模型参数')
    parser.add_argument('--only_high', type=bool, default=False, help='whether only use upper level to train')
    parser.add_argument('--load_low', type=bool, default=False, help='')
    parser.add_argument('--agent_type', type=str, default='H-SAC', help='available agent list: H-SAC, H-DQN')
    parser.add_argument('--reinit', type=bool, default=False, help='env setting attribute')
    parser.add_argument('--config_path', type=str, default='../../simulation/config/test.ini', help='config file')
    parser.add_argument('--save_episode', type=int, default=10, help="save episode")
    parser.add_argument('--max_episodes', type=int, default=3000, help="max episode")
    parser.add_argument('--random_seed', type=int, default=0, help="random seed")
    parser.add_argument('--update_times', type=int, default=100, help="update times")
    parser.add_argument('--batch_size', type=int, default=10, help="batch_size")
    parser.add_argument('--eval_episode', type=int, default=10, help="training episodes per eval episide")
    parser.add_argument('--buffer_size', type=int, default=5000, help="buffer size")
    parser.add_argument('--off_policy', type=bool, default=True, help="whether use off policy training method")
    parser.add_argument('--directory', type=str, default='model_file', help="save trained models")
    parser.add_argument('--load_reload_file', type=str, default=None, help="load reload file default is None")
    args = parser.parse_args()
    
    # env = make("port_sim", args.config_path, args.reinit)
    env = PortSim(args.config_path, args.reinit)
    if args.eval:
        args.max_episodes = 10
    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    h_type = True if args.agent_type in ["H-SAC", "H-DDPG", "H-DQN", "H-SAC-MLP"] else False # 是否为分层模型
    if args.random_seed:
        torch.manual_seed(args.random_seed)
        np.random.seed(random_seed)
    log_file = "./train_logs/"+args.agent_type+"_h_action_"+time.strftime('%Y_%m_%d_%H_%M_%S',
                                                        time.localtime(time.time())) + ".txt"
    action_rewards_log_file = "./train_logs/" + args.agent_type + "_action_rewards_" + time.strftime('%Y_%m_%d_%H_%M_%S',
                                                                time.localtime( time.time())) + ".txt"
    save_reload_file = "./train_logs/" + args.agent_type + "_reload_" + time.strftime('%Y_%m_%d_%H_%M_%S',
                                                                           time.localtime(time.time())) + ".pkl"
    agent = None
    if args.agent_type == "H-SAC":
        agent = H_SLAP_SAC.init_agent(device, args.buffer_size)
    
    # initial reward recorder
    return_list_higher = []
    return_list_lower = []
    return_list = []
    reload_data = {}
    start_episode = 0
    best_return = -float("inf")
    logging.info("start " + args.agent_type + " Training...")

    # 加载reload 信息(若有)
    if args.load_reload_file is not None:
        with open(args.load_reload_file, 'rb') as f:
            reload_data = pickle.load(f)
        start_episode = reload_data["i_episode"] + 1
        if h_type:
            return_list_higher = reload_data["return_list_higher"]
            return_list_lower = reload_data["return_list_lower"]
        else:
            return_list = reload_data["return_list"]
        log_file = reload_data["log_file"]
        action_rewards_log_file = reload_data["action_rewards_log_file"]
        directory = reload_data["directory"]
        agent.load(reload_data["directory"], reload_data["save_filename"], reload_data)
    
    if args.eval and args.agent_type != "S-Greedy":
        if args.actor_file is None:
            logging.error("No actor file")
        if h_type:
            agent.load_for_eval(args.actor_file, args.actor_file2)
        else:
            agent.load_for_eval(args.actor_file)

    if args.load_low:
        if h_type:
            agent.load_for_eval(args.actor_file, None)

    for i in trange(args.max_episodes - start_episode, desc="Training"):
        i_episode = i + start_episode
        state = env.reset()
        done = False
        rsample = (i + 1) % args.eval_episode != 0
        episode_time = time.time()
        if args.eval:
            rsample = False
        episode_return_higher = 0
        episode_return_lower = 0
        episode_return = 0
        if h_type:
            agent.block_slots_features.clear()  # 分层中下层使用的每个箱区的上一次箱位特征
        if not args.off_policy:
            agent.replay_buffer[0].reset()
            agent.replay_buffer[1].reset()
        with open(action_rewards_log_file, 'a') as f:
            f.write(f"Episode {i_episode}:\n")
        while not done:
            start_time = time.time()
            if h_type:
                state, reward_higher, reward_lower, done = agent.run(env, 1, state, action_rewards_log_file,
                                                                     rsample=rsample, only_high=args.only_high)
                episode_return_higher += reward_higher
                episode_return_lower += reward_lower
            else:
                state, reward, done = agent.run(env, state, action_rewards_log_file, rsample=rsample)
                episode_return += reward
            end_time = time.time()
            logging.info("start time is {}; end time is {}; and difference is {}".format(start_time, end_time, (
                    end_time - start_time) * 1000))
        if h_type:
            episode_return_lower += agent.add_low_buffer_of_last_container_in_block(env, action_rewards_log_file)
            return_list_higher.append(episode_return_higher)
            return_list_lower.append(episode_return_lower)
        else:
            return_list.append(episode_return)
        logging.info("episode " + str(i_episode) + " done")
        agent.after_done()
        if not args.eval:
            agent.update(args.update_times, args.batch_size, args.buffer_size)

        episode_time = time.time() - episode_time

        with open(log_file, 'a') as f:
            if h_type:
                f.write("current episode" + str(i_episode) + "'s reward_higher is " + str(
                    episode_return_higher) + " , reward_lower is " + str(
                    episode_return_lower) + ", cost time is " + str(episode_time) + "\n")
            else:
                f.write("current episode" + str(i_episode) + "'s reward_higher is " + str(
                    episode_return)  + ", cost time is " + str(
                    episode_time) + "\n")

        is_save = i_episode % args.save_episode == 0
        if h_type:
            if best_return < episode_return_higher + episode_return_lower:
                best_return = episode_return_higher + episode_return_lower
                is_save = True
        else:
            if best_return < episode_return:
                best_return = episode_return
                is_save = True

        if is_save and not args.eval:
            filename = "{}_{}_{}".format(episode_return_higher, episode_return_lower,
                                         time.strftime('%Y_%m_%d_%H_%M_%S', time.localtime(time.time())))
            agent.save(args.directory, filename, reload_data)
            # 保存reload信息，便于下次重新运行
            if h_type:
                h_save_reload(reload_data, i_episode, return_list_higher, return_list_lower, log_file,
                              action_rewards_log_file, filename, args.directory)
            else:
                s_save_reload(reload_data, i_episode, return_list, log_file,
                              action_rewards_log_file, filename, args.directory)
            with open(save_reload_file, 'wb') as f:
                pickle.dump(reload_data, f)