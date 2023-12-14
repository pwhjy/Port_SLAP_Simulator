
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
import json

Base = declarative_base()

class ModelExt(object):
    """
    Model extension:
        implementing `__repr__` method which returns all the class attributes
    """
    def __repr__(self): # 定义该类返回的字符串内容
        fields = self.__dict__
        if "_sa_instance_state" in fields:
            del fields["_sa_instance_state"]
        return json.dumps(fields)

class Containers(Base,ModelExt):
    """
    全部历史集装箱，当前在场+已经离场
    """
    # 定义表名
    __tablename__ = "Containers"
    # 定义表结构
    ctn_no = sa.Column(sa.String(20), primary_key=True, comment="箱号")

    category = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="流向：出口1进口2中转3翻箱4") # 考虑去除
    size = sa.Column(sa.Float, default=None, nullable=False, comment="尺寸")
    vessel = sa.Column(sa.String(10), index=True, default=None, nullable=False, comment="船舶")
    des_port = sa.Column(sa.String(10), default="unkown", server_default="unkown", nullable=False,
                     comment="卸货港：每种流向都存在无关联卸货港情况")

    status = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="状态：重箱1空箱0") # 考虑去除
    weight = sa.Column(sa.SmallInteger, index=True, default=None, nullable=False, comment="重量等级")

    inyard_time = sa.Column(sa.DateTime, default=None, nullable=False, comment="入场时间")
    outyard_time = sa.Column(sa.DateTime, default=None, nullable=True, comment="离场时间")

    block = sa.Column(sa.String(5), default=None, nullable=False, comment="箱区编号")
    bay = sa.Column(sa.Integer, default=None, nullable=False,comment="贝号")
    stack = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="列号")
    tier = sa.Column(sa.SmallInteger, default=None, nullable=False,comment="层")

    schedule_frame = sa.Column(sa.Integer,  default=0, server_default='0', nullable=False,
                      comment="调度标记，用于可视化")
    schedule_frame2 = sa.Column(sa.Integer,  default="-1", server_default="-1", nullable=False,comment="调度标记2，用于可视化")

    def __init__(self, ctn_no, category, size, vessel, status, weight,
                 schedule_frame = 0, schedule_frame2 = None, des_port=None,
                 inyard_time=None, outyard_time=None,
                 block=None,bay=None,stack=None,tier=None):
        self.ctn_no = ctn_no
        self.category = category
        self.size = size
        self.vessel = vessel
        self.des_port = des_port
        self.status = status
        self.weight = weight
        self.inyard_time = inyard_time
        self.outyard_time = outyard_time
        self.block = block
        self.bay = bay
        self.stack = stack
        self.tier = tier
        self.schedule_frame = schedule_frame
        self.schedule_frame2 = schedule_frame2

class Containers_outyard(Base,ModelExt):
    """
    全部未入场（测试）集装箱
    """
    # 定义表名
    __tablename__ = "Containers_outyard"
    # 定义表结构
    ctn_no = sa.Column(sa.String(20), primary_key=True, comment="箱号")
    category = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="流向：出口1进口2中转3翻箱4")

    size = sa.Column(sa.Float, default=None, nullable=False, comment="尺寸")
    vessel = sa.Column(sa.String(10), default=None, nullable=False, comment="船舶")
    des_port = sa.Column(sa.String(10), default=None, nullable=True,
                         comment="卸货港：每种流向都存在无关联卸货港情况")
    berth = sa.Column(sa.String(5), default=None, nullable=True, comment="泊位")

    sum_con = sa.Column(sa.Integer,  default=0, server_default='0', nullable=False, comment="同船舶总箱量")
    status = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="状态：重箱1空箱0")
    weight = sa.Column(sa.SmallInteger, default=None, nullable=False, comment="重量等级")

    inyard_time = sa.Column(sa.DateTime, default=None, nullable=True, comment="入场时间")
    order = sa.Column(sa.Integer, default=None, nullable=False, comment="进箱顺序")

    block = sa.Column(sa.String(5), default=None, nullable=True, comment="箱区编号")
    bay = sa.Column(sa.Integer, default=None, nullable=True,comment="贝号")
    stack = sa.Column(sa.SmallInteger, default=None, nullable=True, comment="列号")
    tier = sa.Column(sa.SmallInteger, default=None, nullable=True,comment="层")


    def __init__(self, ctn_no, category, size, vessel, status, weight,order,
                 sum_con = 0, berth = None, des_port = None, inyard_time = None, end_time = None,
                 block=None, bay=None, stack=None, tier=None):
        self.ctn_no = ctn_no
        self.category = category
        self.size = size
        self.vessel = vessel
        self.des_port = des_port
        self.berth = berth
        self.sum_con = sum_con
        self.status = status
        self.weight = weight
        self.order = order
        self.inyard_time = inyard_time
        self.end_time = end_time
        self.block = block
        self.bay = bay
        self.stack = stack
        self.tier = tier

