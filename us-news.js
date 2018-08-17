var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');

axios.get('https://cars.usnews.com/cars-trucks/toyota/camry')
    .then((response) => {
        if(response.status === 200) {
            var html = response.data;
            let $ = cheerio.load(html);
            var verdict = [];
            $('.scorecard__overall-score-container').each(function(i, elem) {

                verdict[i] = {
                    verdicts: $(this).children('.scorecard__score').text(),
                    texts: $(this).children('.scorecard__score-label').text()
                }
            });
            fs.writeFile('data/us-news.json',
                JSON.stringify(verdict, null, 4), (err)=>{
                    console.log('File successfully written!');
                })
        }
    }, (error) => console.log(error));
