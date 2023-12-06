" =============================================================================
" File: init.vim
" Author: Yanfei Guo <yanf.guo at gmail.com>
" Last Modified: June 18, 2016
" License: MIT License
" based on original version by Shougo Matsushita <Shougo.Matsu at gmail.com>
" =============================================================================

if !exists('s:is_enabled')
    let s:is_enabled = 0
endif

function! s:is_ft(fts) "{{{
    for type in a:fts
        if &filetype == type
            return 1
        endif
    endfor
    return 0
endfunction "}}}

function! chromatica#init#_is_enabled() abort
    return s:is_enabled
endfunction

function! s:is_initialized() abort
    return exists('g:chromatica#_channel_id')
endfunction

function! chromatica#init#_initialize() abort
    if s:is_initialized()
        return
    endif

    augroup chromatica
        autocmd!
    augroup END

    if !has('nvim') || !has('python3')
        call chromatica#util#print_error(
                    \ 'chromatica.nvim does not work with this version.')
        call chromatica#util#print_error(
                    \ 'It requires Neovim with Python3 support("+python3").')
        return 1
    endif

    call chromatica#init#_variables()

    try
        if !exists('g:loaded_remote_plugins')
            runtime! plugin/rplugin.vim
        endif
        call _chromatica()
    catch /^Vim\%((\a\+)\)\=:E117/
        call chromatica#util#print_error(
                    \ 'chromatica.nvim is not registered as Neovim remote plugins.')
        call chromatica#util#print_error(
                    \ 'Please execute :UpdateRemotePlugins command and restart Neovim.')
        return 1
    catch
        call chromatica#util#print_error(
                    \ 'There was an error starting Chromatica. Please check g:chromatica#libclang_path.')
        return 1
    endtry

    let s:is_enabled = g:chromatica#enable_at_startup
    if s:is_enabled
        call chromatica#init#_enable()
    endif
endfunction

function! chromatica#init#_enable() abort
    call chromatica#handlers#_init()
    let s:is_enabled = 1
    if g:chromatica#highlight_feature_level > 0
        if s:is_ft(['c', 'cpp'])
            " load chromatica version of syntax for related filetype
            doautoall Syntax
        endif
    else
        runtime! syntax/chromatica.vim
    endif

    if get(g:, 'chromatica#enable_log', 0) "{{{
        call chromatica#enable_logging('DEBUG', 'chromatica.log')
    endif "}}}

endfunction

function! chromatica#init#_disable() abort
    augroup chromatica
        autocmd!
    augroup END
    let s:is_enabled = 0
    doautoall Syntax
endfunction

function! chromatica#init#buffer_fallback() abort
    let b:chromatica_fallback = 1
    doautoall Syntax
    echom 'Chromatica has fallback to neovim default (no semantic highlight) for current buffer. Check :ChromaticaShowInfo for the error message.'
endfunction

function! chromatica#init#_variables() abort
    let g:chromatica#_context = {}
    let g:chromatica#_rank = {}

    " User variables
    call chromatica#util#set_default(
                \ 'g:chromatica#libclang_path', '/usr/lib/libclang.so')
    call chromatica#util#set_default(
                \ 'g:chromatica#enable_at_startup', 0)
    call chromatica#util#set_default(
                \ 'g:chromatica#enable_log', 0)
    call chromatica#util#set_default(
                \ 'g:chromatica#enable_profiling', 0)
    call chromatica#util#set_default(
                \ 'g:chromatica#syntax_src_id', 100)
    call chromatica#util#set_default(
                \ 'g:chromatica#global_args', [])
    call chromatica#util#set_default(
                \ 'g:chromatica#responsive_mode', 0)
    call chromatica#util#set_default(
                \ 'g:chromatica#delay_ms', 80)
    call chromatica#util#set_default(
                \ 'g:chromatica#use_pch', 1)
    call chromatica#util#set_default(
                \ 'g:chromatica#highlight_feature_level', 1)
    call chromatica#util#set_default(
                \ 'g:chromatica#dotclangfile_search_path', '')
    call chromatica#util#set_default(
                \ 'g:chromatica#search_source_args', 0)
endfunction

function! chromatica#init#_context() abort
    return {
                \ 'changedtick': b:changedtick,
                \ 'highlight_tick': get(b:, 'highlight_tick', 0),
                \ 'range': [line('w0'), line('w$')],
                \ 'position': getpos('.')[1:2],
                \ 'bufnr': bufnr('%'),
                \ 'filename': expand('%:p'),
                \ }
endfunction

" vim: tw=120:foldmarker={{{,}}}:foldmethod=marker:
