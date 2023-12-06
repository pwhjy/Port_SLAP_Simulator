" This file defines all maktaba flags that will be used to configure the plugin.
" Users can configure these flags using |Glaive| or other plugins that hook into
" the maktaba#setting API. Maktaba will make sure this file is sourced
" immediately when the plugin is installed so that flags are defined and
" initialized to their default values before users configure them. See
" https://github.com/google/vim-maktaba/wiki/Creating-Vim-Plugins-with-Maktaba
" for details.

""
" @section Introduction, intro
" This is a very basic toy plugin intended as a concrete, heavily-commented
" example of a maktaba plugin and a point of reference for developers creating
" new plugins. It's not intended to cover all the corner cases that will come up
" in developing a large, complex plugin, but it does take full advantage of
" maktaba and related tools, with comprehensive generated documentation and
" verbose tests doubling as executable documentation.

""
" @section Configuration, config
" @plugin(name) is configured using maktaba flags. It defines a @flag(name) flag
" that can be configured using |Glaive| or a plugin manager that uses the
" maktaba setting API. It also supports entirely disabling commands from being
" defined by clearing the plugin[commands] flag.

" The following boilerplate signals maktaba that this file is going to be
" sourced and asks it whether the file should be fully sourced or should exit
" early. It ensures that all subsequent code is never executed twice.
let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif

" Now that the script has been entered, we have access to the plugin via the
" s:plugin object. We can use the 'Flag' function thereon to define
" configuration flags, as follows:

""
" Determines who the greeting will be addressed to when |:Hello| is executed
" without an explicit name argument.
call s:plugin.Flag('name', 'world')
