-- DROP DATABASE IF EXISTS burger_db;

-- CREATE DATABASE burger_db;
USE gcpq9icuqdb7cejh;

CREATE TABLE burgers
(
  id int NOT NULL AUTO_INCREMENT,
	burger_name VARCHAR(255) NOT NULL,
	burger_info VARCHAR(255),
	devoured BOOLEAN DEFAULT false,
	img_url VARCHAR(255),
	num_of_likes SMALLINT,
	PRIMARY KEY (id)
);
