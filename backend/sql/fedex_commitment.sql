
DROP TABLE IF EXISTS `commitments`;

CREATE TABLE `commitments` (
  `commitment_id` int NOT NULL AUTO_INCREMENT,
  `commitment_name` varchar(255) NOT NULL,
  `challenge_id` int NOT NULL,
  `xp` int NOT NULL,
  PRIMARY KEY (`commitment_id`)
) 