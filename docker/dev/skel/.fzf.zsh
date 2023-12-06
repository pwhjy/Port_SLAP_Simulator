# Setup fzf
# ---------
if [[ ! "$PATH" == */etc/skel/.vim/plugged/fzf/bin* ]]; then
  export PATH="$PATH:/etc/skel/.vim/plugged/fzf/bin"
fi

# Auto-completion
# ---------------
[[ $- == *i* ]] && source "/etc/skel/.vim/plugged/fzf/shell/completion.zsh" 2> /dev/null

# Key bindings
# ------------
source "/etc/skel/.vim/plugged/fzf/shell/key-bindings.zsh"

