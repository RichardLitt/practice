Practice 
========

> “Practice makes the master.” - Patrick Rothfuss, _The Name of the Wind_

This is way of storing and using a  daily to do list, which will display what hasn't been done since the last reset in the console. It uses leveldb for storage.

### GeekTool 

The idea is that there are several tasks which ought to be done daily:
since I love a clean desktop, I print out these tasks (and these only) on the
desktop using GeekTool and remove them as I complete them. I reset it daily.
This way I am constantly reminded to practice.

The bash file is there because GeekTool is stupid and won't load your PATH
unless you tell it to. Ignore it if you're not using Geektool.

### Install

`npm install -g practice`

### Usage

If arguments are not flagged, it will assume they are done and will mark them
as true. Thus `practice test` will mark `test` as done, and remove it from the
returned output.

#### Flags

```
  -r, --reset Resets all to false. If given a parameter, will reset that.
  -i, --input Specifies different input file
  -d, --done  Set value to true. If multiple times, sets all params to true.
  -n, --new   Create new item in the list. 
  -e, --erase Remove the task from the list permanently. Use arg 'all' to delete everything.
  -w, --wipe  Mark all values as true,
  -l, --list  Show all values
```
