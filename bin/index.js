#!/usr/bin/env node
"use strict";

var fs = require('fs')
var path = require('path')

var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        i: 'input',
        d: 'done',
        r: 'reset',
        n: 'new'
    }
});

var inputFile = argv.input || path.join(__dirname, '..', 'practice.txt')

var tasks = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

function list () {
  for (var key in tasks) {
    if (tasks.hasOwnProperty(key)) {
      if (!tasks[key]) {
        console.log(key)
      }
    }
  }
  fs.writeFileSync(inputFile, JSON.stringify(tasks, null, 2))
}

function done (task) {
  tasks[task] = true;
}

function reset () {
  // TODO Reset tasks individually
  for (var key in tasks) {
    tasks[key] = false;
  }
}

function newTask (task) {
  tasks[task] = false;
}

if (argv.r) { reset(tasks) }
if (argv.d) { done(argv.d) }
if (argv.n) { newTask(argv.n) }
list()
