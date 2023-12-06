""
" @section Error Handling, exceptions
" Maktaba provides utilities for error handling in vim.
" Unfortunately, error handling in vim is insane.
" The "catch" command takes a regex that matches the error message.
" You should always match an error code, because the message itself can be
" locale dependant. Vim's error codes are opaque and poorly documented.
"
" To make matters worse, you can't define error codes as variables and catch
" them, because
" >
"   catch g:MY_ERROR_CODE
" <
" tries to match the literal characters 'g:MY_ERROR_CODE', not the result of the
" variable. And you can't use
" >
"   execute 'catch' g:MY_ERROR_CODE
" <
" because execute runs WITHIN the context of the try block -- |:execute|d catch
" are completely ignored.
"
" And just to keep things interesting, your catch statements had better not use
" the ^ atom, because the error code isn't always at the beginning of the
" exception text. Vim may tack other context data at the beginning.
" The best you can do is something like this:
" >
"   " Function not found.
"   catch /E117:/
" <
"
" and hope that normal error text doesn't contain things that look like error
" codes. Vimscript doesn't allow us much in the way of error safety: the best we
" can do is establish a convention and play make-believe. The convention is as
" follows:
"
" 1. Use error names (CamelCased short versions of the error type) instead of
"   opaque error codes. This makes your code more readable.
" 2. Wrap error codes in ERROR() instead of E...: This differentiates custom
"   errors from vim errors and has the pleasant side effect of tricking the vim
"   syntax highlighting into thinking we know what we're doing.
"
" Example:
" >
"   ERROR(NotFound): File "your/file" not found.
" <
"
" Below you'll find helper functions for generating such error messages.
" With any luck, this will help you avoid a few typos.

let s:errortype = '\v[a-zA-Z0-9_-]*'
let s:maktabaerror = '\vERROR\(([a-zA-Z0-9_-]*)\): (.*)'
let s:vimerror = '\v<E(\d+): (.*)'


" Echoes {message} with the given {highlight}.
" {message} will be formatted with [args...], as in |printf()|.
function! s:EchoHighlighted(highlight, message, ...) abort
  let l:msg = empty(a:0) ? a:message : call('printf', [a:message] + a:000)
  execute 'echohl' a:highlight
  for l:line in split(l:msg, "\n")
    echomsg l:line
  endfor
  echohl NONE
endfunction


""
" Prints {message} in a red warning bar for the user.
" {message} will be formatted with [args...], as in |printf()|.
function! maktaba#error#Warn(message, ...) abort
  call call('s:EchoHighlighted', ['WarningMsg', a:message] + a:000)
endfunction


""
" Prints {message} in an angry red error bar for the user.
" Don't use |:echoerr|! It doesn't make that red error bar and it prints out the
" line in the code where the error occurred. It's for debugging, not messaging!
" If [args...] are given they will be used to expand {message} as in |printf()|.
function! maktaba#error#Shout(message, ...) abort
  call call('s:EchoHighlighted', ['ErrorMsg', a:message] + a:000)
endfunction


""
" Simple function used for making exception functions.
" This is very similar to @function(#Message) in that it throws
" >
"   ERROR({type}): {message}
" <
" The only difference is that the {fmtargs} is a required list argument, whereas
" @function(#Message) uses varargs. This function exists to make it easy to
" write exception functions without messing with vararg logic. For example:
" >
"   function! maktaba#error#NotFound(message, ...)
"     return maktaba#error#Exception('NotFound', a:message, a:000)
"   endfunction
" <
"
" {type} must contain only letters, numbers, underscores, and hyphens.
" @throws BadValue if {type} contains invalid characters.
" @throws WrongType if {type} is not a string.
function! maktaba#error#Exception(type, message, fmtargs) abort
  call maktaba#ensure#Matches(a:type, s:errortype)
  if empty(a:fmtargs)
    let l:message = a:message
  else
    let l:message = call('printf', [a:message] + a:fmtargs)
  endif
  return 'ERROR(' . a:type . '): ' . l:message
endfunction


""
" Makes an error message in the maktaba vimscript error format.
" The error message will look like:
" >
"   ERROR({type}): {message}
" <
" {message} will be formatted with [args...] as in |printf()|.
"
" {type} must contain only letters, numbers, underscores, and hyphens.
" @throws BadValue if {type} contains invalid characters.
" @throws WrongType if {type} is not a string.
function! maktaba#error#Message(type, message, ...) abort
  return maktaba#error#Exception(a:type, a:message, a:000)
endfunction


""
" @exception
" For when someone tries to do something they shouldn't.
function! maktaba#error#NotAuthorized(message, ...) abort
  return maktaba#error#Exception('NotAuthorized', a:message, a:000)
endfunction


""
" @exception
" For when someone expected something to be there, and it wasn't.
function! maktaba#error#NotFound(message, ...) abort
  return maktaba#error#Exception('NotFound', a:message, a:000)
endfunction


""
" @exception
" For attempts to use functionality that is not supported, usually for cases
" where an interface implies support that isn't implemented due to technical
" limitations.
function! maktaba#error#NotImplemented(message, ...) abort
  return maktaba#error#Exception('NotImplemented', a:message, a:000)
