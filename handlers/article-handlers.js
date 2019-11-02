const Article = require('../models/articles');

const createArticle = function(data, cb) {
    try {
        const artcl = new Article(data);
        artcl.save(cb);
    } catch (err) {
        cb(err);
    }
}

const getArticleById = function(id, cb) {
    Article.findById(id, cb);
}

const findArticle = function(tags, cb) {
    if (Array.isArray(tags)) {
        Article.find({ tags: tags }, cb)
            .sort({ up_votes: -1, created_on: -1, down_votes: 1 })
            .select("_id title created_on up_votes");
    } else {
        cb(new Error("Expecting array but got ".concat(typeof tags)));
    }
}

const listArticles = function(cb) {
    Article.find(cb)
        .sort({ up_votes: -1, created_on: -1, down_votes: 1 })
        .select("_id title created_on up_votes");
}

const vote = function(id, like, cb) {
    Article.findById(id, function(err, doc) {
        if (err) {
            cb(err);
        } else if (doc) {
            if (like) {
                doc.up_votes += 1;
            } else {
                doc.down_votes += 1;
            }
            doc.save(cb);
        } else {
            cb(new Error("Invalid article ID!"));
        }
    });
}



module.exports = {
    listArticles,
    findArticle,
    getArticleById,
    createArticle,
    vote
}