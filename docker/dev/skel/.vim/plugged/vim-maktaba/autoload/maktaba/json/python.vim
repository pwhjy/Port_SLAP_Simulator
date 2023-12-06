if !exists('s:disable_python')
  let s:disable_python = 0
endif


""
" Disables the Python implementation of the maktaba#json functions in favour
" of the Vimscript implementations.  This is mostly intended for testing, but
" can be used in the event of a problem with the Python implementation.
"
" This must be called before any of the other maktaba#json functions, since
" the decision as to which implementation to use is made on first use.
function! maktaba#json#python#Disable() abort
  if islocked('s:disable_python')
    call maktaba#error#Shout(
       \ 'maktaba#json#python#Disable() has no effect if called after the '
       \ . 'first call to another maktaba#json function.')
  else
    let s:disable_python = 1
  endif
endfunction


""
" Returns whether the Python implementation of the maktaba#json functions is
" disabled, and prevents further changes.
function! maktaba#json#python#IsDisabled() abort
  lockvar s:disable_python
  return s:disable_python
endfunction
