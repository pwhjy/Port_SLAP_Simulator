let s:maktaba = maktaba#Maktaba()


""
" Returns 1 if filetype detection is enabled in vim, 0 otherwise.
function! maktaba#filetype#IsEnabled() abort
  let l:settings = maktaba#command#GetOutput('filetype')
  return matchstr(l:settings, '\vdetection:\zs(ON|OFF)') ==# 'ON'
endfunction


""
" @usage [reload]
" Enables new filetypes. This function should be called when plugins have been
" loaded after normal plugin load time is completed (in which case
" ftdetect/ftplugin/indent/syntax files would otherwise be ignored). It acts as
" follows:
"
" - If filetype detection is enabled, filetype detection is cycled. This means
"   that all ftdetect rules in new plugins will come into effect. ftplugin and
"   indent usage are respected: maktaba will neither enable nor disable
"   ftplugin/indent functionality.
" - If syntax highlighting is on, syntax highlighting will not be re-applied.
"   The user must re-edit any existing buffers to get updated highlights.
" - If [reload] is set, BufRead autocmds will be refired. This will cause all
"   open buffers to undergo the filetype detection phase again, causing
"   ftplugin, syntax, and indent rules to be applied to existing buffers.
"
" @default reload=0
function! maktaba#filetype#Cycle(...) abort
  let l:reload = get(a:, 1)

  if maktaba#filetype#IsEnabled()
    call s:maktaba.logger.Info(
        \ 'Cycling filetype off and on to pick up newly-loaded behavior.')
    filetype off
    filetype on
  endif

  if l:reload
    call s:maktaba.logger.Info('Firing BufRead event to update active buffers.')
    doautoall BufRead
  endif
endfunction
