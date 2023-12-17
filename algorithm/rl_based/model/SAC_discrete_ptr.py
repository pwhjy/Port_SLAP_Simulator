import torch
import torch.nn as nn
import torch.nn.functional as F
from algorithm.rl_based.model.Pointer_network import PtrNetwork
import matplotlib.pyplot as plt
import numpy as np
import logging
from torch.distributions import Categorical

class MLP_Actor(nn.Module):
    def __init__(self, input_dim, embedding_dim, hidden_size, batch_first=True) -> None:
        # Embedding dimension
        super().__init__()
        self.embedding_dim = embedding_dim
        self.hidden_size = hidden_size
        self.batch_first = batch_first

        # We use an embedding layer for more complicate application usages later, e.g. word sequences.
        self.embedding = nn.Linear(in_features=input_dim, out_features=embedding_dim, bias=False)
        self.fc1 = nn.Linear(in_features=embedding_dim, out_features=hidden_size)
        self.fc2 = nn.Linear(in_features=hidden_size, out_features=hidden_size)
        self.fc3 = nn.Linear(in_features=hidden_size, out_features=1)
        self.activation = nn.Sigmoid()

        # 初始化bias参数为0
        for m in self.modules():
            if isinstance(m, nn.Linear):
                if m.bias is not None:
                    torch.nn.init.zeros_(m.bias)

    def forward(self, input, input_length, mask=None):
        # Embedding 全连接层 (batch, max_seq_len, state_dim -> embedding_dim)
        embedded = self.embedding(input)

        # MLP
        x = self.activation(self.fc1(embedded))
        x = self.activation(self.fc2(x))
        x = self.activation(self.fc3(x))

        # [batch, seq_len, 1]   -> [batch, seq_len]
        x = torch.squeeze(x, dim=-1)
        # Get the indices of maximum pointer
        mask_score = x.masked_fill(mask, -float("inf"))
        log_score = F.softmax(mask_score, dim=-1)
        return log_score


class Actor(nn.Module):
    def __init__(self, input_dim, embedding_dim, hidden_size):
        super(Actor, self).__init__()
        self.actor = PtrNetwork(input_dim, embedding_dim, hidden_size)

    def forward(self, state, length, mask=None, train=True):
        # state:[[block1],[block2],[block3]...[blockn]]
        # mask:[0,1,0,1,1,1,1,1...]
        return self.actor(state, length, mask)


class Critic(nn.Module):
    def __init__(self, feat_dim, hidden_dim, rnn_layer, dropout, batch_first=True, bidirectional=True,
                 rnn_model="LSTM"):
        super(Critic, self).__init__()

        self.batch_first = batch_first
        self.embedding_dim = feat_dim
        self.encoder = nn.TransformerEncoder(
            nn.TransformerEncoderLayer(d_model=feat_dim, nhead=1),
            num_layers=1
        )
        self.rnn_model = rnn_model
        if self.rnn_model == "LSTM":
            self.rnn = nn.LSTM(input_size=feat_dim, hidden_size=hidden_dim, num_layers=rnn_layer,
                               bidirectional=bidirectional, dropout=dropout)
        elif self.rnn_model == "GRU":
            self.rnn = nn.GRU(input_size=feat_dim, hidden_size=hidden_dim, num_layers=rnn_layer,
                              bidirectional=bidirectional, dropout=dropout)
        if bidirectional:
            self.fc = nn.Linear(hidden_dim * 2, 1)
        else:
            self.fc = nn.Linear(hidden_dim, 1)

    def forward(self, state, lengths, training=True):
        # state: [batch_size, slot_length, state_dim]
        # self-attention
        # 这里的fi_layer: (batch_size,length, dim)
        fi_embed = self.encoder(state)
        fi_layer = nn.utils.rnn.pack_padded_sequence(fi_embed, lengths.cpu(), batch_first=self.batch_first,
                                                     enforce_sorted=False)
        # rnn
        outputs, hd = self.rnn(fi_layer)
        outputs, _ = nn.utils.rnn.pad_packed_sequence(outputs, batch_first=self.batch_first)

        q = self.fc(outputs).squeeze(dim=-1)
        return q


