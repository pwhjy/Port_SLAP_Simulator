let s:thisplugin = expand('<sfile>:p:h')
if !exists('*maktaba#compatibility#Disable')
  try
    " To check if Maktaba is loaded we must try calling a maktaba function.
    " exists() is false for autoloadable functions that are not yet loaded.
    call maktaba#compatibility#Disable()
  catch /E117:/
    " Maktaba is not installed. Check whether it's in a nearby directory.
    let s:rtpsave = &runtimepath
    " We'd like to use maktaba#path#Join, but maktaba doesn't exist yet.
    let s:slash = exists('+shellslash') && !&shellslash ? '\' : '/'
    let s:guess1 = fnamemodify(s:thisplugin, ':h') . s:slash . 'maktaba'
    let s:guess2 = fnamemodify(s:thisplugin, ':h') . s:slash . 'vim-maktaba'
    if isdirectory(s:guess1)
      let &runtimepath .= ',' . s:guess1
    elseif isdirectory(s:guess2)
      let &runtimepath .= ',' . s:guess2
    endif
    try
      " If we've just installed maktaba, we need to make sure that vi
      " compatibility mode is off. Maktaba does not support vi compatibility.
      call maktaba#compatibility#Disable()
    catch /E117:/
      " No luck.
      let &runtimepath = s:rtpsave
      unlet s:rtpsave
      " We'd like to use maktaba#error#Shout, but maktaba doesn't exist yet.
      echohl ErrorMsg
      echomsg 'Maktaba not found! Glaive depends upon maktaba. Please either:'
      echomsg '1. Place maktaba in the same directory as this plugin.'
      echomsg '2. Add maktaba to your runtimepath before using this plugin.'
      echomsg 'Maktaba can be found at http://github.com/google/vim-maktaba.'
      echohl NONE
      finish
    endtry
  endtry
endif
if !maktaba#IsAtLeastVersion('1.1.0')
  call maktaba#error#Shout('Glaive requires maktaba version 1.1.0.')
  call maktaba#error#Shout('You have maktaba version %s.', maktaba#VERSION)
  call maktaba#error#Shout('Please update your maktaba install.')
endif
let s:plugin = maktaba#plugin#GetOrInstall(s:thisplugin)
call s:plugin.Load('commands')
