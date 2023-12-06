""
" @dict ExtensionRegistry
" A registry for the extensions used by a single plugin.  Extensions are
" dictionaries (usually with some function fields) with a plugin-specific
" interpretation.
"
" Plugins should use @function(Plugin.GetExtensionRegistry) to gain
" access to their own extension registry, and @function(#GetRegistry) to gain
" access to an extension registry for another plugin.
"
" For example, a hypothetical code-formatting plugin would use the following
" to retrieve a list of extensions, where each extension represents a
" formatter for a particular filetype:
" >
"   let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
"   ...
"   let l:registry = s:plugin.GetExtensionRegistry()
"   for l:extension in l:registry.GetExtensions()
"     if &filetype is# l:extension.filetype
"       call maktaba#function#Call(l:extension.FormatBuffer)
"       return
"     endif
"   endfor
" <
" Likewise, a plugin providing another formatter would use the following to
" register a new extension:
" >
"   let l:extension = {
"       \ 'filetype': 'python',
"       \ 'FormatBuffer': function('pyformatter#FormatUsingAutopep8'),
"       \ }
"   let l:codefmt_registry = maktaba#extension#GetRegistry('code-formatting')
"   call l:codefmt_registry.AddExtension(l:extension)
" <
" See the Vroom tests in the Maktaba source tree (pluginextensions.vroom) for
" more examples.

let s:maktaba = maktaba#Maktaba()


" Extension registry objects, keyed by plugin name.
if !exists('s:registries')
  let s:registries = {}
endif


""
" @private
" Returns an extension registry for the given plugin name, creating it if
" needed.
" @throws WrongType if {plugin} is not a string.
function! maktaba#extension#GetInternalRegistry(plugin) abort
  call maktaba#ensure#IsString(a:plugin)

  if has_key(s:registries, a:plugin)
    return s:registries[a:plugin]
  endif

  call s:maktaba.logger.Info(
      \ 'New extension registry for plugin "%s"', a:plugin)
  let l:registry = {
      \ 'AddExtension': function('maktaba#extension#AddExtension'),
      \ 'GetExtensions': function('maktaba#extension#GetExtensions'),
      \ 'SetValidator': function('maktaba#extension#SetValidator'),
      \ '_internal_extensions': [],
      \ '_external_extensions': [],
      \ '_validator': maktaba#function#FromExpr('0'),
      \ '_external': 0,
      \ }
  let s:registries[a:plugin] = l:registry
  return l:registry
endfunction


""
" Returns an extension registry for the given plugin name.
" @throws WrongType if {plugin} is not a string.
function! maktaba#extension#GetRegistry(plugin) abort
  let l:registry = maktaba#extension#GetInternalRegistry(a:plugin)

  " Return an external version of the extension registry with a more limited
  " interface.
  let l:registry = copy(l:registry)
  let l:registry._external = 1

  return l:registry
endfunction


""
" @dict ExtensionRegistry
" Adds the given {extension} to this extension registry.
"
" The extension must be a dict.  If a validator is registered for this
" extension registry, this function will call the validator.  Failures will
" result in the validation error being shouted to the user (and the extension
" will not be added).
"
" @throws WrongType if {extension} is not a dict.
function! maktaba#extension#AddExtension(extension) dict abort
  call maktaba#ensure#IsDict(a:extension)
  let l:extension = deepcopy(a:extension)
  lockvar! l:extension

  try
    call maktaba#function#Call(self._validator, [l:extension])
  catch
    call maktaba#error#Shout(v:exception)
    return
  endtry

  if self._external
    call insert(self._external_extensions, l:extension)
  else
    call insert(self._internal_extensions, l:extension)
  endif
endfunction


""
" @dict ExtensionRegistry
" Returns the extensions that have been added to this extension registry.
"
" Extensions added by the plugin to its own registry are always returned
" after those added by other plugins.  Otherwise, extensions are returned in
" the opposite order to which they were added.
"
" This function is only available to the plugin that the extension registry
" belongs to.
" @throws NotImplemented if called by another plugin.
function! maktaba#extension#GetExtensions() dict abort
  if self._external
    throw maktaba#error#NotImplemented('Not accessible by external plugins.')
  endif

  return self._external_extensions + self._internal_extensions
endfunction


" Loops over {extensions}, calling {validator} for each one.
" If {validator} throws an error, shouts it to the user and removes it from
" the list.
function! s:ValidateExtensionList(extensions, F)
  let l:index = 0
  while l:index < len(a:extensions)
    try
      call maktaba#function#Call(a:F, [a:extensions[l:index]])
      let l:index += 1
    catch
      call remove(a:extensions, l:index)
      call maktaba#error#Shout(v:exception)
    endtry
  endwhile
endfunction


""
" @dict ExtensionRegistry
" Sets {validator} as the validator for this extension registry.
"
" {validator} can be the name of a function, funcref, or Maktaba funcdict.
" It should accept an arbitrary dict (the extension) and throw an error if the
" extension if invalid.
"
" This function will call the validator for any extensions that have already
" been registered.  Failures will cause the extension to be removed, and the
" error shouted to the user.
"
" This function is only available to the plugin that the extension registry
" belongs to.
"
" @throws WrongType if {validator} is not a string, funcref, nor dict.
" @throws BadValue if {validator} is a dict but does not appear to be a
"     funcdict.
" @throws NotImplemented if called by another plugin.
function! maktaba#extension#SetValidator(F) dict abort
  call maktaba#ensure#IsCallable(a:F)
  if self._external
    throw maktaba#error#NotImplemented('Not accessible by external plugins.')
  endif

  let self._validator = a:F

  call s:ValidateExtensionList(self._internal_extensions, a:F)
  call s:ValidateExtensionList(self._external_extensions, a:F)
endfunction