endfunction


""
" @exception
" For when a caller tried to use the wrong type of arguments to a function.
function! maktaba#error#WrongType(message, ...) abort
  return maktaba#error#Exception('WrongType', a:message, a:000)
endfunction


""
" @exception
" For when a caller tried to pass an unusable value to a function.
function! maktaba#error#BadValue(message, ...) abort
  return maktaba#error#Exception('BadValue', a:message, a:000)
endfunction


""
" @exception
" For when a function is given the wrong number of arguments.
" Prefer |ERROR(WrongType)| and |ERROR(BadValue)| when relevant.
function! maktaba#error#InvalidArguments(message, ...) abort
  return maktaba#error#Exception('InvalidArguments', a:message, a:000)
endfunction


""
" @exception
" For use when this vim instance is missing support for necessary functionality,
" e.g. when a |has()| check fails or |v:servername| wasn't set.
function! maktaba#error#MissingFeature(message, ...) abort
  return maktaba#error#Exception('MissingFeature', a:message, a:000)
endfunction


""
" @exception
" For use in code that should never be reached.
" Should only be thrown to indicate there's a bug in the plugin, and should
" never be caught or declared with `@throws`.
function! maktaba#error#Failure(message, ...) abort
  return maktaba#error#Exception('Failure', a:message, a:000)
endfunction


""
" Breaks {exception} message into the error type and the error message.
" Returns both (in a list of length 2).
" @throws BadValue if {exception} is not a vim nor maktaba exception.
function! maktaba#error#Split(exception) abort
  let l:match = matchlist(a:exception, s:maktabaerror)
  if empty(l:match)
    let l:match = matchlist(a:exception, s:vimerror)
    if empty(l:match)
      let l:err = '%s is not a vim nor maktaba exception.'
      throw maktaba#error#BadValue(l:err, a:exception)
    endif
    let l:match[1] = str2nr(l:match[1])
  endif
  return l:match[1:2]
endfunction


function! s:ExceptionMatches(exceptions, errortext) abort
  if maktaba#value#IsString(a:exceptions)
    return a:errortext =~# a:exceptions
  endif
  for l:exception in a:exceptions
    if maktaba#value#IsNumber(l:exception) || l:exception =~# '\v^\d+$'
      if a:errortext =~# 'E' . l:exception . ':'
        return 1
      endif
    elseif a:errortext =~# printf('ERROR(%s):', l:exception)
      return 1
    endif
  endfor
endfunction


""
" @usage func [exceptions] [default]
" Runs {func}. Catches [exceptions] and @function(#Shout)s them. Other
" exceptions are allowed to pass through. If an exception is caught and shouted,
" [default] is returned.
"
" USE THIS FUNCTION WHEN YOU WANT ERRORS TO BE EXPOSED TO THE END USER.
" Do not allow expected exceptions to propagate to the user normally: this will
" result in an ugly and intimidating stack trace. If a function has EXPECTED
" failure modes, and you WANT the error messages to be surfaced to the user
" (without a stack trace), use this function.
"
" {func} may be any maktaba callable. See |maktaba#function#Create|.
"
" [exceptions] may either be a regex matched against |v:exception|, or a list of
" maktaba error names and/or vim error numbers. For example, the following are
" equivalent:
" >
"   call maktaba#error#Try(g:fn, 'ERROR(BadValue):\|E107:')
"   call maktaba#error#Try(g:fn, ['BadValue', 107])
" <
" Use '.*' to expose all exceptions.
"
" @default exceptions=.*
" @default default=0
" @throws BadValue if {func} is not a funcdict.
" @throws WrongType if {func} is not callable, or if [exceptions] is neither a
"     regex nor a list.
function! maktaba#error#Try(F, ...) abort
  let l:exceptions = maktaba#ensure#TypeMatchesOneOf(get(a:, 1, '.*'), [[], ''])
  if maktaba#value#IsList(l:exceptions)
    call map(l:exceptions, 'maktaba#ensure#TypeMatchesOneOf(v:val, [0, ""])')
  endif
  call maktaba#ensure#IsCallable(a:F)
  try
    return maktaba#function#Apply(a:F)
  catch
    if s:ExceptionMatches(l:exceptions, v:exception)
      call maktaba#error#Shout(v:exception)
      return get(a:, 2)
    else
      echoerr v:exception
    endif
  endtry
endfunction


""
" Like @function(#Try), but executes {command} instead of calling a function.
" @default exceptions=.*
" @throws WrongType if [exceptions] is neither a regex nor a list.
function! maktaba#error#TryCommand(command, ...) abort
  let l:exceptions = maktaba#ensure#TypeMatchesOneOf(get(a:, 1, '.*'), [[], ''])
  if type(l:exceptions) == type([])
    call map(l:exceptions, 'maktaba#ensure#TypeMatchesOneOf(v:val, [0, ""])')
  endif
  try
    execute a:command
  catch
    if s:ExceptionMatches(l:exceptions, v:exception)
      call maktaba#error#Shout(v:exception)
    else
      echoerr v:exception
    endif
  endtry
endfunction
