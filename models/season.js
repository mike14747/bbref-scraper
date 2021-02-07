const pool = require('../config/connectionPool.js').getDb();

const Season = {
    getDataBySeason: async (season) => {
        const queryString = 'SELECT season_id, season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf FROM seasons WHERE season=? LIMIT 1;';
        const queryParams = [season];
        return await pool
            .query(queryString, queryParams)
            .then(([rows]) => [rows, null])
            .catch((error) => [null, error]);
    },
};

module.exports = Season;
