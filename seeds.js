const mongoose = require('mongoose');

const Quote = require('./models/quotes');

mongoose.connect('mongodb://localhost:27017/quoteIt', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


const seedQuotes = [
    {
        author: "Pete",
        quote: "I love this thing so much",
    },
    {
        author: "Luke",
        quote: "I love lego",
    },
    {
        author: "Charles",
        quote: "Media team lmao",
    },
    {
        author: "Tim",
        quote: "Bing bong",
    }
]

Quote.insertMany(seedQuotes)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })