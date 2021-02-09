const router = require('express').Router();
const Errors = require('../models/errors');
const { getSeasonErrors } = require('./utils/errorsFunctions');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Errors.getErrorsForAllSeasons();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/all-seasons', async (req, res, next) => {
    const startingSeason = 1916; // 1916 is the oldest year for data
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
            if (!seasonData) return res.status(400).json({ message: `Data for the ${i} season could not be found.` });
            seasonsArr.push(seasonData);
        }
        const [data, error] = await Errors.addNewErrorsData(seasonsArr);
        const diff = process.hrtime(time);
        data ? res.status(201).json({ message: `Successfully added ${data[1].affectedRows} new season(s) of errors row(s) to the database in ${((diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC).toFixed(2)} seconds!` }) : next(error);
    } catch (error) {
        next(error);
    }
});

router.post('/season', async (req, res, next) => {
    if (typeof (parseInt(req.body.season)) !== 'number' || req.body.season < 1916 || req.body.season > new Date().getFullYear()) return res.status(400).json({ message: 'The transmitted season must be a number, at least 1916 and not greater than the current year.' });

    const seasonsArr = [];

    try {
        const NS_PER_SEC = 1e9;
        const time = process.hrtime();

        const [seasonExistsData, seasonExistsError] = await Errors.getErrorsBySeason(req.body.season);
        if (seasonExistsError) next(seasonExistsError);
        if (seasonExistsData.length > 0) return res.status(400).json({ message: 'Data for the transmitted season is already in the database.' });

        const seasonData = await getSeasonErrors(req.body.season);
        if (!seasonData) return res.status(400).json({ message: 'Data for the transmitted season could not be found.' });
        seasonsArr.push(seasonData);

        const [data, error] = await Errors.addNewSingleSeasonErrorsData(seasonsArr);
        const diff = process.hrtime(time);
        data ? res.status(201).json({ message: `Successfully added ${data.affectedRows} new season(s) of errors row(s) to the database in ${((diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC).toFixed(2)} seconds!` }) : next(error);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
