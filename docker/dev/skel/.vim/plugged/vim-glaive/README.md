Glaive is a utility for configuring maktaba plugins. It turns this:

```VimL
let g:myplugin_enablefeature = 1
let g:myplugin_defaultdir = $HOME
let g:myplugin_weirdmode = 'm'
```

into this:

```VimL
Glaive myplugin enablefeature defaultdir=`$HOME` weirdmode='m'
```

In order for this to work, the plugin must use the maktaba flag API. Any plugin
using the flag API can be configured by glaive.

[Maktaba](http://github.com/google/vim-maktaba) is a vimscript library for
plugin authors. It handles parsing the setting syntax, looking up the plugins,
and applying the settings. Glaive itself is merely a thin wrapper around the
hooks that maktaba provides: any plugin can sport a similar interface with
minimal effort. Plugin manager plugins in particular are encouraged to do so.

For details, see the executable documentation in the `vroom/` directory or the
helpfiles in the `doc/` directory. The helpfiles are also available via
`:help glaive` if Glaive is installed (and helptags have been generated).

# Usage example

This example uses [Vundle.vim](https://github.com/VundleVim/Vundle.vim), whose
plugin-adding command is `Plugin`. Note that Vundle does not add plugins to the
runtime path until `vundle#end()`, so Glaive commands must come after this
function call.

We will use two plugins for demonstration:

* [helloworld](https://github.com/google/maktaba/tree/master/examples/helloworld),
  which is an example plugin that comes with
  [maktaba](https://github.com/google/maktaba).
* [vim-codefmt](https://github.com/google/vim-codefmt) which is a real-world
  plugin used for autoformatting code.

```VimL
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

...

" Add maktaba, glaive, and codefmt to the runtimepath.
" (Glaive must also be installed before it can be used.)
Plugin 'google/vim-maktaba'
Plugin 'google/vim-glaive'
Plugin 'google/vim-codefmt'

...

vundle#end()
filetype plugin indent on

" Add helloworld to the runtime path. (Normally this would be done with another
" Plugin command, but helloworld doesn't have a repository of its own.)
call maktaba#plugin#Install(maktaba#path#Join([maktaba#Maktaba().location,
    \ 'examples', 'helloworld']))

call glaive#Install()

" Configure helloworld using glaive.
Glaive helloworld plugin[mappings] name='Bram'

" Real world example: configure vim-codefmt
Glaive codefmt google_java_executable='java -jar /path/to/google-java-format.jar'
```

Now, `<Leader>Hh` should say `Hello, Bram!`, and `<Leader>Hg` should say
`Goodbye, Bram!`.  (Recall that `<Leader>` defaults to `\`.)