class Yard_slot(Base,ModelExt):
    """
    当前时刻在场的集装箱
    """
    # 定义表名
    __tablename__ = "Yard_slot"
    # 定义表结构
    block = sa.Column(sa.String(5), primary_key=True,comment="箱区编号")
    bay = sa.Column(sa.Integer, primary_key=True,nullable=False, comment="贝号")
    stack = sa.Column(sa.SmallInteger,primary_key=True, nullable=False, comment="列号")
    tier = sa.Column(sa.SmallInteger, primary_key=True,nullable=False, comment="层数")
    ctn_no = sa.Column(sa.String(20), index=True, default=None, nullable=False, comment="箱号")


    def __init__(self, block, bay, stack,
                 tier, ctn_no):
        self.block = block
        self.bay = bay
        self.stack = stack
        self.tier = tier
        self.ctn_no = ctn_no

class Yard_stack(Base,ModelExt):
    """
    描述堆场实时列容量与状态
    """
    # 定义表名
    __tablename__ = "Yard_stack"
    # 定义表结构
    block = sa.Column(sa.String(5), primary_key=True,comment="箱区编号")
    bay = sa.Column(sa.Integer, primary_key=True,nullable=False, comment="贝号")
    stack = sa.Column(sa.SmallInteger,primary_key=True, nullable=False, comment="列号")
    maxtier = sa.Column(sa.SmallInteger, default=5, server_default='5', nullable=False, comment="允许的最高层数")
    tier = sa.Column(sa.SmallInteger, default=0, server_default='0', nullable=False, comment="层数")


    def __init__(self, block, bay, stack,
                 maxtier=5, tier=0):
        self.block = block
        self.bay = bay
        self.stack = stack
        self.maxtier = maxtier
        self.tier = tier

class Yard_bay(Base,ModelExt):
    """
    描述堆场实时贝容量与状态
    """
    # 定义表名
    __tablename__ = "Yard_bay"
    # 定义表结构
    block = sa.Column(sa.String(5), primary_key=True,comment="箱区编号")
    bay = sa.Column(sa.Integer, primary_key=True, nullable=False, comment="贝号")
    limit = sa.Column(sa.SmallInteger, default=700, server_default='700', nullable=False,
                      comment="贝内允许的最大箱量")
    exist = sa.Column(sa.SmallInteger, default=1, server_default='1', nullable=False,
                      comment="是否真实存在")
    sum_ctn = sa.Column(sa.SmallInteger, default=0, server_default='0', nullable=False,
                        comment="贝内集装箱总数")
    forbid = sa.Column(sa.SmallInteger, default=0, server_default='0', nullable=False,
                       comment="是否禁用")

    def __init__(self, block, bay, limit, exist=1,sum_ctn=0, forbid=0):
        self.block = block
        self.bay = bay
        self.limit = limit
        self.exist = exist
        self.sum_ctn = sum_ctn
        self.forbid = forbid

class Yard_block(Base, ModelExt):
    """
    描述堆场空间位置关系（固定）
    """
    # 定义表名
    __tablename__ = "Yard_block"
    # 定义表结构
    berth = sa.Column(sa.String(5), primary_key=True, comment="泊位编号")
    block = sa.Column(sa.String(5), primary_key=True, comment="箱区编号")
    distance = sa.Column(sa.Integer, default=5000, server_default='5000', nullable=False,
                         comment="泊位与箱区的距离")

    def __init__(self, berth, block, distance,):
        self.berth = berth
        self.block = block
        self.distance = distance