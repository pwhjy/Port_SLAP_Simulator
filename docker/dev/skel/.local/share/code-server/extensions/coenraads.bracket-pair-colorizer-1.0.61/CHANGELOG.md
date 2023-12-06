## Release Notes

### 1.0.61
Remove startup delay and load languages on demand (Thanks @ypresto)  

### 1.0.60
Delay startup by 500ms to let other extensions activate first (Thanks @ypresto)  
Allow languages to be excluded from parsing (Thanks @SeedyROM)

### 1.0.59
Update to PrismJS 1.50.0

### 1.0.58
Batch file support   

### 1.0.57
ABAP keyword support  

### 1.0.56
Make horizontal/vertical scope lines able to be enabled separately  
Pascal/Lua keyword support  

### 1.0.55
Support multiple opacity for scope line settings
e.g.
```
"borderColor : {color}; opacity: 0.5",
"backgroundColor : {color}; opacity: 0.1"
```

### 1.0.50
Don't apply scope timeout to first event for more responsive feedback

### 1.0.49
Add gradle support (mapped as groovy)  
Respect updating timeout for scope decorations

### 1.0.48
Fix Autohotkey support

### 1.0.47
Gutter icons now resize dynamically based on computed line-height/font-size

### 1.0.46
(requires VSCode 1.23+)  

+ Don't color in documents with `vscode` scheme  
+ Fix gaps in indent rendering for empty lines  
+ Fix parsing `<script>` tags in HTML files  
+ Color in more documents (e.g. Git diff view)  
+ Vertical lines now correctly render 1px

### 1.0.37
Added support for `Apex` language

Added following commands:  
`"bracket-pair-colorizer.expandBracketSelection"`  
`"bracket-pair-colorizer.undoBracketSelection"`

Quick-start:

```
	{
		"key": "shift+alt+right",
		"command": "bracket-pair-colorizer.expandBracketSelection",
		"when": "editorTextFocus"
	},
	{
		"key": "shift+alt+left",
		"command": "bracket-pair-colorizer.undoBracketSelection",
		"when": "editorTextFocus"
	}
```

### 1.0.36
Minor fix to improve vertical scope line in situation where a line is a position 0

### 1.0.35  
Fix `"showHorizontalScopeLine"` settings not being respected

### 1.0.34  
New settings to show brackets in the ruler:

> `"showBracketsInRuler"`  
> `"rulerPosition"`  

### 1.0.33
Make `"showBracketsInGutter"` not depend on `"highlightActiveScope"`

### 1.0.32
Better handling of empty lines when drawing line scope  
Enabled `"showVerticalScopeLine"` by default

