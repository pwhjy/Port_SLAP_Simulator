set runtimepath^=~/.vim runtimepath+=~/.vim/after
let &packpath=&runtimepath
try
  source ~/.vimrc
catch /.*/
endtry

call plug#begin('~/.vim/plugged')
Plug 'scrooloose/nerdtree' 

Plug 'jistr/vim-nerdtree-tabs' 

Plug 'google/vim-maktaba'

Plug 'google/vim-codefmt'

Plug 'google/vim-glaive' 

Plug 'yujincheng08/chromatica.nvim', { 'do': ':UpdateRemotePlugins'}

Plug 'vim-scripts/a.vim'

Plug 'junegunn/fzf', { 'do': './install --all' }

Plug 'junegunn/fzf.vim'

Plug 'scrooloose/nerdcommenter'

Plug 'vim-scripts/DoxygenToolkit.vim'

Plug 'skywind3000/asyncrun.vim'

Plug 'tpope/vim-fugitive'

Plug 'drewtempelmeyer/palenight.vim'

Plug 'yujincheng08/nerdtree-git-plugin'

Plug 'neoclide/coc.nvim', {'do': { -> coc#util#install()}}

Plug 'itchyny/lightline.vim'

Plug 'liuchengxu/vista.vim'

call plug#end()

call glaive#Install()

set nu

set hidden

syntax on                                                                                      

set cmdheight=2
set backspace=indent,eol,start 

map <F5> :NERDTreeToggle<cr>
nmap <S-j> :tabp <cr>
nmap <S-k> :tabn <cr>
nmap <S-h> :wincmd h<cr>
nmap <S-l> :wincmd l<cr>

let NERDTreeShowLineNumber = 1
let NERDTreeAutoCentor = 1
let NERDTreeShowBookmarks = 1

" only open NERDTree on console if dir was given
" if set to 1, it always open NERDTree
" if set to 0, it will not open NERDTree
let g:nerdtree_tabs_open_on_console_startup=2

" focus NREDTree if opening a dir, focus file if opening a file
let g:nerdtree_tabs_smart_startup_focus=1

let NERDTreeIgnore=['\.pyc','\~$','\.swp', '\.o']

let g:NERDSpaceDelims = 0

set tabstop=2 "set tab display width 4
set softtabstop=2 " set the backspace width 4 in backspace indent
set shiftwidth=2 "set the autoindent 4 width

"set space to replace tab
set expandtab

inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"

inoremap <silent><expr> <TAB>
      \ pumvisible() ? "<C-n>" :
      \ coc#expandableOrJumpable() ? coc#rpc#request('doKeymap', ['snippets-expand-jump','']) :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()

inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"

nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)
nmap <silent> gn <Plug>(coc-diagnostic-next)
nmap <silent> gp <Plug>(coc-diagnostic-prev)

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

let g:coc_snippet_next = '<tab>'
let g:coc_snippet_prev = '<S-tab>'

let g:chromatica#libclang_path='/usr/lib/x86_64-linux-gnu/libclang-9.so.1'

" let g:chromatica#enable_at_startup=1

augroup autoformat_settings
  autocmd FileType bzl AutoFormatBuffer buildifier
  autocmd FileType c,cpp,proto,javascript AutoFormatBuffer clang-format
  autocmd FileType python AutoFormatBuffer autopep8
augroup END

let $FZF_DEFAULT_COMMAND='fd'
let $FZF_DEFAULT_OPTS = "--bind 'tab:up,shift-tab:down'"

nnoremap <silent> <expr><C-t> (expand('%') =~ 'NERD_tree' ? "\<c-w>\<c-w>" : '').":Files\<CR>"
nnoremap <silent> <expr><C-f> (expand('%') =~ 'NERD_tree' ? "\<c-w>\<c-w>" : '').":Ag\<CR>"
nnoremap <silent> <expr><C-s> ":Vista finder\<CR>"
nnoremap <silent> <expr><A-s> ":CocList --interactive symbols\<CR>"

nnoremap <silent> <F6> :call asyncrun#quickfix_toggle(8, 0)<cr>:call asyncrun#quickfix_toggle(8, 1)<cr>:AsyncRun -cwd=/roadstar /roadstar/roadstar.sh build<CR>
nnoremap <silent> <F7> :call asyncrun#quickfix_toggle(8, 0)<cr>:call asyncrun#quickfix_toggle(8, 1)<cr>:AsyncRun bazel build $(realpath --relative-to="/roadstar" <root>)/...<CR>
nnoremap <silent> <F8> :call asyncrun#quickfix_toggle(8, 0)<cr>:call asyncrun#quickfix_toggle(8, 1)<cr>:AsyncRun bazel build %:h/...<CR>
nnoremap <silent> <F9> :call asyncrun#quickfix_toggle(8)<cr>
nnoremap <silent> <F10> :AsyncStop!<CR>:call asyncrun#quickfix_toggle(8, 0)<cr>

nmap <silent> <expr><Esc> coc#util#has_float() ? "\<Plug>(coc-float-hide)" : "<Esc>"
nmap <silent> <expr><A-CR> "\<Plug>(coc-fix-current)"
nmap <silent> <space> :call CocActionAsync('doHover')<cr>


let g:asyncrun_open=8
let g:asyncrun_bell=1

set mouse=a

let g:DoxygenToolkit_authorName=$USER
let g:DoxygenToolkit_licenseTag="*****************************************************************************\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "Copyright 2019 The Roadstar Authors. All Rights Reserved.\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "Licensed under the Apache License, Version 2.0 (the \"License\")\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "you may not use this file except in compliance with the License.\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "You may obtain a copy of the License at\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "http://www.apache.org/licenses/LICENSE-2.0\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "Unless required by applicable law or agreed to in writing, software\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "distributed under the License is distributed on an \"AS IS\" BASIS,\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "See the License for the specific language governing permissions and\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "limitations under the License.\<enter>"
let g:DoxygenToolkit_licenseTag= g:DoxygenToolkit_licenseTag . "****************************************************************************"

if (has("nvim"))
  "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
  let $NVIM_TUI_ENABLE_TRUE_COLOR=1
endif

set background=dark
colorscheme palenight

if exists('+termguicolors')
  let &t_8f = "\<Esc>[38;2;%lu;%lu;%lum"
  let &t_8b = "\<Esc>[48;2;%lu;%lu;%lum"
  set termguicolors
endif

" Check if NERDTree is open or active
function! IsNERDTreeOpen()        
  return exists("t:NERDTreeBufName") && (bufwinnr(t:NERDTreeBufName) != -1)
endfunction

" Call NERDTreeFind iff NERDTree is active, current window contains a modifiable
" file, and we're not in vimdiff
function! SyncTree()
  if &modifiable && IsNERDTreeOpen() && strlen(expand('%')) > 0 && !&diff
    let t:NERDTreeTabLastWindow = winnr()
    silent! NERDTreeFind
    NERDTreeFocus
    exec t:NERDTreeTabLastWindow . "wincmd w"
  endif
endfunction

" Highlight currently open buffer in NERDTree
autocmd BufEnter * call SyncTree()

let g:NERDTreeGitStatusIncludeSubmodules=1

let g:NERDTreeIndicatorMapCustom = {
    \ "Modified"  : "*",
    \ "Staged"    : "+",
    \ "Untracked" : "~",
    \ "Renamed"   : "»",
    \ "Unmerged"  : "=",
    \ "Deleted"   : "-",
    \ "Dirty"     : "•",
    \ "Clean"     : "✓",
    \ 'Ignored'   : "~",
    \ "Unknown"   : "?"
    \ }

command! -bang -nargs=* -complete=file Make AsyncRun -program=make @ <args>

autocmd CursorHold * silent call CocActionAsync('highlight')

set updatetime=300
" set signcolumn=yes

hi CocHighlightText ctermbg=Gray guibg=#3e4452
hi link CocHighlightRead CocHighlightText
hi link CocHighlightWrite CocHighlightText
hi CocErrorSign ctermfg=Red guifg=#ff5370
hi CocWarningSign ctermfg=Brown guifg=#ffcb6b
hi CocInfoSign ctermfg=Yellow guifg=#bfc7d5
hi CocHintSign ctermfg=Blue guifg=#c3e88d

let g:vista_default_executive = 'coc'

function! NearestMethodOrFunction() abort
  return get(b:, 'vista_nearest_method_or_function', '')
endfunction

set statusline+=%{NearestMethodOrFunction()}

" By default vista.vim never run if you don't call it explicitly.
"
" If you want to show the nearest function in your statusline automatically,
" you can add the following line to your vimrc 
autocmd VimEnter * call vista#RunForNearestMethodOrFunction()

let g:lightline = {
      \ 'colorscheme': 'one',
      \ 'active': {
      \   'left': [ [ 'mode', 'paste', 'method' ],
      \             [ 'gitbranch', 'cocstatus', 'readonly', 'filename', 'modified' ] ]
      \ },
      \ 'component_function': {
      \   'cocstatus': 'coc#status',
      \   'gitbranch': 'fugitive#head',
      \   'method': 'NearestMethodOrFunction'
      \ },
      \ }

autocmd FileType fzf call feedkeys("i\<Bs>")

autocmd User CocJumpPlaceholder call CocActionAsync('showSignatureHelp')
