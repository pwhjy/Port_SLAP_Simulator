" Legacy clientserver CallAsync support.
" TODO(#190): Remove this implementation.

if !exists('s:num_invocations')
  let s:num_invocations = 0
endif

if !exists('s:pending_invocations')
  let s:pending_invocations = {}
endif

""
" Gets a number uniquely identifying a SyscallInvocation.
function! s:CreateInvocationId()
  let s:num_invocations += 1
  return s:num_invocations
endfunction


""
" @private
function! maktaba#syscall#clientserver#CreateInvocation(syscall, invocation)
    \ abort
  return {
      \ '_id': s:CreateInvocationId(),
      \ '_syscall': a:syscall,
      \ '_invocation': a:invocation,
      \ 'Start': function('maktaba#syscall#clientserver#Start'),
      \ 'Finish': function('maktaba#syscall#clientserver#Finish')}
endfunction


""
" @private
" Marks the SyscallInvocation associated with {id} finished with given
" {exit_code} and executes its callback.
function! maktaba#syscall#clientserver#FinishInvocation(id, exit_code) abort
  try
    try
      let l:invocation = s:pending_invocations[a:id]
    catch /E716:/
      " Key not present.
      call maktaba#error#Shout(
          \ 'CallAsync error: No pending invocation found with ID %d.',
          \ a:id)
      return
    endtry
    unlet s:pending_invocations[a:id]
    call l:invocation.Finish(a:exit_code)
  catch
    " Uncaught errors from here would be sent back to the --remote-expr command
    " line, but vim can't do anything useful with them from there. Catch and
    " shout them here instead.
    call maktaba#error#Shout('Error from CallAsync callback: %s', v:exception)
  endtry
endfunction


""
" @private
" @dict SyscallClientServerInvocation
" Calls |system()| asynchronously, and invokes the invocation's callback once
" the command completes, passing in stdout, stderr and exit code to it.
" The legacy clientserver implementation for @function(#CallAsync).
" Returns empty dict for convenience, to satisfy DoSyscallCommon signature.
function! maktaba#syscall#clientserver#Start() abort dict
  let self._outfile = tempname()
  let self._errfile = tempname()
  let l:callback_cmd = [
      \ v:progname,
      \ '--servername ' . v:servername,
      \ '--remote-expr',
      \ printf('"maktaba#syscall#clientserver#FinishInvocation(%d, $?)"',
          \ self._id)]
  let l:full_cmd = printf('(%s; %s >/dev/null) > %s 2> %s &',
      \ self._syscall.GetCommand(),
      \ join(l:callback_cmd, ' '),
      \ self._outfile,
      \ self._errfile)

  let s:pending_invocations[self._id] = self
  if has_key(self._syscall, 'stdin')
    call system(l:full_cmd, self._syscall.stdin)
  else
    call system(l:full_cmd)
  endif
  return {}
endfunction


""
" @private
" @dict SyscallClientServerInvocation
function! maktaba#syscall#clientserver#Finish(exit_code) abort dict
  let l:result_dict = {
      \ 'status': a:exit_code}
  let l:result_dict.stdout = join(readfile(self._outfile), "\n")
  call delete(self._outfile)
  if filereadable(self._errfile)
    let l:result_dict.stderr = join(readfile(self._errfile), "\n")
    call delete(self._errfile)
  endif
  call self._invocation.Finish(l:result_dict)
endfunction
