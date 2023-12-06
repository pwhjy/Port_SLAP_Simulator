" Ensures that {name} is a valid enum name.
function! s:EnsureEnumName(name) abort
  call maktaba#ensure#IsString(a:name)
  if a:name !=# toupper(a:name)
    let l:msg = 'Invalid enum name: %s. Enum names must be uppercase.'
    throw maktaba#error#BadValue(l:msg, a:name)
  endif
endfunction


" Returns an inverse of {dict}: keys are values, values are keys.
function! s:Reverse(dict) abort
  " We must use a [val, key] list because not all value types can be key types.
  let l:reversed = []
  for [l:key, l:Val] in items(a:dict)
    " O(n^2). Unfortunately, the builtin hash (dicts) only works on string
    " values, and we can't guarantee that our values are strings. Hopefully,
    " all enums have sane sizes and this isn't an issue...
    for [l:Seen, l:by] in l:reversed
      if maktaba#value#IsEqual(l:Val, l:Seen)
        let l:msg = 'Value %s not unique in enum. (Assigned to both %s and %s).'
        throw maktaba#error#BadValue(l:msg, l:Val, l:key, l:by)
      endif
    endfor
    call add(l:reversed, [l:Val, l:key])
    " May change type.
    unlet l:Val
  endfor
  return l:reversed
endfunction


""
" @private
" Whether {dict} is a maktaba enum.
" This can be fooled, but only if someone is accessing private maktaba#enum
" functions, in which case they can't blame us.
function! maktaba#enum#IsValid(Value) abort
  return maktaba#value#IsDict(a:Value) &&
      \ has_key(a:Value, 'Name') &&
      \ maktaba#function#HasSameName(
          \ a:Value.Name, function('maktaba#enum#Name'))
endfunction


""
" Creates an enum object from {names}. {names} may be a list of names (in which
" case they will be valued 0, 1, etc.) or a dictionary of {name: value}. Names
" and values must be unique. Names must be uppercase. {names} may not be empty.
"
" The resulting object will be a dict with a member for each name. For example:
" >
"   let g:animals = maktaba#enum#Create(['DUCK', 'PIG'])
"   echomsg g:animals.PIG  " This will echo 1.
" <
" @throws BadValue if {names} is invalid.
" @throws WrongType if {names} is not a collection, or contains names that are
"     not strings.
function! maktaba#enum#Create(names) abort
  if empty(a:names)
    throw maktaba#error#BadValue('Enum must have at least one name.')
  endif
  call maktaba#ensure#IsCollection(a:names)
  if maktaba#value#IsList(a:names)
    let l:enum = {}
    let l:counter = 0
    for l:name in a:names
      call s:EnsureEnumName(l:name)
      if has_key(l:enum, l:name)
        throw maktaba#error#BadValue('%s appears in enum twice.', l:name)
      endif
      let l:enum[l:name] = l:counter
      let l:counter += 1
    endfor
  else
    call map(keys(a:names), 's:EnsureEnumName(v:val)')
    let l:enum = copy(a:names)
  endif
  let l:enum._lookup = sort(s:Reverse(l:enum))
  let l:enum.Name = function('maktaba#enum#Name')
  let l:enum.Names = function('maktaba#enum#Names')
  let l:enum.Value = function('maktaba#enum#Value')
  let l:enum.Values = function('maktaba#enum#Values')
  return l:enum
endfunction


""
" @dict Enum
" An enumeration object. It has fields for each name in the enumeration. Each
" name is attached to a unique value. Names are in all caps. Example:
" >
"   let g:animals = maktaba#enum#Create(['DUCK', 'PIG', 'COW'])
"   echomsg g:animals.PIG      " This will echo 1.
"   echomsg g:animals.COW      " This will echo 2
"   echomsg g:animals.Name(0)  " This will echo DUCK.
"   echomsg g:animals.Names()  " This will echo ['DUCK', 'PIG', 'COW'].
" <


""
" @dict Enum
" Gets the name associated with {value}.
" @throws NotFound if no such name exists on the enum.
function! maktaba#enum#Name(Value) dict abort
  for [l:Val, l:key] in self._lookup
    if maktaba#value#IsEqual(l:Val, a:Value)
      return l:key
    endif
    " May change type.
    unlet l:Val
  endfor
  throw maktaba#error#NotFound('Enum name with value %s.', a:Value)
endfunction


""
" @dict Enum
" Gets all names on the enum, in value order.
function! maktaba#enum#Names() dict abort
  return map(copy(self._lookup), 'v:val[1]')
endfunction


""
" @dict Enum
" Gets the value of the enum at {name}.
" @throws NotFound if no such name exists on the enum.
" @throws BadValue if {name} is not a valid enum name.
" @throws WrongType if {name} is not a string.
function! maktaba#enum#Value(name) dict abort
  call s:EnsureEnumName(a:name)
  if has_key(self, a:name)
    return self[a:name]
  endif
  throw maktaba#error#NotFound('Enum name %s.', a:name)
endfunction


""
" @dict Enum
" Gets all values on the enum, in order.
function! maktaba#enum#Values() dict abort
  return map(copy(self._lookup), 'v:val[0]')
endfunction
