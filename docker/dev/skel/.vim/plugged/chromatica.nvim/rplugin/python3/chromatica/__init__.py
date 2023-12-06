# ============================================================================
# FILE: chromatica.py
# AUTHOR: Yanfei Guo <yanf.guo at gmail.com>
# License: MIT license
# ============================================================================

import pynvim

from chromatica import logger
from chromatica.chromatica import Chromatica

import time

@pynvim.plugin
class ChromaticaPlugin(object):
    def __init__(self, vim):
        self.__vim = vim

    @pynvim.function("_chromatica", sync=True)
    def init_chromatica(self, args):
        self.__chromatica = Chromatica(self.__vim)
        self.__vim.vars["chromatica#_channel_id"] = self.__vim.channel_id

    @pynvim.rpc_export('chromatica_enable_logging', sync=True)
    def enable_logging(self, level, logfile):
        if not self.__chromatica.debug_enabled:
            logger.setup(self.__vim, level, logfile)
            self.__chromatica.debug_enabled = True
            self.__chromatica.dump_debug_info()

    @pynvim.rpc_export("chromatica_highlight")
    def highlight(self, context):
        context["rpc"] = "chromatica_highlight"
        try:
            self.__chromatica.highlight(context)
        except:
            self.__chromatica.debug(context)
            raise

    @pynvim.rpc_export("chromatica_parse")
    def parse(self, context):
        context["rpc"] = "chromatica_parse"
        try:
            self.__chromatica.parse(context)
        except:
            self.__chromatica.debug(context)
            raise

    @pynvim.rpc_export("chromatica_delayed_parse")
    def delayed_parse(self, context):
        context["rpc"] = "chromatica_delayed_parse"
        try:
            self.__chromatica.delayed_parse(context)
        except:
            self.__chromatica.debug(context)
            raise

    @pynvim.rpc_export("chromatica_print_highlight")
    def print_highlight(self, context):
        context["rpc"] = "chromatica_print_highlight"
        try:
            self.__chromatica.print_highlight(context)
        except:
            self.__chromatica.debug(context)
            raise

    @pynvim.rpc_export("chromatica_clear_highlight")
    def clear_highlight(self):
        self.__chromatica.clear_highlight()

    @pynvim.rpc_export("chromatica_show_info", sync=True)
    def show_info(self, context):
        self.__chromatica.show_info(context)

