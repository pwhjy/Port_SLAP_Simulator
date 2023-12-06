function! s:IsFunctionContext(context) abort
  return maktaba#value#IsDict(a:context)
      \ || (maktaba#value#IsNumber(a:context) && a:context == 0)
endfunction


function! s:EnsureFunctionContext(context) abort
  if !s:IsFunctionContext(a:context)
    let l:msg = 'Function context must be either a dictionary or 0.'
    throw maktaba#error#BadValue(l:msg)
  endif
  return a:context
endfunction


"" @private
function! maktaba#function#DoCall(...) dict abort
  return maktaba#function#Call(self, get(a:, 1, []), get(a:, 2, 0))
endfunction

"" @private
function! maktaba#function#DoApply(...) dict abort
  return maktaba#function#Call(self, a:000)
endfunction

"" @private
function! maktaba#function#DoWithArgs(...) dict abort
  return maktaba#function#Create(self, a:000)
endfunction

"" @private
function! maktaba#function#DoWithContext(dict) dict abort
  return maktaba#function#WithContext(self, a:dict)
endfunction

let s:DoCall = function('maktaba#function#DoCall')
let s:DoApply = function('maktaba#function#DoApply')
let s:DoWithArgs = function('maktaba#function#DoWithArgs')
let s:DoWithContext = function('maktaba#function#DoWithContext')


""
" @private
" Names correspond to |call()| help docs.
" Can be tricked, but only if people are accessing our private functions.
function! maktaba#function#IsWellFormedDict(F) abort
  return maktaba#value#IsDict(a:F)
      \ && has_key(a:F, 'Call')
      \ && maktaba#function#HasSameName(a:F.Call, s:DoCall)
endfunction


""
" Checks whether Funcrefs {F} and {G} refer to the same function name.
" Ignores bound arguments on partials, so the following check succeeds >
"   let F = function('X')
"   let G = function('X', [1])
"   call maktaba#ensure#IsTrue(maktaba#function#HasSameName(F, G))
" <
" @throws WrongType if either arg is not a Funcref.
function! maktaba#function#HasSameName(F, G) abort
  call maktaba#ensure#IsFuncref(a:F)
  call maktaba#ensure#IsFuncref(a:G)
  if has('patch-7.4.1875')
    return get(a:F, 'name') ==# get(a:G, 'name')
  endif
  return a:F ==# a:G
endfunction


""
" Creates a funcdict object that can be applied with @function(#Apply).
" When applied, {func} will be applied with [arglist], a list of arguments.
" If {func} is already a funcdict, it will be passed the arguments in [arglist]
" AFTER the arguments that are already pending.
"
" If [dict] is given it must be a dictionary, which will be passed as the
" dictionary context to {func} when applied. (In this case, {func} must be
" a dictionary function.) [dict] may also be the number 0, in which case it will
" be ignored.
"
" This allows you to create actual closures in vimscript (by storing context in
" a dictionary, see |Dictionary-function|.
"
" Note that the resulting funcdict can only be used in scopes where {func} can
" be used. For example, if {func} is script-local then the resulting function
" object is also script-local. (Builtin and autoloaded functions are in the
" global scope, so if {func} is builtin or autoloaded then the resulting
" function object can be used anywhere).
"
" @default arglist=[]
" @default dict=0
function! maktaba#function#Create(F, ...) abort
  call maktaba#ensure#IsCallable(a:F)
  let l:arglist = maktaba#ensure#IsList(get(a:, 1, []))
  let l:dict = s:EnsureFunctionContext(get(a:, 2))
  let l:base = {
      \ 'Call': s:DoCall,
      \ 'Apply': s:DoApply,
      \ 'WithArgs': s:DoWithArgs,
      \ 'WithContext': s:DoWithContext
      \}
  if maktaba#value#IsDict(a:F)
    let l:base.func = a:F.func
    let l:base.arglist = a:F.arglist + l:arglist
    let l:base.dict = maktaba#value#IsDict(l:dict) ? l:dict : a:F.dict
  else
    let l:base.func = a:F
    let l:base.arglist = l:arglist
    let l:base.dict = l:dict
  endif
  return l:base
endfunction


""
" @usage func [arglist] [dict]
" Applies {func} (optionally to [arglist], optionally with [dict] as its
" dictionary context). {func} may be a funcref, a string describing a function,
" or a maktaba funcdict (see @function(#Create)).
"
" If {func} is a funcdict that has arguments pending, [arglist] will be sent to
" the function APPENDED to the pending arguments.
"
" [dict], if given and non-zero, will override any existing dictionary context.
" Note that if [dict] is given, {func} must describe a dictionary function.
"
" @default arglist=[]
" @default dict=0
function! maktaba#function#Call(F, ...) abort
  call maktaba#ensure#IsCallable(a:F)
  let l:args = maktaba#ensure#IsList(get(a:, 1, []))
  if maktaba#value#IsDict(a:F)
    let l:dict = get(a:, 2)
    if maktaba#value#IsNumber(l:dict)
      unlet l:dict
      let l:dict = a:F.dict
    endif
    return maktaba#function#Call(a:F.func, a:F.arglist + l:args, l:dict)
  endif
  let l:dict = get(a:, 2)
  if maktaba#value#IsDict(l:dict)
    return call(a:F, l:args, l:dict)
  endif
  return call(a:F, l:args)
endfunction


""
" Creates a funcdict that is {method} on {dict}, with {dict} bound as the
" dictionary context.
"
" This is usually what users mean when they say something like dict.Method, but
" unfortunately, vimscript 'forgets' the dictionary context when you extract
" a method. Thus, you sometimes have to do things like
" >
"   call call(dict.Method, [args], dict)
" <
" Which is just silly. Using this function, you can do
" >
"   call maktaba#function#Method(dict, 'Method').Apply(args)
" <
" which is a little less repetitive.
"
" @throws NotFound if {dict} has no such {method}.
function! maktaba#function#Method(dict, method) abort
  call maktaba#ensure#IsDict(a:dict)
  call maktaba#ensure#IsString(a:method)
  if !has_key(a:dict, a:method)
    let l:msg = 'Method %s in dict %s.'
    throw maktaba#error#NotFound(l:msg, a:method, string(a:dict))
  endif
  call maktaba#ensure#IsCallable(a:dict[a:method])
  return maktaba#function#Create(a:dict[a:method], [], a:dict)
endfunction


""
" @usage func [args...]
" Applies {func} to [args...]. This is like @function(#Call), but allows you to
" pass arguments in naturally rather than wrapping them in a list.
"
" Note that because vimscript functions are limited to 20 arguments, and because
" one argument is spent to specify {func}, this function can only send nineteen
" arguments on. If this is too limiting, use |#Call|.
function! maktaba#function#Apply(F, ...) abort
  return maktaba#function#Call(a:F, a:000)
endfunction


""
" Given callable {func}, creates a function object that will be called with
" [arg...] when it is applied. If {func} is a funcdict with pending arguments,
" then when {func} is applied [arg...] will be sent to the inner function AFTER
" the existing arguments. For example:
" >
"   :echomsg maktaba#function#WithArgs('get', ['a', 'b', 'c']).Apply(1)
" <
" This will echo b.
"
" This will always create a new funcdict. {func} will not be modified.
function! maktaba#function#WithArgs(F, ...) abort
  return maktaba#function#Create(a:F, a:000)
endfunction


""
" Creates a funcdict that will call {func} with dictionary context {dict} when
" applied.
"
" This will always create a new funcdict. {func} will not be modified.
function! maktaba#function#WithContext(F, dict) abort
  return maktaba#function#Create(a:F, [], a:dict)
endfunction


""
" @private
" The Apply of a @function(#FromExpr) funcdict.
function! maktaba#function#EvalExpr(expr, ...) abort dict
  return eval(a:expr)
endfunction


""
" Creates a funcdict that evaluates and returns {expr} when applied. {expr} may
" reference numbered arguments (|a:1|, a:2, ... through a:19). {expr} itself is
" available as a:expr. [arglist] will be queued as the initial arguments, if
" given:
" >
"   :let hello = maktaba#function#FromExpr('a:1 . ", " . a:2', ['Hello'])
"   :echomsg hello.Apply('World')
" <
" This will echo "Hello, World".
"
" If [dict] is given then it must be a dictionary, and will be used as the
" dictionary context for the resulting function. In that case, {expr} may also
" make use of |self|.
function! maktaba#function#FromExpr(expr, ...) abort
  let l:arglist = get(a:, 1, [])
  let l:dict = get(a:, 2, {})
  return maktaba#function#Create(
      \ 'maktaba#function#EvalExpr', [a:expr] + l:arglist, l:dict)
