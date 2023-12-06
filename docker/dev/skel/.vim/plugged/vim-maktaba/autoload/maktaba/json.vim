" Neovim support covered in https://github.com/neovim/neovim/issues/3417.
" NOTE: Avoids using pre-1430 support for consistent Infinity/NaN.
let s:HAS_NATIVE_JSON = exists('*json_decode') && exists('v:null') &&
    \ (has('nvim') || v:version > 704 || v:version == 704 && has('patch1430'))

" Sentinel constants used to serialize/deserialize JSON primitives.
if !exists('maktaba#json#NULL')
  if s:HAS_NATIVE_JSON
    let s:NULL = v:null
    let s:TRUE = v:true
    let s:FALSE = v:false
  else
    let s:NULL = {'__json__': 'null'}
    let s:TRUE = {'__json__': 'true'}
    let s:FALSE = {'__json__': 'false'}
  endif
  let maktaba#json#NULL = s:NULL
  let maktaba#json#TRUE = s:TRUE
  let maktaba#json#FALSE = s:FALSE
  lockvar! maktaba#json#NULL maktaba#json#TRUE maktaba#json#FALSE

  let s:DEFAULT_CUSTOM_VALUES = {
      \ 'null': s:NULL, 'true': s:TRUE, 'false': s:FALSE}

  " <sfile>:p:h:h:h is .../maktaba/
  let s:plugindir =  expand('<sfile>:p:h:h:h')
endif


" Python implementation:

" Initialize Vim's Python environment with the helpers we'll need.
function! s:InitPython() abort
  " This is an inlined version of maktaba#python#ImportModule().
  " We don't want to use anything here that would cause us to load the Maktaba
  " plugin, since we might be in the process of doing that load.
  let l:is_backslash_platform = exists('+shellslash')
  let l:use_backslash = l:is_backslash_platform && !&shellslash
  let l:slash = l:use_backslash ? '\' : '/'
  let l:path = s:plugindir . l:slash . 'python'
  python <<EOF
import sys
import vim

sys.path.insert(0, vim.eval('l:path'))
import maktabajson
del sys.path[:1]
EOF
endfunction

" Try to initialize Vim's Python environment if native JSON support isn't
" available. If that fails, we'll use the Vimscript implementations instead.
" maktaba#json#python#Disable() can be used to skip trying to use the
" Python implementation.

" We require Vim >= 7.3.1042 to use the Python implementation:
"   7.3.569 added bindeval().
"   7.3.996 added the vim.List and vim.Dictionary types.
"   7.3.1042 fixes assigning a dict() containing Unicode keys to a Vim value.
if s:HAS_NATIVE_JSON
  let s:use_python = 0
elseif v:version < 703 || (v:version == 703 && !has('patch1042'))
      \ || maktaba#json#python#IsDisabled()
      \ || has('nvim') " neovim does not implement bindeval, which maktaba uses.
  let s:use_python = 0  " Not a recent Vim, or explicitly disabled
else
  try
    call s:InitPython()
    let s:use_python = 1
  catch /E319:/  " No +python
    let s:use_python = 0
  endtry
endif

" Python implementation of maktaba#json#Format()
function! s:PythonFormat(value) abort
  let l:buffer = [s:DEFAULT_CUSTOM_VALUES, a:value, 0, 0]
  python maktabajson.format()
  if l:buffer[3] isnot# 0
    throw maktaba#error#BadValue(
        \ 'Value cannot be represented as JSON: %s.', l:buffer[3])
  endif

  return l:buffer[2]
endfunction

" Python implementation of s:ParsePartial()
function! s:PythonParsePartial(json, custom_values) abort
  let l:buffer = [a:custom_values, a:json, 0, 0]
  python maktabajson.parse()
  if l:buffer[3] isnot# 0
    throw maktaba#error#BadValue(
        \ 'Input is not valid JSON text: %s.', l:buffer[3])
  endif

  return l:buffer[2]
endfunction

" Vimscript implementation:

function! s:Ellipsize(str, limit) abort
  return len(a:str) > a:limit ? a:str[ : a:limit - 4] . '...' : a:str
endfunction

function! s:FormatKeyAndValue(key, value) abort
  if maktaba#value#IsString(a:key)
    return printf('"%s":%s', a:key, maktaba#json#Format(a:value))
  endif
  throw maktaba#error#BadValue(
      \ 'Non-string keys not allowed for JSON dicts: %s.', string(a:key))
endfunction

