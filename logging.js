var config = require('./config/config');
var winston = require('winston');
var expressWinston = require('express-winston');

var logger = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      name: 'info',
      filename: 'logFiles/info.log',
      level: 'info',
    }),
    new(winston.transports.File)({
      name: 'debug',
      filename: 'logFiles/debug.log',
      level: 'debug',
    }),
    new(winston.transports.File)({
      name: 'error',
      filename: 'logFiles/error.log',
      level: 'error',
      handleExceptions: true,
      humanReadableUnhandledException: true,
    }),
    new(winston.transports.Console)({
      name: 'console',
      level: config.server.loggerLevel,
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
    })
  ]
});

logger.handleExceptions(new winston.transports.File({
  filename: 'logFiles/exceptions.log'
}));

logger.logException = true;

logger.addExpressApp = function(app) {

  app.use(expressWinston.logger({
    winstonInstance: logger.transports.info,
    meta: false,
    expressFormat: true,
    handleExceptions: true,
    humanReadableUnhandledException: true
  }));

  app.use(expressWinston.logger({
    transports: [new winston.transports.Console({ colorize: true, })],
    meta: false,
    expressFormat: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
  }));

  app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: 'logFiles/expressErrors.log'
      })
    ]
  }));
}

module.exports = logger;
