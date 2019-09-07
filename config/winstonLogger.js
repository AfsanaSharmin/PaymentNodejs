var appRoot = require('app-root-path');
var winston = require('winston');
require('winston-daily-rotate-file');
// define the custom settings for each transport (file, console)
var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
   // maxsize: 100,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },

  debugFile: {
    level: 'debug',
    filename: `${appRoot}/logs/debug.log`,
    handleExceptions: true,
    json: false,
    colorize: true,
  },

  errorFile: {
    level: 'error',
    filename: `${appRoot}/logs/error.log`,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var logger = new winston.createLogger({
  transports: [

    // DailyRotateFile
    new winston.transports.DailyRotateFile(options.file),
     new winston.transports.DailyRotateFile(options.errorFile),
     new winston.transports.DailyRotateFile(options.debugFile)
      ///

  //   new winston.transports.File(options.file),
  //  // new winston.transports.Console(options.console),
  //   new winston.transports.File(options.errorFile),
  //   new winston.transports.File(options.debugFile)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;