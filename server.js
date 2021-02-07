require('dotenv').config();
const { PORT } = process.env;

const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/repopulate', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/repopulate.html'));
});

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/view.html'));
});

const { dbTest } = require('./config/connectionPool');

app.use(require('./controllers/testController'));

dbTest()
    .then(() => {
        app.use('/api/test', require('./controllers/testController'));
        app.use('/api', require('./controllers'));
    })
    .catch((error) => {
        app.get('/api/*', (req, res) => {
            res.status(500).json({ message: 'An error occurred connecting to the database! ' + error.message });
        });
    });

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));

module.exports = app;
