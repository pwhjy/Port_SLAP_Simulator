" CallAsync implementation using vim's job support.

""
" @private
function! maktaba#syscall#async#CreateInvocation(syscall, invocation) abort
  return {
      \ '_syscall': a:syscall,
      \ '_invocation': a:invocation,
      \ '_stdout': [],
      \ '_stderr': [],
      \ 'Start': function('maktaba#syscall#async#Start'),
      \ 'HandleStdout': function('maktaba#syscall#async#HandleStdout'),
      \ 'HandleStderr': function('maktaba#syscall#async#HandleStderr'),
      \ 'HandleJobExit': function('maktaba#syscall#async#HandleJobExit')}
endfunction


""
" @private
" @dict SyscallVimjobInvocation
" Dispatches syscall through |job_start()|, and invokes the invocation's
" callback once the command completes, passing in stdout, stderr and exit code
" to it.
" The vim job implementation for @function(#CallAsync).
function! maktaba#syscall#async#Start() abort dict
  " Unlike system, job_start doesn't automatically create a shell
  if &shell =~# maktaba#syscall#GetUsableShellRegex()
    let shell_command = [&shell, &shellcmdflag, self._syscall.GetCommand()]
  else
    let shell_command = ['sh', '-c', self._syscall.GetCommand()]
  endif
  let self._job = job_start(shell_command, {
      \ 'out_mode': 'raw',
      \ 'err_mode': 'raw',
      \ 'out_cb': self.HandleStdout,
      \ 'err_cb': self.HandleStderr,
      \ 'exit_cb': self.HandleJobExit})
  let l:channel = job_getchannel(self._job)
  " Send stdin immediately and close. Streaming input to stdin not supported.
  if has_key(self._syscall, 'stdin')
    call ch_sendraw(l:channel, self._syscall.stdin)
  endif
  call ch_close_in(l:channel)
endfunction


""
" @private
" @dict SyscallVimjobInvocation
function! maktaba#syscall#async#HandleStdout(unused_channel, message)
    \ abort dict
  call add(self._stdout, a:message)
endfunction


""
" @private
" @dict SyscallVimjobInvocation
function! maktaba#syscall#async#HandleStderr(unused_channel, message)
    \ abort dict
  call add(self._stderr, a:message)
endfunction


""
" @private
" @dict SyscallVimjobInvocation
function! maktaba#syscall#async#HandleJobExit(unused_job, status) abort dict
  " NOTE: Stdout & stderr are joined w/o newline separator since IO mode is raw.
  call self._invocation.Finish({
      \ 'status': a:status,
      \ 'stdout': join(self._stdout, ''),
      \ 'stderr': join(self._stderr, '')})
endfunction
