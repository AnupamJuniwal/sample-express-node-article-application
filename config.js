module.exports = {
    prod: {
        logger: {
            dir: "logs/",
            name: "sample-article-app",
            level: "INFO",
            appender: {
                name: "ARTICLE_APP",
                type: 'file',
                maxLogSize: 104857600,
                backups: 10,
                compress: true
            },
            append_on_stdout: false
        },
        db: {
            username: "admin",
            password: "Demo123",
            host: "ds141198.mlab.com",
            port: 41198,
            db: "article-demo-app",
            options: {
                useNewUrlParser: true
            },
            RECONNECT_CHECK_INTERVAL: 300000
        },
        SERVER_PORT: 80
    },
    dev: {
        logger: {
            dir: "logs/",
            name: "sample-article-app",
            level: "DEBUG",
            appender: {
                name: "ARTICLE_APP_DEV",
                type: 'file',
                maxLogSize: 1048576000,
                backups: 2,
                compress: true
            },
            append_on_stdout: true
        },
        db: {
            username: "admin",
            password: "Demo123",
            host: "ds141198.mlab.com",
            port: 41198,
            db: "article-demo-app",
            options: {
                useNewUrlParser: true
            },
            RECONNECT_CHECK_INTERVAL: 300000
        },
        SERVER_PORT: 3000
    },

}