class SAC_Ptr:
    ''' 处理离散动作的SAC算法 '''

    def __init__(self, input_dim, embedding_dim, hidden_size, tau, state_dim, dropout,
                 actor_lr, critic_lr, alpha_lr, target_entropy, gamma, alpha, hidden_dim, rnn_layer, device,
                 level, MLP_actor=False, only_high=False):
        # 策略网络
        if MLP_actor:
            self.actor = MLP_Actor(input_dim,embedding_dim,hidden_size).to(device)
        else:
            self.actor = Actor(input_dim, embedding_dim, hidden_size).to(device)
        # Q网络
        self.critic_1 = Critic(state_dim, hidden_dim, rnn_layer, dropout).to(device)
        self.critic_2 = Critic(state_dim, hidden_dim, rnn_layer, dropout).to(device)
        # target Q网络
        self.target_critic_1 = Critic(state_dim, hidden_dim, rnn_layer, dropout).to(device)  # 第一个目标Q网络
        self.target_critic_2 = Critic(state_dim, hidden_dim, rnn_layer, dropout).to(device)  # 第二个目标Q网络
        # 令目标Q网络的初始参数和Q网络一样
        self.target_critic_1.load_state_dict(self.critic_1.state_dict())
        self.target_critic_2.load_state_dict(self.critic_2.state_dict())
        # 优化器
        self.actor_optimizer = torch.optim.Adam(self.actor.parameters(), lr=actor_lr)
        self.critic_1_optimizer = torch.optim.Adam(self.critic_1.parameters(), lr=critic_lr)
        self.critic_2_optimizer = torch.optim.Adam(self.critic_2.parameters(), lr=critic_lr)
        # 使用alpha的log值,可以使训练结果比较稳定
        self.log_alpha = torch.tensor(np.log(alpha), dtype=torch.float).to(device)
        self.log_alpha.requires_grad = True  # 可以对alpha求梯度
        self.log_alpha_optimizer = torch.optim.Adam([self.log_alpha], lr=alpha_lr)

        self.target_entropy = target_entropy  # 目标熵的大小
        self.gamma = gamma
        self.tau = tau
        self.device = device
        self.level = level

        self.actor_train_losses = []
        self.critic_train_losses = []
        self.entropy_train_losses = []

        self.only_high = only_high

    def select_action(self, states, mask=None, rsample=True):
        cur_container = states["cur_container"]
        candidate_slot = states["candidate_slot"]
        features = states["features"]
        mask = states["mask"]

        state = torch.unsqueeze(torch.FloatTensor(features), 0).to(self.device)
        length = torch.tensor([state.size(1)], dtype=torch.float).to(self.device)
        mask = torch.unsqueeze(torch.BoolTensor(mask), 0).to(self.device)
        log_pointer_score = self.actor(state, length, mask)

        # 使用sample
        if rsample:
            action = Categorical(log_pointer_score).sample().cpu().item()  # this creates a distribution to sample from
        else:
            action = torch.argmax(log_pointer_score, dim=1).detach().cpu().data.numpy()[0]

        return_list = {}
        return_list["action"] = action
        return_list["candidate_slot_action"] = candidate_slot[action]
        return_list["cur_container"] = cur_container
        return return_list

    # 计算目标Q值,直接用策略网络的输出概率进行期望计算
    def calc_target(self, rewards, next_states, next_length, next_mask, dones):
        next_probs = self.actor(next_states, next_length, next_mask)
        next_log_probs = torch.log(next_probs + 1e-8)
        entropy = -torch.sum(next_probs * next_log_probs, dim=1, keepdim=True)
        q1_value = self.target_critic_1(next_states, next_length)
        q2_value = self.target_critic_2(next_states, next_length)
        min_qvalue = torch.sum(next_probs * torch.min(q1_value, q2_value),
                               dim=1,
                               keepdim=True)
        next_value = min_qvalue + self.log_alpha.exp() * entropy
        td_target = rewards + self.gamma * next_value * (1 - dones)
        return td_target

    def soft_update(self, net, target_net):
        for param_target, param in zip(target_net.parameters(),
                                       net.parameters()):
            param_target.data.copy_(param_target.data * (1.0 - self.tau) +
                                    param.data * self.tau)

    def update(self, buffer, n_iter, batch_size):
        if self.only_high:
            return
        logging.info("start SAC_Ptr_" + self.level + ".update")
        actor_running_loss = 0
        critic_1_running_loss = 0
        critic_2_running_loss = 0
        entropy_running_loss = 0

        for i in range(n_iter):
            states, mask, actions, rewards, next_states, next_mask, dones = buffer.sample_mask(batch_size)

            # convert np array into tensor
            length = torch.tensor([len(x) for x in states], dtype=torch.float).to(self.device)
            length2 = torch.tensor([len(x) for x in next_states], dtype=torch.float).to(self.device)
            states = nn.utils.rnn.pad_sequence(states, batch_first=True, padding_value=0).to(self.device)
            mask = nn.utils.rnn.pad_sequence(mask, batch_first=True, padding_value=True).to(self.device)
            next_mask = nn.utils.rnn.pad_sequence(next_mask, batch_first=True, padding_value=True).to(self.device)
            rewards = torch.FloatTensor(rewards).reshape((batch_size, 1)).to(self.device)
            actions = torch.IntTensor(actions).unsqueeze(-1).to(torch.int64).to(self.device)
            next_states = nn.utils.rnn.pad_sequence(next_states, batch_first=True, padding_value=0).to(self.device)
            dones = torch.FloatTensor(dones).reshape((batch_size, 1)).to(self.device)

            # 更新两个Q网络
            td_target = self.calc_target(rewards, next_states, length2, next_mask, dones)
            critic_1_q_values = self.critic_1(states, length).gather(1, actions)
            critic_1_loss = torch.mean(
                F.mse_loss(critic_1_q_values, td_target.detach()))
            critic_2_q_values = self.critic_2(states, length).gather(1, actions)
            critic_2_loss = torch.mean(
                F.mse_loss(critic_2_q_values, td_target.detach()))
            self.critic_1_optimizer.zero_grad()
            critic_1_loss.backward()
            self.critic_1_optimizer.step()
            self.critic_2_optimizer.zero_grad()
            critic_2_loss.backward()
            self.critic_2_optimizer.step()

            critic_1_running_loss += critic_1_loss.detach().cpu().data
            critic_2_running_loss += critic_2_loss.detach().cpu().data

            # 更新策略网络
            probs = self.actor(states, length, mask)
            log_probs = torch.log(probs + 1e-8)
            # 直接根据概率计算熵
            entropy = -torch.sum(probs * log_probs, dim=1, keepdim=True)  #
            q1_value = self.critic_1(states, length)
            q2_value = self.critic_2(states, length)
            min_qvalue = torch.sum(probs * torch.min(q1_value, q2_value),
                                   dim=1,
                                   keepdim=True)  # 直接根据概率计算期望
            actor_loss = torch.mean(self.log_alpha.exp() * entropy - min_qvalue)
            self.actor_optimizer.zero_grad()
            actor_loss.backward()
            self.actor_optimizer.step()

            actor_running_loss += actor_loss.detach().cpu().data

            # 更新alpha值
            alpha_loss = torch.mean(
                (entropy - self.target_entropy).detach() * self.log_alpha.exp())
            self.log_alpha_optimizer.zero_grad()
            alpha_loss.backward()
            self.log_alpha_optimizer.step()

            entropy_running_loss += torch.mean(entropy).detach().cpu().data

            self.soft_update(self.critic_1, self.target_critic_1)
            self.soft_update(self.critic_2, self.target_critic_2)

        self.actor_train_losses.append(actor_running_loss / n_iter)
        self.critic_train_losses.append((critic_1_running_loss + critic_2_running_loss) / (2 * n_iter))
        self.entropy_train_losses.append(entropy_running_loss / n_iter)

    def save(self, directory, name, reload_data=None):
        torch.save(self.actor.state_dict(), '%s/%s_actor.pth' % (directory, name))
        if self.only_high:
            return
        if reload_data is not None:
            # 保存loss统计数据
            reload_data[self.level + "actor_train_losses"] = self.actor_train_losses
            reload_data[self.level + "critic_train_losses"] = self.critic_train_losses
            reload_data[self.level + "entropy_train_losses"] = self.entropy_train_losses
            # 保存actor网络
            reload_data[self.level + "actor"] = self.actor.state_dict()
            # 保存critic 网络
            reload_data[self.level + "critic_1"] = self.critic_1.state_dict()
            reload_data[self.level + "critic_2"] = self.critic_2.state_dict()
            # 保存target网络
            reload_data[self.level + "target_critic_1"] = self.target_critic_1.state_dict()
            reload_data[self.level + "target_critic_2"] = self.target_critic_2.state_dict()
            # 保存优化器
            reload_data[self.level + "actor_optimizer"] = self.actor_optimizer.state_dict()
            reload_data[self.level + "critic_1_optimizer"] = self.critic_1_optimizer.state_dict()
            reload_data[self.level + "critic_2_optimizer"] = self.critic_2_optimizer.state_dict()
            reload_data[self.level + "log_alpha_optimizer"] = self.log_alpha_optimizer.state_dict()

        # also save the loss pic
        plt.figure()
        plt.plot(self.actor_train_losses)
        logging.debug(f"actor_train_losses: {self.actor_train_losses}")
        plt.xlabel('Epoch')
        plt.ylabel(self.level + ' Level Actor training Loss')
        plt.savefig('%s/%s_actor.png' % (directory, name))

        plt.figure()
        plt.plot(self.critic_train_losses)
        logging.debug(f"critic_train_losses: {self.critic_train_losses}")
        plt.xlabel('Epoch')
        plt.ylabel(self.level + ' Level  Critic training Loss')
        plt.savefig('%s/%s_critic.png' % (directory, name))

        plt.figure()
        plt.plot(self.entropy_train_losses)
        logging.debug(f"critic_train_losses: {self.entropy_train_losses}")
        plt.xlabel('Epoch')
        plt.ylabel(self.level + ' Level  Entropy training Loss')
        plt.savefig('%s/%s_entropy.png' % (directory, name))

    def load(self, directory, name, reload_data=None):
        if self.only_high:
            return
        if reload_data is not None:
            # 加载loss统计数据
            self.actor_train_losses = reload_data[self.level + "actor_train_losses"]
            self.critic_train_losses = reload_data[self.level + "critic_train_losses"]
            self.entropy_train_losses = reload_data[self.level + "entropy_train_losses"]
            # 加载actor网络
            self.actor.load_state_dict(reload_data[self.level + "actor"])
            # 加载critic 网络
            self.critic_1.load_state_dict(reload_data[self.level + "critic_1"])
            self.critic_2.load_state_dict(reload_data[self.level + "critic_2"])
            # 加载target网络
            self.target_critic_1.load_state_dict(reload_data[self.level + "target_critic_1"])
            self.target_critic_2.load_state_dict(reload_data[self.level + "target_critic_2"])
            # 加载优化器
            self.actor_optimizer.load_state_dict(reload_data[self.level + "actor_optimizer"])
            self.critic_1_optimizer.load_state_dict(reload_data[self.level + "critic_1_optimizer"])
            self.critic_2_optimizer.load_state_dict(reload_data[self.level + "critic_2_optimizer"])
            self.log_alpha_optimizer.load_state_dict(reload_data[self.level + "log_alpha_optimizer"])
        else:
            self.actor.load_state_dict(torch.load('%s/%s_actor.pth' % (directory, name), map_location='cpu'))

    def load_for_eval(self, actor_file):
        self.actor.load_state_dict(torch.load(actor_file, map_location='cpu'))


