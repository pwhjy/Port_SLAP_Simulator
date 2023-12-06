# Change Log

## Version 0.1.0 (January 23, 2019)

### New Features

- CodeLens adds build/test commands to targets in the editor for BUILD files.
- If Buildifier is installed, it will be used as the formatter for BUILD,
  `.bzl`, and other Starlark files, and lint warnings will be annotated in
  the editor and problems panel.
- Targets in BUILD files are now treated as "symbols" so they appear in the
  Outline view, can be navigated to using the "Go to Symbol" command, and
  so forth.
- The "Bazel: Clean" command has been added to the command palette.
- The "Bazel Build Targets" explorer view now has an explicit refresh
  control to requery the workspace if there are changes that cannot be
  auto-detected.

### Bug Fixes

- Improve path resolution for breakpoints in local/external workspaces, which
  should solve some issues with the debugger not stopping when a breakpoint
  is reached.
- When a Bazel command is invoked from the command palette, a quick pick panel
  is now presented that allows the user to type or select which target should
  be built or tested.

## Version 0.0.2 (November 28, 2018)

- Fix an issue where runtime dependencies were listed as development dependencies.

## Version 0.0.1 (November 28, 2018)

- Initial release.
