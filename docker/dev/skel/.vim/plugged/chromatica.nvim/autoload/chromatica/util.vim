" =============================================================================
" File: util.vim
" Author: Yanfei Guo
" Last Modified: June 18, 2016
" License: MIT License
" based on original version by Shougo Matsushita <Shougo.Matsu at gmail.com>
" =============================================================================

function! chromatica#util#set_default(var, val, ...)  abort
    if !exists(a:var) || type({a:var}) != type(a:val)
        let alternate_var = get(a:000, 0, '')

        let {a:var} = exists(alternate_var) ?
                    \ {alternate_var} : a:val
    endif
endfunction

function! chromatica#util#string(expr) abort
    return type(a:expr) ==# v:t_string ? a:expr : string(a:expr)
endfunction

function! chromatica#util#print_error(string, ...) abort
    let name = a:0 ? a:1 : 'chromatica'
    echohl Error | echomsg printf('[%s] %s', name,
                \ chromatica#util#string(a:string)) | echohl None
endfunction

function! chromatica#util#print_warning(string) abort
    echohl WarningMsg | echomsg '[chromatica] '
                \ . chromatica#util#string(a:string) | echohl None
endfunction

function! chromatica#util#print_debug(string) abort
    echomsg '[chromatica] ' . chromatica#util#string(a:string)
endfunction

function! chromatica#util#neovim_version() abort
    redir => v
    silent version
    redir END
    return split(v, '\n')[0]
endfunction

" vim: tw=120:foldmarker={{{,}}}:foldmethod=marker:
