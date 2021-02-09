DROP DATABASE IF EXISTS `bbref_scraper_db`;
CREATE DATABASE `bbref_scraper_db`;
USE `bbref_scraper_db`;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE `position_errors` (
    `id` int unsigned NOT NULL AUTO_INCREMENT,
    `season` int unsigned NOT NULL,
    `innings` decimal(7,2) NOT NULL,
    `errors_p` int unsigned NOT NULL,
    `errors_c` int unsigned NOT NULL,
    `errors_1b` int unsigned NOT NULL,
    `errors_2b` int unsigned NOT NULL,
    `errors_3b` int unsigned NOT NULL,
    `errors_ss` int unsigned NOT NULL,
    `errors_lf` int unsigned NOT NULL,
    `errors_cf` int unsigned NOT NULL,
    `errors_rf` int unsigned NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

-- --------------------------------------------------------

set foreign_key_checks=1;
