" Vim syntax file
" Language:	C
" Current Maintainer:	Yanfei Guoj (https://github.com/arakashic)
" Previous Maintainer:	Bram Moolenaar <Bram@vim.org>
" Last Change:	July 21, 2016

" load default c.vim when chromatica is not enabled
if !chromatica#init#_is_enabled()
    \ || !(get(g:, 'chromatica#highlight_feature_level', 0) > 0)
    \ || (get(b:, 'chromatica_fallback', 0) > 0)
    source $VIMRUNTIME/syntax/c.vim
    finish
endif

" Quit when a (custom) syntax file was already loaded
if exists("b:current_syntax")
  finish
endif

let s:cpo_save = &cpo
set cpo&vim

runtime! syntax/chromatica.vim

let s:ft = matchstr(&ft, '^\([^.]\)\+')

" A bunch of useful C keywords

syn keyword	cTodo		contained TODO FIXME XXX

" cCommentGroup allows adding matches for special things in comments
syn cluster	cCommentGroup	contains=cTodo

" String and Character constants
" Highlight special characters (those which have a backslash) differently
syn match	cSpecial	display contained "\\\(x\x\+\|\o\{1,3}\|.\|$\)"
if !exists("c_no_utf")
  syn match	cSpecial	display contained "\\\(u\x\{4}\|U\x\{8}\)"
endif

if !exists("c_no_cformat")
  " Highlight % items in strings.
  if !exists("c_no_c99") " ISO C99
    syn match	cFormat		display "%\(\d\+\$\)\=[-+' #0*]*\(\d*\|\*\|\*\d\+\$\)\(\.\(\d*\|\*\|\*\d\+\$\)\)\=\([hlLjzt]\|ll\|hh\)\=\([aAbdiuoxXDOUfFeEgGcCsSpn]\|\[\^\=.[^]]*\]\)" contained
  else
    syn match	cFormat		display "%\(\d\+\$\)\=[-+' #0*]*\(\d*\|\*\|\*\d\+\$\)\(\.\(\d*\|\*\|\*\d\+\$\)\)\=\([hlL]\|ll\)\=\([bdiuoxXDOUfeEgGcCsSpn]\|\[\^\=.[^]]*\]\)" contained
  endif
  syn match	cFormat		display "%%" contained
endif

" cCppString: same as cString, but ends at end of line
if s:ft ==# "cpp" && !exists("cpp_no_cpp11") && !exists("c_no_cformat")
  " ISO C++11
  syn region	cString		start=+\(L\|u\|u8\|U\|R\|LR\|u8R\|uR\|UR\)\="+ skip=+\\\\\|\\"+ end=+"+ contains=cSpecial,cFormat,@Spell extend
  syn region 	cCppString	start=+\(L\|u\|u8\|U\|R\|LR\|u8R\|uR\|UR\)\="+ skip=+\\\\\|\\"\|\\$+ excludenl end=+"+ end='$' contains=cSpecial,cFormat,@Spell
elseif s:ft ==# "c" && !exists("c_no_c11") && !exists("c_no_cformat")
  " ISO C99
  syn region	cString		start=+\%(L\|U\|u8\)\="+ skip=+\\\\\|\\"+ end=+"+ contains=cSpecial,cFormat,@Spell extend
  syn region	cCppString	start=+\%(L\|U\|u8\)\="+ skip=+\\\\\|\\"\|\\$+ excludenl end=+"+ end='$' contains=cSpecial,cFormat,@Spell
else
  " older C or C++
  syn match	cFormat		display "%%" contained
  syn region	cString		start=+L\="+ skip=+\\\\\|\\"+ end=+"+ contains=cSpecial,cFormat,@Spell extend
  syn region	cCppString	start=+L\="+ skip=+\\\\\|\\"\|\\$+ excludenl end=+"+ end='$' contains=cSpecial,cFormat,@Spell
endif

syn region	cCppSkip	contained start="^\s*\(%:\|#\)\s*\(if\>\|ifdef\>\|ifndef\>\)" skip="\\$" end="^\s*\(%:\|#\)\s*endif\>" contains=cCppSkip

syn cluster	cStringGroup	contains=cCppString,cCppSkip

syn match	cCharacter	"L\='[^\\]'"
syn match	cCharacter	"L'[^']*'" contains=cSpecial
if exists("c_gnu")
  syn match	cSpecialCharacter "L\='\\['\"?\\abefnrtv]'"
else
  syn match	cSpecialCharacter "L\='\\['\"?\\abfnrtv]'"
endif
syn match	cSpecialCharacter display "L\='\\\o\{1,3}'"
syn match	cSpecialCharacter display "'\\x\x\{1,2}'"
syn match	cSpecialCharacter display "L'\\x\x\+'"

