#!/usr/bin/env node
"use strict";

var fs = require('fs')
var path = require('path')

var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        i: 'input',
        d: 'done',
        r: 'reset',
        n: 'new',
        e: 'erase',
        w: 'wipe'
    }
})

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
  if (typeof task === 'string') task = [ task ]
  for (var t in task) {
    tasks[task[t]] = true
  }
}

function reset (task) {
  if (typeof task === 'string') {
    tasks[task] = false
  } else {
    for (var key in tasks) {
      tasks[key] = false
    }
  }
}

function newTask (task) {
  if (typeof task === 'string') task = [ task ]
  for (var t in task) {
    tasks[task[t]] = false
  }
}

function removeTask (task) {
  delete tasks[task]
}

function wipeTasks() {
  for (var task in tasks) {
    tasks[task] = true
  }
}

if (argv._) done(argv._)
if (argv.r) reset(argv.r)
if (argv.d) done(argv.d)
if (argv.n) newTask(argv.n)
if (argv.e) removeTask(argv.e)
if (argv.w) wipeTasks()

list()
