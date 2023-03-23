CREATE DATABASE IF NOT EXISTS nodedb;
CREATE TABLE IF NOT EXISTS `nodedb`.`people` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL  
);

DELIMITER$$
BEGIN
   
   IF NOT EXISTS (SELECT  NULL FROM people) THEN
     INSERT INTO people (name) values ('FullCycles Rocks!');
     COMMIT;
   END IF;

END$$
DELIMITER;