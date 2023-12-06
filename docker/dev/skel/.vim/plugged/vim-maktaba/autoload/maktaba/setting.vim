" NOTE: Variables in this regex that start with capital letters may be funcrefs.
" DO NOT change them to start with lowercase letters.

" Parser regexes.
let s:unaryop = '\v^[!~]'
let s:flagname = '\v^[a-zA-Z0-9_./:#-]*[a-zA-Z0-9_]'
let s:foci = '\v^\[[^[\]]+\]'
let s:binaryop = '\v^([$^`+-]?\=)'
let s:tickstring = '\v^`%([^`]|``)*`'
let s:singlestring = '\v^''%([^'']|'''')*'''
let s:doublestring = '\v^"%([^\\"]|\\.)*"'
let s:standardval = '\v^[.,:/a-zA-Z0-9_-]*'
let s:intstr = '\v^-?\d+$'
let s:floatstr = '\v^-?\d+\.\d+$'
let s:nakedstr = '\v^[/.a-zA-Z0-9_-]*$'
let s:leadingwhite = '\v^\s+'


""
" @dict Setting
" Parses {text} into a setting object. The setting object can be applied to
" a plugin to affect the plugin flags as described in {text}. Setting syntax
" is as follows:
"
" A setting consists of four parts:
" 1. Optional unary operator
" 2. Flag handle
" 3. Optional binary operator (not valid with unary operator)
" 4. Flag value (must follow binary operator)
"
" Valid unary operators are ! and ~. The former sets flags to zero, the latter
" inverts integer flags (0 becomes 1, everything else becomes 0).
"
" Flag handles consist of a flag name and optionally a number of foci, see
" @function(#Handle) for details.
"
" Valid binary operators are = += -= ^= $= and `=.
" * = sets a flag directly.
" * += adds to numbers, appends to lists and strings, and extends dictionaries.
" * -= subtracts from numbers and removes from lists and dictionaries.
" * ^= prepends to lists and strings.
" * $= appends to lists and strings.
" * `= sets a flag to the result of applying the function named by the value.
"
" Values are parsed as follows:
" 1. Values in single or double quotes are parsed as strings.
" 2. Anything in backticks is evaluated (double backticks escape a backtick).
" 3. A value containing only numeric characters is parsed as an integer.
" 4. Numeric values with one internal dot are parsed as floats (like 0.5).
" 5. Any simple string [a-zA-Z0-9_-] is parsed as a string.
" 6. A comma-separated series of simple strings & numbers is parsed as a list.
" 7. A comma-separated series of key:value pairs (simple strings & numbers) is
"    parsed as a dictionary.
"
" If no operator (unary or binary) is given, the setting will set that handle to
" 1 when applied. If the '=' operator is used, but no value is given, the flag
" will be emptied (see @function(maktaba#value#EmptyValue)).


" Promotes {item} to a singleton list, unless it is a list.
function! s:Listify(item) abort
  return maktaba#value#IsList(a:item) ? a:item : [a:item]
endfunction


" Ensures that {string} is a valid leftover after parsing {setting}. If so,
" returns {string} with whitespace stripped from the left.
" @throws BadValue.
function! s:Leftover(string, setting) abort
  if empty(a:string)
    return a:string
  elseif a:string =~# s:leadingwhite
    return substitute(a:string, s:leadingwhite, '', '')
  endif
  throw maktaba#error#BadValue(
      \ 'Junk after setting "%s": "%s". (Did you forget quotes or backticks?)',
      \ a:setting.definition,
      \ substitute(a:string, '\s.*', '', ''))
endfunction


" Coerces a string into a number (if it's made of alphanumeric characters).
" Otherwise, returns it as a string.
function! s:StringOrNumeric(value) abort
  if a:value =~# s:intstr
    return str2nr(a:value)
  elseif a:value =~# s:floatstr
    return str2float(a:value)
  elseif a:value =~# s:nakedstr
    return a:value
  endif
  let l:msg = '"%s" contains invalid characters. (Did you forget quotes?)'
  throw maktaba#error#BadValue(l:msg, a:value)
endfunction


" Wraps {exception} (thrown while parsing the value of {setting} in {plugin})
" with context about the relevant setting and plugin.
function! s:ValueParseError(setting, exception) abort
  let [l:type, l:msg] = maktaba#error#Split(a:exception)
  return maktaba#error#Message(
      \ l:type,
      \ 'Could not parse value on setting "%s": %s.',
      \ a:setting,
      \ l:msg)
