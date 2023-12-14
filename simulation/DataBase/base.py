import configparser
import logging
import sqlalchemy as sa
import os
import multiprocessing
import sys
import time
from subprocess import Popen, PIPE
from sqlalchemy import text
from simulation.DataBase.table_define import Base

class myconf(configparser.ConfigParser):
    def __init__(self,defaults=None):
        configparser.ConfigParser.__init__(self,defaults=defaults)
    def optionxform(self, optionstr):
        return optionstr

def BasicConfigForDB0(cf):
    """
    Parameters
    ----------
    cf

    Returns
    -------
    BasicConfig: 连接数据库配置
    """
    BasicConfig = {}
    BasicConfig["HOST"] = cf.get("DB", "HOST")
    BasicConfig["PORT"] = cf.get("DB", "PORT")
    BasicConfig["USERNAME"] = cf.get("DB", "USERNAME")
    BasicConfig["PASSWORD"] = cf.get("DB", "PASSWORD")
    BasicConfig["DB"] = cf.get("DB", "DB")
    BasicConfig["USER"] = cf.get("DB", "USER")
    return BasicConfig

def BlockForDB(cf):
    """
    Parameters
    ----------
    cf

    Returns
    -------
    BlockConfig: 测试航线预先指派箱区
    """
    BlockConfig = {}
    keys = cf.options("BLOCK")
    for key in keys:
        BlockConfig[key] = cf.get("BLOCK", key).split()
    return BlockConfig

def BerthForDB(cf):
    """
    Parameters
    ----------
    cf

    Returns
    -------
    BerthConfig: 测试航线泊位
    """
    BerthConfig = {}
    keys = cf.options("BERTH")
    for key in keys:
        BerthConfig[key] = cf.get("BERTH", key)
    return BerthConfig


def create_engine(BasicConfig, echo_sql):
    """
    创建引擎
    Parameters
    ----------
    BasicConfig
    echo_sql

    Returns
    -------
    """
    USERNAME = BasicConfig["USERNAME"]
    PASSWORD = BasicConfig["PASSWORD"]
    HOST = BasicConfig["HOST"]
    PORT = BasicConfig["PORT"]
    DB = BasicConfig["DB"]
    engine = sa.create_engine(f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB}',
                              max_overflow=5,  # 超过连接池大小外最多创建的连接
                              pool_size=200,  # 连接池大小
                              pool_timeout=60,  # 池中没有线程最多等待的时间，否则报错
                              pool_recycle=-1,  # 多久之后对线程池中的线程进行一次连接的回收（重置）
                              echo=echo_sql)
    logging.info(f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOST}:{PORT}/{DB}  engineID_{id(engine)}")
    return engine

def create_scoped_session(engine):
    """
    Parameters
    ----------
    engine: 引擎

    Returns
    -------
    mysessio: 事务
    """
    SessionFactory = sa.orm.sessionmaker(bind=engine, expire_on_commit=False)
    mysession =  sa.orm.scoped_session(SessionFactory) # session线程隔离(thread local storage)
    logging.debug(f"create scoped_session: scoped_sessionID_{id(mysession)} engineID_{id(engine)}")
    return mysession

def create_session(engine):
    """
    Parameters
    ----------
    engine: 引擎

    Returns
    -------
    mysessio: 事务
    """
    DbSession = sa.orm.sessionmaker(bind=engine, expire_on_commit=False)
    mysession = DbSession()
    logging.debug(f"create session: sessionID_{id(mysession)} engineID_{id(engine)}")
    return mysession

