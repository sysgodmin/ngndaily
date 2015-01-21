#!/usr/bin/env bash
 
#
# Ask the textmate guys?
#
[[ -f "${TM_SUPPORT_PATH}/lib/bash_init.sh" ]] && . "${TM_SUPPORT_PATH}/lib/bash_init.sh"
 
#
# Name: reformat.js
# Author: @dscape
#
# Program: TextMate2
# Scope Selector: source.js
# Type: Command
# Key Equivalent: command + s
# Save: Nothing
# Input: Document
# Format: Text
# Output: Replace Input
# Format: Text
# Caret Placement: Line Interpolation
#
 
#
# place the file you are working on in a temp file
#
# remove previous linting errors to prevent it from going crazy
#
cat | sed "s|// lint: [0-9]* error.*||g" > /tmp/reformat_panda.js
 
#
# you need to install node
#
require_cmd npm
 
#
# [sudo] npm install -g js-beautify
#
# url: https://github.com/einars/js-beautify
#
require_cmd js-beautify
 
#
# [sudo] npm install -g jshint
#
# configure in ~/.jshintrc
# google `jshintrc` for instructions and samples
#
# url: http://jshint.com
#
require_cmd jshint
 
#
# set ident according to user preferences
#
INDENT="2"
if [ $TM_SOFT_TABS = YES ]; then
INDENT="$TM_TAB_SIZE"
fi
 
#
# make the code pretty
#
js-beautify --good-stuff -s "$INDENT" /tmp/reformat_panda.js
 
#
# check if it passes jshint
#
jshintoutput="$(jshint /tmp/reformat_panda.js | tail -n 1)"
 
#
# if it doesnt make sure the person gets a nasty comment
#
[ -z $jshintoutput ] || echo "// lint:" "$jshintoutput"
