""
" @section Introduction, intro
" @stylized Maktaba
" @library
" @order intro version dicts functions exceptions python
" A vimscript library that hides the worst parts of vimscript and helps you
" provide consistent plugins.
"
" Maktaba is a framework for writing well-behaved, easily-configurable plugins.
" It supplies conventions to keep plugins consistent, along with a number of
" tools and utilities for plugin authors.
"
" Maktaba introduces a concept of a @dict(Flag) for configuration, and
" recommends users install a configuration plugin like |Glaive|, or a plugin
" manager with configuration support, to manage plugin flags.
"
" Also included are a universal logging framework, error handling utilities, and
" a number of tools that make writing vimscript both safer and easier.


" <sfile>:p is .../maktaba/autoload/maktaba.vim
" <sfile>:p:h is .../maktaba/autoload/
" <sfile>:p:h:h is .../maktaba/
let s:plugindir =  expand('<sfile>:p:h:h')
if !exists('s:maktaba')
  let s:maktaba = maktaba#plugin#GetOrInstall(s:plugindir)
  let s:maktaba.globals.installers = []
  let s:maktaba.globals.loghandlers = maktaba#reflist#Create()
endif


""
" Returns a handle to the maktaba plugin object.
function! maktaba#Maktaba() abort
  return s:maktaba
endfunction


""
" @section Version, version
" Maktaba uses semantic versioning (see http://semver.org). A version string
" contains a major number, a minor number, and a patch number, dot-separated.
"
" The patch number will be bumped for patches, bug fixes, internal cleanup,
" and for any change that does not add or remove functions. New optional
" arguments may be added to functions by patches.
"
" The minor number will be bumped every time new functionality is added.
" Functionality may become deprecated when a minor number bumps. Deprecated
" functionality will remain available for at least two minor numbers. For at
" least one minor number, deprecation warnings will be documented and silently
" logged. For at least one minor number, deprecation warnings will be loud.
"
" Major number bumps indicate sweeping (often backwards-incompatible) changes.
"
" Use |maktaba#IsAtLeastVersion| to check whether this version of maktaba has
" passed a given version number.

if !exists('maktaba#VERSION')
  let maktaba#VERSION = s:maktaba.AddonInfo().version
  lockvar maktaba#VERSION
  let s:version = map(split(maktaba#VERSION, '\.'), 'v:val + 0')
endif



""
" Use this function to query against the maktaba version. Returns true if the
" maktaba version is at or past {version}. For example:
" >
"   maktaba#IsAtLeastVersion('1.0.3')
" <
" There is no equivalent function for checking an upper bound. This is designed
" to prevent unsatisfiable dependencies such as one plugin requiring <2.0.0 and
" another requiring >=2.1.0. Enforcing a maximum version is discouraged.
" @throws BadValue if {version} is not a valid Maktaba version number.
" @throws WrongType
function! maktaba#IsAtLeastVersion(version) abort
  call maktaba#ensure#Matches(a:version, '\v^\d+\.\d+\.\d+')
  " Extract MAJOR.MINOR.PATCH, ignoring any additional labels like "rc1".
  let l:version = matchlist(a:version, '\v^(\d+)\.(\d+)\.(\d+)')[1:3]
  for l:i in range(len(s:version))
    if s:version[l:i] > l:version[l:i]
      return 1
    elseif s:version[l:i] < l:version[l:i]
      return 0
    endif
  endfor
  return 1
endfunction


""
" This function essentially mimics the vim plugin installation phase.
" All plugins installed by maktaba that have not been sourced will be sourced.
" This will also cycle filetypes (see @function(#filetype#Cycle)) unless [cycle]
" is set to 0.
" @default cycle=1
function! maktaba#LateLoad(...) abort
  let l:cycle = maktaba#ensure#IsBool(get(a:, 1, 1))
  call s:maktaba.Load()
  let l:names = maktaba#plugin#RegisteredPlugins()
  call map(l:names, 'maktaba#plugin#Get(v:val).Load()')
  if l:cycle
    call maktaba#filetype#Cycle()
  endif
endfunction