endfunction


""
" @private
" @dict Setting
" Gets the flag in {plugin} relevant to the setting.
" @throws NotFound if {plugin} does not define the appropriate flag.
function! maktaba#setting#GetFlag(plugin) dict abort
  if has_key(a:plugin.flags, self._flagname)
    return a:plugin.flags[self._flagname]
  endif
  let l:msg = 'Flag "%s" not defined in %s.'
  throw maktaba#error#NotFound(l:msg, self._flagname, a:plugin.name)
endfunction


""
" @private
" @dict Setting
" Sets a flag at the focus point.
" For example, if the setting was foo[bar][baz]=value then the value of {flag}
" (presumably named foo) at ['bar']['baz'] will be set to 'value'.
function! maktaba#setting#SetAtFocus(flag, Oldval, Newval) dict abort
  if empty(self._foci)
    call a:flag.Set(a:Newval)
  else
    call a:flag.Set(maktaba#value#Focus(a:Oldval, self._foci, a:Newval))
  endif
endfunction


""
" @dict Setting
" Applies the setting to {plugin}. Returns the new value of the affected flag,
" for convenience.
" @throws NotFound if {plugin} does not define the appropriate flag.
" @throws WrongType if the flag is not of a type the setting requires.
" @throws BadValue if the flag has a value inappropriate for the setting.
function! maktaba#setting#Apply(plugin) dict abort
  let l:flag = self._GetFlag(a:plugin)
  try
    call self._Affect(l:flag)
  catch /ERROR(\(BadValue\|WrongType\)):/
    let [l:type, l:msg] = maktaba#error#Split(v:exception)
    throw maktaba#error#Message(
        \ l:type,
        \ 'Could not set %s in %s. %s',
        \ self.definition,
        \ a:plugin.name,
        \ l:msg)
  endtry
  return l:flag.Get()
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag=' type settings.
function! maktaba#setting#Empty(flag) dict abort
  let l:Oldval = a:flag.GetCopy()
  try
    let l:Target = maktaba#value#Focus(l:Oldval, self._foci)
    let l:Default = maktaba#value#EmptyValue(l:Target)
  catch /ERROR(BadValue):/
    " Target does not yet exist, it is being initialized.
    let l:Default = 0
  endtry
  call self._SetAtFocus(a:flag, l:Oldval, l:Default)
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag=value' type settings.
function! maktaba#setting#Set(flag) dict abort
  call self._SetAtFocus(a:flag, a:flag.GetCopy(), self._value)
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag+=value' type settings.
function! maktaba#setting#AddTo(flag) dict abort
  let l:Value = a:flag.GetCopy()
  let l:Target = maktaba#value#Focus(l:Value, self._foci)
  call maktaba#ensure#TypeMatchesOneOf(l:Target, [[], {}, '', 0, 0.0])
  if maktaba#value#IsList(l:Target) && !maktaba#value#IsList(self._value)
    call add(l:Target, self._value)
    call a:flag.Set(l:Value)
    return
  endif
  if maktaba#value#IsDict(l:Target) && !maktaba#value#IsDict(self._value)
    let l:Target[self._value] = 1
    call a:flag.Set(l:Value)
    return
  endif
  if maktaba#value#IsNumeric(l:Target)
    " Floats and integers can be added indiscriminately.
    call maktaba#ensure#IsNumeric(self._value)
  else
    " Everything else must be added to something of the same type.
    call maktaba#ensure#TypeMatches(self._value, l:Target)
  endif
  if maktaba#value#IsCollection(l:Target)
    call extend(l:Target, self._value)
    call a:flag.Set(l:Value)
  elseif maktaba#value#IsNumeric(l:Target)
    call self._SetAtFocus(a:flag, l:Value, l:Target + self._value)
  else
    call self._SetAtFocus(a:flag, l:Value, l:Target . self._value)
  endif
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag-=value' type settings.
function! maktaba#setting#RemoveFrom(flag) dict abort
  let l:Value = a:flag.GetCopy()
  let l:Target = maktaba#value#Focus(l:Value, self._foci)
  call maktaba#ensure#TypeMatchesOneOf(l:Target, [[], {}, 0, 0.0])
  if maktaba#value#IsNumeric(l:Target)
    call maktaba#ensure#IsNumeric(self._value)
    call self._SetAtFocus(a:flag, l:Value, l:Target - self._value)
    return
  endif
  let l:items = s:Listify(self._value)
  if maktaba#value#IsList(l:Target)
    call map(l:items, 'maktaba#list#RemoveAll(l:Target, v:val)')
  else
    call filter(l:items, 'has_key(l:Target, v:val)')
    call map(l:items, 'remove(l:Target, v:val)')
  endif
  call a:flag.Set(l:Value)
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag^=value' type settings.
function! maktaba#setting#PrependTo(flag) dict abort
  let l:Value = a:flag.GetCopy()
  let l:Target = maktaba#value#Focus(l:Value, self._foci)
  call maktaba#ensure#TypeMatchesOneOf(l:Target, ['', []])
  if maktaba#value#IsList(l:Target)
    let l:items = s:Listify(self._value)
    call map(reverse(l:items), 'insert(l:Target, v:val, 0)')
    call a:flag.Set(l:Value)
  else
    call maktaba#ensure#IsString(self._value)
    call self._SetAtFocus(a:flag, l:Value, self._value . l:Target)
  endif
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag$=value' type settings.
function! maktaba#setting#AppendTo(flag) dict abort
  call maktaba#ensure#TypeMatchesOneOf(a:flag.Get(), ['', []])
  call call('maktaba#setting#AddTo', [a:flag], self)
