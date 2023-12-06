
"" Removes all autocmds in {augroup}, then removes {augroup}.
function! maktaba#autocmd#ClearGroup(augroup) abort
  execute 'autocmd!' a:augroup
  execute 'augroup!' a:augroup
endfunction
