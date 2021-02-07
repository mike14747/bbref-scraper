const axios = require('axios');
const cheerio = require('cheerio');

const positions = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];
const seasons = [2020];

const outputArray = seasons.map(s => {
    const seasonObj = {
        season: s,
    };
    positions.forEach(p => {
        axios.get(`https://www.baseball-reference.com/leagues/MLB/${s}-specialpos_${p}-fielding.shtml`)
            .then(response => {
                const $ = cheerio.load(response.data);
                $('td[data-stat=E_def]').html();
            })
            .catch(error => console.log(error));
    });
    return seasonObj;
});