endfunction


""
" @private
" @dict Setting
" The _Affect function for 'flag`=value' type settings.
function! maktaba#setting#Call(flag) dict abort
  let l:Oldval = a:flag.GetCopy()
  let l:Newval = maktaba#function#Call(self._value, [l:Oldval], a:flag)
  call self._SetAtFocus(a:flag, l:Oldval, l:Newval)
endfunction


""
" @private
" @dict Setting
" The _Affect function for '!flag' type settings.
function! maktaba#setting#TurnOff(flag) dict abort
  call self._SetAtFocus(a:flag, a:flag.GetCopy(), 0)
endfunction


""
" @private
" @dict Setting
" The _Affect function for '~flag' type settings.
function! maktaba#setting#Invert(flag) dict abort
  let l:Current = a:flag.GetCopy()
  let l:Target = maktaba#value#Focus(l:Current, self._foci)
  call maktaba#ensure#TypeMatches(l:Target, 0)
  call self._SetAtFocus(a:flag, l:Current, empty(l:Target))
endfunction


" Parses a series of flag foci, like "[key][0]".
function! s:ParseFoci(chunk) abort
  let l:match = matchstr(a:chunk, s:foci)
  if empty(l:match)
    return [[], a:chunk]
  endif

  let l:focus = l:match[1:-2]
  if l:focus =~# s:intstr
    let l:focus = str2nr(l:focus)
  endif
  let l:rest = a:chunk[len(l:match):]

  let [l:foci, l:rest] = s:ParseFoci(l:rest)
  call insert(l:foci, l:focus, 0)
  return [l:foci, l:rest]
endfunction


" @dict Setting
" Creates a setting dict from {definition} (original string), {flagname}
" (string), {foci} (list), {affector} (function), and optional [value].
function! s:Setting(definition, flagname, foci, affector, ...) abort
  let l:dict = {
      \ 'definition': a:definition,
      \ '_flagname': a:flagname,
      \ '_foci': a:foci,
      \ '_GetFlag': function('maktaba#setting#GetFlag'),
      \ '_SetAtFocus': function('maktaba#setting#SetAtFocus'),
      \ '_Affect': a:affector,
      \ 'Apply': function('maktaba#setting#Apply'),
      \}
  if a:0 >= 1
    let l:dict._value = a:1
  endif
  return l:dict
endfunction


" Creates an Operator object where Apply is a binary function.
function! s:BinaryAffector(operator, value) abort
  if a:operator == '='
    if maktaba#value#IsString(a:value) && empty(a:value)
      return function('maktaba#setting#Empty')
    else
      return function('maktaba#setting#Set')
    endif
  elseif a:operator == '+='
    return function('maktaba#setting#AddTo')
  elseif a:operator == '-='
    return function('maktaba#setting#RemoveFrom')
  elseif a:operator == '^='
    return function('maktaba#setting#PrependTo')
  elseif a:operator == '$='
    return function('maktaba#setting#AppendTo')
  elseif a:operator == '`='
    return function('maktaba#setting#Call')
  else
    throw maktaba#error#Failure('%s wrongly parsed as operator.', a:operator)
  endif
endfunction


