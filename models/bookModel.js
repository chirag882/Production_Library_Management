const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author:{
        type: String,
    },
    country:{
        type: String,
    },
    imageLink: {
        type: String,
    },
    language: {
        type: String,
    },
    pages: {
        type: String,
    },
    title:{
        type: String,
    },
    year: {
        type: Number,
    },
    page: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    genre: {
        type: String,
    },
});

const bookModel = mongoose.model('books', bookSchema)

module.exports = bookModel;