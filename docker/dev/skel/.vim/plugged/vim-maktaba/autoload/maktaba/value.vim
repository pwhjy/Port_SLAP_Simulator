" Note: We use Titled variable names in places where the variable may take on
" any type (including funcref). Vim dies when you assign a funcref to
" a lowercase name. Don't refactor this code to have lowercase variable names.
let s:EmptyFn = function('empty')

" Sentinel value used by #Save to flag a variable as undefined.
let s:UNSET = {}

" Pattern for environment variable name.
let s:ENV_VAR_NAME = '\m\c^\$[a-z_][a-z0-9_]*$'
" Pattern for vim setting name. s:var and v:var not supported.
let s:SETTING_NAME = '\m\c^&\([gl]:\)\?[a-z_][a-z0-9_]*$'


" Gets {target}[{focus}].
" @throws BadValue if it can't.
function! s:GetFocus(target, focus) abort
  call maktaba#ensure#TypeMatchesOneOf(a:target, [[], {}])
  if maktaba#value#IsList(a:target)
    call maktaba#ensure#IsNumber(a:focus)
    if a:focus >= len(a:target)
      let l:msg = 'Index %s out of range in %s'
      throw maktaba#error#BadValue(l:msg, a:focus, string(a:target))
    endif
  elseif !has_key(a:target, a:focus)
    let l:msg = 'Key %s not in %s'
    throw maktaba#error#BadValue(l:msg, a:focus, string(a:target))
  endif
  return a:target[a:focus]
endfunction


" Sets {target}[{focus}] to {value}.
" @throws BadValue if it can't.
function! s:SetFocus(target, focus, Value) abort
  call maktaba#ensure#IsCollection(a:target)
  if !maktaba#value#IsDict(a:target)
    call maktaba#ensure#IsNumber(a:focus)
    if a:focus > len(a:target)
      let l:msg = 'Index %s out of range in %s'
      throw maktaba#error#BadValue(l:msg, a:focus, string(a:target))
    elseif a:focus == len(a:target)
      call add(a:target, a:Value)
    else
      let a:target[a:focus] = a:Value
    endif
  else
    let a:target[a:focus] = a:Value
  endif
endfunction


""
" Tests whether values {a} and {b} are equal.
" This works around a number of limitations in vimscript's == operator. Unlike
" with the == operator,
"   1. String comparisons are case sensitive.
"   2. {a} and {b} must be of the same type: 0 does not equal '0'.
"   3. 0 == [] is false (instead of throwing an exception).
" The == operator is insane. Use this instead.
"
" NOTE: {a} AND {b} MUST BE OF THE SAME TYPE. 1.0 DOES NOT EQUAL 1! This is
" consistent with the behavior of equality established by |index()| and
" |count()|, but may be surprising to some users.
"
" NOTE: Funcref comparison is by func name only prior to patch 7.4.1875 (any
" partial of the same function name was considered equal).
function! maktaba#value#IsEqual(X, Y) abort
  return type(a:X) == type(a:Y) && a:X ==# a:Y
endfunction