" Creates an Operator object where Apply is a unary function.
function! s:UnaryAffector(operator) abort
  if a:operator == '!'
    return function('maktaba#setting#TurnOff')
  elseif a:operator == '~'
    return function('maktaba#setting#Invert')
  else
    throw maktaba#error#Failure('%s wrongly parsed as operator.', a:operator)
  endif
endfunction


" Parses a unary operator (! or ~).
function! s:ParseUnaryOp(chunk) abort
  if a:chunk =~# s:unaryop
    return [a:chunk[0], a:chunk[1:]]
  endif
  return ['', a:chunk]
endfunction


" Parses a binary operator (=, +=, -=, ^=, $=, or `=).
function! s:ParseBinaryOp(chunk) abort
  let l:operator = matchstr(a:chunk, s:binaryop)
  return [l:operator, a:chunk[len(l:operator):]]
endfunction


" Parses a value. In order of precedence:
" - Single quoted strings, in which ' can be escaped with ''
" - Double quoted strings, in which " can be ecsaped with \"
" - Backticked strings, in which ` can be escaped with ``, and which will be
"   evaluated to get the value. (Example: `[1, 1 + 1.0, "three"]`
" - Dictionary shortcuts in the form "key1:val1,key2:val2", in which whitespace
"   can be escaped with '\ '.
" - List shortcuts in the form "item1,item2,item3", in which whitespace can be
"   escaped with '\ '.
" - Numbers (containing only alnum characters)
" - Floats (matching /\d+\.\d+/)
" - Strings, in which whitespace can be escaped with '\ '.
function! s:ParseValue(chunk) abort
  if empty(a:chunk)
    return ['', '']
  endif

  " Single and double quoted strings.
  let l:match = matchstr(a:chunk, s:singlestring)
  if empty(l:match)
    let l:match = matchstr(a:chunk, s:doublestring)
  endif
  if !empty(l:match)
    try
      return [eval(l:match), a:chunk[len(l:match):]]
    catch
      let l:msg = 'Bad string value in %s: %s'
      throw maktaba#error#BadValue(l:msg, a:chunk, v:exception)
    endtry
  endif

  " Backticked values (should be evaluated).
  let l:match = matchstr(a:chunk, s:tickstring)
  if !empty(l:match)
    let l:evalable = substitute(l:match[1:-2], '\V``', '`', 'g')
    try
      return [eval(l:evalable), a:chunk[len(l:match):]]
    catch
      let l:msg = 'Could not parse "%s": %s'
      throw maktaba#error#BadValue(l:msg, a:chunk, v:exception)
    endtry
  endif

  let l:match = matchstr(a:chunk, s:standardval)
  return [s:ParseStandardValue(l:match), a:chunk[len(l:match):]]
endfunction


" Parses a shortcut value.
" If it contains ':', it's a dict. Otherwise if it contains ',' it's a list.
" Otherwise coerce it to a number / float / string as possible (in that order).
function! s:ParseStandardValue(value) abort
  if a:value =~# '\m:'
    return s:ParseDictValue(a:value)
  elseif a:value =~# '\m,'
    return s:ParseListValue(a:value)
  else
    return s:StringOrNumeric(a:value)
  endif
endfunction


" Parses a dict of the form "key1:val1,key2:val2".
" Any omitted values are assumed to be "1".
function! s:ParseDictValue(chunk) abort
  let l:dict = {}
  let l:pairs = split(a:chunk, ',', 1)
  for l:pair in l:pairs
    if empty(l:pair)
      throw maktaba#error#BadValue('Empty key:value pair in dict %s.', a:chunk)
    endif
    let l:kv = split(l:pair, ':', 1)
    let l:key = l:kv[0]
    let l:val = join(l:kv[1:], ':')
    let l:val = len(l:kv) == 1 ? 1 : l:val
    let l:dict[l:key] = s:StringOrNumeric(l:val)
  endfor
  return l:dict
endfunction


" Parses a list of the form "item1,item2,item3".
" Empty items are allowed.
function! s:ParseListValue(chunk) abort
  return map(split(a:chunk, ',', 1), 's:StringOrNumeric(v:val)')
endfunction


""
" Parses a flag handle off of {text}, returns a tuple containing
" [flagname, foci, leftover]. See @function(#Handle); the only difference is
" that this function returns the leftover text after parsing instead of
" requiring that {text} exactly describe a flag handle.
function! maktaba#setting#ParseHandle(text) abort
  let l:flagname = matchstr(a:text, s:flagname)
  if empty(l:flagname)
    throw maktaba#error#BadValue('No flag name in flag handle "%s".', a:text)
  endif
  let l:rest = a:text[len(l:flagname):]
  let [l:foci, l:rest] = s:ParseFoci(l:rest)
  return [l:flagname, l:foci, l:rest]