### 1.0.31
![Line Scope](https://github.com/CoenraadS/BracketPair/raw/master/images/extra.png "Active Line Scope Example")  

New settings to show a line for the active scope:

>`"showVerticalScopeLine"`  
>`"showHorizontalScopeLine"`  
>`"scopeLineRelativePosition"`  
>`"scopeLineCSS"`

See the `README.md` for details

### 1.0.30
Support both open/close brackets in gutter at same time

### 1.0.29
Added gutter icon support via `showBracketsInGutter`  
![Gutter](https://github.com/CoenraadS/BracketPair/raw/master/images/gutter.png "Gutter Brackets Example")  

### 1.0.28
json5 support  
Better nested comment support

### 1.0.27
Play nicely with other extensions using different PrismJs versions

### 1.0.24
System Verilog support

### 1.0.21
Fix powershell subexpressions  
Fix rust byte literals  
Only color first 5000 lines to prevent performance degradation in extension host

### 1.0.20
PrismJs bump to restore nested commenting behaviour for clike languages

### 1.0.19
Updated PrismJs.  
New languages: `clojure, arff, liquid`

### 1.0.18
Map .vue to HTML

### 1.0.17
Parse embedded javascript in HTML files

### 1.0.16
Parse markdown URL brackets

### 1.0.15
Nunjucks support

### 1.0.14
Fix cross-contamination of rules across languages

### 1.0.13
Improve PowerShell support by applying matches to namespaces

### 1.0.12
Implement non-exact matching of tags. e.g. "</" can now be partially matched with "<"

### 1.0.11
Fixed JSON parsing (again)  
Added attribute parsing to HTML (should make Angular look nicer)

### 1.0.10
Fixed JSON strings with single quotes in them breaking parsing

### 1.0.9
Restored HTML support

### 1.0.8
Improved OpenSCAD support

### 1.0.7
Replace settings  
`"activeScopeBorderStyle"`  
`"activeScopeBackgroundColor"`

with `"activeScopeCSS"`

### 1.0.6
Fix `"highlightActiveScope"` setting not being respected

### 1.0.5
Added feature to highlight active scope  
It can be configured with the following settings:  
`"highlightActiveScope"`  
`"activeScopeBorderStyle"`  
`"activeScopeBackgroundColor"`  
See [README.md](https://github.com/CoenraadS/BracketPair/blob/master/README.md) for details

### 1.0.4
Added OpenSCAD support again  
Added Visual Basic Support

### 1.0.3
Removed incorrect OpenSCAD support  
Added json with comments support

### 1.0.2
Previous release broke everything  
Fix OpenSCAD support

### 1.0.1
Fix .jsx and .tsx support

### 1.0.0
Parsing offloaded to PrismJS.

### 0.10.16
Stylable support (Thanks @tomrav)  
Visual Studio Live Share support (Thanks @lostintangent)  
OpenSCAD support (Thanks @atnbueno)

### 0.10.14
Multi-root ready attempt #2 (Settings were not resource scoped)

### 0.10.13
Multi-root ready

### 0.10.12
Better support for detecting rust apostrophes when not being used to define a char

### 0.10.11
Add multi-root support

### 0.10.10
Add contextual parsing for:
- lua

### 0.10.9
Add contextual parsing for:
- rust
- sql

### 0.10.8
Add contextual parsing for:
- go
- crystal

### 0.10.7
Add contextual parsing for:
- dart

### 0.10.6
Add contextual parsing for:
- clojure strings

### 0.10.5
Bracket Colors will no longer bleed into newly typed text when a timeout is set.

Add contextual parsing for:
- typescripttreact

### 0.10.4
Add contextual parsing for:
- clojure (`;` only)
- javascriptreact

### 0.10.3
Add PowerShell support

### 0.10.2
Fix Cannot find module './multipleIndexes'.

### 0.10.1
Fix ligatures breaking when using empty colors

### 0.10.0
Fix support for F# multiline comments (* *)
Internal refactoring, preparation for big code cleanup

### 0.9.0
Basic support for F# contextual parsing

### 0.8.9
Added SCSS and LESS contextual parsing

### 0.8.8
Added HTML and CSS contextual parsing

### 0.8.7
Added JSON (with comments) contextual parsing

### 0.8.6
Fixed line caching

### 0.8.5
Removed line caching temporarily

### 0.8.4
Settings will now hot-reload 
Show error on invalid settings

### 0.8.3
Improved colorizing documents after closing or changing active document

### 0.8.2
Fixed an error causing only first document to be parsed

### 0.8.1
Added swift support for contextual parsing

### 0.8.0
The following settings were tightly coupled, so have been combined into one setting:
Removed `"colorizeQuotes"` setting  
Removed `"colorizeComments"` setting

Added `contextualParsing` setting

Contextual parsing will ignore brackets in comments or strings.

Contextual parsing has experimental support for the following languages:
- python
- typescript
- javascript  
- c  
- cpp  
- csharp  
- java  
- php  
- ruby  
- r

### 0.7.5
Added experimental support for python comments in python files

### 0.7.4
Fix multiple character escapes not being captured

### 0.7.3
Fix quotes in comments and vice versa breaking bracket coloring

### 0.7.2
Fix multiline comments breaking bracket coloring

### 0.7.1
Added backticks `` ` `` as quote modifier

### 0.7.0
Ignore brackets in quotes by default  
Added `"colorizeQuotes"` setting to toggle

### 0.6.2
Performance improvements due to reduced string copying

### 0.6.1
Second attempt at adding support for multiline comments

### 0.6
Rollback to equivalent of 0.5.0 because comments broke 

### 0.5.1
Added support for multiline comments

### 0.5.0
Ignore brackets in comments by default  
Added `"colorizeComments"` setting to toggle

### 0.4.0
Fix an error where editor.document can return undefined

### 0.3.2
Fix an error where active editor may be undefined at startup

### 0.3.1
Internal logic cleanup  
Markdown cleanup

### 0.3.0
Fix colorizing all editors, including terminals. Now it will only colorize documents.

### 0.2.1
forceUniqueOpeningColor now works with independent color pools  
forceIterationColorCycle now works with independent color pools  

### 0.2.0
Added forceUniqueOpeningColor  
Added forceIterationColorCycle

### 0.1.1
Prevent opening brackets having same color as previous closing bracket in consecutive mode

### 0.1.0
Added consecutive bracket coloring

### 0.0.4

Fixed race condition causing a textEditor to be disposed while updating decoration.

### 0.0.3

Updated ReadMe  
Improved icon

### 0.0.2

Fixed an issue where timeout wasn't being disabled when set to 0

### 0.0.1

Initial release



