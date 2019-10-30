'use strict'

const log4js = require('log4js');
const config = require('./config')[process.env.APP_ENV ? process.env.APP_ENV : "dev"].logger;

let logger = undefined;

/**
 * Initializes the logger appenders.
 * 
 */
function initialize() {
    const logFileName = config.dir.concat(config.name).concat('.log');
    let appenders = {}
    appenders[config.appender.name] = {
        type: config.appender.type,
        filename: logFileName,
        maxLogSize: config.appender.maxLogSize,
        backups: config.appender.backups,
        compress: config.appender.compress
    }
    
    let categories =  { default: { appenders: [config.appender.name], level: config.level }};
    
    
    if(config.append_on_stdout){
        appenders["STDOUT"] = {
            type: 'stdout',
        }
        categories.default.appenders.push("STDOUT");
    }



    log4js.configure({
        appenders: appenders,
        categories: categories
    });
}

/**
 * sets the logging level of current instance.
 * @param {String} level 
 */
function setLevel(level = "info") {
    if (logger) {
        logger.level = level;
    } else {
        throw new Error("Loggers Not yet Initialized!");
    }
}

/**
 * get the logging level of current instance.
 */
function getLevel() {
    if (logger) {
        return logger.level
    } else {
        throw new Error("Loggers Not yet Initialized!");
    }
}

/**
 * Returns an instance of Loggers.
 * Initializes an instace if not instance is 
 * already made.
 */
function getLogger() {
    if (!logger) {
        try{
            initialize();
            logger = log4js.getLogger(config.name);
        } catch(err){
            console.error("Unable to initialize logger, using console for logging!", err);
            logger = console;
        }
    }
    return logger;
}

module.exports = {
    getLogger,
    setLevel,
    getLevel
}