endfunction


""
" @usage handle
" Parses {handle} into a tuple [flagname, foci] where foci is a list of numbers
" and strings. An example may make this clear:
" >
"   :echomsg maktaba#setting#Handle('flag')
"   ~ ['flag', []]
"
"   :echomsg maktaba#setting#Handle('flag[list][3][val]')
"   ~ ['flag', ['list', 3, 'val']]
" <
" More specifically, this parses a flag name and a series of foci in square
" brackets. A flag name may contain alphanumeric characters and underscores.
" Flag names may also contain, BUT NOT END WITH, the following characters:
" - . / : #
"
" Foci are kept in square brackets. They are not allowed to contain square
" brackets. They should describe either dictionary keys or list indices.
"
" You're encouraged to use this function when you're exposing complex flags to
" users. Flag handles are part of the maktaba setting syntax. See
" @function(#Create) for more.
" @throws BadValue if {handle} is invalid.
function! maktaba#setting#Handle(handle) abort
  let [l:flagname, l:foci, l:rest] = maktaba#setting#ParseHandle(a:handle)
  if empty(l:rest)
    return [l:flagname, l:foci]
  endif
  let l:msg = 'Junk after flag handle %s. (Unrecognized: %s)'
  throw maktaba#error#BadValue(l:msg, a:handle, l:rest)
endfunction


" Cuts the original operator from {text} given that {leftover} is leftover.
function! s:Cut(text, leftover) abort
  return a:text[:-len(a:leftover)-1]
endfunction


""
" Parses a setting from {text}. Returns a tuple [setting, leftover] containing
" first the parsed setting object and second the remaining text. See
" |maktaba#setting#Create()| for details, the only difference is that
" this function returns the leftover text rather than requiring that the text
" exactly specify a setting. The setting must either be the whole string, or
" must be followed by whitespace. The leftover string will be returned with
" leading whitespace stripped, so that the leftover result is suitable for
" another parse immediately.
" @throws BadValue if {text} has invalid syntax.
function! maktaba#setting#Parse(text) abort
  let [l:unaryop, l:rest] = s:ParseUnaryOp(a:text)
  try
    let [l:flag, l:foci, l:rest] = maktaba#setting#ParseHandle(l:rest)
  catch /ERROR(BadValue):/
    let l:msg = 'No flag name (or invalid flag prefix) in setting "%s".'
    throw  maktaba#error#BadValue(l:msg, a:text)
  endtry
  if !empty(l:unaryop)
    let l:Affect = s:UnaryAffector(l:unaryop)
  else
    let [l:operator, l:rest] = s:ParseBinaryOp(l:rest)
    if empty(l:operator)
      let l:operator = '='
      " May be a funcref, must start with capital letter.
      let l:Value = 1
    else
      try
        let [l:Value, l:rest] = s:ParseValue(l:rest)
      catch /ERROR(BadValue):/
        throw s:ValueParseError(s:Cut(a:text, l:rest), v:exception)
      endtry
    endif
    let l:Affect = s:BinaryAffector(l:operator, l:Value)
  endif
  let l:args = [s:Cut(a:text, l:rest), l:flag, l:foci, l:Affect]
  if exists('l:Value')
    call add(l:args, l:Value)
  endif
  let l:setting = call('s:Setting', l:args)
  return [l:setting, s:Leftover(l:rest, l:setting)]
endfunction

""
" Creates a maktaba setting from {text}.
" @throws BadValue if {text} has invalid syntax.
function! maktaba#setting#Create(text) abort
  let [l:setting, l:rest] = maktaba#setting#Parse(a:text)
  if empty(l:rest)
    return l:setting
  endif
  throw maktaba#error#BadValue(
      \ 'Junk after setting "%s": %s. (Did you forget quotes or backticks?)',
      \ a:text,
      \ l:rest)
endfunction


""
" Parses a list of settings from {text}. Settings must be separated by spaces or
" tabs. This is the same as repeating @function(#Parse) until {text} is empty.
" @throws BadValue if {text} does not describe valid settings.
function! maktaba#setting#ParseAll(text) abort
  let l:settings = []
  let l:leftover = a:text
  while !empty(l:leftover)
    let [l:setting, l:leftover] = maktaba#setting#Parse(l:leftover)
    call add(l:settings, l:setting)
  endwhile
  return l:settings
endfunction
