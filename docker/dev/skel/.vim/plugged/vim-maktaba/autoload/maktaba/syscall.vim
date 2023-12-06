"" Utilities for making system calls and dealing with the shell.

let s:plugin = maktaba#Maktaba()

if !exists('s:usable_shell')
  let s:usable_shell = '\v^/bin/sh$'
endif

if !exists('s:async_disabled')
  let s:async_disabled = 0
endif

if !exists('s:vimjob_disabled')
  let s:vimjob_disabled = 0
endif

if !exists('s:force_sync_fallback_allowed')
  let s:force_sync_fallback_allowed = 0
endif


""
" Escape the special chars in a {string}.  This is useful for when "execute
" '!foo'" is used. The \ is then removed again by the :! command.  See helpdocs
" on shellescape.
function! s:EscapeSpecialChars(string) abort
  return escape(a:string, '!%#')
endfunction


""
" Escapes a string for the shell, but only if it contains special characters
" (anything besides letters, numbers, or [-=/.:_]) or is empty (in which case
" it needs to be quoted so it counts as an argument).
function! s:SoftShellEscape(word) abort
  if a:word =~# '\m^[-=/.:_[:alnum:]]\+$'
    " Simple value, no need to escape.
    return a:word
  endif
  return shellescape(a:word)
endfunction


""
" Execute {syscall} using the specific call implementation {CallFunc}, handling
" settings overrides and error propagation.
" Used to implement @function(#Call) and @function(#CallForeground).
" @throws ShellError if {syscall} returns non-zero exit code and {throw_errors}
"     is 1.
function! s:DoSyscallCommon(syscall, CallFunc, throw_errors) abort
  call maktaba#ensure#IsBool(a:throw_errors)
  let l:return_data = {}

  " Force shell to /bin/sh since vim only works properly with POSIX shells.
  " If the shell is a whitelisted wrapper, override the wrapped shell via $SHELL
  " instead.
  let l:shell_state = maktaba#value#SaveAll(['&shell', '$SHELL'])
  if &shell !~# s:usable_shell
    set shell=/bin/sh
  endif
  if $SHELL !~# s:usable_shell
    let $SHELL = '/bin/sh'
  endif

  try
    let l:return_data = maktaba#function#Apply(a:CallFunc)
  finally
    " Restore configured shell.
    call maktaba#value#Restore(l:shell_state)
  endtry

  if !a:throw_errors || !v:shell_error
    return l:return_data
  endif

  " Translate exit code into thrown ShellError.
  let l:err_msg = 'Error running: %s'
  if has_key(l:return_data, 'stderr')
    let l:err_msg .= "\n" . l:return_data.stderr
  endif
  throw maktaba#error#Message('ShellError', l:err_msg, a:syscall.GetCommand())
endfunction


""
" @private
" @dict Syscall
" Calls |system()| and returns a stdout/stderr dict.
" The specific implementation for @function(#Call).
function! maktaba#syscall#DoCall() abort dict
  let l:error_file = tempname()
  let l:return_data = {}
  try
    let l:full_cmd = printf('%s 2> %s', self.GetCommand(), l:error_file)
    let l:return_data.stdout = has_key(self, 'stdin') ?
        \ system(l:full_cmd, self.stdin) :
        \ system(l:full_cmd)
  finally
    if filereadable(l:error_file)
      let l:return_data.stderr = join(add(readfile(l:error_file), ''), "\n")
      call delete(l:error_file)
    endif
  endtry
  return l:return_data
endfunction


""
" @public
" Returns whether the current vim session supports asynchronous calls.
function! maktaba#syscall#IsAsyncAvailable() abort
  return !s:async_disabled && (
      \ (!s:vimjob_disabled && has('job')) ||
      \ (has('clientserver') && !empty(v:servername)))
endfunction


""
" @private
" @dict Syscall
" Executes the ! command and returns empty dict, respecting {pause}.
" The specific implementation for @function(#CallForeground).
function! maktaba#syscall#DoCallForeground(pause) abort dict
  let l:return_data = {}
  if a:pause
    execute '!' . s:EscapeSpecialChars(self.GetCommand())
  else
    silent execute '!' . s:EscapeSpecialChars(self.GetCommand())
    redraw!
  endif
  return l:return_data
endfunction

