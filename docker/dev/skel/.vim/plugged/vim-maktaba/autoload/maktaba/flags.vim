" Most vim plugins are configured with a mess of global variables. These can be
" inconsistent and awkward to use. They're especially awkward to use for complex
" settings, such as lists or dictionaries. Plugin users cannot easily configure
" list settings in .vimrc files, because plugin files (which define the initial
" list) are not sourced until after .vimrc files. Thus, users may only set list
" and dict settings, they may not easily add to or remove from default settings.
"
" For example, suppose a plugin provides a whitelist which you would like to
" alter. You can set the whitelist in your vimrc, but you cannot add to it:
" the whitelist doesn't exist until plugin-time, after the vimrc exits.
"
" The solution is flags. Each Maktaba plugin which uses |maktaba#plugin#Enter|
" has a plugin dictionary, which has a flag dictionary containing Flag objects,
" which are defined in this file. You will interact with them primarily via
" |Plugin.Flag|, but lower level operations can be accessed by using flag
" objects directly.


""
" @dict Flag
" The maktaba flag object. Exposes functions that operate on an individual
" maktaba flag.


""
" Creates a @dict(Flag) object for a flag named {name}.
" The flag will be initialized to [default].
" @default default=0
function! maktaba#flags#Create(name, ...) abort
  " May be a funcref, must start with a capital letter.
  let l:dict = {
      \ '_name': a:name,
      \ 'Get': function('maktaba#flags#Get'),
      \ 'GetCopy': function('maktaba#flags#GetCopy'),
      \ 'Set': function('maktaba#flags#Set'),
      \ '_callbacks': maktaba#reflist#Create(),
      \ 'AddCallback': function('maktaba#flags#AddCallback'),
      \ 'Callback': function('maktaba#flags#Callback'),
      \ '_translators': maktaba#reflist#Create(),
      \ 'AddTranslator': function('maktaba#flags#AddTranslator'),
      \ 'Translate': function('maktaba#flags#Translate'),
      \ }
  let l:dict._value = get(a:, 1, 0)
  lockvar! l:dict._value
  return l:dict
endfunction


""
" @dict Flag
" Gets the value of the flag. You may give [foci] to focus on one particular
" part of the flag. For example:
" >
"   s:plugin.flags.complex.Get(['key', 3])
" <
" is equivalent to
" >
"   s:plugin.flags.complex.Get()['key'][3]
" <
" with the difference that the former throws BadValue errors and the latter
" throws E716.
"
" Flag values are locked. If you need to do complex manipulation on a flag
" value, you must copy it and commit the copied value using |Flag.Set|.
" @throws BadValue if [foci] are invalid.
" @throws WrongType if [foci] contains the wrong types to index the flag.
function! maktaba#flags#Get(...) dict abort
  return maktaba#value#Focus(self._value, get(a:, 1, []))
endfunction


""
" @dict Flag
" Gets a deep copy of the value of the flag. You may give [foci] to focus on one
" particular part of the flag. The following are equivalent:
" >
"   deepcopy(flag.Get())
"   flag.GetCopy()
" <
" This function is convenient if you need to modify a flag, because flag values
" are locked. Remember that if you change the copy the flag itself won't change
" until you call |Flag.Set|.
" @throws BadValue if [foci] are invalid.
" @throws WrongType if [foci] contains the wrong types to index the flag.
function! maktaba#flags#GetCopy(...) dict abort
  return deepcopy(call('maktaba#flags#Get', a:000, self))
endfunction


""
" @dict Flag
" Sets the flag to {value}. If [foci] are given, they target a specific part of
" a (complex) flag to be set. For example,
" >
"   call s:plugin.flags.complexflag.Set('leaf', ['a', 0, 'b'])
" <
" will set value['a'][0]['b'] to 'leaf'.
" @throws BadValue when an invalid focus is requested.
" @throws WrongType if [foci] contains the wrong types to index the flag.
function! maktaba#flags#Set(Value, ...) dict abort
  let l:foci = maktaba#ensure#IsList(get(a:, 1, []))
  if empty(l:foci)
    let l:Value = a:Value
  else
    " We do a deepcopy here because we don't want to commit changes until all
    " translators succeed.
    let l:Value = maktaba#value#Focus(deepcopy(self._value), l:foci, a:Value)
  endif
  let l:Value = self.Translate(l:Value)
  " Note that self._value is not touched until all translators passed.
  unlockvar! self._value
  let self._value = l:Value
  lockvar! self._value
  call self.Callback()
  return self._value
endfunction


""
" @dict Flag
" Registers {callback}. It must refer to a function. The function must take one
" argument: the value of the flag. {callback} will (by default) be fired
" immediately with the current value of the flag. It will be fired again every
" time the flag changes.
"
" Callbacks are fired AFTER translation occurs. Callbacks are fired in order of
" their registration.
"
" This function returns a function which, when applied, unregisters {callback}.
" Hold on to it if you expect you'll need to remove {callback}.
"
" If [fire_immediately] is zero, {callback} will only be fired when the
" current value of the flag changes.
" @default fire_immediately=1
" @throws WrongType if {callback} is not callable.
" @throws BadValue if {callback} is not a funcdict.
function! maktaba#flags#AddCallback(F, ...) dict abort
  call maktaba#ensure#IsCallable(a:F)
  let l:fire_immediately = maktaba#ensure#IsBool(get(a:, 1, 1))

  let l:remover = self._callbacks.Add(a:F)
  if l:fire_immediately
    call maktaba#function#Apply(a:F, self._value)
  endif
  return l:remover
endfunction


""
" @dict Flag
" Fires all callbacks in order.
function! maktaba#flags#Callback() dict abort
  for l:Callback in self._callbacks.Items()
    call maktaba#function#Apply(l:Callback, self._value)
    " May change type.
    unlet l:Callback
  endfor
endfunction


""
" @dict Flag
" @usage translator
" Registers {translator}. {translator} must refer to a function that takes
" a single argument (the value of the flag). {translator} must return a value
" which will become the new value of the flag.
"
" {translator} will be applied to the current value of the flag immediately, and
" then all registered callbacks will be fired. Thereafter, translators will be
" run every time the flag changes. Translators are fired in order of their
" registration. Callbacks are fired AFTER translation occurs.
"
" This function returns a function which, when called, unregisters
" {translator}. Hold on to it if you expect you'll need to remove
" {translator}.
" @throws WrongType if {translator} is not callable.
" @throws BadValue if {translator} is not a funcdict.
function! maktaba#flags#AddTranslator(F) dict abort
  call maktaba#ensure#IsCallable(a:F)
  let l:remover = self._translators.Add(a:F)
  unlockvar! self._value
  let self._value = maktaba#function#Apply(a:F, self._value)
  lockvar! self._value
  call self.Callback()
  return l:remover
endfunction


""
" @dict Flag
" Returns the value that the flag will have after being set to {value} (after
" running {value} through all registered translators).
function! maktaba#flags#Translate(Value) dict abort
  let l:Value = a:Value
  if !empty(self._translators)
    for l:Translator in self._translators.Items()
      let l:Value = maktaba#function#Apply(l:Translator, l:Value)
      " May change type.
      unlet l:Translator
    endfor
  endif
  return l:Value
endfunction
