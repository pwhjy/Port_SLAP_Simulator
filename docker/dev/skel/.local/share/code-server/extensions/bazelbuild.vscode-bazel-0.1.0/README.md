# Bazel plugin for Visual Studio Code

This extension provides support for Bazel in Visual Studio.

## Features

- **Bazel Build Targets** tree displays the build packages/targets in your
  workspace
- **CodeLens** links in BUILD files to directly launch a build or test by simply
  clicking on the targets
- **Buildifier** integration to lint and format your Bazel files (requires that
  [Buildifier](https://github.com/bazelbuild/buildtools/releases) be installed)
- Debug Starlark code in your `.bzl` files during a build (set breakpoints, step
  through code, inspect variables, etc.)

## Configuring the Extension

This extension adds a **Bazel** section to the extension settings in Visual
Studio Code. If you have Bazel installed in a location that is not on your
system path or if you wish to use a different version in the IDE, you should
set the **Bazel: Executable** setting to the location of the Bazel executable.

Similarly, the **Bazel: Buildifier Executable** setting can be configured if
you install Buildifier in a location that is not on your system path.

When Buildifier is installed, the **Format Document** command in Visual Studio
code will reformat `BUILD`, `WORKSPACE`, `.bzl`, and `.sky` files using the
tool and will display lint warnings from those files as you type. By default,
this extension does not automatically _fix_ lint warnings during formatting,
but you can opt into this by enabling the **Bazel: Buildifier Fix on Format**
setting.

## Using the Starlark Debugger

Currently, the Starlark debugger can be used by right-clicking a build target in
the **Bazel Build Targets** view and selecting "Build Target with Debugging".
This will start the build inside the Visual Studio Code debugger (output will
be redirected to the Debug Console pane) and it will pause on any breakpoints
hit during execution.

When a Bazel thread is paused, you can step through Starlark code, add watch
expressions, and execute arbitrary statements by typing them in the input area
of the Debug Console.

Clicking the "Stop" button in the debugger will kill the Bazel process being
debugger, allowing you to halt the current build. The Bazel server, however,
will continue running.

## Contributing

If you would like to contribute to the Bazel Visual Studio extension, please
refer to the [contribution guidelines](https://github.com/bazelbuild/vscode-bazel/blob/master/CONTRIBUTING.md) for information about
our patch acceptance process and setting up your development environment.