""
" @dict Syscall
" A maktaba representation of a system call, which is used to configure and
" execute a system command.


""
" Creates a @dict(Syscall) object that can be used to execute {cmd} with
" @function(Syscall.Call).
" {cmd} may be a pre-escaped string, a list of words to be automatically escaped
" and joined. Also accepts an existing Syscall object and returns it for
" convenience.
" @throws WrongType
function! maktaba#syscall#Create(cmd) abort
  if maktaba#value#IsDict(a:cmd)
    return a:cmd
  endif
  return {
      \ 'cmd': maktaba#ensure#TypeMatchesOneOf(a:cmd, ['', []]),
      \ 'WithCwd': function('maktaba#syscall#WithCwd'),
      \ 'WithStdin': function('maktaba#syscall#WithStdin'),
      \ 'And': function('maktaba#syscall#And'),
      \ 'Or': function('maktaba#syscall#Or'),
      \ 'Call': function('maktaba#syscall#Call'),
      \ 'CallAsync': function('maktaba#syscall#CallAsync'),
      \ 'CallForeground': function('maktaba#syscall#CallForeground'),
      \ 'GetCommand': function('maktaba#syscall#GetCommand')}
endfunction


""
" @dict Syscall
" Returns a copy of the @dict(Syscall) configured to be executed in {directory}.
" @throws WrongType
" @throws NotFound if {directory} is invalid.
function! maktaba#syscall#WithCwd(directory) abort dict
  let l:directory = a:directory
  if !isdirectory(l:directory) && filereadable(l:directory)
    let l:directory = fnamemodify(l:directory, ':h')
  endif
  if !isdirectory(l:directory)
    throw maktaba#error#NotFound('Directory %s does not exist.', l:directory)
  endif
  let l:new_cmd = copy(self)
  let l:orig_cmd_value = self.cmd
  let l:new_cmd.cmd = ['cd', l:directory]
  return l:new_cmd.And(l:orig_cmd_value)
endfunction


""
" @dict Syscall
" Configures {input} to be passed via stdin to the command.
" Only supported for @function(Syscall.Call). Calling
" @function(Syscall.CallForeground) on a Syscall with stdin specified will
" cause |ERROR(NotImplemented)| to be thrown.
" @throws WrongType
function! maktaba#syscall#WithStdin(input) abort dict
  let l:new_cmd = copy(self)
  let l:new_cmd.stdin = maktaba#ensure#IsString(a:input)
  return l:new_cmd
endfunction

""
" @dict Syscall
" Returns a new @dict(Syscall) that chains self and {cmd} together with a
" logical AND operation ("&&").
" {cmd} may be any valid @function(#Create) argument.
" @throws WrongType
function! maktaba#syscall#And(cmd) abort dict
  let l:cmd_string = maktaba#syscall#Create(a:cmd).GetCommand()
  let l:new_cmd = copy(self)
  let l:new_cmd.cmd = join([self.GetCommand(), l:cmd_string], ' && ')
  return l:new_cmd
endfunction


""
" @dict Syscall
" Returns a new @dict(Syscall) that chains self and {cmd} together with a
" logical OR operation ("&&").
" {cmd} may be any valid @function(#Create) argument.
" @throws WrongType
function! maktaba#syscall#Or(cmd) abort dict
  let l:cmd_string = maktaba#syscall#Create(a:cmd).GetCommand()
  let l:new_cmd = copy(self)
  let l:new_cmd.cmd = join([self.GetCommand(), l:cmd_string], ' || ')
  return l:new_cmd
endfunction


""
" @dict Syscall
" Executes the system call without showing output to the user.
" If [throw_errors] is 1, any non-zero exit code from the command will cause a
" ShellError to be thrown. Otherwise, the caller is responsible for checking
" |v:shell_error| and handling error conditions.
" @default throw_errors=1
" Returns a dictionary with the following fields:
" * stdout: the shell command's entire stdout string, if available.
" * stderr: the shell command's entire stderr string, if available.
" @throws WrongType
" @throws ShellError if the shell command returns a non-zero exit code.
function! maktaba#syscall#Call(...) abort dict
  let l:throw_errors = maktaba#ensure#IsBool(get(a:, 1, 1))
  let l:call_func = maktaba#function#Create('maktaba#syscall#DoCall', [], self)
  return s:DoSyscallCommon(self, l:call_func, l:throw_errors)
