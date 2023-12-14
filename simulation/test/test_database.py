import time
import sys
import os
from simulation.DataBase import DB
from simulation.utils.logger import config_logging
import logging

if __name__ == '__main__':
    config_path = "../config/test.ini"
    logname = "../logs/test_database_" + time.strftime('%Y_%m_%d_%H_%M_%S', time.localtime(time.time())) + ".log"
    config_logging(logname, logging.INFO, logging.INFO)
    db = DB(config_path)
    db.reset("dump")
    # db.Initall()