class DB0(object):
    """
    操作数据库的基类
    """
    def __init__(self, config_path):
        self.config_path = config_path
        self.cf = myconf()
        self.cf.read(self.config_path, "utf-8")
        self.BasicConfig = BasicConfigForDB0(self.cf)

        self.engine = create_engine(self.BasicConfig, False)
        # self.session = create_session(self.engine)
        self.DBsession = create_scoped_session(self.engine)
        self.session = self.DBsession()
        logging.debug(f"create Session: self.sessionID_{id(self.session)}, scoped_sessionID_{id(self.DBsession)}")

        self.resetpath = self.cf.get("INIT", "RESETPATH") # reset目录
        if not os.path.exists(self.resetpath):
            os.mkdir(self.resetpath)
        self.sqlpath = os.path.join(self.resetpath, self.cf.get("INIT", "SQLPATH")) # 全部数据库数据
        self.schedule_frame = 0  # 调度次数

        ## ====== [DB2]
        self.Nthread = self.cf.getint("PARALLEL", "NUMTHR") # 子线程数
        self.Nprocess = self.cf.getint("PARALLEL", "NUMPRO") # 子进程数
        self.processes_pool = multiprocessing.Pool(self.Nprocess) # 创建进程池


    def init_db(self, tables):
        """
        创建指定数据表
        Parameters
        ----------
        tables : list of object 要创建的Table
        """
        Base.metadata.create_all(bind = self.engine, tables = tables)
        logging.info("Create tables done")

    def drop_db(self, tables = None):
        """
        删除数据表
        Parameters
        ----------
        tables :
          list of object 要删除的Table
          None 删除全部Table
        """
        # 删除全部表格
        if tables == None:
            logging.info("Start delete all tables")
            # Base.metadata.drop_all(self.engine)
            sinittable = ["Containers", "Yard_slot", "Yard_stack",
                          "Yard_bay", "Containers_outyard", "Yard_block"]
            for table in sinittable:
                try:
                    logging.info("DROP TABLE IF EXISTS {}".format(table+"0"))
                    self.session.execute(text("DROP TABLE IF EXISTS %s" % (table+"0")))
                    self.session.commit()
                    logging.info("DROP TABLE IF EXISTS {} done".format(table+"0"))
                    logging.debug(f"delete table {table}0")
                    self.session.execute(text("DROP TABLE IF EXISTS %s" % (table)))
                    self.session.commit()
                    logging.debug(f"delete table {table}")
                except Exception as ex:
                    logging.info(f"Failed to drop table {table}: {ex}")
                    self.session.rollback()
        # 删除指定表格
        else:
            for table in tables:
                table.__table__.drop(self.engine)
            logging.info(f"Delete tables {tables}")


    def dump(self, USER = None, path = None):
        """
        备份整个数据库
        Parameters
        ----------
        path: dir of .sql
        USER: container-id 或 container-name
        """
        Path = path if path else self.sqlpath
        user = USER if USER else self.BasicConfig["USER"]
        try:
            if user != "None":
                dumpcode = "mysqldump -u%s -p%s %s > %s" % (self.BasicConfig["USERNAME"],
                                                            self.BasicConfig["PASSWORD"],
                                                            self.BasicConfig["DB"],
                                                            os.path.abspath(Path))
                logging.info("shell: docker exec -i {} {}".format(user, dumpcode))
                process = Popen('docker exec -i %s %s' % (user, dumpcode), shell=True)
                stdout, stderr = process.communicate()
                logging.info(f"""dump {user}_{self.BasicConfig["DB"]}.sql in {Path}""")
            else:
                dumpcode = "mysqldump -h%s -u%s -p%s %s > %s" % (self.BasicConfig["HOST"],
                                                                 self.BasicConfig["USERNAME"],
                                                                 self.BasicConfig["PASSWORD"],
                                                                 self.BasicConfig["DB"],
                                                                 Path)
                process = Popen(dumpcode, shell=True)
                logging.info(f"""Dump {self.BasicConfig["DB"]}.sql in {Path}""")
        except Exception as ex:
            process.kill()
            logging.warning(f"Failed to dumpsql in {Path}: {ex}")

    def loadsql(self, USER = None, path = None, cpsql = False):
        """
        用sql文件中的数据替代原数据库
        Parameters
        ----------
        path: dir of .sql
        USER: container-id/container-name
        cpsql: 是否拷贝sql文件, 执行docker cp
        """
        Path = path if path else self.sqlpath
        if not os.path.exists(Path):
            logging.warning(f"{Path} doesn't exist")
            return False
        user = USER if USER else self.BasicConfig["USER"]
        logging.info(f"---------------------start loadsql---------------------")
        self.drop_db() # 删除数据库内全部表
        try:
            if user != "None":
                # 首次初始化需要拷贝sql文件 cpsql = True
                if cpsql:
                    logging.info("shell: docker cp {} {}:/{}.sql".format(Path, user, self.BasicConfig["DB"]))
                    ans = Popen('docker cp %s %s:/%s.sql'% (Path, user, self.BasicConfig["DB"]), shell=True)
                    ans.communicate() # 防止阻塞管道缓冲区
                    if ans.poll() == 0:
                        logging.info("docker cp success and returncode is {}".format(ans.returncode))
                    else:
                        logging.info("docker cp failed")

                # source命令需要在mysql命令行中使用, 但MySQLdb模块不支持source命令
                loadcode = 'exec mysql -u%s -p%s -D%s < /%s.sql' % (self.BasicConfig["USERNAME"],
                                                                       self.BasicConfig["PASSWORD"],
                                                                       self.BasicConfig["DB"],
                                                                       self.BasicConfig["DB"])
                logging.info("shell: docker exec -i {} sh -c {}".format(user, loadcode))
                process = Popen('docker exec -i %s sh -c "%s"' % (user, loadcode), shell=True)
                stdout, stderr = process.communicate()
                if process.poll() == 0:
                    logging.info("docker exec success and returncode is {}".format(process.returncode))
                else:
                    logging.info("docker exec failed")
                
                logging.info(f"""Reset database {user}_{self.BasicConfig["DB"]} done, load sql from {Path}""")
            else:
                loadcode = 'mysql -h%s -P%s -u%s -p%s -D%s' % (self.BasicConfig["HOST"],
                                                                self.BasicConfig["PORT"],
                                                                self.BasicConfig["USERNAME"],
                                                                self.BasicConfig["PASSWORD"],
                                                                self.BasicConfig["DB"])
                process = Popen(loadcode,
                                stdout=PIPE, stdin = PIPE, shell=True)
                logging.info(f"shell: {loadcode}")
                output = process.communicate(('source ' + Path).encode())
                logging.info(f"mysql: source {Path}")
                logging.info(f"""Reset database {self.BasicConfig["DB"]} done, load sql from {Path}""")
            return True
        except Exception as ex:
            process.kill() # 杀死子进程
            logging.warning(f"Failed to loadsql in {Path}: {ex}")
            return False

    def copy(self, inittable=None):
        """
        保留数据表原始状态副本
        Parameters
        ----------
        inittable: list of str 需要备份数据表的名
        """
        inittable = inittable if inittable else ["Containers", "Yard_slot", "Yard_stack",
                                                 "Yard_bay", "Containers_outyard"]
        for table in inittable[:5]:
            try:
                # 创建表table0， 同时拷贝表table的数据和结构到表table0
                self.session.execute(text("CREATE TABLE %s LIKE %s" % (table + "0", table)))  # 备份表结构（包括主键）
                self.session.execute(text("INSERT INTO %s SELECT * FROM  %s " % (table + "0", table)))  # 备份表数据
                self.session.commit()
                logging.info(f"Back up tables {table} done")
            except Exception as ex:
                logging.warning(f"Failed to back up table {table}: {ex} ")
                self.session.rollback()

    def close(self):
        self.DBsession.close()
        self.processes_pool.close()


    def add_rows(self, rowdata):
        """
        添加记录
        Parameters
        ----------
        rowdata : object 要插入的Record对应的Object
        rowdata : list of Object 要插入的Record对应的Object组成的list

        Returns
        -------
        add :int 插入的Record条数
        """
        try:
            if type(rowdata) == list:  # 实例对象列表
                self.session.add_all(rowdata)
                self.session.commit()
                logging.debug(f"insert {len(rowdata)} rows into table {str(type(rowdata[0]))[8:-2].split('.')[-1]}")
                add = len(rowdata)
            else:  # 实例对象
                self.session.add(rowdata)
                self.session.commit()
                logging.debug(f"insert 1 rows into table {str(type(rowdata))[8:-2].split('.')[-1]}")
                add = 1
            return add
        except Exception as ex:
            logging.warning(f"Failed to insert rows: {ex}")
            self.session.rollback()

    def del_rows(self, tablename, filter):
        """
        删除记录
        Parameters
        ----------
        tablename : class of Table
        filter : sqlalchemy删除条件

        Returns
        -------
        deleted :int 删除的Record条数
        """
        try:
            deleted = self.session.query(tablename).filter(filter).delete(synchronize_session="fetch")
            self.session.commit()
            logging.debug(f"Delete {deleted} rows in table {str(tablename)[8:-2].split('.')[-1]}, "
                          f"{self.session.query(tablename).count()} rows left : "
                          f"filter = {filter}")
            return deleted
        except Exception as ex:
            logging.warning(f"Failed to delete rows: {ex}")
            self.session.rollback()

    def update_rows(self, tablename, filter, updatedict):
        """
        更新记录
        Parameters
        ----------
        tablename : class
        filter : sqlalchemy 的条件语句
        updatedict : {field1:value1,field2:value2}

        Returns
        -------
        updated : 更新过的Record条数
        """
        try:
            updated = self.session.query(tablename).filter(filter).update(updatedict)
            self.session.commit()
            logging.debug(f"Update {updated} rows in table {str(tablename)[8:-2].split('.')[-1]} : {filter}")
            return updated
        except Exception as ex:
            logging.warning(f"Failed to update :{updatedict}: {ex}")
            self.session.rollback()