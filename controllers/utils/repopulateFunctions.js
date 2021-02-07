const axios = require('axios');
const cheerio = require('cheerio');

const positions = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];

const getSeasonErrors = async (season) => {
    try {
        let innings = 0;
        const allPositionErrors = await Promise.all(
            positions.map(async (p) => {
                const response = await axios.get(`https://www.baseball-reference.com/leagues/MLB/${season}-specialpos_${p}-fielding.shtml`);
                const $ = cheerio.load(response.data);
                innings = $('tfoot td[data-stat=Inn_def]').html();
                const errors = $('tfoot td[data-stat=E_def]').html();
                return errors ? parseInt(errors) : 0;
            }),
        );
        return innings ? [season, parseFloat(innings.replace(/.1/, '.33').replace(/.2/, '.67')), ...allPositionErrors] : null;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getSeasonErrors,
};
