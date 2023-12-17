import re
import matplotlib.pyplot as plt

def smooth(data, sm=1):
    smooth_data = []
    if sm > 1:
        # smooth_data = []
        for d in data:
            y = np.ones(sm)*1.0/sm
            d = np.convolve(y, d, "same")

            smooth_data.append(d)

    return smooth_data

# 从日志文件中读取数据
with open('./utils/H-SAC-MLP_h_action_2023_09_19_20_01_48.txt', 'r') as file:
    log_data = file.read()

# 使用正则表达式提取reward_higher和reward_lower的数据
reward_higher = re.findall(r"reward_higher is ([\-0-9.]+)", log_data)
reward_lower = re.findall(r"reward_lower is ([\-0-9.]+)", log_data)

# 将提取的数据转换为浮点数
reward_higher = [float(value) for value in reward_higher]
reward_lower = [float(value) for value in reward_lower]

# 创建一个x轴列表，用于绘制曲线
x = list(range(1, len(reward_higher) + 1))

# 绘制reward_higher曲线
reward_higher = smooth(reward_higher)
reward_lower = smooth(reward_lower)
x_data = list(range(1, len(reward_higher) + 1))

plt.plot(x, reward_higher, label='reward_higher')
# 绘制reward_lower曲线
plt.plot(x, reward_lower, label='reward_lower')

# 添加图例
plt.legend()

# 添加标题和轴标签
plt.title('Reward Curves')
plt.xlabel('Episode')
plt.ylabel('Reward')

# 显示图形
plt.show()