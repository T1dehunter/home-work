BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- user 1
SELECT * FROM star_wars WHERE age BETWEEN 1 AND 999;

-- user 2
INSERT INTO star_wars(name, age, weapon) VALUES ('Darth Vader', 42, 'red light saber');
COMMIT;

-- user 1 see data from user 2 update
SELECT * FROM star_wars WHERE age BETWEEN 1 AND 999;
