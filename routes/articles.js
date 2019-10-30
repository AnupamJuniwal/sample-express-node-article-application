const { Router } = require('express');

const handler = require('../handlers/article-handlers');

const logger = undefined;
const articleRouter = new Router();

// get all
articleRouter.get('/', function (req, resp) {
    handler.listArticles(function (err, data) {
        if (err) {
            logger.error("Error Occured while listing all articles {}", err);
            resp.json({
                success: false,
                error: err.message
            })

        } else {
            resp.json({
                success: true,
                data: data
            })
        }
    })
});

// search
articleRouter.get('/search', function (req, resp) {
    const tags = Array.prototype.slice.call(req.body.tags, 0, req.body.tags.length);
    handler.findArticle(tags, function (err, data) {
        if (err) {
            logger.error("Error Occured while finding articles {}", err);
            resp.json({
                success: false,
                error: err.message
            })

        } else {
            resp.json({
                success: true,
                data: data
            })
        }
    })
})


// get one
articleRouter.get('/get/:articleId', function () {
    handler.getArticleById(req.params.articleId, function (err, data) {
        if (err) {
            logger.error("Error Occured while fetching single article {}", err);
            resp.json({
                success: false,
                error: err.message
            })

        } else {
            resp.json({
                success: true,
                data: data
            })
        }
    })
})

// add
articleRouter.post('/add', function () {
    handler.createArticle(req.body, function (err, data) {
        if (err) {
            logger.error("Error Occured while adding article {}", err);
            resp.json({
                success: false,
                error: err.message
            })

        } else {
            resp.json({
                success: true,
                data: data
            })
        }
    })
})

module.exports = articleRouter;