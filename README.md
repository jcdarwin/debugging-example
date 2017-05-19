# What is this?

This is a simple node demonstration of how to enable / disable debugging using the [upcoming v3 release of the debug module](https://github.com/visionmedia/debug.git#ae88bce465d556cfe441934998594dae33c58182).

Note that the version of debug at this cmomit is reported as 2.6.3, but that's just because it's not been updated.


## Installation

	npm install


## Usage

	npm start


## Description

This demo runs a simple express server, which displays whether or not debugging is enabled for the app at http://localhost:9000/

Once the app is started, to enable debugging:

	curl -X POST -H "x-DEBUG: app:server" http://localhost:9000/

You'll the be able to see the debugging status at http://localhost:9000/, and see simple debug messages in the terminal.

To disable debugging:

	curl -X POST -H "x-DEBUG:" http://localhost:9000/

Note that if the `DEBUG` environment variable is set at runtime, debugging will be set accordingly:

	"start:prod": "DEBUG=app:*,express:* node server.js"
