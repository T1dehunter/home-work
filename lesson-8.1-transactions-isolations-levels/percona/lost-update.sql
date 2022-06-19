SET autocommit = 0;

SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;

# user 1
SELECT * FROM home_work_9.star_wars WHERE id = 1;

# user 2
SELECT * FROM home_work_9.star_wars WHERE id = 1;

# user 1
UPDATE home_work_9.star_wars SET weapon = 'green light saber' WHERE id = 1;

# user 2
UPDATE home_work_9.star_wars SET weapon = 'red light saber' WHERE id = 1;

# user 1
COMMIT;
SELECT * FROM home_work_9.star_wars WHERE id = 1;

# user 2
COMMIT;
SELECT * FROM home_work_9.star_wars WHERE id = 1;