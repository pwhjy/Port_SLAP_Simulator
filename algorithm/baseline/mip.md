### MIP模型

#### 索引、集合

$$
i∈I\quad   \text {container id in buffer} \\
a∈A\quad   \text {block id in yard} \\
b∈B_{a}\quad  \text {bay id in yard} \\
r∈R_{b}\quad  \text {stack id in yard} \\
v∈V\quad  \text {vessel id in buffer} \\
C∈Conflict\quad  \text {conflict bays in yard}
$$

#### 常数

$$
Sum_{v} \quad    \text {the quantity of $vessel_v$ in buffer}\\
$$

$$
Sumdiff_{v} \quad    \text {the reshuffle quantity of $vessel_v$ in the yard}\\
$$

$$
Y_{a}^{’v} \quad    \text {the quantity of $vessel_v$ in $block_a$ before slot containers}\\
$$

$$
Y_{mean}^{v} \quad    \text {the expected quantity of $vessel_v$ in each block after slot all containers}\\
$$

$$
D_{b,r}^{i,a} \quad    \text {reshuffle quantity caused by $container_i$ in slot(a,b,r)}\\
$$

#### 决策变量

$$
x_{b,r}^{i,a}=\left\{\begin{matrix}1& \text {if $container_i$ in slot(a,b,r) } \\ 0\end{matrix}\right.
$$

$$
Y_{a}^{v} ∈[Y_{a}^{’v},Y_{a}^{’v}+Sum_{v}] \quad    \text {the quantity of $vessel_v$ in $block_a$ after slot all containers}\\
$$

$$
Z_{a}^{v}∈[0,Y_{a}^{v}-Y_{mean}^{v}] \quad   \text {the quantity bias of $vessel_v$ in $block_a$ after slot all containers}\\
$$

$$
K_{a,b}∈[0,K_{a,b}^{limit}]\quad    \text {the quantity of containers(in buffer) in bay(a,b) after slot all containers}\\
$$

$$
J_{a,b}=\left\{\begin{matrix}1& \text {if $containers$ slot in bay(a,b) } \\ 0\end{matrix}\right.
$$

#### 约束条件

$$
\sum_{a∈A\; b∈B_{a}\; r∈R_{b}}x_{b,r}^{i,a} = 1\quad   i∈I
$$

$$
\sum_{i∈I}x_{b,r}^{i,a}≤1\quad   a∈A\; b∈B_{a}\; r∈R_{b}
$$

$$
Y_{a}^{v} = Y_{a}^{’v}+\sum_{i∈I_{v}\; b∈B_{a}\; r∈R_{b}}x_{b,r}^{i,a}\quad   v∈V\; a∈A_{v}
$$

$$
Z_{a}^{v} + Y_{a}^{v} - Y_{mean}^{v} ≥0\quad   v∈V\; a∈A_{v}
$$

$$
Z_{a}^{v}- Y_{a}^{v}+ Y_{mean}^{v} ≥0\quad   v∈V\; a∈A_{v}
$$

$$
K_{a,b} =\sum_{i∈I\; r∈R_{b}}x_{b,r}^{i,a}\quad  a∈A\; b∈B_{a}
$$

$$
K_{a,b}^{limit} * J_{a,b}  ≥K_{a,b}\quad  a∈A\; b∈B_{a}
$$

$$
J_{a,b}  ≤K_{a,b}\quad  a∈A\; b∈B_{a}
$$

$$
\sum_{(a,b)∈C}J_{a,b} ≤ 1\quad  C∈Conflict
$$

#### 优化目标minimize

##### 翻箱

$$
\frac {Sumdiff_{v}+\sum_{i∈I_{v}\; a∈A_{v}\; b∈B_{a}\; r∈R_{b}} D_{b,r}^{i,a} * x_{b,r}^{i,a} }{Sum_{v}+ \sum_{a∈A_{v}}Y_{a}^{’v}} \quad v∈V
$$

##### 均衡

$$
\frac {\sum_{a∈A_{v}}Z_{a}^{v} }{Sum_{v}+ \sum_{a∈A_{v}}Y_{a}^{’v}} \quad v∈V
$$
