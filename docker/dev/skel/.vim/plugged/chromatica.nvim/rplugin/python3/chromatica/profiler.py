# ============================================================================
# FILE: profiler.py
# AUTHOR: Yanfei Guo <yanf.guo at gmail.com>
# License: MIT license
# ============================================================================

import time

class Profiler(object):

    """Basic profiler framework."""

    def null_output(expr):
        return

    def __init__(self, output_fn=null_output, header="[profile]"):
        """TODO: to be defined1. """
        self._output_fn = output_fn
        self._header = header
        self._timestamps = []

    def start(self, tag=""):
        self._timestamps.append((tag, time.clock()))

    def stop(self):
        tend = time.clock()
        ts = self._timestamps.pop(-1)
        tstart = ts[1]
        self._output_fn("%s %s: %.6fs" % (self._header, ts[0], tend - tstart))

    def clear(self):
        self._timestamps.clear()

