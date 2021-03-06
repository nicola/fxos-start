#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var Q = require('q');
var startB2G = require('../index');

var opts = require("nomnom")
  .option('port', {
    abbr: 'p',
    help: 'Port of FirefoxOS'
  })
  .option('force', {
    abbr: 'f',
    help: 'Kill other simulators on this port',
    flag: true
  })
  .option('verbose', {
    help: 'Set the output level to verbose',
    flag: true
  })
  .option('bin', {
    help: 'Set external B2G bin',
  })
  .option('profile', {
    help: 'Set external B2G profile',
  })
  .option('release', {
    list: true,
    help: 'Release of FirefoxOS to filter',
    metavar: '<release>',
    type: 'string'
  })
  .option('exit', {
    help: 'Exit after startup',
    flag: true
  })
  .option('stdin', {
    help: 'The path where stdin of the simulator will be redirected to',
    metavar: '<stdin filepath>'
  })
  .option('stdout', {
    help: 'The path where stdout of the simulator will be redirected to',
    metavar: '<stdout filepath>'
  })
  .option('stderr', {
    help: 'The path where stderr of the simulator will be redirected to',
    metavar: '<stderr filepath>'
  })
  .option('timeout', {
    help: 'The timeout time to wait for a response from the Simulator.',
  })
  .option('version', {
    flag: true,
    help: 'Print version and exit',
    callback: function() {
      fs.readFile(path.resolve(__dirname, '../package.json'), 'utf-8', function(err, file) {
        console.log(JSON.parse(file).version);
      });
    }
  })
  .parse();

// No need to create FirefoxClient
opts.connect = false;

startB2G(opts)
  .then(function(simulator){
    console.log("Firefox Simulator", simulator.release, "started on port", simulator.port, simulator.process.pid);
  })
  .catch(function(err) {
    console.log("Error", err, err.stack);
  }).done();