" This file is where all commands in the plugin should be defined.

""
" @section Commands, commands
" There is a single command, @command(Hello), to issue a greeting.

" The following boilerplate signals maktaba that this file is going to be
" sourced and asks it whether the file should be fully sourced or should exit
" early. It ensures that all subsequent code is never executed twice, and allows
" users to prevent these commands from ever being defined by setting
" plugin[commands] to 0.
let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif


" Everything past this point is safe from being sourced twice. That means any
" commands that already exist came from the user or another plugin, and should
" *not* be silently overwritten. Do not use "command!"; let the user see any
" "Command already exists" errors and decide how to handle them.

""
" Issues an enthusiastic greeting addressed to [name].
" @default name=@flag(name)
command -nargs=? Hello call helloworld#SayHello(<f-args>)

""
" Issues an enthusiastic farewell to recently greeted name.
command Goodbye call helloworld#SayGoodbye()
