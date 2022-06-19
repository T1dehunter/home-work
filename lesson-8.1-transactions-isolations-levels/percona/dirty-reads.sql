SET autocommit = 0;

SHOW DATABASES;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;

# user 1
SELECT age FROM home_work_9.star_wars WHERE id = 1;

# user 2
UPDATE home_work_9.star_wars SET age = 905 WHERE id = 1;

# user 1 see data from user 2 update
SELECT age FROM home_work_9.star_wars WHERE id = 1;