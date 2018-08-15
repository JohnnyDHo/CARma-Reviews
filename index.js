var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 5000;
var app = express();
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

require('dotenv').config();



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(PORT, function() {
    console.log('Running on http://localhost:' + PORT);
});