""
" Formats {value} as a JSON text.
" {value} may be any Vim value other than a Funcref or non-finite Float (or a
" Dictionary or List containing either).
" @throws BadValue if the input cannot be represented as JSON.
function! maktaba#json#Format(value) abort
  if s:HAS_NATIVE_JSON
    try
      let l:encoded = json_encode(a:value)
      " Ensure encoded value can be decoded again as a workaround for
      " https://github.com/vim/vim/issues/654.
      call json_decode(l:encoded)
    catch /E474:/
      throw maktaba#error#BadValue(
          \ 'Value cannot be represented as JSON: %s', string(a:value))
    endtry
    return l:encoded
  endif

  if s:use_python
    return s:PythonFormat(a:value)
  endif

  if a:value is s:NULL
    return 'null'
  elseif a:value is s:TRUE
    return 'true'
  elseif a:value is s:FALSE
    return 'false'
  elseif maktaba#value#IsNumeric(a:value)
    let l:json = string(a:value)
    if index(['nan', '-nan'], l:json) != -1
      return 'NaN'
    elseif l:json is# 'inf'
      return 'Infinity'
    elseif l:json is# '-inf'
      return '-Infinity'
    endif
    return l:json
  elseif maktaba#value#IsString(a:value)
    let l:escaped = substitute(escape(a:value, '"\'), "\n", '\\n', 'g')
    let l:escaped = substitute(l:escaped, "\t", '\\t', 'g')
    " TODO(dbarnett): Escape other special characters.
    return '"' . l:escaped . '"'
  elseif maktaba#value#IsList(a:value)
    let l:json_items = map(copy(a:value), 'maktaba#json#Format(v:val)')
    return '[' . join(l:json_items, ',') . ']'
  elseif maktaba#value#IsDict(a:value)
    if maktaba#value#IsCallable(a:value)
      throw maktaba#error#BadValue(
          \ 'Funcdict for func %s cannot be represented as JSON.',
          \ string(a:value.func))
    endif
    let l:json_items =
        \ map(items(a:value), 's:FormatKeyAndValue(v:val[0], v:val[1])')
    return '{' . join(l:json_items, ',') . '}'
  endif
  throw maktaba#error#BadValue(a:value)
endfunction

function! s:Consume(str, count) abort
  return maktaba#string#StripLeading(a:str[a:count : ])
endfunction

function! s:ParsePartial(json, custom_values) abort
  " null, true, or false
  if a:json =~# '\m^null\>'
    let l:value = a:custom_values.null
    return [l:value, s:Consume(a:json, 4)]
  endif
  if a:json =~# '\m^true\>'
    let l:value = a:custom_values.true
    return [l:value, s:Consume(a:json, 4)]
  endif
  if a:json =~# '\m^false\>'
    let l:value = a:custom_values.false
    return [l:value, s:Consume(a:json, 5)]
  endif
  " Special numbers (Infinity and NaN)
  if a:json =~# '\m^NaN\>'
    return [abs(0.0 / 0.0), s:Consume(a:json, 3)]
  endif
  if a:json =~# '\m^Infinity\>'
    return [1.0 / 0.0, s:Consume(a:json, 8)]
  endif
  if a:json =~# '\m^-Infinity\>'
    return [-1.0 / 0.0, s:Consume(a:json, 9)]
  endif
  " Number
  " TODO(dbarnett): Handle scientific notation.
  let l:num_match = matchstr(a:json, '\v^-?[0-9]+(\.[0-9]+)?>')
  if !empty(l:num_match)
    return [eval(l:num_match), s:Consume(a:json, len(l:num_match))]
  endif
  " String
  let l:str_match = matchstr(a:json, '\v^"([^\\"]|\\.)*"')
  if !empty(l:str_match)
    " JSON strings use the same syntax as JSON strings.
    " TODO(dbarnett): Handle special escape sequences like \uxxxx.
    let l:value = eval(l:str_match)
    return [l:value, s:Consume(a:json, len(l:str_match))]
  endif
  " First character if any, empty string otherwise.
  let l:first_char = a:json[0:0]
  " List
  if l:first_char is# '['
    let [l:items, l:remaining] = s:ParseListPartial(a:json, a:custom_values)
    return [l:items, l:remaining]
  endif
  " Dict
  if l:first_char is# '{'
    let [l:dict, l:remaining] = s:ParseDictPartial(a:json, a:custom_values)
    return [l:dict, l:remaining]
  endif
  throw maktaba#error#BadValue('Input is not valid JSON text.')
endfunction

function! s:ParseListPartial(json, custom_values) abort
  let l:remaining = s:Consume(a:json, 1)
  if l:remaining[0:0] is# ']'
    return [[], s:Consume(l:remaining, 1)]
  endif
  let l:items = []
  while !empty(l:remaining)
    " Parse and consume one value as the next list item.
    let [l:item, l:remaining] = s:ParsePartial(l:remaining, a:custom_values)
    call add(l:items, l:item)
    unlet l:item
    " If next character is "]", consume and finish list.
    if l:remaining[0:0] is# ']'
      let l:remaining = s:Consume(l:remaining, 1)
      break
    endif
    " Only other acceptable character is comma. Consume and continue.
    if l:remaining[0:0] isnot# ','
      throw maktaba#error#BadValue(
          \ 'Junk after JSON array item: %s', s:Ellipsize(l:remaining, 30))
    endif
    let l:remaining = s:Consume(l:remaining, 1)
  endwhile
  return [l:items, l:remaining]
endfunction