class SAC_Ptr_High_Level(SAC_Ptr):
    def __init__(self, input_dim, embedding_dim, hidden_size, tau, state_dim, dropout, actor_lr, critic_lr, alpha_lr,
                 target_entropy, gamma, alpha, hidden_dim, rnn_layer, device, level="High", MLP_actor=False):
        super().__init__(input_dim, embedding_dim, hidden_size, tau, state_dim, dropout, actor_lr, critic_lr, alpha_lr,
                         target_entropy, gamma, alpha, hidden_dim, rnn_layer, device, level, MLP_actor)

    def select_action(self, states, mask=None, rsample=True):
        logging.info("start SAC_Ptr_High_Level.select_action")
        block_features = [value for value in states.values()]
        block_list = [key for key in states.keys()]

        state = torch.unsqueeze(torch.FloatTensor(block_features), 0).to(self.device)
        length = torch.tensor([state.size(1)], dtype=torch.float).to(self.device)
        mask = torch.unsqueeze(torch.BoolTensor(mask), 0).to(self.device)

        log_pointer_score = self.actor(state, length, mask)
        # 使用sample
        if rsample:
            action = Categorical(log_pointer_score).sample().cpu().item()  # this creates a distribution to sample from
        else:
            action = torch.argmax(log_pointer_score, dim=1).detach().cpu().data.numpy()[0]

        return_list = {}
        return_list["action"] = action
        return_list["candidate_block_action"] = block_list[action]
        return return_list


