const Article = require('../models/articles');

const createArticle = function (data, cb) {
    try {
        const artcl = new Article(data);
        artcl.save(cb);
    } catch (err) {
        cb(err);
    }
}

const getArticleById = function(id, cb){
    Article.findById(id, cb).sort({created_on: -1});
}

const findArticle = function (tags, cb){
    if(Array.isArray(tags)){
        Article.find({tags: tags},cb).sort({created_on: -1});
    } else {
        cb(new Error("Expecting array but got ".concat(typeof tags)));
    }
}

const listArticles = function(cb){
    Article.find(cb).sort({created_on: -1});
}

module.exports = {
    listArticles,
    findArticle,
    getArticleById,
    createArticle
}