function! s:NotALibrary(plugin, message, ...) abort
  let l:msg = 'Plugin "%s" is not a library plugin. ' . a:message
  return maktaba#error#Exception('NotALibrary', l:msg, [a:plugin.name] + a:000)
endfunction


function! s:EnsureIsLibrary(plugin) abort
  if a:plugin.IsLibrary()
    return a:plugin
  endif
  let l:dirs = filter(maktaba#plugin#NonlibraryDirs(), 'a:plugin.HasDir(v:val)')
  if empty(l:dirs)
    throw s:NotALibrary(a:plugin, "It doesn't contain an autoload directory.")
  endif
  throw s:NotALibrary(
      \ a:plugin,
      \ 'It contains the following directories illegal in library plugins: %s.',
      \ join(l:dirs, ', '))
endfunction


""
" Imports {library}.
"
" NOTICE: You probably want @function(#Require) instead. When calling this
" function, YOU ARE EXPECTED TO CATCH ERRORS and format the error messages
" nicely for the user. (See |maktaba#error#Shout|). Otherwise the user
" will see ugly stack traces.
"
" NOTICE: {library} MUST BE A LIBRARY PLUGIN. It should provide only autoloaded
" functions. It should not provide commands, autocmds, key mappings, filetypes,
" or any other user-impacting functionality. maktaba#library#Require is designed
" to allow plugins to pull in other plugins without the user worrying about
" dependencies, but the user should NEVER have weird key mappings / settings
" changes / etc. appearing due to dependencies required by a rogue plugin.
"
" This function will act as follows:
"
" 1. Check whether {library} has already been installed via
"    @function(maktaba#plugin#Install).
" 2. Try each installer registered my
"    @function(maktaba#library#AddInstaller), in order of registration.
"
" The maktaba plugin object will be returned.
"
" In normal usage, the plugin manager will be used to satisfy library
" dependencies at the plugin level (via dependency support if available,
" otherwise manually satisfied by the user). This function is only used to
" safely access the plugin handle from code, and @function(#Require) is used to
" ensure individual files that depend on the library have access to it (or cause
" an error to be printed).
"
" @throws NotALibrary if {library} is not a library plugin.
" @throws NotFound if {library} cannot be installed by any installer.
function! maktaba#library#Import(library) abort
  let l:name = maktaba#plugin#CanonicalName(a:library)
  if maktaba#plugin#IsRegistered(l:name)
    let l:plugin = maktaba#plugin#Get(l:name)
    return s:EnsureIsLibrary(l:plugin)
  endif
  let l:names = []
  for [l:name, l:Installer] in s:maktaba.globals.installers
    call add(l:names, l:name)
    try
      let l:plugin = call(l:Installer, [a:library])
    catch /ERROR(NotFound):/
      " May change type.
      unlet l:Installer
      continue
    endtry
    return s:EnsureIsLibrary(l:plugin)
  endfor
  if empty(l:names)
    throw maktaba#error#NotFound(
        \ 'Library "%s" could not be installed, ' .
        \ 'because there are no library installers registered with maktaba.',
        \ a:library)
  endif
  throw maktaba#error#NotFound(
      \ 'Library "%s" not recognized by any installer. ' .
      \ 'The following installers were tried: %s.',
      \ a:library,
      \ join(l:names, ', '))
endfunction


""
" Requires that {library} be imported. (See @function(#Import)).
"
" Works just like @function(#Import), except errors will be caught and printed
" in a user-friendly manner (shielding the user from ugly stack dumps). This
" function returns 1 on success and 0 on failure. Use this instead of
" @function(#Import) when you don't care to grab a handle to the imported plugin
" object (which is usually).
"
" In normal usage, the plugin manager will be used to satisfy library
" dependencies at the plugin level (via dependency support if available,
" otherwise manually satisfied by the user). This function is only used to
" ensure individual files that depend on the library have access to it (or cause
" an error to be printed).
"
" If a dependency cannot be satisfied, an error message will be shouted, but no
" error is thrown and the sourcing file will still be allowed to continue
" executing normally. The plugin code will ordinarily throw additional errors
" when it tries to call into library code. Errors shouted here are secondary and
" only intended to provide context and sometimes earlier detection.
"
" @throws NotALibrary if {library} describes a non-library plugin.
function! maktaba#library#Require(library) abort
  try
    call maktaba#library#Import(a:library)
  catch /ERROR(NotFound):/
    call maktaba#error#Shout(v:exception)
    return 0
  endtry
  return 1
endfunction


""
" @usage name installer
" Adds a library installer.
"
" {installer} should be a callable that takes a single argument (the name of
" a library). {installer} must take one two actions.
"
" 1. Return the installed maktaba plugin object (see
"    @function(maktaba#plugin#Install).
" 2. Throw a NotFound error if the plugin cannot be found.
"
" {installer} need not worry about verifying that the installed plugin is
" actually a library plugin, that is handled by maktaba.
"
" This function returns a function which, when applied, unregisters
" {installer}. Hold on to it if you expect you'll need to remove {installer}.
"
" @throws BadValue if there's already an installer registered under {name}.
function! maktaba#library#AddInstaller(name, F) abort
  for l:tuple in s:maktaba.globals.installers
    if a:name == l:tuple[0]
      let l:msg = 'Cannot register installer under "%s": name already taken.'
      throw maktaba#error#BadValue(l:msg, a:name)
    endif
  endfor
  call add(s:maktaba.globals.installers, [a:name, a:F])
endfunction


""
" Removes the library installer named {name}.
" @throws NotFound if no such installer exists.
function! maktaba#library#RemoveInstaller(name) abort
  let l:len = len(s:maktaba.globals.installers)
  call filter(s:maktaba.globals.installers, 'v:val[0] !=# a:name')
  if len(s:maktaba.globals.installers) < l:len
    return
  endif
  let l:msg = 'No library installer registered as %s.'
  throw maktaba#error#NotFound(l:msg, a:name)
endfunction


" Must be at the end of the file, to avoid infinite loops.
let s:maktaba = maktaba#Maktaba()
