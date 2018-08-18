var axios = require('axios');
var cheerio = require('cheerio');
var fs = require('fs');

axios.get('https://cars.usnews.com/cars-trucks/toyota/camry')
    .then((response) => {
        if(response.status === 200) {
            var html = response.data;
            let $ = cheerio.load(html);
            var verdict = [];
            var other = [];
            var reliability = [];
            var ranking = [];
            var awards = [];
            $('.scorecard__overall-score-container').each(function(i, elem) {
                verdict[i] = {
                    overall: $(this).children('.scorecard__score-label').text() + ': ' + $(this).children('.scorecard__score').text()
                }
            });
            $('.clearfix').each(function(i, elem) {
                other[i] = {
                    others: $(this).children('.float-left').text().trim() + ' ' + $(this).children('.float-right').text().trim()
                }
            });
            $('.reliability-row').each(function(i, elem) {
                reliability[i] = {
                    reliability: $(this).children('.inline-block').text() + ' ' + $(this).children('.display-block').children('a').children('.float-left').attr('alt')
                }
            });
            $('.rankings__item').each(function(i, elem) {
                ranking[i] = {
                    ranking: $(this).children('span').text() + " " + $(this).children('a').text()
                }
            });
            $('.awards__item').each(function(i, elem) {
                awards[i] = {
                    award: $(this).text()
                }
            });
            var combined = verdict.concat(other, reliability, ranking, awards);
            fs.writeFile('data/us-news.json',
                JSON.stringify(combined, null, 4), (err)=>{
                    console.log('File successfully written!');
                })
        }
    }, (error) => console.log(error));
