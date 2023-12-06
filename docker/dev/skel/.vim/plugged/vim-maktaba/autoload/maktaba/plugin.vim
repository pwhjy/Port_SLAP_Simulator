" The plugin cache.
if !exists('s:plugins')
  let s:plugins = {}
endif

" Mapping from normalized locations to the corresponding plugin object.
" Used to look up plugins by location in maktaba#plugin#Install and
" maktaba#plugin#GetOrInstall.
" May have multiple locations mapped to the same plugin in the case of symlinks.
if !exists('s:plugins_by_location')
  let s:plugins_by_location = {}
endif

" Blob of data used by s:GetUnregisteredLeafdirs() for caching:
"  * The 'leafdirs' field is the cached dict of unregistered leafdirs to return.
"  * The 'rtp' and 'plugin_locations' fields are the last seen &rtp and
"    keys(s:plugins_by_location) values, used to invalidate the cache on
"    changes.
if !exists('s:unregistered_leafdirs_cache')
  let s:unregistered_leafdirs_cache = {}
endif

" Recognized special directories are as follows:
"
" autoload/*: Files containing functions made available upon request.
" instant/*: Loaded immediately after plugin installation.
" plugin/*: Loaded during vim load time (after vimrc time).
" ftdetect/*: Files that enable detection for new filetypes.
" ftplugin/*: Files selectively loaded once-per-buffer at ftdetect time.
" indent/*: Files specifying indent rules, once-per-buffer at ftdetect time.
" syntax/*: Files specifying syntax rules, once-per-buffer at ftdetect time.

" Directories in which you should use #Enter:
let s:enterabledirs = ['autoload', 'plugin', 'instant', 'ftplugin']

" Filenames which are not sourced by default (the user must opt-in).
let s:defaultoff = {'plugin': ['mappings']}


" @exception
function! s:AlreadyExists(message, ...) abort
  return maktaba#error#Exception('AlreadyExists', a:message, a:000)
endfunction


" @exception
function! s:CannotEnter(file) abort
  return maktaba#error#Message(
      \ 'CannotEnter',
      \ 'maktaba#plugin#Enter must be called from ' .
      \ 'a file in an autoload/, plugin/, ftplugin/, or instant/ directory. ' .
      \ 'It was called from %s.',
      \ a:file)
endfunction


" This is The Way to store a plugin location, by convention:
" Fully expanded path with trailing forward slash at the end.
function! s:Fullpath(location) abort
  let l:path = maktaba#path#AsDir(fnamemodify(a:location, ':p'))
  " Replace trailing path separator with forward slash.
  return maktaba#path#Dirname(l:path) . '/'
endfunction


