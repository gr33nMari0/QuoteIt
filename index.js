const express = require('express');
const app = express();
const path = require('path');
const port = 80;
const localIPAddress = "192.168.1.11";
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const activeDB = "Quote";

const Quote = require(`./models/QuotesModel`);


mongoose.connect('mongodb://localhost:27017/quoteIt', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const authors = [];

// app.use('/', (req, res) => {
//     const authors = updateAuthors();
// });

async function updateAuthors() {
    const authorQuery = await Quote.find({}, { _id: 0, author: 1 });
    // console.log("===== authorQuery: ======")
    // console.log(authorQuery)
    const authors = [];
    for (let authorObj of authorQuery) {
        // console.log("===== authors: ======")
        // console.log(authors)
        // console.log("===== authorObj: ======")
        // console.log(authorObj)
        if (!authors.includes(authorObj.author[0])) {
            authors.push(authorObj.author[0])
        }
    }
    // console.log(authors);
    return authors;
}

app.get('/', async (req, res) => {
    const quotes = await Quote.find({})
    const authors = await updateAuthors();
    const pageTitle = "QuoteIt! Homepage";
    res.render('quotes/index', { pageTitle, quotes, authors })
})

app.get('/about', (req, res) => {
    const pageTitle = "About";
    res.render('about/about', { pageTitle, authors })
})

app.get('/quotes', async (req, res) => {
    const authors = await updateAuthors();
    const { author, tags } = req.query;
    const pageTitle = "View Quotes";
    if (author) {
        const quotes = await Quote.find({ author })
        res.render('quotes/quotes', { pageTitle, quotes, authors, author, tags: "" })
    } else if (tags) {
        const quotes = await Quote.find({ tags })
        res.render('quotes/quotes', { pageTitle, quotes, authors, author: "", tags })
    } else {
        const quotes = await Quote.find({})
        res.render('quotes/quotes', { pageTitle, quotes, authors, author: 'Everyone' })
    }
})

app.get('/quotes/new', async (req, res) => {
    const authors = await updateAuthors();
    const pageTitle = "New Quote";
    res.render('quotes/new', { pageTitle, authors })
})

app.post('/quotes', async (req, res) => {
    // console.log("Post request received")
    const authors = await updateAuthors();
    responseBody = req.body;

    // Handle Multiple Tags (Comma Separated)
    responseBody.tags = responseBody.tags.split(',');
    for (let i = 0; i < responseBody.tags.length; i++) {
        responseBody.tags[i] = responseBody.tags[i].trim();
    }

    // Handle Multiple Authors (Comma Separated)
    responseBody.author = responseBody.author.split(',');
    for (let i = 0; i < responseBody.author.length; i++) {
        responseBody.author[i] = responseBody.author[i].trim();
    }

    // Handle date
    if (req.body.date === "") {
        let now = new Date();
        req.body.date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    }
    if (req.body.date.toLowerCase() === "today") {
        let now = new Date();
        req.body.date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    }
    const newQuote = new Quote(responseBody);
    await newQuote.save();
    // console.log(newQuote._id)
    res.redirect(`/quotes/${newQuote._id}`)
})

app.get('/quotes/:id', async (req, res) => {
    const authors = await updateAuthors();
    const { id } = req.params;
    const quote = await Quote.findById(id)

    if (quote.author.length === 1) {
        tempAuthor = quote.author;
    } else {
        tempAuthor = quote.author.join(", ");
    }
    const pageTitle = `Quote by ${tempAuthor}`;
    res.render('quotes/show', { pageTitle, quote, authors })
})

app.get('/quotes/:id/edit', async (req, res) => {
    const pageTitle = "Edit Quote";
    const authors = await updateAuthors();
    const { id } = req.params;
    const quote = await Quote.findById(id);
    res.render('quotes/edit', { pageTitle, quote, authors })
})

app.put('/quotes/:id', async (req, res) => {
    if (req.body.author === "New Author") {
        req.body.author = req.body.newAuthor;
        delete req.body.newAuthor;
    } else {
        delete req.body.newAuthor;
    }
    const { id } = req.params;
    const quote = await Quote.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/quotes/${quote._id}`);
})

app.delete('/quotes/:id', async (req, res) => {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    res.redirect('/quotes');
})

app.listen(port, localIPAddress, () => {
    console.log(`App is listening on Localhost and IP Address ${localIPAddress}, on port ${port}.`)
})