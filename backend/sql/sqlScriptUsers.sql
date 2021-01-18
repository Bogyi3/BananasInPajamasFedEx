CREATE DATABASE fedex_challenge;
use fedex_challenge;

CREATE TABLE users (	
	user_id int primary key auto_increment,
	username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
   	first_name varchar(255) NOT NULL,
   	last_name varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
    user_type varchar(100) default 'regular', 
    user_xp int default 0
);
