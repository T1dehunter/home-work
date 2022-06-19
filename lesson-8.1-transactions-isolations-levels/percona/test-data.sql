SHOW DATABASES;

CREATE DATABASE IF NOT EXISTS home_work_9;

# DROP TABLE home_work_9.sta;

CREATE TABLE home_work_9.star_wars(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255), age INT, weapon varchar(255));

INSERT INTO home_work_9.star_wars SET name = 'Master Yoda', age = 900, weapon = 'lightSaber'