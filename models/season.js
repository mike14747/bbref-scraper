const pool = require('../config/connectionPool.js').getDb();

const Season = {
    getDataBySeason: async (season) => {
        const queryString = 'SELECT season_id, season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf FROM seasons WHERE season=? LIMIT 1;';
        const queryParams = [season];
        return await pool.query(queryString, queryParams)
            .then(([rows]) => [rows, null])
            .catch((error) => [null, error]);
    },
    addNewData: async (seasonsArr = []) => {
        if (seasonsArr.length > 0) {
            const queryString = 'TRUNCATE TABLE seasons;INSERT INTO seasons (season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf) VALUES ?;';
            const queryParams = [seasonsArr];
            return await pool.query(queryString, queryParams)
                .then(([rows]) => [rows, null])
                .catch((error) => [null, error]);
        } else {
            return [[[], { affectedRows: 0 }], null];
        }
    },
};

module.exports = Season;

// TRUNCATE TABLE seasons;INSERT INTO seasons (season, innings, errors_p, errors_c, errors_1b, errors_2b, errors_3b, errors_ss, errors_lf, errors_cf, errors_rf) VALUES (1990, 37563.67, 355, 306, 315, 359, 664, 607, 198, 180, 196);
// 1990, 37563.67, 355, 306, 315, 359, 664, 607, 198, 180, 196
