const app = require('express')();
const bodyParser = require('body-parser');
const { getLogger } = require('./logger');
const article_router = require('./routes/articles');
const config = require('./config')[process.env.APP_ENV ? process.env.APP_ENV : "dev"];
const { getMongoInstance } = require('./mongo-connection');

const logger = getLogger();
getMongoInstance();

app.use(function (req, resp, next) {
    req.getMongoConnection = getMongoInstance;
    req.getLogger = getLogger;
    next();
})


app.use(bodyParser.json());

app.get('/home', function (req, resp) {
    resp.sendFile('views/dest/index.js');
});

app.use('/articles', article_router);

// app.get('/',function(req,res){
//     res.send("Hello")
// })

app.listen(config.SERVER_PORT, function (err) {
    if (err) {
        logger.error("Error while starting up application, {}", err)
    } else {
        logger.info("Application started at ", config.SERVER_PORT);
    }
})