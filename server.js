var debug = require('debug')
var express = require('express')
var log = debug('app:server')
var os = require("os");

var app = express()

console.log('process.env.DEBUG: %s', process.env.DEBUG)

// If the DEBUG environment variable is set at runtime, respect it.
// We can trigger debug by specifying DEBUG=app:* or DEBUG=app:server
if (/app:server|app:\*/.test(process.env.DEBUG)) {
	debug.enable(process.env.DEBUG)
}

// A GET to demonstrate the debugging status
app.get('/', function (req, res) {
  const message = `Debugging on ${os.hostname()} is ${debug.enabled('app:server') ? 'enabled' : 'not enabled'}`
  console.log(message)
  log(message)

  res.send(`Hello World!<br />${message}`)
})

// A POST to enable / disable debugging
app.post('/', function (req, res) {
  let message
  const debugHeader = req.get('X-DEBUG')
  console.log('X-DEBUG: %s', debugHeader || 'no value supplied')

  if (debugHeader) {
    // curl -X POST -H "x-DEBUG: app:server" http://localhost:9000/
	debug.enable(debugHeader)
	message = `Debugging of ${debugHeader} enabled on ${os.hostname()}`
	log(message)
  } else {
	// curl -X POST -H "x-DEBUG:" http://localhost:9000/
	log('Disabling debugging on %s', os.hostname())
	debug.disable()
	message = `Debugging disabled on ${os.hostname()}`
	console.log(message)
	log('You should not see this message!')
  }

  res.send(message)
})

app.listen(9000, function () {
  console.log('Listening at http://0.0.0.0:9000!')
})