endfunction


""
" @private
" The Apply of a function composition.
function! maktaba#function#DoCompose(...) dict abort
  call map(self.functions, 'maktaba#ensure#IsCallable(v:val)')
  if empty(self.functions)
    throw maktaba#error#BadValue('Cannot compose no functions.')
  endif
  let l:args = a:000
  for l:Function in self.functions
    let l:Result = maktaba#function#Call(l:Function, l:args)
    let l:args = [l:Result]
    unlet l:Function
  endfor
  return l:Result
endfunction



""
" @usage {g} {f}
" Creates a composition of {g} and {f}.
"
" This creates a function object that, when applied, will apply {g} to the
" result of applying {f} to the given arguments.
"
" Notice that, as per the usual convention, control flow passes RIGHT TO LEFT:
" {g} (the FIRST argument) will be run on the result of {f} (the SECOND
" argument).
"
" The final result is returned.
"
" @usage {functions...}
" Composes all of {functions...}, RIGHT to LEFT. For example,
" >
"   :let HGF = maktaba#function#Compose(H, G, F)
"   :call HGF.Apply(x)
" <
" computes H(G(F(x))).
function! maktaba#function#Compose(F, ...) abort
  let l:context = {'functions': reverse(copy(a:000))}
  call add(l:context.functions, a:F)
  return maktaba#function#Create('maktaba#function#DoCompose', [], l:context)