function! s:ParseDictPartial(json, custom_values) abort
  let l:remaining = s:Consume(a:json, 1)
  if l:remaining[0:0] is# '}'
    return [{}, s:Consume(l:remaining, 1)]
  endif
  let l:dict = {}
  while !empty(l:remaining)
    " Parse and consume one value as the key.
    let [l:key, l:remaining] = s:ParsePartial(l:remaining, a:custom_values)
    if !maktaba#value#IsString(l:key)
      throw maktaba#error#BadValue(
          \ 'Non-string keys not allowed for JSON dicts: %s.', string(l:key))
    endif
    " Consume separating ":".
    if l:remaining[0:0] isnot# ':'
      throw maktaba#error#BadValue(
          \ 'Junk after JSON key: %s', s:Ellipsize(l:remaining, 30))
    endif
    let l:remaining = s:Consume(l:remaining, 1)
    " Parse and consume one value as the item value.
    let [l:value, l:remaining] = s:ParsePartial(l:remaining, a:custom_values)
    let l:dict[l:key] = l:value
    unlet l:value

    " If next character is "}", consume and finish list.
    if l:remaining[0:0] is# '}'
      let l:remaining = s:Consume(l:remaining, 1)
      break
    endif
    " Only other acceptable character is comma. Consume and continue.
    if l:remaining[0:0] isnot# ','
      throw maktaba#error#BadValue(
          \ 'Junk after JSON object item: %s', s:Ellipsize(l:remaining, 30))
    endif
    let l:remaining = s:Consume(l:remaining, 1)
  endwhile
  return [l:dict, l:remaining]
endfunction

function! s:SetDifference(a, b) abort
  let l:difference = []
  for l:a_item in a:a
    if index(a:b, l:a_item) == -1
      call add(l:difference, l:a_item)
    endif
  endfor
  return l:difference
endfunction

""
" Replace special JSON primitives in {value} according to {custom_values}.
" {custom_values} is a dictionary mapping JSON primitives (in string form) to
" custom values to use instead of native JSON primitives.
function! s:ReplacePrimitives(value, custom_values) abort
  if maktaba#value#IsList(a:value) || maktaba#value#IsDict(a:value)
    return map(copy(a:value), 's:ReplacePrimitives(v:val, a:custom_values)')
  elseif a:value ==# s:TRUE
    return a:custom_values.true
  elseif a:value ==# s:FALSE
    return a:custom_values.false
  elseif a:value ==# s:NULL
    return a:custom_values.null
  else
    return a:value
  endif
endfunction

""
" Parses the JSON text {json} to a Vim value. If [custom_values] is passed, it
" is a dictionary mapping JSON primitives (in string form) to custom values to
" use instead of maktaba#json# sentinels. For example: >
"   let value = maktaba#json#Parse('[null]', {'null': ''})
" <
" @throws WrongType if {json} is not a string or [custom_values] is not a dict.
" @throws BadValue if {json} is not a valid JSON text.
" @throws BadValue if [custom_values] keys are invalid JSON primitive names.
function! maktaba#json#Parse(json, ...) abort
  let l:json = maktaba#string#Strip(maktaba#ensure#IsString(a:json))
  let l:custom_values = maktaba#ensure#IsDict(get(a:, 1, {}))
  if !empty(l:custom_values)
    " Ensure custom values only has 'null', 'true', or 'false' as keys.
    let l:allowed_custom_keys = ['null', 'true', 'false']
    let l:unrecognized_custom_keys =
        \ s:SetDifference(keys(l:custom_values), l:allowed_custom_keys)
    if !empty(l:unrecognized_custom_keys)
      throw maktaba#error#BadValue(
          \ 'Invalid JSON primitive name(s) in custom_values: %s',
          \ join(l:unrecognized_custom_keys, ', '))
    endif
  endif
  " Populate all primitive values so recursive step can assume they're present.
  let l:use_custom_values = !empty(l:custom_values)
  if empty(l:custom_values)  " common case
    let l:custom_values = s:DEFAULT_CUSTOM_VALUES
  else
    let l:custom_values = copy(l:custom_values)
    call extend(l:custom_values, s:DEFAULT_CUSTOM_VALUES, 'keep')
  endif

  if s:HAS_NATIVE_JSON
    try
      let l:value = json_decode(a:json)
    catch /E474:/
      throw maktaba#error#BadValue('Input is not valid JSON text.')
    endtry
    if l:use_custom_values
      return s:ReplacePrimitives(l:value, l:custom_values)
    endif
    return l:value
  endif

  if s:use_python
    return s:PythonParsePartial(a:json, l:custom_values)
  endif

  " Allocate some recursion depth for recursive descent parser.
  let l:saved_maxfuncdepth = maktaba#value#Save('&maxfuncdepth')
  if &maxfuncdepth < 9999
    set maxfuncdepth=9999
  endif
  try
    let [l:value, l:remaining] = s:ParsePartial(l:json, l:custom_values)
  finally
    call maktaba#value#Restore(l:saved_maxfuncdepth)
  endtry
  if empty(l:remaining)
    return l:value
  endif
  throw maktaba#error#BadValue('Input is not valid JSON text.')
endfunction
