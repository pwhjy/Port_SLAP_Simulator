" This file is where all key mappings in the plugin should be defined if the
" plugin chooses to implement default mappings.
"
" Default mappings are discouraged. The plugin/mappings.vim file in maktaba
" plugins is disabled by default. Many users have highly customized keymaps, and
" automatic default mappings can be quite frustrating.
"
" Instead of defining mappings, you're encouraged to provide <Plug> mappings.
" These are "floating" mappings that define behavior but are not yet attached to
" a specific key. See :help using-<Plug> for details. Plugs should live in the
" plugin/plugs.vim file, and should be namespaced by your plugin's name.
"
" If you really still want to provide default mappings, you can use the
" plugin/mappings.vim file to do so. You're strongly encouraged to follow
" maktaba conventions in your default mappings, ensuring consistency between
" plugins.

""
" @section Mappings, mappings
" There are two normal-mode mappings, "<Leader>Hh" to issue a greeting and
" "<Leader>Hg" to issue a farewell. The "<Leader>H" prefix is the default and
" can be configured via the plugin[mappings] flag.

" The following boilerplate signals maktaba that this file is going to be
" sourced and asks it whether the file should be fully sourced or should exit
" early. It ensures that all subsequent code is never executed twice, and allows
" users to allow these mappings to defined by setting plugin[mappings] to 1
" (unlike other plugin files, mappings.vim is disabled by default).
let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif


" Gets the configured mapping prefix. By default (if the user configures this
" with "Glug helloworld plugin[mappings]"), this will be <Leader>H and the Hello
" mapping below will be <Leader>Hh. The user can override the entire prefix with
" e.g. "Glug helloworld plugin[mappings]=',h'", which would make the prefix ",h"
" and the Hello mapping below ",hh".
let s:prefix = s:plugin.MapPrefix('H')

" All mappings should be defined with <unique> so users will see an error
" message if these mappings conflict with mappings that were already defined.
" Without it, mappings will silently changed behavior.

" Issue greeting to the default name.
execute 'nnoremap <unique> <silent>' s:prefix . 'h' ':Hello<CR>'

" Issue farewell to the last name greeted.
execute 'nnoremap <unique> <silent>' s:prefix . 'g' ':Goodbye<CR>'
