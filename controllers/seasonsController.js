const router = require('express').Router();
const Season = require('../models/season');

const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', async (req, res, next) => {
    res.sendStatus(200);
});

router.get('/repopulate', async (req, res, next) => {
    const positions = ['p', 'c', '1b', '2b', '3b', 'ss', 'lf', 'cf', 'rf'];
    const seasons = [2020];

    const outputArray = seasons.map(s => {
        const seasonObj = {
            season: s,
            positions: [],
        };
        positions.forEach(p => {
            axios.get(`https://www.baseball-reference.com/leagues/MLB/${s}-specialpos_${p}-fielding.shtml`)
                .then(response => {
                    const $ = cheerio.load(response.data);
                    const innings = $('tfoot td[data-stat=Inn_def]').html();
                    const errors = $('tfoot td[data-stat=E_def]').html();
                    console.log({ position: p, innings, errors });
                    seasonObj.positions.push({ position: p, innings, errors });
                })
                .catch(error => console.log(error));
        });
        return seasonObj;
    });
    res.status(200).json(outputArray);
});

router.get('/:season', async (req, res, next) => {
    try {
        const [data, error] = await Season.getDataBySeason(req.params.season);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    res.sendStatus(201);
});

module.exports = router;
