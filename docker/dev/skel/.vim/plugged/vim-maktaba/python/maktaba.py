"""Utility code to enhance pure vimscript implementations in maktaba.

Since maktaba does not officially require python support, these utilities are
not on the critical path of maktaba functionality, but offer slight enhancements
in behavior or performance over the corresponding pure-vimscript fallbacks.
"""

# NOTE: Code should only be added here as a last resort. Use a pure vimscript
# implementation if at all possible, even if the code is uglier. Or you can
# always add python code to a separate plugin.

import difflib
import vim


def OverwriteBufferLines(startline, endline, lines):
  """Overwrite lines from startline to endline in the current buffer withlines.

  Computes a diff and replaces individual chunks to avoid disturbing unchanged
  lines. The cursor isn't moved except where appropriate, such as when deleting
  a line from above the cursor.

  Args:
    startline: The 1-based index of the first line to replace.
    endline: The 1-based index of the last line to replace.
    lines: A list of text lines to replace into the current buffer.
  """
  orig_lines = vim.current.buffer[startline-1:endline]
  sequence = difflib.SequenceMatcher(None, orig_lines, lines)
  offset = startline - 1
  for tag, i1, i2, j1, j2 in reversed(sequence.get_opcodes()):
    if tag is not 'equal':
      vim.current.buffer[i1+offset:i2+offset] = lines[j1:j2]
