BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- user 1
SELECT * FROM star_wars WHERE id = 1;

-- user 2
SELECT * FROM star_wars WHERE id = 1;

-- user 1
UPDATE star_wars SET weapon = 'green light saber' WHERE id = 1;

-- user 2
UPDATE star_wars SET weapon = 'red light saber' WHERE id = 1;

-- user 1
COMMIT;
SELECT * FROM star_wars WHERE id = 1;

-- user 2
COMMIT;
SELECT * FROM star_wars WHERE id = 1;