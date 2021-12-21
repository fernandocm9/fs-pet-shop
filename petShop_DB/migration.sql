DROP DATABASE IF EXISTS petshop;
CREATE DATABASE petshop;

DROP TABLE IF EXISTS pets;
CREATE TABLE pets(
    id serial PRIMARY KEY,
    age integer NOT NULL,
    kind varchar(20) NOT NULL,
    name varchar(20) NOT NULL
);

INSERT INTO pets (age, kind, name) VALUES (5, 'dog', 'woof');
INSERT INTO pets (age, kind, name) VALUES (10, 'bear', 'biggy');
INSERT INTO pets (age, kind, name) VALUES (20, 'cat', 'jeff');
INSERT INTO pets (age, kind, name) VALUES (23, 'wolf', 'doug');
INSERT INTO pets (age, kind, name) VALUES (19, 'rabbit', 'carol');
