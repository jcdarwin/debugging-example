// We trigger debug by specifying DEBUG=application
// Note that we specify DEBUG_COLORS=false
// to prevent colour codes appearing in our log files.
var debug = require('debug')('app')

// We use our winston logging module to log console to a file
// including debug messages that we route via console
var logging = require('./logging')

// Set all debug output to go via console.info.
// If we don't do this, we'll only get debug output in the console,
// and not written to file via the logging module.
debug.log = console.info.bind(console);

debug('Here\'s debug reporting booting %s', 'my app')
debug('Here\'s debug via console.info')

// Because we've required our custom logging module to override
// console before this point, any console.logs that a child module
// does will also be written to file.
var express = require('express')
var app = express()

console.warn('Here\'s console.warn')
console.error('Here\'s console.error')

app.get('/', function (req, res) {
  res.send('Hello World!')
  // Visit http://localhost:9000 to see these messages appear
  debug('Here\'s a debug during app.get')
  console.log('Here\'s a console.log during app.get')
  console.warn('Here\'s a console.warn during app.get')
  console.error('Here\'s a console.error during app.get')
})

app.listen(9000, function () {
  console.log('Example app listening on port 9000!')
})
