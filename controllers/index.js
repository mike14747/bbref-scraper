const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send('Sending this from the /api root!');
});

router.use('/errors', require('./errorsController'));

router.use((req, res, next) => {
    const error = new Error('API route not found!');
    error.status = 404;
    next(error);
});

router.use((error, req, res, next) => {
    if (error.isJoi) {
        return res.status(400).json({ message: 'An error occurred! ' + error });
    } else if (error instanceof RangeError) {
        return res.status(400).json({ message: 'An error occurred! ' + error });
    }
    res.status(error.status || 500);
    error.status === 404 ? res.json({ message: 'Page not found.' }) : res.json({ message: 'An error occurred! ' + error.message });
});

module.exports = router;
