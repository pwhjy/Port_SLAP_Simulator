" Vim syntax file
" Language:	C++
" Current Maintainer:	Yanfei Guo (https://github.com/arakashic)
" Previous Maintainer:	vim-jp (https://github.com/vim-jp/vim-cpp)
" Last Change:	July 21, 2016

" load default c.vim when chromatica is not enabled
if !chromatica#init#_is_enabled()
    \ || !(get(g:, 'chromatica#highlight_feature_level', 0) > 0)
    \ || (get(b:, 'chromatica_fallback', 0) > 0)
    source $VIMRUNTIME/syntax/cpp.vim
    finish
endif

if exists("b:current_syntax")
  finish
endif

" Read the C syntax to start with
runtime! syntax/c.vim
unlet b:current_syntax

let b:current_syntax = 'cpp'

" vim: ts=8
