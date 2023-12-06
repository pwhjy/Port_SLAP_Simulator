# Generate Doxygen Comments in VS Code

This VS Code Extensions provides Doxygen Documentation generation on the fly by starting a Doxygen comment block and pressing enter.

[![Build Status](https://travis-ci.org/christophschlosser/doxdocgen.svg?branch=master)](https://travis-ci.org/christophschlosser/doxdocgen)
[![Build status](https://ci.appveyor.com/api/projects/status/4h84071p9tv0y9r6?svg=true)](https://ci.appveyor.com/project/christophschlosser/doxdocgen)
[![codecov](https://codecov.io/gh/christophschlosser/doxdocgen/branch/master/graph/badge.svg)](https://codecov.io/gh/christophschlosser/doxdocgen)
[![Gitter chat](https://badges.gitter.im/doxdocgen.png)](https://gitter.im/doxdocgen)

## Table of Contents

* [Features](#features)
  * [Attributes](#attributes)
  * [Con- and Destructors](#con--and-destructors)
  * [Extensive customization](#extensive-customization)
  * [File descriptions](#file-descriptions)
  * [Function pointers](#function-pointers)
  * [Operators](#operators)
  * [Parameters](#parameters)
  * [Return types](#return-types)
    * [Trailing](#trailing)
  * [Smart text](#smart-text)
  * [Templates](#templates)
* [Config options](#config-options)
* [Contributors](#contributors)
* [Known Issues](#known-issues)
* [What's to come](#whats-to-come)

## Features

### Attributes

![Attribute](https://github.com/christophschlosser/doxdocgen/raw/master/images/attributes.gif)

### Con- and Destructors

![Constructor](https://github.com/christophschlosser/doxdocgen/raw/master/images/ctor.gif)
![Destructor](https://github.com/christophschlosser/doxdocgen/raw/master/images/dtor.gif)

### Extensive customization

![options](https://github.com/christophschlosser/doxdocgen/raw/master/images/options.gif)
![xml options](https://github.com/christophschlosser/doxdocgen/raw/master/images/opts-xml.gif)
![order of commands](https://github.com/christophschlosser/doxdocgen/raw/master/images/opt-order.gif)

### File descriptions

![file description](https://github.com/christophschlosser/doxdocgen/raw/master/images/file.gif)

### Function pointers

![func_ptr](https://github.com/christophschlosser/doxdocgen/raw/master/images/function_ptr.gif)

### Operators

![Operator](https://github.com/christophschlosser/doxdocgen/raw/master/images/operator.gif)
![Delete Operator](https://github.com/christophschlosser/doxdocgen/raw/master/images/op-delete.gif)

### Parameters

![Simple Parameter](https://github.com/christophschlosser/doxdocgen/raw/master/images/param_simple.gif)
![Long Parameter](https://github.com/christophschlosser/doxdocgen/raw/master/images/long-param.gif)

### Return types

![Bool return val](https://github.com/christophschlosser/doxdocgen/raw/master/images/bool.gif)
![Declaration](https://github.com/christophschlosser/doxdocgen/raw/master/images/declaration.gif)

### Smart text

![Smart text CTor](https://github.com/christophschlosser/doxdocgen/raw/master/images/smartTextCtor.gif)
![Smart text Custom](https://github.com/christophschlosser/doxdocgen/raw/master/images/smartTextCustom.gif)
![Smart text Getter](https://github.com/christophschlosser/doxdocgen/raw/master/images/smartTextGet.gif)

Supported smart text snippets:

* Constructors

* Destructors

* Getters

* Setters

* Factory methods

Each of them can be configured with its own custom text and you can decide if the addon should attempt to split the name of the method according to its case.

#### Trailing

![Trailing return](https://github.com/christophschlosser/doxdocgen/raw/master/images/trailing.gif)

### Templates

![Template method](https://github.com/christophschlosser/doxdocgen/raw/master/images/template.gif)
![Template class](https://github.com/christophschlosser/doxdocgen/raw/master/images/template-class.gif)

## Config options

```json
// The prefix that is used for each comment line except for first and last.
  "doxdocgen.c.commentPrefix": " * ",

  // Smart text snippet for factory methods/functions.
  "doxdocgen.c.factoryMethodText": "Create a {name} object",

  // The first line of the comment that gets generated. If empty it won't get generated at all.
  "doxdocgen.c.firstLine": "/**",

  // Smart text snippet for getters.
  "doxdocgen.c.getterText": "Get the {name} object",

  // The last line of the comment that gets generated. If empty it won't get generated at all.
  "doxdocgen.c.lastLine": " */",

  // Smart text snippet for setters.
  "doxdocgen.c.setterText": "Set the {name} object",

  // Doxygen comment trigger. This character sequence triggers generation of Doxygen comments.
  "doxdocgen.c.triggerSequence": "/**",

  // Smart text snippet for constructors.
  "doxdocgen.cpp.ctorText": "Construct a new {name} object",

  // Smart text snippet for destructors.
  "doxdocgen.cpp.dtorText": "Destroy the {name} object",

  // The template of the template parameter Doxygen line(s) that are generated. If empty it won't get generated at all.
  "doxdocgen.cpp.tparamTemplate": "@tparam {param} ",

  // File copyright documentation tag.  Array of strings will be converted to one line per element.  Can template {year}.
  "doxdocgen.file.copyrightTag": [
    "@copyright Copyright (c) {year}"
  ],

  // Additional file documentation.  Array of strings will be converted to one line per element.  Can template {year}, {date}, {author}, and {email}.
  "doxdocgen.file.customTag": [],

  // The order to use for the file comment. Values can be used multiple times. Valid values are shown in default setting.
  "doxdocgen.file.fileOrder": [
    "file",
    "author",
    "brief",
    "version",
    "date",
    "empty",
    "copyright",
    "empty",
    "custom"
  ],

  // The template for the file parameter in Doxygen.
  "doxdocgen.file.fileTemplate": "@file {name}",

  // Version number for the file.
  "doxdocgen.file.versionTag": "@version 0.1",

  // Set the e-mail address of the author.  Replaces {email}.
  "doxdocgen.generic.authorEmail": "you@domain.com",

  // Set the name of the author.  Replaces {author}.
  "doxdocgen.generic.authorName": "your name",

  // Set the style of the author tag and your name.  Can template {author} and {email}.
  "doxdocgen.generic.authorTag": "@author {author} ({email})",

  // If this is enabled a bool return value will be split into true and false return param.
  "doxdocgen.generic.boolReturnsTrueFalse": true,

  // The template of the brief Doxygen line that is generated. If empty it won't get generated at all.
  "doxdocgen.generic.briefTemplate": "@brief {text}",

  // The format to use for the date.
  "doxdocgen.generic.dateFormat": "YYYY-MM-DD",

  // The template for the date parameter in Doxygen.
  "doxdocgen.generic.dateTemplate": "@date {date}",

  // Decide if you want to get smart text for certain commands.
  "doxdocgen.generic.generateSmartText": true,

  // Whether include type information at return.
  "doxdocgen.generic.includeTypeAtReturn": true,

  // How many lines the plugin should look for to find the end of the declaration. Please be aware that setting this value too low could improve the speed of comment generation by a very slim margin but the plugin also may not correctly detect all declarations or definitions anymore.
  "doxdocgen.generic.linesToGet": 20,

  // The order to use for the comment generation. Values can be used multiple times. Valid values are shown in default setting.
  "doxdocgen.generic.order": [
    "brief",
    "empty",
    "tparam",
    "param",
    "return"
  ],

  // The template of the param Doxygen line(s) that are generated. If empty it won't get generated at all.
  "doxdocgen.generic.paramTemplate": "@param {param} ",

  // The template of the return Doxygen line that is generated. If empty it won't get generated at all.
  "doxdocgen.generic.returnTemplate": "@return {type} ",

  // Decide if the values put into {name} should be split according to their casing.
  "doxdocgen.generic.splitCasingSmartText": true
```

## Contributors

[Christoph Schlosser](https://github.com/christophschlosser)

[Rowan Goemans](https://github.com/rowanG077)

## Known Issues

[See open bugs](https://github.com/christophschlosser/doxdocgen/labels/bug)

## What's to come

[See open features](https://github.com/christophschlosser/doxdocgen/labels/enhancement)
