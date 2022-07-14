USE home-work-18;

CREATE TABLE IF NOT EXIST `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `birth_date` double DEFAULT NULL,
  `age` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;