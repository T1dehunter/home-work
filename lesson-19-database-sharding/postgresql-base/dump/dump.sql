CREATE TABLE books (
id bigint not null,
category_id  int_not_null,
author character varying not null,
title character varying not null,
year int not null )

CREATE RULE books_insert_to_category_1 AS ON INSERT TO books
WHERE ( category_id = 2 )
DO INSTEAD INSERT INTO books_1 VALUES (NEW.*);

CREATE RULE books_insert_to_category_2 AS ON INSERT TO books
WHERE ( category_id = 3 )
DO INSTEAD INSERT INTO books_2 VALUES (NEW.*);