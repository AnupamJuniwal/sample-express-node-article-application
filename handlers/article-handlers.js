const Article = require('../models/articles');
const { TAGS_MAX_LEN } = require('../constants')
const createArticle = function(data, cb) {
    if (data && data.tags && data.tags.length <= TAGS_MAX_LEN) {
        try {
            const artcl = new Article(data);
            artcl.save(cb);
        } catch (err) {
            cb(err);
        }
    } else {
        cb(new Error("Unexpected data!"));
    }
}

const getArticleById = function(id, cb) {
    Article.findById(id, cb);
}

const findArticle = function(tags, cb) {
    if (Array.isArray(tags) && tags.length <= TAGS_MAX_LEN) {
        Article.find({ tags: tags }, cb)
            .sort({ up_votes: -1, created_on: -1, down_votes: 1 })
            .select("_id title created_on up_votes");
    } else {
        cb(new Error("Unexpected search tags!"));
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