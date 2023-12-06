from chromatica import logger
from chromatica.util import load_external_module

load_external_module(__file__, "")
from clang import cindex

import os
import re

log = logger.logging.getLogger("chromatica.compile_args")

DEFAULT_STD={"c"   : ["-std=c11"], \
             "cpp" : ["-std=c++14"]}

SOURCE_EXTS=[".c", ".cc", ".cpp", ".cxx"]

def set_default_std(stds):
    DEFAULT_STD = stds
    return True

class CompileArgsDatabase(object):

    def __init__(self, path, global_args=None):
        if path:
            self.__path = path
        else:
            self.__path = os.getcwd()
        self.compile_args = []
        self.cdb = None
        self.__clang_file = None
        self.__cdb_path = None

        if global_args != None:
            self.compile_args = global_args

        self.__find_clang_file()
        self.__find_cdb_file()

        self.__parse_compile_args()
        self.__try_init_cdb()

    def __find_clang_file(self):
        clang_file_path = self.__path
        while os.path.dirname(clang_file_path) != clang_file_path:
            self.__clang_file = os.path.join(clang_file_path, ".clang")
            if os.path.exists(self.__clang_file):
                return
            self.__clang_file = os.path.join(clang_file_path, "compile_flags.txt")
            if os.path.exists(self.__clang_file):
                return
            clang_file_path = os.path.dirname(clang_file_path)

        self.__clang_file = None

    def __find_cdb_file(self):
        cdb_file_path = self.__path
        while os.path.dirname(cdb_file_path) != cdb_file_path:
            cdb_file = os.path.join(cdb_file_path, "compile_commands.json")
            if os.path.exists(cdb_file):
                self.__cdb_path = cdb_file_path
                return
            cdb_file_path = os.path.dirname(cdb_file_path)

    def __parse_cdb_key(self, value):
        cdb_rel_path = value.strip("\"")
        cdb_path = os.path.join(os.path.dirname(self.__clang_file), cdb_rel_path)
        if cdb_path and os.path.isdir(cdb_path):
            self.__cdb_path = cdb_path

    def __parse_compile_args(self):
        if self.__clang_file == None:
            return
        # read .clang file
        fp = open(self.__clang_file)
        lines = fp.readlines()
        fp.close()

        funcs = {"flags" : lambda s, value: s.compile_args.extend(value.split()),
                 "compilation_database" : self.__parse_cdb_key, }

        for line in lines:
            pos = line.find("=")
            if pos != -1:
                key = line[:pos]
                try:
                    funcs[key](self, line[pos+1:].strip())
                except:
                    log.error("Invalid configuration key: ", key)
            else:
                self.compile_args.extend(line.strip().split())

    def __try_init_cdb(self):
        if self.__cdb_path != None:
            try:
                self.cdb = cindex.CompilationDatabase.fromDirectory(self.__cdb_path)
            except:
                log.error("Invalid compilation database file %s" % self.__cdb_path)
                self.__cdb_path = None

    def __get_cdb_args(self, filename):
        res = []
        ret = self.cdb.getCompileCommands(filename)
        _basename = os.path.basename(filename)
        log.info("Read cdb for: %s" % filename)
        if ret:
            for cmds in ret:
                cwd = cmds.directory
                skip = 0
                for arg in cmds.arguments:
                    if skip and arg[0] != "-":
                        skip = 0
                        continue
                    if arg == "-o" or arg == "-c":
                        skip = 1
                        continue

                    if arg.startswith('-I'):
                        include_path = arg[2:]
                        if not os.path.isabs(include_path):
                            include_path = os.path.normpath(
                                os.path.join(cwd, include_path))
                        res.append('-I' + include_path)
                    if arg.startswith('-isystem'):
                        include_path = arg[8:]
                        if not os.path.isabs(include_path):
                            include_path = os.path.normpath(
                                os.path.join(cwd, include_path))
                        res.append('-isystem' + include_path)
                    if _basename in arg:
                        continue;
                    else:
                        res.append(arg)
        else:
            print("Cannot find compile flags for %s in compilation database" % filename)
        return res

    def get_args_filename(self, filename, search_source_args=False):
        ret = None
        if self.cdb != None:
            ret = self.__get_cdb_args(filename)

        if not ret and search_source_args:
            filename_base = os.path.splitext(filename)[0]
            for source_ext in SOURCE_EXTS:
                ret = self.__get_cdb_args(filename_base + source_ext)
                if ret:
                    break

        if ret:
            return self.compile_args + ret
        else:
            return self.compile_args

    def get_args_filename_ft(self, filename, filetype, search_source_args=False):
        if self.cdb != None or filetype not in DEFAULT_STD:
            return self.get_args_filename(filename, search_source_args)

        ret = DEFAULT_STD[filetype]
        return ret + self.compile_args

    @property
    def clang_file(self):
        return self.__clang_file

    @property
    def cdb_file(self):
        if self.__cdb_path:
            return os.path.join(self.__cdb_path, "compile_commands.json")
        else:
            return ""

