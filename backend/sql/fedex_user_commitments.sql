CREATE TABLE user_commitments (	
	id int primary key auto_increment,
	user_id int NOT NULL,
    commitment_id int NOT NULL,
   	challenge_day int NOT NULL,
   	completed boolean default false
);