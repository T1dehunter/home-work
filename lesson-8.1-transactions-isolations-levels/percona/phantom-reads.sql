SET autocommit = 0;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;

# user 1
SELECT * FROM home_work_9.star_wars WHERE age BETWEEN 1 AND 999;

# user 2
INSERT INTO home_work_9.star_wars(name, age, weapon) VALUES ('Darth Vader', 42, 'red light saber');
COMMIT;

# user 1 see data from user 2 update
SELECT * FROM home_work_9.star_wars WHERE age BETWEEN 1 AND 999;
