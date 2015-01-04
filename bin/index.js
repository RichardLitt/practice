#!/usr/bin/env node
'use strict';

var fs = require('fs')
var path = require('path')
var levelup = require('level')
var _ = require('lodash')

var argv = require('minimist')(process.argv.slice(2), {
    alias: {
        i: 'input',
        d: 'done',
        r: 'reset',
        n: 'new',
        e: 'erase',
        w: 'wipe',
        l: 'list'
    }
})

var input = argv.i || (path.resolve(process.env['HOME'] || process.env['USERPROFILE'], '.practicedb'))
var db = levelup(input, {valueEncoding: 'json'})

if (argv._) done(argv._)
if (argv.r) reset(argv.r)
if (argv.d) done(argv.d)
if (argv.n) newTask(argv.n)
if (argv.e) removeTask(argv.e)
if (argv.w) wipeTasks()
if (argv.h || argv.help) usage()
if (argv.l) list(true)
// Default
if (_.isEmpty(process.argv.slice(2))) list()


function list (showAll) {
  db.createReadStream()
    .on('data', function(data) {
      if (data.value === 'false' || showAll) {
        console.log(data.key)
      }
    })
    .on('error', function (err) {
      console.log('Error listing!', err)
    })
    .on('close', function () {
      db.close()
    })
}

function save (task, value) {
  value = value || 'false'
  db.put(task, value, function(err) {
    if (err)
      return console.log('Failed to save ' + task + ' as ' + value + '!', err)
  })
}

function done (task) {
  if (typeof task === 'string') task = [ task ]

  for (var t in task) {
    save(task[t], 'true')
    console.log('Practiced %s.', task[t]);
  }
}

function reset (task) {
  if (typeof task === 'string') {
    db.put(task, 'false', function(err) {
      if (err) { return console.log('Failed to reset', task, err) }
      else { return console.log('Reset ' + task + '.'); }
    })
  } else {
    db.createKeyStream()
      .on('data', function (data) {
        save(data, 'false')
        console.log('Reset %s.', data);
      })
  }
}

function newTask (task) {
  if (typeof task === 'string') task = [ task ]

  for (var t in task) {
    save(task[t], 'false')
    console.log('Added %s.', task[t]);
  }
}

function removeTask (task) {
  db.del(task, function (err) {
    if (err) { console.log('Failed to delete', err) }
    else { console.log('Deleted %s.', task); }
  })
}

function wipeTasks () {
  db.createKeyStream()
    .on('data', function(data) {
      save(data, 'true')
      console.log('Wiped %s.', data);
    })
    .on('close', function() {
      list()
    })
}

function usage () {
    var rs = fs.createReadStream(__dirname + '/../README.md')
    rs.pipe(process.stdout)
}
