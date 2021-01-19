
DROP TABLE IF EXISTS `challenges`;

CREATE TABLE `challenges` (
  `challenge_id` int NOT NULL AUTO_INCREMENT,
  `challenge_name` varchar(255) NOT NULL,
  `starting_date` date NOT NULL,
  `closing_date` date NOT NULL,
  `min_xp` int NOT NULL,
  PRIMARY KEY (`challenge_id`)
) 