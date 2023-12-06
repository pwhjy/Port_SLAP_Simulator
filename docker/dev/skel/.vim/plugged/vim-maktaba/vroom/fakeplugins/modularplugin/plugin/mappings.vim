let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif

echomsg 'Ha ha ha, now your key presses belong to me!'
