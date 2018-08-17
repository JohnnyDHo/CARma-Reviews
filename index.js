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

app.get('/scrape', function(req, res){

    url = 'https://www.caranddriver.com/toyota/camry';

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var verdicts;
            var json = {verdicts: ""};

            $('.embedded-highs-and-lows').filter(function () {
                var data = $(this);
                verdicts = data.find('.text-nero');

                json.verdicts = verdicts;
            })
        }

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {

            console.log('File successfully written! - Check your project directory for the output.json file');

        })
    })
})

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.listen(PORT, function() {
    console.log('Running on http://localhost:' + PORT);
});


