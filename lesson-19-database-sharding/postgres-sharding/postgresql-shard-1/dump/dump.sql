CREATE TABLE books (
id bigint not null,
category_id int not null CONSTRAINT category_id_check CHECK ( category_id = 2 ),
author character varying not null,
title character varying not null,
year int not null );

CREATE INDEX books_category_id_idx ON books USING btree(category_id);

CREATE EXTENSION postgres_fdw;

CREATE SERVER books_base FOREIGN DATA WRAPPER postgres_fdw OPTIONS(host '127.0.0.1', port '5432', dbname 'books');







