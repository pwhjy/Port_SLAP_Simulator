let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>', ':p'))
if !s:enter
  finish
endif

echomsg 'You are dead.'
