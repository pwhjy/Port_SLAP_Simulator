let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif

throw maktaba#error#Message('Nope', 'You opted in to the wrong mappings.')
