let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif

call s:plugin.Flag('empty', 0)
call s:plugin.Flag('number', 0)
call s:plugin.Flag('float', 0.0)
call s:plugin.Flag('string', '')
call s:plugin.Flag('list', [])
call s:plugin.Flag('dict', {})
call s:plugin.Flag('function', function('empty'))
