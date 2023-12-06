" ============================================================================
" FILE: chromatica.py
" AUTHOR: Yanfei Guo <yanf.guo at gmail.com>
" License: MIT license
" ============================================================================
"
if exists('g:loaded_chromatica')
    finish
endif

if get(g:, 'chromatica#enable_at_startup', 0) "{{{
    augroup chromatica
        autocmd VimEnter * call chromatica#enable()
    augroup END
endif "}}}

command! ChromaticaStart call chromatica#enable()
command! ChromaticaStop call chromatica#disable()
command! ChromaticaToggle call chromatica#toggle()
command! ChromaticaShowInfo call chromatica#show_info()
command! ChromaticaEnableLog call chromatica#enable_logging('INFO', 'chromatica.log')

command! ChromaticaDbgAST call chromatica#handlers#_print_highlight()

let g:loaded_chromatica=1

