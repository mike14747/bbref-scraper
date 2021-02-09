const pool = require('../config/connectionPool.js').getDb();

const Errors = {
    getErrorsBySeason: async (season) => {
        const queryString = 'SELECT id, season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf FROM position_errors WHERE season=? LIMIT 1;';
        const queryParams = [season];
        return await pool.query(queryString, queryParams)
            .then(([rows]) => [rows, null])
            .catch((error) => [null, error]);
    },
    getErrorsForAllSeasons: async (season) => {
        const queryString = 'SELECT id, season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf FROM position_errors ORDER BY season ASC;';
        const queryParams = [season];
        return await pool.query(queryString, queryParams)
            .then(([rows]) => [rows, null])
            .catch((error) => [null, error]);
    },
    addNewErrorsData: async (seasonsArr = []) => {
        if (seasonsArr.length > 0) {
            const queryString = 'TRUNCATE TABLE position_errors;INSERT INTO position_errors (season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf) VALUES ?;';
            const queryParams = [seasonsArr];
            return await pool.query(queryString, queryParams)
                .then(([rows]) => [rows, null])
                .catch((error) => [null, error]);
        } else {
            return [[[], { affectedRows: 0 }], null];
        }
    },
    addNewSingleSeasonErrorsData: async (seasonsArr = []) => {
        if (seasonsArr.length > 0) {
            const queryString = 'INSERT INTO position_errors (season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf) VALUES ?;';
            const queryParams = [seasonsArr];
            return await pool.query(queryString, queryParams)
                .then(([rows]) => [rows, null])
                .catch((error) => [null, error]);
        } else {
            return [[[], { affectedRows: 0 }], null];
        }
    },
};

module.exports = Errors;
