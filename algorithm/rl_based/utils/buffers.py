from tqdm import tqdm
import numpy as np
import torch
import collections
import random

class ReplayBufferForHAC:
    def __init__(self, max_size=5e5):
        self.buffer = []
        self.max_size = max_size
        self.size = 0

    def add(self, transition):
        assert len(transition) == 7, "transition must have length = 7"

        # transiton is tuple of (state, action, reward, next_state, goal, gamma, done)
        self.buffer.append(transition)
        self.size += 1

    def sample(self, batch_size):
        # delete 1/5th of the buffer when full
        if self.size > self.max_size:
            del self.buffer[0:int(self.size/5)]
            self.size = len(self.buffer)

        indexes = np.random.randint(0, len(self.buffer), size=batch_size)
        states, actions, rewards, next_states, goals, gamma, dones = [], [], [], [], [], [], []

        for i in indexes:
            states.append(np.array(self.buffer[i][0], copy=False))
            actions.append(np.array(self.buffer[i][1], copy=False))
            rewards.append(np.array(self.buffer[i][2], copy=False))
            next_states.append(np.array(self.buffer[i][3], copy=False))
            goals.append(np.array(self.buffer[i][4], copy=False))
            gamma.append(np.array(self.buffer[i][5], copy=False))
            dones.append(np.array(self.buffer[i][6], copy=False))

        return np.array(states), np.array(actions), np.array(rewards), \
            np.array(next_states), np.array(goals),  np.array(gamma), np.array(dones)

class ReplayBuffer:
    def __init__(self, capacity):
        self.buffer = collections.deque(maxlen=capacity) 

    def add(self, state, action, reward, next_state, done): 
        self.buffer.append((state, action, reward, next_state, done)) 

    def sample(self, batch_size): 
        transitions = random.sample(self.buffer, batch_size)
        state, action, reward, next_state, done = zip(*transitions)
        return np.array(state), action, reward, np.array(next_state), done 

    def size(self): 
        return len(self.buffer)

class ReplayBufferForHSLAP:
    def __init__(self, max_size=5000) -> None:
        self.buffer = collections.deque(maxlen=max_size)

    def add(self, transition):
        assert len(transition) == 5, "transition must have length = 5"
        # transiton is tuple of (state, action, reward, next_state, done)
        self.buffer.append(transition)
    
    def add_mask(self, transition):
        assert len(transition) == 7, "add mask transition must have length = 7"
        self.buffer.append(transition)

    def sample(self, batch_size): 
        transitions = random.sample(self.buffer, batch_size)
        state, action, reward, next_state, done = zip(*transitions)
        return np.array(state), action, reward, np.array(next_state), done 

    def sample_mask(self, batch_size):
        transitions = random.sample(self.buffer, batch_size)
        state, mask, action, reward, next_state, next_mask, done = zip(*transitions)
        return state, mask, action, reward, next_state, next_mask, done

    def reset(self):
        self.buffer.clear()

    def size(self): 
        return len(self.buffer)