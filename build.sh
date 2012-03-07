#!/bin/sh
#minify with Closure Compiler.
#http://code.google.com/p/closure-compiler/
java -jar compiler.jar\
  --js=dataview.js\
  --js=dataview.install.js\
  --js=dataview.mixin.js\
  --js_output_file=bin/dataview.min.js
