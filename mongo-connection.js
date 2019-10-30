const mongoose = require('mongoose');

mongoose.set('useUnifiedTopology', true);
const logger = require('./logger').getLogger();
const config = require('./config')[process.env.APP_ENV ? process.env.APP_ENV : "dev"].db;

const {
    COLON_SEPERATOR,
    MONGO_CRED_HOST_SEPERATOR,
    MONGO_PROTOCOL,
    SLASH
} = require('./constants');

const mongoURI = MONGO_PROTOCOL.concat(config.username).concat(COLON_SEPERATOR).concat(config.password)
    .concat(MONGO_CRED_HOST_SEPERATOR).concat(config.host).concat(COLON_SEPERATOR).concat(config.port)
    .concat(SLASH).concat(config.db);

let instance = undefined;
let retryFlag = false;


async function connect() {
    logger.info("Connecting to Mongo: ", mongoURI)
    try {
        const db = await mongoose.connect(mongoURI, config.options);
        logger.info("Connection to mongo successful!");
        return db;
    } catch (err) {
        logger.fatal("Unable to connect to mongo! {}", err);
        return null;
    }
}

mongoose.connection.on('disconnected', function () {
    if(!retryFlag){
        retryFlag = true;
    logger.info("Received mongo connection disconnected, trying reconnection!")
    try {
        connect();
        retryFlag = false;
    } catch (err) {
        logger.error("Error occured while trying to reconnect to mongo {}", err)
    }
}
})

setInterval(function (connect) {
    if (mongoose.connection.readyState === mongoose.Connection.STATES.disconnected) {
        logger.info("Detected mongo connection disconnected, trying reconnection!");
        try {
            connect();
        } catch (err) {
            logger.error("Error occured while trying to reconnect to mongo {}", err)
        }
    };
}, config.RECONNECT_CHECK_INTERVAL, connect);

const getMongoInstance = function () {
    if (!instance) {
        instance = connect();
        if (!instance) {
            throw new Error("Unable to connect to Mongo!");
        }
    }
    return instance;
}
module.exports = {
    getMongoInstance
}