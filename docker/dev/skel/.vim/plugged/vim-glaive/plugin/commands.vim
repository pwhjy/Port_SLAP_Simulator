""
" @section Introduction, intro
" @stylized Glaive
"
" Provides a user interface for maktaba settings. With Glaive, setting
" manipulation looks like this:
" >
"   Glaive plugin stringflag="value" numflag+=3
" <
" For more details, see @command(Glaive).
"
" Note: Maktaba handles looking up the plugin, parsing the settings, and
" applying the settings. Glaive is a thin wrapper around maktaba's hooks. Other
" plugins can sport a similar interface with minimal effort. Plugin management
" plugins in particular are encouraged to do so.

""
" @section Configuration, config
" Glaive is a tool for configuring other plugins. The only flag it currently
" defines is a standard maktaba flag to prevent commands from loading, which
" isn't very useful for Glaive itself.

let [s:plugin, s:enter] = maktaba#plugin#Enter(expand('<sfile>:p'))
if !s:enter
  finish
endif

function! s:Glaive(args) abort
  try
    let [l:name, l:operations] = glaive#SplitPluginNameFromOperations(a:args)
    let l:plugin = glaive#GetPlugin(l:name)
  catch /ERROR(\(BadValue\|NotFound\)):/
    call maktaba#error#Shout(v:exception)
    return
  endtry
  if l:operations is# ''
    call glaive#PrintCurrentConfiguration(l:plugin)
    return
  endif
  try
    call glaive#Configure(l:plugin, l:operations)
  catch /ERROR(\(BadValue\|WrongType\|NotFound\)):/
    call maktaba#error#Shout(v:exception)
  endtry
endfunction

""
" @usage plugin [operation...]
"
" {plugin} should be the canonical name for the plugin; see
" |maktaba#plugin#CanonicalName|.  Actually, anything which evaluates to the
" canonical name will work just as well; if you simply supply the path name of
" the plugin, it will still work.
"
" For instance, a plugin stored in a "my-plugin" folder can be
" configured with any of the following forms:
" >
"   " Canonical name (preferred).
"   :Glaive my_plugin flag
"   " Folder name.
"   :Glaive my-plugin flag
"   " Something weird which evaluates to the canonical name (valid, but
"   " not recommended).
"   :Glaive my!plugin flag
" <
"
" If no [operation]s are given, the current value of all flags in {plugin} is
" printed.
"
" Each [operation] may be in any of the following forms. They should be
" separated by whitespace. The syntax for updating settings is as follows:
"
" If you do not give a value, the flag is set to 1.
" >
"   :Glaive myplugin flag
" <
" If you use a bang, the flag is set to 0.
" >
"   :Glaive myplugin !flag
" <
" A tilde inverts a flag, flipping 0 to 1 and any other number to 0.
" It may only be used on numeric flags.
" >
"   :Glaive myplugin ~flag
" <
" If you set the flag to nothing, it will be set to 0, 0.0, '', [], or {}
" depending upon its current type.
" >
"   :Glaive myplugin flag=
" <
" You may also set a flag to a given value.
" >
"   :Glaive myplugin flag='value'
" <
"
" There are a few different ways to specify a value. You may use strings:
" >
"   :Glaive myplugin flag="string"
" <
" Single quoted strings and double quoted strings are both allowed, and are
" escaped as in vimscript: single quotes are literal, double quotes can contain
" escape characters.
"
" You may also evaluate vimscript to determine the value, by using backticks:
" >
"   :Glaive myplugin flag=`g:var`
" <
" You must use this syntax to set flags to complex lists and dictionaries.
" >
"   :Glaive myplugin mylist=`[1, "two", 3.0]`
" <
"
" Numbers and floats are supported, of course. Leading numbers are required on
" float flags: 0.5 counts, .5 does not.
" >
"   :Glaive myplugin numflag=0
"   :Glaive myplugin numflag=1.3
" <
"
" You can change specific parts of flags by focusing on them using square
" brackets. For example:
" >
"   :Glaive myplugin complexflag=`{"key": 0.28318}`
"   :Glaive myplugin complexflag[key]+=6
" <
" This works to arbitrary depth.
"
" Instead of using = to set flags, you may also use:
"
" += on numbers, strings, lists, and dicts to add items. (In lists, this appends
" items.)
"
" -= on numbers, dicts, and lists to remove items. (List items are removed by
" value, not by index. All matching items are removed.)
"
" ^= on strings and lists to prepend the value to the string or list.
"
" $= on strings and lists to append the value to the string or list.
"
" `= on any flag, in which case the value will be treated as the name of
" a function. That function will be called with the current value of the flag.
" The return value of the function will become the new value of the flag.
"
" For more detail, see |maktaba.Setting|.
command -nargs=+ -complete=customlist,glaive#Complete Glaive
    \ call s:Glaive(<q-args>)
