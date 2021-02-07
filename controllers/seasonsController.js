const router = require('express').Router();
const Season = require('../models/season');
const { getSeasonErrors } = require('./utils/repopulateFunctions');

router.get('/', async (req, res, next) => {
    res.sendStatus(200);
});

router.get('/repopulate', async (req, res, next) => {
    const startingSeason = 1990;
    const endingSeason = 2020;
    const seasonsArr = [];

    try {
        for (let i = startingSeason; i <= endingSeason; i++) {
            const seasonData = await getSeasonErrors(i);
            seasonsArr.push(seasonData);
        }
        const [data, error] = await Season.addNewData(seasonsArr);
        data ? res.status(201).json({ message: `Successfully added ${data[1].affectedRows} new season of errors row(s) to the database!`, added: data[1].affectedRows }) : next(error);
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
