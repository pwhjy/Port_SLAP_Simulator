"" Deprecated system call API. See maktaba#syscall for the new API.

let s:contexts = ['hidden', 'foreground', 'foreground_pause']
let s:default_context = 'hidden'


""
" @deprecated Use @function(Syscall.GetCommand).
" Join {words} together into a single shell command, escaping if necessary.
" Also accepts a bare string for convenience and simply returns it, with the
" assumption that it's been properly escaped beforehand.
" Functions in maktaba#system# pass any system command arguments to this
" function, allowing you to use lists or escaped strings anywhere.
function! maktaba#system#Command(words) abort
  return maktaba#syscall#Create(a:words).GetCommand()
endfunction

""
" @deprecated Use @function(Syscall.Call) or @function(Syscall.CallForeground).
" Runs {cmd} in [context] and returns a dictionary of results data.
" {cmd} is either a bare string that's already properly escaped or a list of
" "word" strings that are escaped for you.
" [context] is the execution context for the call.
" * 'hidden' executes without affecting vim UI.
" * 'foreground' scrolls the output on-screen as it executes.
" * 'foreground_pause' scrolls the output on-screen and waits for the user to
"   dismiss it when it finishes.
" * '' (the empty string) means to use the default value.  (This is the only way
"   to use the default for this, but specify a non-default value for
"   [throw_errors].)
" @default context='hidden'
" [throw_errors] is whether exit codes should trigger a ShellError to be thrown.
" If 0, the caller is responsible for checking v:shell_error.
" @default throw_errors=1
" Returns a dictionary with the following fields:
" * stdout: the shell command's entire stdout string, if available.
" * stderr: the shell command's entire stderr string, if available.
" @throws WrongType
" @throws BadValue if [context] is unrecognized.
" @throws ShellError if the shell command returns an exit code.
function! maktaba#system#Call(cmd, ...) abort
  let l:execution = maktaba#ensure#IsString(get(a:, 1, ''))
  if empty(l:execution)
    let l:execution = s:default_context
  endif
  call maktaba#ensure#IsIn(l:execution, s:contexts)
  let l:cmd = maktaba#syscall#Create(a:cmd)
  if l:execution ==# 'hidden'
    let l:cmd_fn = maktaba#function#Method(l:cmd, 'Call')
  elseif l:execution ==# 'foreground'
    let l:cmd_fn = maktaba#function#Method(l:cmd, 'CallForeground').WithArgs(0)
  elseif l:execution ==# 'foreground_pause'
    let l:cmd_fn = maktaba#function#Method(l:cmd, 'CallForeground').WithArgs(1)
  else
    " Value was already checked above. This code shouldn't be reachable.
    throw maktaba#error#BadValue(
        \ 'Expected one of "hidden", "foreground", or "foreground_pause".' .
        \ 'Got "%s".', l:execution)
  endif
  return l:cmd_fn.Call(a:000[1:])
endfunction


""
" @deprecated Use @function(Syscall.Call) or @function(Syscall.CallForeground).
" Runs {cmd} from {working_dir} and returns a dictionary of results data.
" * {cmd} is the string to execute as a shell command.
" * {working_dir} is a path for vim to cd into before executing the command (or
"   0). If it's a file instead of a directory, the parent directory will be
" assumed automatically.
" * [context] is the execution context for the call. It should be one of
"   'hidden', 'foreground', or 'foreground_pause'. See @function(#Call) for
"   details.
" @default context='hidden'
" [throw_errors] is whether exit codes should trigger a ShellError to be thrown.
" If 0, the caller is responsible for checking v:shell_error.
" @default throw_errors=1
" Returns a dictionary with the following fields:
" * stdout: the shell command's entire stdout string, if available.
" * stderr: the shell command's entire stderr string, if available.
" @throws WrongType
" @throws BadValue if [context] is unrecognized.
" @throws NotFound if {working_dir} is invalid.
" @throws ShellError if the shell command returns an exit code.
function! maktaba#system#CallAt(cmd, working_dir, ...) abort
  let l:cmd = maktaba#syscall#Create(a:cmd).WithCwd(a:working_dir)
  return call('maktaba#system#Call', [l:cmd] + a:000)
endfunction

""
" @deprecated Use @function(Syscall.And).
" Chain {cmds} together with logical AND operations ('&&').
" {cmds} is a list of shell command strings.
function! maktaba#system#And(cmds) abort
  let l:new_cmd = maktaba#syscall#Create(a:cmds[0])
  for l:cmd in a:cmds[1:]
    let l:new_cmd = l:new_cmd.And(l:cmd)
  endfor
  return l:new_cmd.GetCommand()
endfunction

""
" @deprecated Use @function(Syscall.Or).
" Chain {cmds} together with logical OR operations ('||').
" {cmds} is a list of shell command strings.
function! maktaba#system#Or(cmds) abort
  let l:new_cmd = maktaba#syscall#Create(a:cmds[0])
  for l:cmd in a:cmds[1:]
    let l:new_cmd = l:new_cmd.Or(l:cmd)
  endfor
  return l:new_cmd.GetCommand()
endfunction

""
" @deprecated Use @function(maktaba#syscall#SetUsableShellRegex).
" @private
" Sets the regex that @function(#Call) uses to decide whether 'shell' is
" usable. If 'shell' is unusable, @function(#Call) will use /bin/sh instead. You
" should NOT use this function to make vim use your preferred shell (ESPECIALLY
" if your shell is sh-incompatible) as that will break all plugins using
" @function(#Call) and expecting sh syntax.
"
" Rather, this function is often useful with vim test frameworks, which hijack
" the shell script (to stub it out / verify the commands).
function! maktaba#system#SetUsableShellRegex(regex) abort
  call maktaba#syscall#SetUsableShellRegex(a:regex)
endfunction
