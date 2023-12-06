
" NOTE: This file must be vi-compatible, as it is the file that turns vi
" compatibility off. Thus, we cannot use line continuations here (otherwise, the
" file will fail to parse before the function can be called).

""
" @public
" Turns vi-compatibility mode off and issues a warning if it was on.
" Plugins which use maktaba should call this function after installing maktaba
" (or 'set nocompatible' by other means). Maktaba does not support vi
" compatibility; if maktaba is installed without a compatibility check then
" maktaba may die loudly.
function! maktaba#compatibility#Disable() abort
  if &compatible
    set nocompatible
    call maktaba#error#Warn('Vi compatibility mode was on.')
    call maktaba#error#Warn('Maktaba does not support vi compatibility; it has been turned off.')
    call maktaba#error#Warn(':set nocompatible early in your vimrc to avoid this message.')
    call maktaba#error#Warn('See :help compatible for details.')
  endif
endfunction
