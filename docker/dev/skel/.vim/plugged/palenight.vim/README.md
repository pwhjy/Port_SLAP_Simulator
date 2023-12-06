![palenight.vim][screenshot]

A dark color scheme for Vim/Neovim based off the [Material Pale Night][materialLink] color scheme. Much of the work is based on the lovely [onedark.vim][onedark] color scheme.

## Installation
Using [vim-plug][vimplug] (modify this to work with your Vim package manager of choice):

```vim
Plug 'drewtempelmeyer/palenight.vim'
```

## Usage

In your wonderfully organized Vim (`~/.vimrc`) or Neovim (`.config/nvim/init.vim`) configuration, place the following two lines:

```vim
set background=dark
colorscheme palenight
```

To configure lightline, add the following line:

```vim
let g:lightline.colorscheme = 'palenight'
```

### True Colors

To provide the best user experience possible, I recommend enabling true colors. To experience the blissfulness of your editor's true colors, place this in your `.vimrc` or `~/.config/nvim/init.vim` file:

```vim
if (has("nvim"))
  "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
  let $NVIM_TUI_ENABLE_TRUE_COLOR=1
endif

"For Neovim > 0.1.5 and Vim > patch 7.4.1799 < https://github.com/vim/vim/commit/61be73bb0f965a895bfb064ea3e55476ac175162 >
"Based on Vim patch 7.4.1770 (`guicolors` option) < https://github.com/vim/vim/commit/8a633e3427b47286869aa4b96f2bfc1fe65b25cd >
" < https://github.com/neovim/neovim/wiki/Following-HEAD#20160511 >
if (has("termguicolors"))
  set termguicolors
endif
```

### Italics

Italics are a fantastic way to improve the appearance of your code. Italics will do what they can, but, as they say, "you can't polish a 💩." (Although MythBusters busted this). Digressing here, so place this into your config:

```vim
" Italics for my favorite color scheme
let g:palenight_terminal_italics=1
```

## Contributors

Contribute to this color scheme and earn your spot in this section of the README.

* Tony Lambiris [@tonylambiris](https://github.com/tonylambiris/)
* [@chromz](https://github.com/chromz/)

[screenshot]: images/screenshot.png
[materialLink]: https://github.com/equinusocio/material-theme
[onedark]: https://github.com/joshdick/onedark.vim
[vimplug]: https://github.com/junegunn/vim-plug
[firaCode]: https://github.com/tonsky/FiraCode
