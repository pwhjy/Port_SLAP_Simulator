""
" @section Python, python
" Maktaba offers some utilities for using Python consistently in plugins and
" uses Python if available for a few of its own operations to improve
" behavior/performance.
"
" @subsection Compatibility
" Vim can be compiled without any Python support, with the Python 2 interface
" only, with the Python 3 interface, or with support for either (with lots of
" caveats). See |if_pyth.txt| for context.
"
" Maktaba maintains compatibility with both Python 2 and Python 3, and can help
" plugins built on Maktaba to work with both versions, but there are still some
" unavoidable corner cases to be aware of:
" * Plugin authors need to use Python syntax and imports compatible with both
"   versions if they intend to support both versions. Maktaba can't magically
"   fix those kinds of incompatibilities for you.
" * For executing Python statements, explicitly detecting the version and
"   invoking |:python| or |:python3| is still the best way (and see
"   |script-here| to avoid errors).
" * Catching errors gets tricky. Python errors tend to surface as multiple lines
"   of exception with "Traceback" or other output above the actual error, and
"   the error types can vary (Maktaba does not attempt to catch and canonicalize
"   errors from the different implementations and fallbacks).
" * For users who try to use |python-2-and-3|, Maktaba may break the tie and
"   trigger Python 3 to load, breaking plugins that subsequently try to use
"   Python 2 (because a single vim instance can't run both).


let s:python_command = has('python3') ? 'python3' : 'python'


""
" Imports python module {name} into vim from {plugin}.
" Checks for {name} in the plugin's python/ subdirectory for the named module.
"
" For example:
" >
"   call maktaba#python#ImportModule(maktaba#plugin#Get('foo'), 'foo.bar')
"   python print foo.bar
" <
" will print something like
"
"   <module 'foo.bar' from 'repopath/foo/python/foo/bar.py'>
"
" @throws NotFound if the module or python/ subdirectory wasn't found.
" @throws MissingFeature if vim instance is missing Python support.
function! maktaba#python#ImportModule(plugin, name) abort
  if !has('python3') && !has('python')
    throw maktaba#error#MissingFeature('Requires either +python3 or +python')
  endif
  let l:path = maktaba#path#Join([a:plugin.location, 'python'])
  execute s:python_command 'import sys, vim'
  execute s:python_command "sys.path.insert(0, vim.eval('l:path'))"
  try
    execute s:python_command 'import ' . a:name
  catch /Vim(python3\?\|return):/  " return is used by Neovim (https://github.com/neovim/neovim/issues/7294).
    throw maktaba#error#NotFound('Python module %s', a:name)
  finally
    execute s:python_command 'del sys.path[:1]'
  endtry
endfunction


""
" Evaluate python {expr} and return the result.
"
" Polyfill for vim's |pyeval()| or |py3eval()| that works on vim versions older
" than 7.3.569. You can call pyeval() directly if you don't intend to support
" vim versions older than that.
"
" Supports simple types (number, string, list, dict), but not other python-only
" types like None, True, or False that have no direct vimscript analog. Those
" will fail on older vim versions, so either take care to avoid them in the
" return value or just skip the polyfill and use pyeval() directly.
"
" WARNING: This will not have access to l: or a: variables from the caller, so
" use `vim.eval()` with caution inside {expr}. Call pyeval() directly if you
" need to access those. Inlining simple values into {expr} can also work, but
" watch out for issues with string quoting, etc.
"
" @throws MissingFeature if vim instance is missing Python support.
function! maktaba#python#Eval(expr) abort
  if !has('python3') && !has('python')
    throw maktaba#error#MissingFeature('Requires either +python3 or +python')
  endif

  if exists('*py3eval')
    return py3eval(a:expr)
  elseif exists('*pyeval')
    return pyeval(a:expr)
  endif

  execute s:python_command 'import json, vim'
  execute s:python_command
      \ "vim.command('return ' + json.dumps(eval(vim.eval('a:expr'))))"
endfunction