" Applies {settings} to {plugin}. Returns {plugin} for convenience.
" Tries to apply all settings, even if some fail.
" @throws ConfigError if any settings failed to apply.
function! s:ApplySettings(plugin, settings) abort
  let l:errors = []
  for l:setting in a:settings
    try
      call l:setting.Apply(a:plugin)
    catch /ERROR(\(NotFound\|BadValue\|WrongType\)):/
      call add(l:errors, maktaba#error#Split(v:exception)[1])
    endtry
  endfor
  if !empty(l:errors)
    let l:msg = 'Error configuring %s: %s'
    let l:errtxt = join(l:errors)
    throw maktaba#error#Message('ConfigError', l:msg, a:plugin.name, l:errtxt)
  endif
  return a:plugin
endfunction


""
" Splits {dir} into canonical plugin name and parent directory, returning name.
" If {dir} is in s:plugins_by_location, gets the name of the plugin there
" instead.
function! s:PluginNameFromDir(dir) abort
  let l:fullpath = s:Fullpath(a:dir)
  if has_key(s:plugins_by_location, l:fullpath)
    return s:plugins_by_location[l:fullpath].name
  endif

  let l:splitpath = maktaba#path#Split(a:dir)
  if len(l:splitpath) == 0
    throw maktaba#error#BadValue('Found empty path.')
  endif
  let l:name = maktaba#plugin#CanonicalName(
      \ maktaba#path#StripTrailingSlash(l:splitpath[-1]))
  return l:name
endfunction


""
" Gets a version of {name} with special characters converted to underscores.
" Doesn't apply sophisticated heuristics like stripping 'vim-' prefix.
function! s:SanitizedName(name) abort
  return substitute(a:name, '[^_a-zA-Z0-9]', '_', 'g')
endfunction


""
" Gets a dictionary of {leaf path} for each path found on &rtp that does not
" correspond to a registered plugin.
" Returns the same data structure as maktaba#rtp#LeafDirs but with
" already-registered dirs omitted.
function! s:GetUnregisteredLeafdirs() abort
  " NOTE: This function is performance-sensitive.
  let l:cache = s:unregistered_leafdirs_cache
  let l:plugin_locations = keys(s:plugins_by_location)
  if !has_key(l:cache, 'rtp') || !has_key(l:cache, 'plugin_locations') ||
      \ l:cache.rtp isnot# &rtp ||
      \ l:cache.plugin_locations !=# l:plugin_locations
    let l:leafdirs = {}
    for [l:leafdir, l:leafpath] in items(maktaba#rtp#LeafDirs())
      if !has_key(s:plugins_by_location, l:leafpath)
        " Path is not a plugin location. Include in return value.
        let l:leafdirs[l:leafdir] = l:leafpath
      endif
    endfor
    let l:cache.leafdirs = l:leafdirs
    let l:cache.rtp = &rtp
    let l:cache.plugin_locations = l:plugin_locations
  endif
  return l:cache.leafdirs
endfunction


" Splits a plugin location and file handle from {path}.
" foo/plugin/bar.vim will yield ['foo', 'plugin', 'bar^'].
" foo/after/plugin/bar.vim will yield ['foo', 'plugin', 'bar$'].
"
" We cannot just use 'bar' and 'after/bar', as there could (conceivably) be
" a file named foo\plugin\after/bar.vim on a windows machine, where the '/' is
" not acting as a path separator. (Yes, I know, I'm paranoid.) What we actually
" want here is an Either type, but we don't have one of those yet.
"
" This is used by maktaba#plugin#Enter, which cares about the TYPE of file
" (autoload/plugin/instant/ftplugin etc.) and does not care about after vs
" non-after files but needs them to have distinct handles.
function! s:SplitEnteredFile(file) abort
  let l:filedir = fnamemodify(a:file, ':h:t')
  if !count(s:enterabledirs, l:filedir)
    throw s:CannotEnter(a:file)
  endif

  let l:handle = fnamemodify(a:file, ':t:r')
  let l:plugindir = fnamemodify(a:file, ':p:h:h')
  if l:plugindir ==# 'after'
    let l:plugindir = fnamemodify(a:file, ':p:h:h:h')
    let l:handle .= '$'
  else
    let l:handle .= '^'
  endif

  return [l:plugindir, l:filedir, l:handle]
endfunction


" Converts file handle to flag handle.
" foo^ is converted to foo, foo$ is converted to after/foo.
function! s:FileHandleToFlagHandle(handle) abort
  if a:handle =~# '\v\$$'
    return 'after/' . a:handle[:-2]
  endif
  return a:handle[:-2]
endfunction


""
" @private
" Used by maktaba#library to help throw good error messages about non-library
" directories.
function! maktaba#plugin#NonlibraryDirs() abort
  return ['plugin', 'instant', 'ftdetect', 'ftplugin', 'indent', 'syntax']
endfunction



""
" This function is used to both control when plugin files are entered, and get
" a handle to the current plugin object. It should be called from the top of
" an autoload/*.vim, plugin/*.vim, ftplugin/*.vim, or instant/*.vim file as
" follows:
" >
"   let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
"   if !s:enter
"     finish
"   endif
" <
" The result is a tuple containing the plugin object and a boolean specifying
" whether the file should be entered (taking user preferences and whether the
" file has already been sourced into account). If the second value is false, the
" script should finish immediately.
"
" autoload/*.vim files are entered on demand (see |autoload|), this function
" only helps prevent re-entry.
"
" For plugin/*.vim and instant/*.vim files, maktaba ensures that the file is
" only entered once, and then only if the user has not disabled the file via
" the plugin[*] or instant[*] flags.
"
" In ftplugin/*.vim files, maktaba ensures that the file is loaded only once per
" buffer.
"
" Note that maktaba does NOT set the g:loaded_{plugin} variable, as recommended
" in the write-plugin helpfiles. This is because maktaba plugins may span
" multiple files, and there is no clear moment when the plugin is "loaded". If
" you feel you must adhere to this convention, be sure to set the appropriate
" g:loaded_* variable when appropriate.
function! maktaba#plugin#Enter(file) abort
  let [l:plugindir, l:filedir, l:handle] = s:SplitEnteredFile(a:file)
  let l:plugin = maktaba#plugin#GetOrInstall(l:plugindir)
  let l:controller = l:plugin._entered[l:filedir]

  if l:filedir ==# 'ftplugin'
    call extend(l:controller, {l:handle : []}, 'keep')
    if index(l:controller[l:handle], bufnr('%')) >= 0
      return [l:plugin, 0]
    endif
    call add(l:controller[l:handle], bufnr('%'))
    return [l:plugin, 1]
  endif

  " Leave this block above the next on pain of stack overflow.
  if index(l:controller, l:handle) >= 0
    return [l:plugin, 0]
  endif

  if l:filedir !=# 'autoload'
    " Check the 'plugin' or 'instant' flag dictionaries for word on the this
    " file, using the defaults specified in the s:defaultoff variable.
    let l:flag = l:plugin.Flag(l:filedir)
    let l:flaghandle = s:FileHandleToFlagHandle(l:handle)
    let l:defaultoff = count(get(s:defaultoff, l:filedir, []), l:flaghandle)
    if empty(get(l:flag, l:flaghandle, l:defaultoff ? 0 : 1))
      " Turned off by flag.
      return [l:plugin, 0]
    endif
  endif

  " Note that a file isn't entered when it is sourced: it is entered when this
  " function OKs an enter. (In other words, don't move this line up.)
  call add(l:controller, l:handle)
  return [l:plugin, 1]
endfunction


""
" Scans 'runtimepath' for any unregistered plugins and registers them with
" maktaba. May trigger instant/ hooks for newly-registered plugins.
function! maktaba#plugin#Detect() abort
  for [l:name, l:location] in items(s:GetUnregisteredLeafdirs())
    call maktaba#plugin#GetOrInstall(l:location)
  endfor
endfunction


""
" A list of all installed plugins in alphabetical order.
" Automatically detects unregistered plugins using @function(#Detect).
function! maktaba#plugin#RegisteredPlugins() abort
  call maktaba#plugin#Detect()
  return sort(keys(s:plugins))
endfunction


""
" 1 if {plugin} was registered with maktaba#plugin#Register.
" This is more reliable for determining if a Maktaba compatible plugin by
" the name of {plugin} was registered, but can not be used to dependency check
" non-Maktaba plugins.
" Detects plugins added to 'runtimepath' even if they haven't been explicitly
" registered with maktaba.
function! maktaba#plugin#IsRegistered(plugin) abort
  try
    call maktaba#plugin#Get(a:plugin)
  catch /ERROR(NotFound):/
    return 0
  endtry
  return 1
endfunction


""
" The canonical name of {plugin}.
" This is the name of the plugin directory with any "vim-" prefix or ".vim"
" suffix stripped off: both "vim-unimpaired" and "unimpaired.vim" would become
" simply "unimpaired".
"
" Note that plugins with different names in the filesystem can conflict in
" maktaba. If you've loaded a plugin in the directory "plugins/vim-myplugin"
" then maktaba can't handle a plugin named "plugins/myplugin". Make sure your
" plugins have sufficiently different names!
function! maktaba#plugin#CanonicalName(plugin) abort
  " NOTE: This function is performance-sensitive.
  return matchstr(a:plugin, '\v\C^(vim-)?\zs.{-}\ze(\.vim)?$')
endfunction


""
" @usage dir [settings]
" Installs the plugin located at {dir}. Installation entails adding the plugin
" to the runtimepath, loading its flags.vim file, and sourcing any files in its
" instant/ directory.
"
" Returns the maktaba plugin object describing the installed plugin.
"
" {dir} should be the full path to the plugin directory. The plugin itself
" should be the last component in the directory path. If the plugin doesn't have
" an explicit name declared in addon-info.json, the plugin name will be the name
" of this directory with all invalid characters converted to underscores (see
" @function(#CanonicalName)).
"
" If the plugin contains a plugin/ directory it will have a special "plugin"
" dictionary flag that controls which plugin files are loaded. For example, if
" the plugin contains plugin/commands.vim, you can use
" >
"   let plugin = maktaba#plugin#Install(path)
"   call plugin.Flag('plugin[commands]', 0)
" <
" to disable it. More generally, "plugin" is a dictionary whose keys control the
" loading of plugin files. A file's key is its filename without the '.vim'
" extension. Set the key to 0 to prevent the file from loading or 1 to allow it
" to load.
"
" Note that setting the key to 1 only ALLOWS the file to load: if load time has
" already passed, enabling the plugin file will not cause it to load. To load
" plugin files late use |Plugin.Load|.
"
" All plugin files are loaded by default EXCEPT the file plugin/mappings.vim,
" which is opt-in. (Set plugin[mappings] to 1 to enable.)
"
" If the plugin contains an instant/ directory it will also have a special
" "instant" flag, which acts similarly to the special "plugin" flag for
" instant/*.vim files. For example, in a plugin with an instant/earlyfile.vim,
" the following DOES NOT WORK:
" >
"   let plugin = maktaba#plugin#Install(path)
"   call plugin.Flag('instant[earlyfile]', 0)
" <
" All instant/*.vim files are sourced during installation. In order to configure
" the "instant" flag, you must pass [settings] to the installation function. If
" given, they must be a list of maktaba settings (see |maktaba#setting#Create|).
" They will be applied after instant/flags.vim is sourced (if present), but
" before any other instant files are sourced. For example:
" >
"   let noearly = maktaba#setting#Parse('instant[earlyfile]=0')
"   let plugin = maktaba#plugin#Install(path, [noearly])
" <
" @throws BadValue if {dir} is empty.
" @throws AlreadyExists if the plugin already exists.
" @throws ConfigError if [settings] cannot be applied to this plugin.
function! maktaba#plugin#Install(dir, ...) abort
  let l:name = s:PluginNameFromDir(a:dir)
  let l:settings = maktaba#ensure#IsList(get(a:, 1, []))
  if has_key(s:plugins, l:name)
    throw s:AlreadyExists('Plugin "%s" already exists.', l:name)
  endif
  return s:CreatePluginObject(l:name, a:dir, l:settings)
endfunction


""
" Gets the plugin object associated with {plugin}. {plugin} may either be the
" name of the plugin directory, or the canonicalized plugin name (with any
" "vim-" prefix or ".vim" suffix stripped off). See @function(#CanonicalName).
" Detects plugins added to 'runtimepath' even if they haven't been explicitly
" registered with maktaba.
" @throws NotFound if the plugin object does not exist.
function! maktaba#plugin#Get(name) abort
  if has_key(s:plugins, a:name)
    return s:plugins[a:name]
  endif

  " If literal name didn't match, fall back to canonicalized name.
  let l:name = maktaba#plugin#CanonicalName(a:name)
  if has_key(s:plugins, l:name)
    return s:plugins[l:name]
  endif

  " Check if any dir on runtimepath is a plugin that hasn't been detected yet.
  for [l:leafdir, l:leafpath] in items(s:GetUnregisteredLeafdirs())
    if maktaba#plugin#CanonicalName(l:leafdir) is# l:name
      return maktaba#plugin#GetOrInstall(l:leafpath)
    endif
  endfor

  throw maktaba#error#NotFound('Plugin %s', a:name)
endfunction


""
" Installs the plugin located at {dir}, unless it already exists. The
" appropriate maktaba plugin object is returned.
"
" [settings], if given, must be a list of maktaba settings (see
" |maktaba#setting#Create|). If the plugin is new, they will be applied as in
" @function(#Install). Otherwise, they will be applied before returning the
" plugin object.
"
" See also @function(#Install).
" @throws AlreadyExists if the existing plugin comes from a different directory.
" @throws ConfigError if [settings] cannot be applied to this plugin.
function! maktaba#plugin#GetOrInstall(dir, ...) abort
  let l:name = s:PluginNameFromDir(a:dir)
  let l:settings = maktaba#ensure#IsList(get(a:, 1, []))
  if has_key(s:plugins, l:name)
    let l:plugin = s:plugins[l:name]
    " Compare fully resolved paths. Trailing slashes must (see patch 7.3.194) be
    " stripped for resolve(), and fnamemodify() with ':p:h' does this safely.
    let l:pluginpath = fnamemodify(l:plugin.location, ':p:h')
    let l:newpath = s:Fullpath(a:dir)
    if resolve(l:pluginpath) !=# resolve(fnamemodify(l:newpath, ':p:h'))
      let l:msg = 'Conflict for plugin "%s": %s and %s'
      throw s:AlreadyExists(l:msg, l:plugin.name, l:plugin.location, l:newpath)
    endif
    if !empty(l:settings)
      call s:ApplySettings(l:plugin, l:settings)
    endif
    return l:plugin
  endif
  return s:CreatePluginObject(l:name, a:dir, l:settings)
endfunction


""
" @dict Plugin
" The maktaba plugin object. Exposes functions that operate on the plugin
" itself.


" Common code used by #Install and #GetOrInstall.
function! s:CreatePluginObject(name, location, settings) abort
  let l:entrycontroller = {
      \ 'autoload': [],
      \ 'plugin': [],
      \ 'instant': [],
      \ 'ftplugin': {}
      \}
  let l:plugin = {
      \ 'name': a:name,
      \ 'location': s:Fullpath(a:location),
      \ 'flags': {},
      \ 'globals': {},
      \ 'logger': maktaba#log#Logger(a:name),
      \ 'Source': function('maktaba#plugin#Source'),
      \ 'Load': function('maktaba#plugin#Load'),
      \ 'AddonInfo': function('maktaba#plugin#AddonInfo'),
      \ 'Flag': function('maktaba#plugin#Flag'),
      \ 'HasFlag': function('maktaba#plugin#HasFlag'),
      \ 'HasDir': function('maktaba#plugin#HasDir'),
      \ 'HasFiletypeData': function('maktaba#plugin#HasFiletypeData'),
      \ 'GenerateHelpTags': function('maktaba#plugin#GenerateHelpTags'),
      \ 'MapPrefix': function('maktaba#plugin#MapPrefix'),
      \ 'IsLibrary': function('maktaba#plugin#IsLibrary'),
      \ 'GetExtensionRegistry': function('maktaba#plugin#GetExtensionRegistry'),
      \ '_entered': l:entrycontroller,
      \ }
  " If plugin has an addon-info.json file with a "name" declared, overwrite the
  " default name with the custom one.
  " Do this after creating the plugin dict so we can call AddonInfo and have
  " caching work.
  try
    let l:addon_info = l:plugin.AddonInfo()
    if has_key(l:addon_info, 'name')
      let l:plugin.name = l:addon_info.name
    endif
  catch /ERROR(BadValue):/
    " Couldn't deserialize JSON.
  endtry
  let s:plugins[l:plugin.name] = l:plugin
  let s:plugins_by_location[l:plugin.location] = l:plugin

  " If plugin is symlinked, register resolved path as custom location to avoid
  " conflicts.
  let l:resolved_location = s:Fullpath(resolve(l:plugin.location))
  if l:resolved_location !=# l:plugin.location
    let s:plugins_by_location[l:resolved_location] = l:plugin
  endif

  let l:rtp_dirs = maktaba#rtp#Split()
  " If the plugin location isn't already on the runtimepath, add it. Check
  " for both the raw {location} value and the expanded form.
  " Note that this may not detect odd spellings that don't match the raw or
  " expanded form, e.g., if it's on rtp with a trailing slash but installed
  " using a location without. In such cases, the plugin will end up on the
  " runtimepath twice.
  if index(l:rtp_dirs, a:location) == -1 &&
      \ index(l:rtp_dirs, l:plugin.location) == -1
    call maktaba#rtp#Add(l:plugin.location)
  endif

  " These special flags let the user control the loading of parts of the plugin.
  if isdirectory(maktaba#path#Join([l:plugin.location, 'plugin']))
    call l:plugin.Flag('plugin', {})
  endif
  if isdirectory(maktaba#path#Join([l:plugin.location, 'instant']))
    call l:plugin.Flag('instant', {})
  endif

  " Load flags file first.
  call l:plugin.Source(['instant', 'flags'], 1)
  " Then apply settings.
  if !empty(a:settings)
    call s:ApplySettings(l:plugin, a:settings)
  endif
  " Then load all instant files in random order.
  call call('s:SourceDir', ['instant'], l:plugin)

  " g:installed_<plugin> is set to signal that the plugin has been installed
  " (though perhaps not loaded). This fills the gap between installation time
  " (when the plugin is available on the runtimepath) and load time (when the
  " plugin's files are sourced). This new convention is expected to make it much
  " easier to build vim dependency managers.
  let g:installed_{s:SanitizedName(l:plugin.name)} = 1

  return l:plugin
endfunction


" @dict Plugin
" Gets a list of all subdirectories in the root plugin directory.
" Caches the list for performance, so new paths will not be discovered after the
" initial scan.
function! s:GetSubdirs() dict abort
  if !has_key(self, '_dirs')
    " Glob includes trailing slash, which makes glob() only detect directories.
    let l:direct_glob = maktaba#path#Join([self.location, '*', ''])
    let l:direct_dirs = split(glob(l:direct_glob, 1), "\n")
    let self._dirs = map(
        \ l:direct_dirs, 'maktaba#path#AsDir(maktaba#path#Split(v:val)[-1])')
  endif
  return self._dirs
endfunction


" @dict Plugin
" Gets a list of all subdirectories in the plugin after/ directory.
" Caches the list for performance, so new paths will not be discovered after the
" initial scan.
function! s:GetAfterSubdirs() dict abort
  if !has_key(self, '_after_dirs')
    " Glob includes trailing slash, which makes glob() only detect directories.
    let l:after_glob = maktaba#path#Join([self.location, 'after', '*', ''])
    let l:after_dirs = split(glob(l:after_glob, 1), "\n")
    let self._after_dirs = map(
        \ l:after_dirs, 'maktaba#path#AsDir(maktaba#path#Split(v:val)[-1])')
  endif
  return self._after_dirs
endfunction


" @dict Plugin
" Sources all files in {dir} and after/{dir}.
" Does not source files that have been marked as entered. (Note that this is, in
" theory, an efficiency gain only: functions using #Enter properly wouldn't be
" re-sourced anyways. In practice, if someone forgets an #Enter, that file won't
" be re-sourced by this function.)
function! s:SourceDir(dir) dict abort
  if has_key(self._entered, a:dir) && maktaba#value#IsList(self._entered[a:dir])
    " We can gain some efficiency by skipping certain files.
    let l:skips = self._entered[a:dir]
  else
    " Either this dir does not use _enter, or the files in this dir are loaded
    " on a per-buffer basis (in which case self._entered[a:dir] is a dict).
    let l:skips = []
  endif

  " Remember that for filename handles, '^' is the prefix used to mark that
  " we've loaded the normal version; '$' is the prefix used to mark that we've
  " loaded the after/ version.
  let l:normal = [maktaba#path#Join([self.location, a:dir]), '^']
  let l:after = [maktaba#path#Join([self.location, 'after', a:dir]), '$']

  for [l:dir, l:suffix] in [l:normal, l:after]
    if isdirectory(l:dir)
      let l:sources = maktaba#path#Join([l:dir, '**', '*.vim'])
      " NOTE: This will fail if any plugin files have newlines in their names.
      " Please never put newlines in plugin names. If we ever drop Vim7.3
      " support, this warning can be removed after changing the call to
      " glob(l:sources, 1, 1).
      for l:source in split(glob(l:sources, 1), '\n')
        if count(l:skips, fnamemodify(l:source, ':t:r') . l:suffix)
          continue
        endif
        execute 'source' l:source
      endfor
    endif
  endfor
endfunction


" Returns (does not throw) the errors involved with sourcing {path}. Uses
" {plugin} (the NAME of a plugin) and {name} (the SIMPLE NAME of a file being
" sourced, eg plugin/commands) in these error messages.
" Returns an empty string if sourcing {path} seems safe.
function! s:SourceProblems(plugin, name, path) abort
  if isdirectory(a:path)
    let l:msg = 'Cannot source %s in %s. It is a directory.'
    return maktaba#error#BadValue(l:msg, a:name, a:plugin)
  endif
  if !filereadable(a:path)
    if maktaba#path#Exists(a:path)
      let l:msg = 'Cannot source %s in %s. It cannot be read.'
      return maktaba#error#NotAuthorized(l:msg, a:name, a:plugin)
    endif
    let l:msg = 'Cannot source %s in %s. File does not exist.'
    return maktaba#error#NotFound(l:msg, a:name, a:plugin)
  endif
  return ''
endfunction


""
" Sources {file}, which should be a list specifying the location of a file from
" the plugin root. For example, if you want to source plugin/commands.vim, call
" this function on ['plugin', 'commands']. The referenced file will be sourced,
" if it exists. Otherwise, exceptions will be thrown, unless you set [optional].
" If [optional] exists, this function returns whether or not the file was
" actually sourced.
" @default optional=0
" @throws BadValue if {file} describes a directory.
" @throws NotAuthorized if {file} cannot be read.
" @throws NotFound if {file} does not describe a plugin file.
function! maktaba#plugin#Source(file, ...) dict abort
  let l:optional = get(a:, 1)
  let l:name = maktaba#path#Join(maktaba#ensure#IsList(a:file))
  let l:path = maktaba#path#Join([self.location, l:name]) . '.vim'

  let l:problems = s:SourceProblems(self.name, l:name, l:path)
  if !empty(l:problems)
    if l:optional
      return 0
    else
      throw l:problems
    endif
  endif

  execute 'source' l:path
  return 1
endfunction


""
" @dict Plugin
" If [file] is given, the plugin file plugin/<file>.vim will be sourced.
" An error will be thrown if [file] does not exist unless [optional] is set.
" If [file] is omitted, then all plugin files that have not yet been sourced
" will be sourced.
" [file] may also be a list of filenames to source.
" @default optional=0
" @throws NotFound if [file] is given but is not found.
function! maktaba#plugin#Load(...) dict abort
  " Load specific plugin files.
  if a:0 >= 1
    call maktaba#ensure#TypeMatchesOneOf(a:1, ['', []])
    let l:files = maktaba#value#IsList(a:1) ? a:1 : [a:1]
    let l:optional = get(a:, 2)
    call map(l:files, 'self.Source(["plugin", v:val], l:optional)')
  else
    call call('s:SourceDir', ['plugin'], self)
  endif
endfunction


""
" @dict Plugin
" Generates help tags for the plugin.
" Returns 0 if there are no help tags.
" Returns 1 if helptags are generated successfully.
" @throws Impossible if help tags cannot be generated.
function! maktaba#plugin#GenerateHelpTags() dict abort
  let l:docs = maktaba#path#Join([self.location, 'doc'])
  if !isdirectory(l:docs)
    return 0
  endif
  try
    execute 'helptags' l:docs
  catch /E\(150\|151\|152\|153\|154\|670\)/
    " See :help helptags.
    let l:msg = 'Could not generate helptags for %s: %s'
    throw maktaba#error#Message('Impossible', l:msg, self.name, v:exception)
  endtry
  return 1
endfunction


""
" @dict Plugin
" Tests whether the plugin has {dir}, either as a direct subdirectory or as
" a subdirectory of the after/ directory.
" Cached for performance, so new paths will not be discovered if they're added
" to the plugin after the first check.
function! maktaba#plugin#HasDir(dir) dict abort
  let l:dirs = call('s:GetSubdirs', [], self)
  let l:after_dirs = call('s:GetAfterSubdirs', [], self)
  return index(l:dirs, maktaba#path#AsDir(a:dir)) > -1 ||
      \ index(l:after_dirs, maktaba#path#AsDir(a:dir)) > -1
endfunction


""
" @dict Plugin
" Tests whether a plugin has a filetype-active directory (ftdetect, ftplugin,
" indent, or syntax).
function! maktaba#plugin#HasFiletypeData() dict abort
  return maktaba#rtp#DirDefinesFiletypes(self.location)
endfunction


""
" @dict Plugin
" Gets plugin metadata from plugin's addon-info.json file, if present.
" Otherwise, returns an empty dict.
" @throws BadValue if addon-info.json isn't valid JSON.
function! maktaba#plugin#AddonInfo() dict abort
  if !has_key(self, '_addon_info')
    let l:addon_info_path =
        \ maktaba#path#Join([self.location, 'addon-info.json'])
    try
      " Don't add "b" because it'll read DOS files as "\r\n" which will fail the
      " check and evaluate in eval. \r\n is checked out by some msys git
      " versions with strange settings.
      let l:json = join(readfile(l:addon_info_path), '')
      let self._addon_info = maktaba#json#Parse(l:json)
    catch /E48[45]:/
      " File missing or unreadable. Assume no addon info.
      let self._addon_info = {}
    endtry
  endif

  return self._addon_info
endfunction


""
" @usage {flag}
" @dict Plugin
" Returns the value of {flag}.
" See @function(maktaba#setting#Handle) for {flag} syntax.
"
" The following are roughly equivalent: >
"   maktaba#plugin#Get('myplugin').Flag('foo')
"   maktaba#plugin#Get('myplugin').flags.foo.Get()
" <
"
" You may access a portion of a flag (a specific value in a dict flag, or
" a specific item in a list flag) using a fairly natural square bracket
" syntax: >
"   maktaba#plugin#Get('myplugin').Flag('plugin[autocmds]')
" <
" This is equivalent to: >
"   maktaba#plugin#Get('myplugin').flags.plugin.Get()['autocmds']
" <
" This syntax can be chained: >
"   maktaba#plugin#Get('myplugin').Flag('complex[key][0]')
" <
"
" The plugin flags file will be sourced before determining if the flag exists.
"
" @throws BadValue if {flag} is an invalid flag name.
" @throws NotFound if {flag} does not exist.
"
" @usage {flag} {value}
" @dict Plugin
" Sets {flag} to {value}.
" See @function(maktaba#setting#Handle) for {flag} syntax.
"
" The following are equivalent (assuming the flag "foo" already exists):
" >
"   maktaba#plugin#Get('myplugin').Flag('foo', 'bar')
"   maktaba#plugin#Get('myplugin').flags.foo.Set('bar')
" <
"
" Also supports dict flag syntax: >
"   maktaba#plugin#Get('myplugin').Flag('plugin[autocmds]', 1)
" <
"
" @throws BadValue if {flag} is an invalid flag name.
function! maktaba#plugin#Flag(flag, ...) dict abort
  let [l:flag, l:foci] = maktaba#setting#Handle(a:flag)
  if !has_key(self.flags, l:flag)
    if a:0 == 0 || !empty(l:foci)
      let l:msg = 'Flag "%s" not defined in plugin "%s"'
      throw maktaba#error#NotFound(l:msg, l:flag, self.name)
    endif
    let self.flags[l:flag] = maktaba#flags#Create(l:flag, a:1)
  elseif a:0 == 0
    return self.flags[l:flag].Get(l:foci)
  else
    call self.flags[l:flag].Set(a:1, l:foci)
  endif
endfunction


""
" Whether or not the plugin has a flag named {flag}.
function! maktaba#plugin#HasFlag(flag) dict abort
  return has_key(self.flags, a:flag)
endfunction


""
" @dict Plugin
" Returns the user's desired map prefix for the plugin. If the user has not
" specified a map prefix, <leader>{letter} will be returned.
"
" If the user's map prefix is invalid, an error message will be PRINTED, not
" thrown. This allows plugin authors to call this function without worrying
" about barfing up a stack trace if the user config is bad. You can set the
" [throw] argument to make this function throw errors instead of printing them,
" if you plan to catch them explicitly.
"
" Mappings should be defined in the plugin/mappings.vim file. The user
" configures their map prefix preferences via the flag that controls that file.
" @default throw=0
" @throws NotFound if plugin/mappings.vim does not exist.
" @throws BadValue if the map prefix is invalid and [throw] is set.
" @throws Unknown if mappings have been disabled.
function! maktaba#plugin#MapPrefix(letter, ...) dict abort
  let l:throw = maktaba#ensure#IsBool(get(a:, 1, 0))

  let l:mapfile = maktaba#path#Join([self.location, 'plugin', 'mappings.vim'])
  if !maktaba#path#Exists(l:mapfile)
    let l:msg = 'Plugin %s does not have plugin/mappings.vim.'
    throw maktaba#error#NotFound(l:msg, self.name)
  endif

  let l:prefix = get(self.Flag('plugin'), 'mappings', 0)

  if type(l:prefix) == type(0) && !l:prefix
    " Mappings are disabled.
    let l:msg = 'Plugin %s requested a map prefix, but mappings are disabled.'
    throw maktaba#error#Message('Unknown', l:msg, self.name)
  endif

  if type(l:prefix) == type(0) && l:prefix == 1
    " The user has opted in to the default mappings.
    return '<leader>' . a:letter
  endif

  if !maktaba#value#IsString(l:prefix) || empty(l:prefix)
    let l:err = maktaba#error#BadValue(
        \ 'A map prefix must be a non-empty string (or 1, for the default) ' .
        \ 'but in %s, plugin[mappings] was set to %s. (Did you forget quotes?)',
        \ self.name, string(l:prefix))
    if l:throw
      throw l:err
    else
      call maktaba#error#Shout(l:err)
      return '<leader>' . a:letter
    endif
  endif

  return l:prefix
endfunction


""
" @dict Plugin
" Checks that this plugin is a library plugin.
" In order to be a library plugin, the plugin must contain an autoload/
" directory and must not contain ftplugin/, ftdetect/, syntax/, indent/,
" plugin/, nor instant/ directories.
function! maktaba#plugin#IsLibrary() dict abort
  for l:special in maktaba#plugin#NonlibraryDirs()
    if self.HasDir(l:special)
      return 0
    endif
  endfor
  return self.HasDir('autoload')
endfunction


""
" @dict Plugin
" Returns the @dict(ExtensionRegistry) belonging to this plugin.
"
" This should be used only by the plugin itself; external callers should use
" @function(maktaba#extension#GetRegistry) instead, rather than depend upon
" the plugin directly.
function! maktaba#plugin#GetExtensionRegistry() dict abort
  return maktaba#extension#GetInternalRegistry(self.name)
endfunction



" Must be at the end of the file, to avoid infinite loops.
let s:maktaba = maktaba#Maktaba()
