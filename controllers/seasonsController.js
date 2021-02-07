const router = require('express').Router();
const Season = require('../models/season');
const { getSeasonErrors } = require('./utils/repopulateFunctions');

router.get('/', async (req, res, next) => {
    res.sendStatus(200);
});

router.get('/repopulate', async (req, res, next) => {
    const seasons = [2020];

    try {
        const data = await getSeasonErrors(2020);
        data ? res.json(data) : next(new Error('something went wrong'));
    } catch (error) {
        next(error);
    }
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