endfunction


""
" @usage {list} {func}
" Replaces each item of {list} with the result of applying {func} to that item.
" This is like |map|, except {func} may be any maktaba callable and where a new
" list is created. Unlike the builtin map() function, {list} WILL NOT be
" modified in place.
"
" If you really need to modify a list in-place, you can use
" >
"   map({list}, 'maktaba#function#Call({func}, [v:val])')
" <
function! maktaba#function#Map(list, F) abort
  call maktaba#ensure#IsList(a:list)
  return map(copy(a:list), 'maktaba#function#Call(a:F, [v:val])')
endfunction


""
" @usage {list} {func}
" Applies {func} to each item in {list}, and removes those for which {func}
" returns 0. This is like |filter|, except {func} may be any maktaba callable
" and a new list is created. Unlike the builtin filter() function, {list} WILL
" NOT be modified in place.
"
" If you really need to filter a list in-place, you can use
" >
"   filter({list}, 'maktaba#function#Call({func}, [v:val])')
" <
function! maktaba#function#Filter(list, F) abort
  call maktaba#ensure#IsList(a:list)
  return filter(a:list, 'maktaba#function#Call(a:F, [v:val])')
endfunction


""
" @usage {list} {initial} {func}
" Reduces {list} to a single value, using {initial} and {func}.
" {func} must be a function that takes two values.
"
" First, {func} is applied to {initial} and the first item in {list}.
" Then, {func} is applied again to the first result and the second item in
" {list}, and so on. The final result is returned.
"
" If {list} is empty, {initial} will be returned.
function! maktaba#function#Reduce(list, Initial, F) abort
  call maktaba#ensure#IsList(a:list)
  let l:Value = a:Initial
  for l:Item in a:list
    let l:Value = maktaba#function#Call(a:F, [l:Value, l:Item])
  endfor
  return l:Value
endfunction


""
" @usage {list} {func}
" Like @function(#Reduce), except {list} must be non-empty. The first item of
" {list} will be used as the initial value, the remainder of {list} will be
" reduced.
"
" @throws BadValue if {list} is empty.
function! maktaba#function#Reduce1(list, F) abort
  call maktaba#ensure#IsList(a:list)
  if empty(a:list)
    throw maktaba#error#BadValue('Cannot Reduce1 an empty list.')
  endif
  return maktaba#function#Reduce(a:list[1:], a:list[0], a:F)
endfunction


""
" @private
" Used as a bridge between #Sorted and sort().
function! maktaba#function#DoSort(x, y) dict abort
  return maktaba#function#Call(self.function, [a:x, a:y])
endfunction


""
" Sorts {list} IN PLACE, using {func} to determine the order of items in the
" list. {func} must take two arguments and return either 0 (if they are equal),
" 1 (if the first item comes after the second item), or -1 (if the second item
" comes after the first item).
"
" {list} is returned, for convenience.
"
" This is like the builtin |sort()| function, except {func} may be any maktaba
" callable.
function! maktaba#function#Sort(list, F) abort
  call maktaba#ensure#IsList(a:list)
  call maktaba#ensure#IsCallable(a:F)
  return sort(a:list, 'maktaba#function#DoSort', {'function': a:F})
endfunction


""
" Returns a new list that is a sorted copy of {list}. {func} is used to
" determine the sort order, as in |sort()|.
function! maktaba#function#Sorted(list, F) abort
  return maktaba#function#Sort(copy(a:list), a:F)
endfunction