endfunction


""
" @dict Syscall
" Executes the system call asynchronously and invokes {callback} on completion.
" If the current vim instance does not support async execution (details below),
" setting {allow_sync_fallback} allows the system call to be executed
" synchronously as a fallback instead of failing with an error.
"
" Returns a @dict(SyscallInvocation) to interact with the invocation, check
" status, etc.
"
" {callback} function will be called with the SyscallInvocation as an argument,
" as {callback}(SyscallInvocation), and the invocation provides access to
" stdout, stderr and status (code).
" For example: >
"   function Handler(result) abort
"     if a:result.status != 0
"       call maktaba#error#Shout('sleep command failed: %s', a:result.stderr)
"       return
"     endif
"     echomsg 'Success!'
"   endfunction
"   call maktaba#syscall#Create(['sleep', '3']).CallAsync('Handler', 1)
" <
" WARNING: The callback is responsible for checking SyscallInvocation.status and
" handling unexpected exit codes. Otherwise all syscall failures are silent.
"
" NOTE: If {callback} depends on cursor location or other vim state, the caller
" should capture parameters and bind them to the callback: >
"   function ReplaceLineHandler(env, result) abort
"     if a:result.status != 0
"       call maktaba#error#Shout('date call failed: %s', a:result.stderr)
"       return
"     endif
"     execute 'buffer' a:env.buffer
"     call maktaba#buffer#Overwrite(a:env.line, a:env.line, [a:result.stdout])
"   endfunction
"   let env = {'buffer': bufnr('%'), 'line': line('.')}
"   let callback = maktaba#function#Create('ReplaceLineHandler', [env])
"   call maktaba#syscall#Create(['date']).CallAsync(callback, 1, 0)
" <
"
" As a legacy fallback, if the callback fails expecting more arguments, it will
" be called with the arguments: {callback}(env_dict, SyscallInvocation), where
" env_dict contains tab, buffer, path, column and line info. This fallback will
" be deprecated and stop working in future versions of maktaba.
"
" Asynchronous calls are executed via vim's |job| support. If the vim instance
" is missing job support, this will try to fall back to legacy |clientserver|
" invocation, which has a few preconditions of its own (see below). If neither
" option is available, asynchronous calls are not possible, and the call will
" either throw |ERROR(MissingFeature)| or fall back to synchronous calls,
" depending on the {allow_sync_fallback} parameter.
"
" The legacy fallback executes calls via |--remote-expr| using vim's
" |clientserver| capabilities, so the preconditions for it are vim being
" compiled with +clientserver and |v:servername| being set. Vim will try to set
" it to something when it starts if it is running in X context, e.g. 'GVIM1'.
" Otherwise, the user needs to set it by passing |--servername| $NAME to vim.
" @throws WrongType
" @throws MissingFeature if neither async execution nor fallback is available.
function! maktaba#syscall#CallAsync(Callback, allow_sync_fallback) abort dict
  call maktaba#ensure#IsBool(a:allow_sync_fallback)
  let l:invocation = maktaba#syscall#invocation#Create(
      \ self,
      \ maktaba#ensure#IsCallable(a:Callback))
  if !maktaba#syscall#IsAsyncAvailable()
    if a:allow_sync_fallback || s:force_sync_fallback_allowed
      call s:plugin.logger.Warn('Async support not available. ' .
          \ 'Falling back to synchronous execution for system call: ' .
          \ self.GetCommand())
      let l:return_data = self.Call(0)
      let l:return_data.status = v:shell_error
      call l:invocation.Finish(l:return_data)
      return l:invocation
    else
      " Neither async nor sync is available. Throw error with salient reason.
      if s:async_disabled
        let l:reason = 'disabled by maktaba#syscall#SetAsyncDisabled'
      else
        let l:reason = 'no +job support and no fallback available'
      endif
      throw maktaba#error#MissingFeature(
          \ 'Cannot run async commands (%s). See :help Syscall.CallAsync',
          \ l:reason)
    endif
  endif

  if !s:vimjob_disabled && has('job')
    let l:vimjob_invocation =
        \ maktaba#syscall#async#CreateInvocation(self, l:invocation)
    call l:vimjob_invocation.Start()
  else
    " TODO(#190): Remove clientserver implementation.
    let l:clientserver_invocation =
        \ maktaba#syscall#clientserver#CreateInvocation(self, l:invocation)
    let l:call_func =
        \ maktaba#function#Method(l:clientserver_invocation, 'Start')
    " Errors indicate a problem with the CallAsync implementation, so they're
    " thrown as ERROR(Failure) and not expected to be caught by callers.
    try
      call s:DoSyscallCommon(self, l:call_func, 1)
    catch /ERROR(ShellError):/
      throw maktaba#error#Failure('Problem dispatching async syscall: %s',
          \ maktaba#error#Split(v:exception)[1])
    endtry
  endif

  return l:invocation