""
" Whether {value} is in {list}.
" @throws BadValue if {list} is not a list.
function! maktaba#value#IsIn(Value, list) abort
  return index(maktaba#ensure#IsList(a:list), a:Value) >= 0
endfunction


""
" Returns the empty value for {value}.
" This is 0, 0.0, '', [], {}, or 'empty', depending upon the value type.
function! maktaba#value#EmptyValue(Value) abort
  let l:type = type(a:Value)
  if l:type == type(0)
    return 0
  elseif l:type == type(0.0)
    return 0.0
  elseif l:type == type('')
    return ''
  elseif l:type == type([])
    return []
  elseif l:type == type({})
    return {}
  else
    return s:EmptyFn
  endif
endfunction


""
" Returns the type of {value} as a string.
" One of "number", "string", "funcref", "list", "dictionary", "float",
" "boolean", "null", "none", "job", or "channel".
" See also |type()|.
function! maktaba#value#TypeName(Value) abort
  let l:type = type(a:Value)
  if l:type == 0
    return 'number'
  elseif l:type == 1
    return 'string'
  elseif l:type == 2
    return 'funcref'
  elseif l:type == 3
    return 'list'
  elseif l:type == 4
    return 'dictionary'
  elseif l:type == 5
    return 'float'
  elseif l:type == 6
    return 'boolean'
  elseif l:type == 7
    " None (v:null or v:none) in Vim.
    " Null (v:null) in Neovim.
    if exists('v:none') && a:Value is v:none
      return 'none'
    endif
    return 'null'
  elseif l:type == 8
    return 'job'
  elseif l:type == 9
    return 'channel'
  endif
  return printf('unknown type (%d)', l:type)
endfunction


""
" 1 if {value} has the same type as {reference}, 0 otherwise.
function! maktaba#value#TypeMatches(Value, Reference) abort
  return type(a:Value) == type(a:Reference)
endfunction


""
" 1 if {value} has the same type as one of the elements in {references}.
" 0 otherwise.
function! maktaba#value#TypeMatchesOneOf(Value, references) abort
  return index(map(copy(a:references), 'type(v:val)'), type(a:Value)) >= 0
endfunction


""
" 1 if {value} is a vimscript "number" (more commonly known as "integer", 0
" otherwise. Remember that vimscript calls integers "numbers".
function! maktaba#value#IsNumber(Value) abort
  return type(a:Value) == type(0)
endfunction


""
" 1 if {value} is a string, 0 otherwise.
function! maktaba#value#IsString(Value) abort
  return type(a:Value) == type('')
endfunction


""
" 1 if {value} is a funcref, 0 otherwise.
function! maktaba#value#IsFuncref(Value) abort
  return type(a:Value) == type(s:EmptyFn)
endfunction


""
" 1 if {value} is a list, 0 otherwise.
function! maktaba#value#IsList(Value) abort
  return type(a:Value) == type([])
endfunction


""
" 1 if {value} is a dict, 0 otherwise.
function! maktaba#value#IsDict(Value) abort
  return type(a:Value) == type({})
endfunction


""
" 1 if {value} is a floating point number, 0 otherwise.
function! maktaba#value#IsFloat(Value) abort
  return type(a:Value) == type(0.0)
endfunction


""
" 1 if {value} is numeric (integer or float, which vimscript stupidly refers
" to as "number" and "float").
" 0 otherwise.
function! maktaba#value#IsNumeric(Value) abort
  return maktaba#value#TypeMatchesOneOf(a:Value, [0, 0.0])
endfunction


""
" 1 if {value} is a collection type (list or dict).
" 0 otherwise.
function! maktaba#value#IsCollection(Value) abort
  return maktaba#value#TypeMatchesOneOf(a:Value, [[], {}])
endfunction


""
" 1 if {value} is a callable type (string or function), 0 otherwise.
" This DOES NOT guarantee that the function indicated by {value} actually
" exists.
function! maktaba#value#IsCallable(Value) abort
  return maktaba#value#TypeMatchesOneOf(a:Value, ['', s:EmptyFn])
      \ || maktaba#function#IsWellFormedDict(a:Value)
endfunction


""
" 1 if {value} is a maktaba enum type, 0 otherwise.
function! maktaba#value#IsEnum(Value) abort
  return maktaba#enum#IsValid(a:Value)
endfunction


""
" Focuses on a part of {target} specified by {foci}. That object will either be
" returned, or set to [value] if [value] is given (in which case {target} is
" returned). Examples will make this clearer:
" >
"   maktaba#value#Focus({'a': [0, {'b': 'hi!'}, 1]}, ['a', 1, 'b']) == 'hi'
" <
" Notice how this function lets you focus on one part of a complex data
" structure. You can also use it to modify the data structure:
" >
"   maktaba#value#Focus({'a': {'b': 0}}, ['a', 'b'], 2) == {'a': {'b': 2}}
" <
" The only real reason to use this code is because it destructures {target} in
" a safe way, throwing exceptions if the implicit assumptions aren't met.
" @throws BadValue if {target} cannot be deconstructed the way {foci} expects.
" @throws WrongType if {foci} contains the wrong types to index {target}.
function! maktaba#value#Focus(Target, foci, ...) abort
  call maktaba#ensure#IsList(a:foci)
  if a:0 == 0
    " May be a funcref, must be uppercase.
    let l:Target = a:Target
    for l:focus in a:foci
      try
        let l:Newtarget = s:GetFocus(l:Target, l:focus)
      catch /ERROR(WrongType):/
        let l:msg = '%s cannot be used to index %s.'
        throw maktaba#error#WrongType(l:msg, string(l:focus), string(l:Target))
      endtry
      " This jankyness is necessary because vim doesn't let you change the type
      " of a variable without unletting it.
      unlet l:Target
      let l:Target = l:Newtarget
      unlet l:Newtarget
    endfor
    return l:Target
  else
    let l:parent = maktaba#value#Focus(a:Target, a:foci[:-2])
    call s:SetFocus(l:parent, a:foci[-1], a:1)
    return a:Target
  endif
endfunction


""
" Captures the state of a {variable} into a returned dict.
" The return value can be passed to @function(#Restore) to restore the listed
" variable to its captured state.
" @throws WrongType
" @throws BadValue
function! maktaba#value#Save(variable) abort
  return maktaba#value#SaveAll([a:variable])
endfunction


""
" Captures the state of a list of {variables} into a returned dict.
" The return value can be passed to @function(#Restore) to restore all listed
" variables to their captured state.
" @throws WrongType
" @throws BadValue
function! maktaba#value#SaveAll(variables) abort
  let l:savedict = {}
  for l:name in maktaba#ensure#IsList(a:variables)
    call maktaba#ensure#IsString(l:name)
    if maktaba#string#StartsWith(l:name, '$')
      " Capture environment variable.
      " Use eval() since expand() has different behavior (see
      " :help expr-env-expand).
      call maktaba#ensure#Matches(l:name, s:ENV_VAR_NAME)
      let l:savedict[l:name] = exists(l:name) ? eval(l:name) : s:UNSET
    elseif maktaba#string#StartsWith(l:name, '&')
      " Capture vim setting.
      call maktaba#ensure#Matches(l:name, s:SETTING_NAME)
      let l:savedict[l:name] = exists(l:name) ? eval(l:name) : s:UNSET
    else
      " Capture standard variable.
      let l:savedict[l:name] = exists(l:name) ? {l:name} : s:UNSET
    endif
  endfor
  return l:savedict
endfunction


""
" Restores the previously-captured {state} of the set of variables.
" {state} is a dict returned from a previous call to @function(#Save) or
" @function(#SaveAll).
" @throws WrongType
" @throws BadValue
function! maktaba#value#Restore(state) abort
  call maktaba#ensure#IsDict(a:state)
  for [l:name, l:Value] in items(a:state)
    if maktaba#string#StartsWith(l:name, '$')
      " Restore environment variable.
      call maktaba#ensure#Matches(l:name, s:ENV_VAR_NAME)
      execute 'let' l:name '=' string(l:Value isnot s:UNSET ? l:Value : '')
    elseif maktaba#string#StartsWith(l:name, '&')
      " Restore vim setting.
      call maktaba#ensure#Matches(l:name, s:SETTING_NAME)
      " Note that for local settings, this only overrides the literal value and
      " doesn't ever remove the local value. It's just possible to scrape the
      " output of :setlocal in #Save and determine whether there's an explicit
      " local value, but this hasn't been implemented yet.
      execute 'let' l:name '=' string(l:Value isnot s:UNSET ? l:Value : '')
    else
      " Restore standard variable.
      " Use unlet to avoid 'type mismatch' in case restoring changes the type.
      unlet! {l:name}
      if l:Value isnot s:UNSET
        let {l:name} = l:Value
      endif
    endif
    " Type can vary between iterations. Use unlet to avoid 'type mismatch'.
    unlet l:Value
  endfor
endfunction
