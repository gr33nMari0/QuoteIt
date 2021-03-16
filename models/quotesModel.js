const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    author: {
        type: [String],
        required: true
    },
    quote: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    },
    tags: {
        type: [String],
        required: false
    }
})

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = Quote;