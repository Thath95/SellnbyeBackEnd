const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Book', BookSchema);