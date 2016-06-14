var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.get('/', function(request, response) {
    response.send("Hello!");
})

app.get('/books', function(request, response) {
    Book.find({}).exec(function(err, books) {
        if (err)
            console.log(err);
        response.json(books);
    });
});

app.get('/books/:id', function(request, response) {

    Book.findOne({
        _id: request.params.id
    }).exec(function(err, book) {
        if (err)
            console.log(err);
        response.json(book);
    });

});

app.post('/books', function(request, response) {

    var newBook = new Book();

    newBook.title = request.body.title;
    newBook.author = request.body.author;
    newBook.category = request.body.category;
    console.log(newBook);

    newBook.save(function(err, book) {
        if (err)
            console.log(err);
        response.send(book);
    });


});

app.post('/books2', function(request, response) {
    Book.create(request.body, function(err, book) {
        if (err)
            console.log(err);
        response.json(book);
    });

});

app.put('/book/:id', function(request, response) {

    Book.findOneAndUpdate({
            _id: request.params.id
        }, {
            $set: { title: request.body.title }
        }, { upsert: true },
        function(err, newBook) {
            if (err)
                console.log(err);

            response.json(newBook);

        });


});

app.delete('/book/:id', function(request, response) {

    Book.findOneAndRemove({ _id: request.params.id }, function(err, book) {
        if (err)
            console.log(err);

        response.json(book);
    });


});



app.listen(PORT, function() {
    console.log("Server running at", PORT);
});
