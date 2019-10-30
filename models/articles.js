const { Schema, SchemaTypes, model } = require('mongoose');
// const { getMongoInstance } = require('../mongo-connection').mongoClient;
const config = require('../config')[process.env.APP_ENV ? process.env.APP_ENV : "dev"].db;

const articleSchema = new Schema({
    publisher: {
        type: SchemaTypes.String,
        required: true
    },
    title: {
        type: SchemaTypes.String,
        required: true
    },
    content: {
        type: SchemaTypes.String,
        required: false
    },
    created_on: {
        type: SchemaTypes.Date,
        default: Date.now()
    },
    up_votes: {
        type: SchemaTypes.Number,
        default: 0
    },
    down_votes: {
        type: SchemaTypes.Number,
        default: 0
    },
    tags: {
        type: SchemaTypes.Array,
    }
});

module.exports = model("articles", articleSchema, config.db);
