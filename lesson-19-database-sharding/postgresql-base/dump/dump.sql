CREATE TABLE books (
id bigint not null,
category_id int not null,
author character varying not null,
title character varying not null,
year int not null );

CREATE EXTENSION postgres_fdw;

CREATE SERVER books_1_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS(host '127.0.0.1', port '5432', dbname 'books_1');
CREATE SERVER books_2_server FOREIGN DATA WRAPPER postgres_fdw OPTIONS(host '127.0.0.1', port '5433', dbname 'books_2');

CREATE USER MAPPING FOR postgres SERVER books_1_server OPTIONS (user 'postgres', password 'postgres');
CREATE USER MAPPING FOR postgres SERVER books_2_server OPTIONS (user 'postgres', password 'postgres');

CREATE FOREIGN TABLE books_1 (
id bigint not null,
category_id int not null,
author character varying not null,
title character varying not null,
year int not null )
SERVER books_1_server
OPTIONS (schema_name 'public', table_name 'books');

CREATE FOREIGN TABLE books_2 (
id bigint not null,
category_id  int not null,
author character varying not null,
title character varying not null,
year int not null )
SERVER books_2_server
OPTIONS (schema_name 'public', table_name 'books');

CREATE VIEW books AS SELECT * FROM books_1 UNION ALL SELECT * FROM books_2;

CREATE RULE books_insert AS ON INSERT TO books DO INSTEAD NOTHING;
CREATE RULE books_update AS ON UPDATE TO books DO INSTEAD NOTHING;
CREATE RULE books_delete AS ON DELETE TO books DO INSTEAD NOTHING;

CREATE RULE books_insert_to_1 AS ON INSERT TO books WHERE ( category_id = 1 ) DO INSTEAD INSERT INTO books_1 VALUES (NEW.*);
CREATE RULE books_insert_to_2 AS ON INSERT TO books WHERE ( category_id = 2 ) DO INSTEAD INSERT INTO books_2 VALUES (NEW.*);





