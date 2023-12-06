let s:plugin = maktaba#Maktaba()


" Add the 'e' flag to flags unless it is present.
" This mimics 'gdefault' but for the e flag.
" The e flag suppresses search errors such as "Pattern not found".
function! s:Edefault(flags)
  return a:flags =~# 'e' ? substitute(a:flags, '\Ce', '', '') : a:flags . 'e'
endfunction


""
" Gets the text of the current or last visual selection.
" Useful for visual mode mappings.
function! maktaba#buffer#GetVisualSelection() abort
  let [l:lnum1, l:col1] = getpos("'<")[1:2]
  let [l:lnum2, l:col2] = getpos("'>")[1:2]
  " 'selection' is a rarely-used option for overriding whether the last
  " character is included in the selection. Bizarrely, it always affects the
  " last character even when selecting from the end backwards.
  if &selection !=# 'inclusive'
    let l:col2 -= 1
  endif
  let l:lines = getline(l:lnum1, l:lnum2)
  if !empty(l:lines)
    " If there is only 1 line, the part after the selection must be removed
    " first because `col2` is relative to the start of the line.
    let l:lines[-1] = l:lines[-1][: l:col2 - 1]
    let l:lines[0] = l:lines[0][l:col1 - 1 : ]
  endif
  return join(l:lines, "\n")
endfunction


""
" Replace the lines from {startline} to {endline} in the current buffer with
" {lines}.
" {startline} and {endline} are numbers. {endline} is inclusive following vim's
" precedent.
" {lines} is a list of strings.
"
" This is not a range function because range functions always move the cursor
" (requiring the caller to manage the cursor explicitly to prevent it), which is
" not good behavior for any library function.
"
" Use with an empty list to delete a range of lines. Use |append()| to insert
" lines instead of overwriting.
" @throws WrongType if the arguments are invalid.
" @throws BadValue if {startline} is greater than {endline}.
function! maktaba#buffer#Overwrite(startline, endline, lines) abort
  call maktaba#ensure#IsNumber(a:startline)
  call maktaba#ensure#IsNumber(a:endline)
  call maktaba#ensure#IsList(a:lines)

  if a:startline < 1
    throw maktaba#error#BadValue(
        \ 'Startline must be positive, not %d.',
        \ a:startline)
  endif
  if a:startline > line('$')
    throw maktaba#error#BadValue(
        \ 'Startline must be a valid line number, not %d.',
        \ a:startline)
  endif
  if a:endline < 1
    throw maktaba#error#BadValue(
        \ 'Endline must be positive, not %d.',
        \ a:endline)
  endif
  if a:endline > line('$')
    throw maktaba#error#BadValue(
        \ 'Endline must be a valid line number, not %d.',
        \ a:endline)
  endif
  if a:startline > a:endline
    throw maktaba#error#BadValue(
        \ 'Startline %d greater than endline %d.',
        \ a:startline,
        \ a:endline)
  endif

  " If python is available, use difflib-based python implementation, which can
  " overwrite only modified chunks and leave equal chunks undisturbed.
  if has('python3') || has('python')
    " TODO: This can throw NotFound if the module fails to load, in which case
    " we perhaps want to log a warning and fall back to the Vimscript
    " implementation.
    call maktaba#python#ImportModule(s:plugin, 'maktaba')
    let l:python_command = has('python3') ? 'python3' : 'python'
    execute l:python_command
        \ "maktaba.OverwriteBufferLines(" .
            \ "int(vim.eval('a:startline')), " .
            \ "int(vim.eval('a:endline')), " .
            \ "vim.eval('a:lines'))"
    return
  endif

  " Otherwise, fall back to pure-vimscript implementation.
  " If lines already match, don't modify buffer.
  if getline(a:startline, a:endline) == a:lines
    return
  endif
  " Lines being replaced minus lines being inserted.
  let l:line_delta = len(a:lines) - (a:endline + 1 - a:startline)
  " If there's a surplus (more to replace than insert), delete the last n lines.
  if l:line_delta < 0
    let l:winview = winsaveview()
    let l:keep_end = a:endline - (-l:line_delta)
    execute string(l:keep_end + 1) . ',' . string(a:endline) . 'delete'
    " Special case: Move the cursor up to track buffer changes if necessary.
    " If we delete lines above the cursor, the cursor should NOT remain on the
    " same line number.
    if l:winview.lnum > a:endline
      let l:winview.lnum += l:line_delta
    endif
    call winrestview(l:winview)
  endif
  " If there's a deficit (more to insert than replace), append the last n lines.
  let l:lines = a:lines
  if l:line_delta > 0
    call append(a:endline, a:lines[-l:line_delta : ])
    let l:lines = l:lines[ : -l:line_delta - 1]
  endif
  call setline(a:startline, l:lines)
endfunction


""
" Performs a configuration-agnostic substitution in the current buffer.
" For the duration of the substitution, 'gdefault' is on, 'ignorecase' is off,
" and 'smartcase' is off. These settings are restored after the substitution.
" The e flag is inverted: errors will not be shown unless the e flag is present.
" The cursor does not move.
" The range is the whole file by default.
"
" {pattern} The pattern to replace.
" [replacement] The replacement string.
" [flags] The search flags. See |:s_flags|. "e" and "g" are on by default.
" [firstline] The first line of the replacement range.
" @default firstline=0
" [lastline] The last line of the replacement range.
" @default lastline=equal to line('$')
" [usecase] Whether to honor the user's case sensitivity settings.
" @default usecase=0
" [searchdelimiter] The search delimiter to use. Must be accepted by |:s|.
" @default searchdelimiter='/'
function! maktaba#buffer#Substitute(pattern, ...) abort
  " Range must be passed explicitly because vimscript moves the cursor to the
  " first line of a range during ':call'. A [range] function has no way to save
  " and restore the window position. See http://goo.gl/kGDEO for discussion of
  " the limitation and a proposed fix. Even if this limitation is fixed, we
  " assume 7.2 and must do things this way.
  let l:winview = winsaveview()

  let l:gdefault = &gdefault
  let &gdefault = 1

  let l:use_user_sensitivity = get(a:, 5, 0)
  if !l:use_user_sensitivity
    let l:smartcase = &smartcase
    let l:ignorecase = &ignorecase
    let &smartcase = 0
    let &ignorecase = 0
  endif

  let l:sub = get(a:, 1, '')
  let l:flags = s:Edefault(get(a:, 2, ''))
  let l:firstline = get(a:, 3, 1)
  let l:lastline = get(a:, 4, line('$'))
  let l:slash = get(a:, 6, '/')
  let l:replace = 's' . l:slash . a:pattern . l:slash . l:sub . l:slash
  execute l:firstline . ',' . l:lastline . l:replace . l:flags

  if !l:use_user_sensitivity
    let &ignorecase = l:ignorecase
    let &smartcase = l:smartcase
  endif
  let &gdefault = l:gdefault
  call winrestview(l:winview)
endfunction
