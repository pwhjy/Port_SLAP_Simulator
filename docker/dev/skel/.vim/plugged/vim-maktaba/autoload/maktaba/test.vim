" Copied from maktaba/path.vim, which Override may not depend upon.
let s:is_windows = exists('+shellslash')
let s:use_backslash = s:is_windows && !&shellslash
let s:slash = s:use_backslash ? '\' : '/'

" Nonce to generate unique nonexistent autoload func name that won't collide.
let s:nonce = localtime()


""
" Simplified version of |maktaba#function#Call|.
" Code assumes arguments have appropriate types.
let s:apply_function_lines = [
    \ 'function! s:ApplyFunction(F, ...) abort',
    \ '  let l:args = get(a:, 1, [])',
    \ '  if type(a:F) == type({})',
    \ '    let l:dict = get(a:, 2, a:F.dict)',
    \ '    return s:ApplyFunction(a:F.func, a:F.arglist + l:args, l:dict)',
    \ '  endif',
    \ '  let l:dict = get(a:, 2)',
    \ '  if type(l:dict) == type({})',
    \ '    return call(a:F, l:args, l:dict)',
    \ '  endif',
    \ '  return call(a:F, l:args)',
    \ 'endfunction',
    \]


""
" Force vim to load file under {rootpath} that defines autoload {funcname}.
" Manually sourcing the file doesn't work reliably since vim 8.0.1378.
function! s:ForceLoadAutoload(rootpath, funcname) abort
  let l:prev_rtp = &runtimepath
  try
    let &runtimepath = a:rootpath
    " Force autoload by triggering an autoload func call that can never work.
    " Adding a unique suffix to the function name gives a name in the same
    " autoload namespace that won't be defined. The nonce makes it especially
    " unlikely that a function with the same name would already exist.
    let l:nonexistent_func_name = a:funcname . 'NonexistentFunc_' . s:nonce
    silent! execute 'call' l:nonexistent_func_name . '()'
  finally
    let &runtimepath = l:prev_rtp
  endtry
endfunction


""
" Overrides the function {target} such that when it is called, {replacement} is
" called instead. This is particularly useful for overloading autoloaded
" functions, which can only be done in files that are named correctly.
" (name#spaced#Function must be defined in .../name/spaced.vim).
"
" You can de-override the function via the 'runtime' command, for example:
" >
"   runtime autoload/name/spaced.vim
" <
" will source the original name/spaced.vim, clobbering the overridden function.
"
" Due to vim's naming limitations, this function must make (and source) an
" adequately named temporary file. As such, {replacement} MUST be a string,
" funcref, or funcdict usable from any given scope (i.e., not script-local).
function! maktaba#test#Override(target, replacement) abort
  " This function cannot use maktaba autoload functions, as those may be the
  " target of the Override. Hence the complexity.

  " call maktaba#ensure#IsString(a:target)
  if type(a:target) != type('')
    throw 'ERROR(WrongType): Target autoload function name must be a string.'
  endif

  " call maktaba#ensure#TypeMatchesOneOf(a:replacement, ['', {}])
  if type(a:replacement) != type('') && type(a:replacement) != type({})
    throw 'ERROR(WrongType):' .
        \ ' Autoload function replacement must be a string or funcdict.'
  endif

  let l:tmpdir = tempname()
  " The parts of name#spaced#Function are ['name', 'spaced', 'Function']
  let l:parts = split(a:target, '#')
  let l:is_autoload = len(l:parts) >= 2

  if l:is_autoload
    " A target function name#spaced#Function should be written to a file with
    " a parent dir autoload/name and a base filename spaced.vim.
    let l:dir = join([l:tmpdir, 'autoload'] + l:parts[:-3], s:slash)
    let l:basename = l:parts[-2] . '.vim'
  else
    let l:dir = l:tmpdir
    let l:basename = 'test_override.vim'
  endif
  let l:file = join([l:dir, l:basename], s:slash)

  " Write file that defines the target function and force vim to autoload it.
  if !isdirectory(l:dir)
    call mkdir(l:dir, 'p')
  endif
  let l:data = s:apply_function_lines + [
      \ 'function! ' . a:target . '(...) abort',
      \ '  return s:ApplyFunction(' . string(a:replacement) . ', a:000)',
      \ 'endfunction',
      \ ]
  call writefile(l:data, l:file)
  if !l:is_autoload
    execute 'source' l:file
  else
    call s:ForceLoadAutoload(l:tmpdir, a:target)
  endif
endfunction
