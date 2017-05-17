# What is this?

This is a simple node demonstration of how to log console and debug messages to a file, while having them also appear in the terminal.

The reason we'd like to to do is because we want to be able to use [papertrail's](http://help.papertrailapp.com/kb/configuration/configuring-centralized-logging-from-nodejs-apps/) daemon to log messages to a centralised service.


## Installation

	npm install


## Usage

	npm run


## Description

This demo runs a simple express server, where a `logging.js` module is used to provide winston transports to log console messages to a file, and then call the original console globals to log the messages to the terminal.

Note that we can also use the [winston-papertrail](https://github.com/kenperkins/winston-papertrail) library to provide a transport to send log information directly to papertrail (in which case we may not need to log to the file).

In the `package.json` we then ensure that `debug` generates messages by specifying `app` in the `DEBUG` environment variable:

	"start": "DEBUG=app,express:* DEBUG_COLORS=false node server.js",

In `server.js` we require `debug`, and identify our application as `app`:

	var debug = require('debug')('app')


By binding `debug.log` to `console.info`, we direct debug output to console:

	debug.log = console.info.bind(console);

Because we've overriden console in our logging module, debug output will therefore
end up in the `logs/default.log` file.

Similary, any `console.log`, `console.info`, `console.warn`, or `console.error` messages
will also be routed to the `logs/default.log` file.
