-- Active: 1730683703648@@127.0.0.1@5432@softjobs
CREATE DATABASE softjobs;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, role VARCHAR(25), language VARCHAR(20) );

SELECT * FROM usuarios;

DROP TABLE usuarios;