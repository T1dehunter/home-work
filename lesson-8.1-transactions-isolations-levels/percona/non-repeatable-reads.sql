SET autocommit = 0;

SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;

# user 1
SELECT age FROM home_work_9.star_wars WHERE id = 1;

# user 2
UPDATE home_work_9.star_wars SET age = 905 WHERE id = 1;
COMMIT;

# user 1 see data from user 2 update
SELECT age FROM home_work_9.star_wars WHERE id = 1;