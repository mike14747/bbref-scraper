const router = require('express').Router();
const Season = require('../models/season');
const { getSeasonErrors } = require('./utils/repopulateFunctions');

router.get('/', async (req, res, next) => {
    res.sendStatus(200);
});

router.get('/repopulate', async (req, res, next) => {
    const startingSeason = 1916;
    const endingSeason = 2020;
    const seasonsArr = [];

    const MS_IN_TEN_MINUTES = 60 * 10 * 1000;
    res.setTimeout(MS_IN_TEN_MINUTES, () => {
        return res.status().json({ message: `The respond timed out at ${MS_IN_TEN_MINUTES} seconds.` });
    });

    try {
        const NS_PER_SEC = 1e9;
        const time = process.hrtime();
        for (let i = startingSeason; i <= endingSeason; i++) {
            const seasonData = await getSeasonErrors(i);
            seasonsArr.push(seasonData);
        }

        // res.status(299).json(seasonsArr);

        const [data, error] = await Season.addNewData(seasonsArr);
        const diff = process.hrtime(time);

        data ? res.status(201).json({ message: `Successfully added ${data[1].affectedRows} new season(s) of errors row(s) to the database in ${((diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC).toFixed(2)} seconds!`, added: data[1].affectedRows }) : next(error);
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
