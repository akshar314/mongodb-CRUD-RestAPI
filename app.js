var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');
var PORT = 3000;
var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.get('/', function(request, response) {
    response.send("Hello!");
})

app.get('/books', function(request, response) {
    response.send("Hello!");
})

app.listen(PORT, function() {
    console.log("Server running at", PORT);
});
