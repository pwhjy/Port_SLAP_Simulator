function! s:OneOf(chars) abort
  " split() won't split on an empty string. It will, however, split on an empty
  " *match*. This allows us to split a string into an array of characters.
  let l:chars = split(a:chars, '\zs\ze')
  return join(map(l:chars, 'escape(v:val, ''\'')'), '\|')
endfunction


""
" Returns {string} stripped of [chars] from both ends. [chars] should be
" a string of characters. THE ORDER OF [chars] DOES NOT MATTER: stripping will
" continue so long as the prefix/suffix contains one of [chars]. For example:
" >
"   maktaba#string#Strip('0xDEADBEEF', "ABCDEF") == '0x'
" <
" @default chars=" \t\n\r"
function! maktaba#string#Strip(string, ...) abort
  call maktaba#ensure#IsString(a:string)
  let l:chars = maktaba#ensure#IsString(get(a:, 1, " \t\n\r"))
  let l:regex = '\%(' . s:OneOf(l:chars) . '\)\*'
  let l:matcher = '\V\^' . l:regex . '\zs\_.\{-}\ze' . l:regex . '\%$'
  return matchstr(a:string, l:matcher)
endfunction


""
" Returns {string} stripped of [chars] (a string of characters) from the front.
" THE ORDER OF [chars] DOES NOT MATTER: stripping will continue so long as the
" prefix contains one of [chars]. See also @function(#Strip).
" @default chars=" \t\n\r"
function! maktaba#string#StripLeading(string, ...) abort
  call maktaba#ensure#IsString(a:string)
  let l:chars = maktaba#ensure#IsString(get(a:, 1, " \t\n\r"))
  let l:regex = '\V\^\(' . s:OneOf(l:chars) . '\)\*'
  return substitute(a:string, l:regex, '', '')
endfunction


""
" Returns {string} stripped of [chars] (a string of characters) from the end.
" THE ORDER OF [chars] DOES NOT MATTER: stripping will continue so long as the
" suffix contains one of [chars]. See also @function(#Strip).
" @default chars=" \t\n\r"
function! maktaba#string#StripTrailing(string, ...) abort
  call maktaba#ensure#IsString(a:string)
  let l:chars = maktaba#ensure#IsString(get(a:, 1, " \t\n\r"))
  let l:regex = '\V\(' . s:OneOf(l:chars) . '\)\*\$'
  return substitute(a:string, l:regex, '', '')
endfunction


""
" Whether or not {string} starts with {prefix}.
function! maktaba#string#StartsWith(string, prefix) abort
  call maktaba#ensure#IsString(a:string)
  call maktaba#ensure#IsString(a:prefix)
  return a:string =~# '\V\^' . escape(a:prefix, '\')
endfunction


""
" Whether or not {string} ends with {suffix}.
function! maktaba#string#EndsWith(string, suffix) abort
  call maktaba#ensure#IsString(a:string)
  call maktaba#ensure#IsString(a:suffix)
  return a:string =~# '\V' . escape(a:suffix, '\') . '\$'
endfunction
