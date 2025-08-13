DELIMITER $$

DROP PROCEDURE IF EXISTS `authgetloginuser` $$

CREATE DEFINER=`avnadmin`@`%` PROCEDURE `authgetloginuser`(IN pemail VARCHAR(255))
BEGIN
    SELECT * 
    FROM user
    WHERE email = pemail 
    LIMIT 1;
END $$

DELIMITER ;
