/*
** A means of using winston to provide structured logging to a file,
** which we can then use with the papertrail remote_syslog2 daemon
** to send logs to a centralised logging service.
** All while still logging the messages to the terminal.
*/

// https://gist.github.com/spmason/1670196
// http://seanmonstar.com/post/56448644049/consolelog-all-the-things
// http://help.papertrailapp.com/kb/configuration/configuring-centralized-logging-from-nodejs-apps/

'use strict';

var util = require('util'),
    winston = require('winston'),
    logger = new winston.Logger(),
    production = (process.env.NODE_ENV || '').toLowerCase() === 'production';

module.exports = {
    middleware: function(req, res, next){
        console.info(req.method, req.url, res.statusCode);
        next();
    },
    production: production
};

// Override the built-in console methods with winston hooks
switch((process.env.NODE_ENV || '').toLowerCase()){
    case 'production':
        production = true;
        logger.add(winston.transports.File, {
            filename: __dirname + '/logs/production.log',
            handleExceptions: true,
            exitOnError: false,
            level: 'warn'
        });
        break;
    case 'test':
        // Don't set up the logger overrides
        return;
    default:
        logger.add(winston.transports.Console, {
            colorize: true,
            timestamp: true,
            level: 'info'
        });
        logger.add(winston.transports.File, {
            filename: __dirname + '/logs/default.log',
            handleExceptions: true,
            exitOnError: false,
            level: 'info'
        });
        break;
}

function formatArgs(args){
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

// Store the original console functions so that we can use them to
// output to the terminal.
var original = {
	console: {
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error,
		debug: console.debug,
	}
}

// Swap in our winston logger for the console functions
console.log = function(){
    logger.info.apply(logger, formatArgs(arguments));
	original.console.log.apply(this, arguments);
};

console.info = function(){
    logger.info.apply(logger, formatArgs(arguments));
	original.console.info.apply(this, arguments);
};

console.warn = function(){
    logger.warn.apply(logger, formatArgs(arguments));
	original.console.warn.apply(this, arguments);
};

console.error = function(){
    logger.error.apply(logger, formatArgs(arguments));
	original.console.error.apply(this, arguments);
};

console.debug = function(){
    logger.debug.apply(logger, formatArgs(arguments));
	original.console.debug.apply(this, arguments);
};
