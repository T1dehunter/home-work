BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- user 1
SELECT * FROM star_wars WHERE id = 1;

-- user 2
UPDATE star_wars SET age = 905 WHERE id = 1;
COMMIT;

-- user 1 see data from user 2 update
SELECT age FROM star_wars WHERE id = 1;