if (s:ft ==# "c" && !exists("c_no_c11")) || (s:ft ==# "cpp" && !exists("cpp_no_cpp11"))
  " ISO C11 or ISO C++ 11
  if exists("c_no_cformat")
    syn region	cString		start=+\%(U\|u8\=\)"+ skip=+\\\\\|\\"+ end=+"+ contains=cSpecial,@Spell extend
  else
    syn region	cString		start=+\%(U\|u8\=\)"+ skip=+\\\\\|\\"+ end=+"+ contains=cSpecial,cFormat,@Spell extend
  endif
  syn match	cCharacter	"[Uu]'[^\\]'"
  syn match	cCharacter	"[Uu]'[^']*'" contains=cSpecial
  if exists("c_gnu")
    syn match	cSpecialCharacter "[Uu]'\\['\"?\\abefnrtv]'"
  else
    syn match	cSpecialCharacter "[Uu]'\\['\"?\\abfnrtv]'"
  endif
  syn match	cSpecialCharacter display "[Uu]'\\\o\{1,3}'"
  syn match	cSpecialCharacter display "[Uu]'\\x\x\+'"
endif

" Catch errors caused by wrong parenthesis and brackets.
" Also accept <% for {, %> for }, <: for [ and :> for ] (C99)
" But avoid matching <::.

"integer number, or floating point number without a dot and with "f".
syn case ignore
syn match	cNumbers	display transparent "\<\d\|\.\d" contains=cOctalError,cOctal
" Same, but without octal error (for comments)
syn match	cNumbersCom	display contained transparent "\<\d\|\.\d" contains=cOctal
" Flag the first zero of an octal number as something special
syn match	cOctal		display contained "0\o\+\(u\=l\{0,2}\|ll\=u\)\>" contains=cOctalZero
syn match	cOctalZero	display contained "\<0"

" flag an octal number with wrong digits
syn match	cOctalError	display contained "0\o*[89]\d*"
syn case match

if exists("c_comment_strings")
  " A comment can contain cString, cCharacter and cNumber.
  " But a "*/" inside a cString in a cComment DOES end the comment!  So we
  " need to use a special type of cString: cCommentString, which also ends on
  " "*/", and sees a "*" at the start of the line as comment again.
  " Unfortunately this doesn't very well work for // type of comments :-(
  syn match	cCommentSkip	contained "^\s*\*\($\|\s\+\)"
  syn region cCommentString	contained start=+L\=\\\@<!"+ skip=+\\\\\|\\"+ end=+"+ end=+\*/+me=s-1 contains=cSpecial,cCommentSkip
  syn region cComment2String	contained start=+L\=\\\@<!"+ skip=+\\\\\|\\"+ end=+"+ end="$" contains=cSpecial
  syn region  cCommentL	start="//" skip="\\$" end="$" keepend contains=@cCommentGroup,cComment2String,cCharacter,cNumbersCom,@Spell
  if exists("c_no_comment_fold")
    " Use "extend" here to have preprocessor lines not terminate halfway a
    " comment.
    syn region cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentString,cCharacter,cNumbersCom,@Spell extend
  else
    syn region cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,cCommentString,cCharacter,cNumbersCom,@Spell fold extend
  endif
else
  syn region	cCommentL	start="//" skip="\\$" end="$" keepend contains=@cCommentGroup,@Spell
  if exists("c_no_comment_fold")
    syn region	cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,@Spell extend
  else
    syn region	cComment	matchgroup=cCommentStart start="/\*" end="\*/" contains=@cCommentGroup,@Spell fold extend
  endif
endif

syn region	cDefine		start="^\s*\(%:\|#\)\s*\(define\|undef\|if\|ifdef\|ifndef\|else\|elif\|endif\)\>" end="\(\ \|$\)"
syn region	cPreProc	start="^\s*\(%:\|#\)\s*\(pragma\|line\|warning\|warn\|error\)\>" end="\(\ \|$\)"


if exists("c_minlines")
  let b:c_minlines = c_minlines
else
  if !exists("c_no_if0")
    let b:c_minlines = 50	" #if 0 constructs can be long
  else
    let b:c_minlines = 15	" mostly for () constructs
  endif
endif
if exists("c_curly_error")
  syn sync fromstart
else
  exec "syn sync ccomment cComment minlines=" . b:c_minlines
endif

" Define the default highlighting.
" Only used when an item doesn't have highlighting yet
hi def link cFormat		cSpecial
hi def link cCppString		cString
hi def link cCommentL		cComment
hi def link cCommentStart	cComment
hi def link cCharacter		Character
hi def link cSpecialCharacter	cSpecial
hi def link cOctal		Number
hi def link cOctalZero		PreProc	 " link this to Error if you want
hi def link cOctalError		cError
hi def link cOperator		Operator
hi def link cStorageClass	StorageClass
hi def link cInclude		Include
hi def link cPreProc		PreProc
hi def link cDefine		Macro
hi def link cIncluded		cString
hi def link cPreConditMatch	cPreCondit
hi def link cPreCondit		PreCondit
hi def link cType		Type
hi def link cConstant		Constant
hi def link cCommentString	cString
hi def link cComment2String	cString
hi def link cCommentSkip	cComment
hi def link cString		String
hi def link cComment		Comment
hi def link cSpecial		SpecialChar
hi def link cTodo		Todo

let b:current_syntax = 'c'

unlet s:ft

let &cpo = s:cpo_save
unlet s:cpo_save
" vim: ts=8
