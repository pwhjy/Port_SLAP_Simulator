" This is a vim autoload file. Vim loads them on demand when you try to call a
" function from the same namespace.
"
" All global functions a plugin defines should be autoload functions (with the
" exception of global functions that must be defined with a particular name to
" make another plugin work). Any file can define script-local functions, but
" large functions with non-trivial logic should always be kept in autoload
" functions.
"
" Unlike files in plugin/ and ftplugin/, autoload files are not explicitly
" guarded against re-entry. For instance, a trivial way to trigger vim to
" re-enter this file is to call helloworld#NonexistentFunction.

" Script-local variables should be defined together at the top. Because this
" file is not guarded against re-entry, they should all be constants (or always
" evaluate to the same instance like s:plugin below).

let s:plugin = maktaba#plugin#Get('helloworld')

" All functions should be defined using "function!" to avoid "Function already
" exists" errors on re-entry.

" Script-local functions should be defined together after the script-local
" variables. It's generally fine for script-local function to throw errors for
" known conditions, provided any calling code catches those errors before they
" reach the user.

""
" Get the person or thing to whom the last greeting was addressed.
" @throws NotFound if there is no greeted name (probably no greeting yet).
function! s:GetLastGreetee() abort
  " This logic is carefully structured to avoid throwing an error inside an if
  " block. If an error is thrown from the body of an if statement or loop, vim
  " includes an ugly "Missing :endif" error (http://goo.gl/dY0IYJ). There's no
  " way to avoid it in general, but sometimes you can work around it.
  if has_key(s:plugin.globals, 'greeted_name')
    return s:plugin.globals.greeted_name
  endif
  throw maktaba#error#NotFound('previously greeted name')
endfunction


" Next come the autoload functions. You need to use autoload functions to be
" able to call them from plugin/ files or other autoload files, but even if you
" don't have an immediate need to call them from other files, it often makes
" sense to define non-trivial logic in private autoload functions because they
" can be overridden for testing, or conveniently called for troubleshooting
" purposes.
"
" Stack traces look ugly and should not be shown directly to users for known
" failure conditions. These top-level functions should generally shout errors
" instead of throwing them. Functions that throw errors often make sense to keep
" script-local or organize into library plugins.

""
" Issues a greeting to [name].
" This is the implementation for @command(Hello).
" @default name=@flag(name)
function! helloworld#SayHello(...) abort
  " Get the first optional argument (a:1) as l:name, falling back to the flag
  " if no argument was passed.
  let l:name = get(a:, 1, s:plugin.Flag('name'))
  " Catch and shout this error instead of letting it bubble up to the user.
  try
    call maktaba#ensure#IsString(l:name)
  catch /ERROR(WrongType):/
    call maktaba#error#Shout(v:exception)
  endtry
  let s:plugin.globals.greeted_name = l:name
  echomsg printf('Hello, %s!', l:name)
endfunction


""
" Issues a farewell to recently greeted name. Shows an error if no greeting has
" been issued, or if greeted name was not a string.
function! helloworld#SayGoodbye() abort
  try
    let l:name = s:GetLastGreetee()
    echomsg printf('Goodbye, %s!', l:name)
  catch /ERROR(NotFound):/
    call maktaba#error#Shout(
        \ "It's very rude to say goodbye before you've said hello.")
  endtry
endfunction
