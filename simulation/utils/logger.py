import logging
import sys

def config_logging(file_name: str, console_level: int=logging.INFO, file_level: int=logging.DEBUG):
    file_handler = logging.FileHandler(file_name, mode='a', encoding="utf8")
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s [%(levelname)s] [%(filename)s line:%(lineno)d] %(message)s')
    )
    file_handler.setLevel(file_level)

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(logging.Formatter(
        '%(asctime)s [%(levelname)s] [%(filename)s line:%(lineno)d] %(message)s',
        datefmt="%Y/%m/%d %H:%M:%S")
    )
    console_handler.setLevel(console_level)

    logging.basicConfig(
        level=min(console_level, file_level),
        handlers=[file_handler, console_handler],
    )
