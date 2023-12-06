# vscode-proto3

Protobuf 3 support for Visual Studio Code

https://github.com/zxh0/vscode-proto3

## Features

- proto3 support.
- syntax highlighting.
- syntax validation.
- code snippets.
- code completion.
- code formatting.
- brace matching.
- line and block commenting.

![gif1](https://github.com/zxh0/vscode-proto3/raw/master/images/gif1.gif)

### Syntax Highlighting

The grammar is written in tmLanguage.
It is written in JSON format and then converted to XML format using 
[vscode-tmlanguage](https://github.com/Togusa09/vscode-tmlanguage) extension.

### Syntax Validation

The validation is triggered when you save the proto file. You need protoc 
compiler to enable syntax validation. You also need a settings.json file 
to tell the extension the full path of protoc if it is not in `path`. 
Bellow is the settings.json file comes from 
[example/.vscode](https://github.com/zxh0/vscode-proto3/tree/master/example/.vscode) folder:
```json
{
    "protoc": {
        "path": "/path/to/protoc",
        "options": [
            "--proto_path=protos/v3",
            "--proto_path=protos/v2",
            "--proto_path=${workspaceRoot}/proto",
            "--proto_path=${env.GOPATH}/src"
            "--java_out=gen/java"
        ]
    }
}
```

Variables

Variable      | Description
------------- | ------------
config.*      | Refer settings items in ``Preferences``.
env.*         | Refer environment variable.
workspaceRoot | Returns current workspace root path.

### Code Completion

A very simple parser is written to support code completion. 

### Code Snippets

prefix| body
----- | -----
sp2   | `syntax = "proto2";`
sp3   | `syntax = "proto3";`
pkg   | `package package.name;`
imp   | `import "path/to/other/protos.proto";`
ojp   | `option java_package = "java.package.name";`
ojoc  | `option java_outer_classname = "ClassName";`
o4s   | `option optimize_for = SPEED;`
o4cs  | `option optimize_for = CODE_SIZE;`
o4lr  | `option optimize_for = LITE_RUNTIME;`
odep  | `option deprecated = true;`
oaa   | `option allow_alias = true;`
msg   | `message MessageName {}`
fbo   | `bool field_name = tag;`
fi32  | `int32 field_name = tag;`
fi64  | `int64 field_name = tag;`
fu32  | `uint32 field_name = tag;`
fu64  | `uint64 field_name = tag;`
fs32  | `sint32 field_name = tag;`
fs64  | `sint64 field_name = tag;`
ff32  | `fixed32 field_name = tag;`
ff64  | `fixed64 field_name = tag;`
fsf32 | `sfixed32 field_name = tag;`
fsf64 | `sfixed64 field_name = tag;`
ffl   | `float field_name = tag;`
fdo   | `double field_name = tag;`
fst   | `string field_name = tag;`
fby   | `bytes field_name = tag;`
fm    | `map<key, val> field_name = tag;`
foo   | `oneof name {}`
en    | `enum EnumName {}`
sv    | `service ServiceName {}`
rpc   | `rpc MethodName (Request) returns (Response);`

## Code Formatting

Support "Format Document" if `clang-format` is in path, including custom `style` options.

By default, `clang-format`'s standard coding style will be used for formatting. To define a custom style or use a supported preset add `"clang-format.style"` in VSCode Settings (`settings.json`)

### Example usage:
`"clang-format.style": "google"`

This is the equivalent of executing `clang-format -style=google` from the shell.

For further formatting options refer to the [official `clang-format` documentation](https://clang.llvm.org/docs/ClangFormatStyleOptions.html)

## Known Issues

Auto-completion not works in some situations.

## Release Notes

See [CHANGELOG.md](https://github.com/zxh0/vscode-proto3/blob/master/CHANGELOG.md).