endfunction


""
" @dict Syscall
" Executes the system call in the foreground, showing the output to the user.
" If {pause} is 1, output will stay on the screen until the user presses Enter.
" If [throw_errors] is 1, any non-zero exit code from the command will cause a
" ShellError to be thrown. Otherwise, the caller is responsible for checking
" |v:shell_error| and handling error conditions.
" @default throw_errors=1
" Returns a dictionary with the following fields:
" * stdout: the shell command's entire stdout string, if available.
" * stderr: the shell command's entire stderr string, if available.
" @throws WrongType
" @throws ShellError if the shell command returns a non-zero exit code.
" @throws NotImplemented if stdin has been specified for this Syscall.
function! maktaba#syscall#CallForeground(pause, ...) abort dict
  let l:throw_errors = maktaba#ensure#IsBool(get(a:, 1, 1))
  if !has_key(self, 'stdin')
    let l:call_func = maktaba#function#Create(
        \ 'maktaba#syscall#DoCallForeground', [a:pause], self)
    return s:DoSyscallCommon(self, l:call_func, l:throw_errors)
  endif
  throw maktaba#error#NotImplemented(
      \ 'Stdin value cannot be used with CallForeground.')
endfunction


""
" @dict Syscall
" Gets the literal command string that would be executed by
" @function(Syscall.Call) or @function(Syscall.CallForeground), with words
" joined and special characters escaped.
function! maktaba#syscall#GetCommand() abort dict
  if maktaba#value#IsString(self.cmd)
    " Accept strings for convenience, return as-is.
    return self.cmd
  endif
  let l:words = map(copy(self.cmd), 'maktaba#string#Strip(v:val)')
  let l:words = map(l:words, 's:SoftShellEscape(v:val)')
  return join(l:words)
endfunction


""
" @private
" Sets the regex that @function(Syscall.Call), @function(Syscall.CallAsync), and
" @function(Syscall.CallForeground) use to decide whether 'shell' is usable. If
" 'shell' is unusable, they will use /bin/sh instead. You should NOT use this
" function to make vim use your preferred shell (ESPECIALLY if your shell is
" sh-incompatible) as that will break all plugins using |maktaba#syscall| and
" expecting sh syntax.
"
" Rather, this function is often useful with vim test frameworks, which hijack
" the shell script (to stub it out / verify the commands).
function! maktaba#syscall#SetUsableShellRegex(regex) abort
  call maktaba#ensure#IsString(a:regex)
  let s:usable_shell = a:regex
endfunction


""
" @private
" Gets the regex that @function(Syscall.Call), @function(Syscall.CallAsync), and
" @function(Syscall.CallForeground) use to decide whether 'shell' is usable.
function! maktaba#syscall#GetUsableShellRegex() abort
  return s:usable_shell
endfunction


""
" Disables asynchronous calls if {disabled} is true. Enables otherwise.
function! maktaba#syscall#SetAsyncDisabledForTesting(disabled) abort
  let s:async_disabled = maktaba#ensure#IsBool(a:disabled)
endfunction


""
" Sets whether to override @function(Syscall.CallAsync)'s allow_sync_fallback
" argument and unconditionally {force} it to 1. Passing 0 restores normal
" behavior.
function! maktaba#syscall#ForceSyncFallbackAllowedForTesting(force) abort
  let s:force_sync_fallback_allowed = maktaba#ensure#IsBool(a:force)
endfunction


""
" @private
" Disables vim job async implementation if {disabled} is true. Enables
" otherwise.
function! maktaba#syscall#SetVimjobDisabledForTesting(disabled) abort
  let s:vimjob_disabled = maktaba#ensure#IsBool(a:disabled)
endfunction
