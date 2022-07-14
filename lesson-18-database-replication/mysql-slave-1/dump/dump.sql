CREATE DATABASE IF NOT EXISTS `home-work-18`;

USE `home-work-18`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `birth_date` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- CHANGE MASTER TO MASTER_HOST='172.19.0.2', MASTER_USER='slave', MASTER_PASSWORD='password',
CHANGE MASTER TO MASTER_HOST='192.168.32.2', MASTER_USER='slave_1', MASTER_PASSWORD='password', MASTER_LOG_FILE = 'mysql-bin.000003', MASTER_LOG_POS = 157;

FLUSH PRIVILEGES;

START SLAVE;