class SAC_Ptr_Low_Level(SAC_Ptr):
    def __init__(self, input_dim, embedding_dim, hidden_size, tau, state_dim, dropout, actor_lr, critic_lr, alpha_lr,
                 target_entropy, gamma, alpha, hidden_dim, rnn_layer, device, level="Low", MLP_actor=False, only_high=False):

        super().__init__(input_dim, embedding_dim, hidden_size, tau, state_dim, dropout, actor_lr, critic_lr, alpha_lr,
                         target_entropy, gamma, alpha, hidden_dim, rnn_layer, device, level, MLP_actor, only_high)

    def select_action(self, state, mask=None, random=True):
        logging.info("start SAC_Ptr_Low_Level.select_action")
        candidate_slot = [key for key in state.keys()]
        features = [value for value in state.values()]

        state = torch.unsqueeze(torch.FloatTensor(features), 0).to(self.device)
        length = torch.tensor([state.size(1)], dtype=torch.float).to(self.device)
        mask = torch.unsqueeze(torch.BoolTensor(mask), 0).to(self.device)

        log_pointer_score = self.actor(state, length, mask)
        # 使用sample
        if random:
            action = Categorical(log_pointer_score).sample().cpu().item()  # this creates a distribution to sample from
        else:
            action = torch.argmax(log_pointer_score, dim=1).detach().cpu().data.numpy()[0]

        return_list = {}
        return_list["action"] = action
        return_list["candidate_slot_action"] = candidate_slot[action]
        return return_list
