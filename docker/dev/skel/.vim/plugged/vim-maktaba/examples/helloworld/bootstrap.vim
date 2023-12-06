" This file is boilerplate that's copied more-or-less verbatim in some maktaba
" plugins so they can be a point of entry for maktaba (i.e., users can just
" source the bootstrap.vim file to get both maktaba and the plugin installed).
" Most plugins don't need a bootstrap file. They're mainly useful for plugin
" managers and other plugins that need to be installed before anything else is.
" Since bootstrap files install maktaba, they can't assume maktaba is already
" available and can't use any of the maktaba utilities to make the code more
" expressive or less verbose.
" Please excuse the mess.

let s:thisplugin = expand('<sfile>:p:h')

if !exists('*maktaba#compatibility#Disable')
  try
    " To check if Maktaba is loaded we must try calling a maktaba function.
    " exists() is false for autoloadable functions that are not yet loaded.
    call maktaba#compatibility#Disable()
  catch /E117:/
    " Maktaba is not installed. Check whether it's in a nearby directory.
    let s:rtpsave = &runtimepath
    let s:search_dirs = [fnamemodify(s:thisplugin, ':h')]
    " Since this plugin lives in maktaba/examples/, fall back to installing
    " maktaba from the containing maktaba repository.
    if fnamemodify(s:thisplugin, ':h:t') is# 'examples'
      let s:search_dirs += [fnamemodify(s:thisplugin, ':h:h:h')]
    endif
    let s:search_paths = []
    " We'd like to use maktaba#path#Join, but maktaba doesn't exist yet.
    let s:slash = exists('+shellslash') && !&shellslash ? '\' : '/'
    for s:search_dir in s:search_dirs
      call add(s:search_paths, s:search_dir . s:slash . 'maktaba')
      call add(s:search_paths, s:search_dir . s:slash . 'vim-maktaba')
    endfor
    for s:search_path in s:search_paths
      if isdirectory(s:search_path)
        let &runtimepath .= ',' . s:search_path
        break
      endif
    endfor

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
      echomsg 'Maktaba not found, but helloworld requires it. Please either:'
      echomsg '1. Place maktaba in the same directory as this plugin.'
      echomsg '2. Add maktaba to your runtimepath before using this plugin.'
      echomsg 'Maktaba can be found at http://github.com/google/vim-maktaba.'
      echohl NONE
      finish
    endtry
  endtry
endif
call maktaba#plugin#GetOrInstall(s:thisplugin)
