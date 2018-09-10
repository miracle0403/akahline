DELIMITER //
CREATE PROCEDURE feederAmount (user VARCHAR(255))
BEGIN
INSERT INTO earnings (user, amount) VALUES (user, 6000);
UPDATE user_tree SET stage1 = "yes" WHERE user = user;

END //
DELIMITER ;

CREATE TABLE pin( user VARCHAR(255) UNIQUE, serial text NOT NULL, pin varchar( 255 ) NOT NULL, date DATETIME)	;

CREATE TABLE `feeder_tree` (
	`matrix_id` INT(11) UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` VARCHAR(255) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
CREATE TABLE `stage1_tree` (
	`matrix_id` INT(11) UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL,
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`a` VARCHAR(255) NULL DEFAULT NULL,
	`b` VARCHAR(255) NULL DEFAULT NULL,
	`c` VARCHAR(255) NULL DEFAULT NULL,
	`d` VARCHAR(255) NULL DEFAULT NULL,
	`aa` VARCHAR(255) NULL DEFAULT NULL,
	`ab` VARCHAR(255) NULL DEFAULT NULL,
	`ac` VARCHAR(255) NULL DEFAULT NULL,
	`ad` VARCHAR(255) NULL DEFAULT NULL,
	`ba` VARCHAR(255) NULL DEFAULT NULL,
	`bb` VARCHAR(255) NULL DEFAULT NULL,
	`bc` VARCHAR(255) NULL DEFAULT NULL,
	`bd` VARCHAR(255) NULL DEFAULT NULL,
	`ca` VARCHAR(255) NULL DEFAULT NULL,
	`cb` VARCHAR(255) NULL DEFAULT NULL,
	`cc` VARCHAR(255) NULL DEFAULT NULL,
	`cd` VARCHAR(255) NULL DEFAULT NULL,
	`da` VARCHAR(255) NULL DEFAULT NULL,
	`db` VARCHAR(255) NULL DEFAULT NULL,
	`dc` VARCHAR(255) NULL DEFAULT NULL,
	`dd` VARCHAR(255) NULL DEFAULT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TABLE `feeder` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);

CREATE TABLE `stage1` (
	`user` VARCHAR(255)NOT NULL,
	`amount` INT(11) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL
);

DELIMITER //
CREATE PROCEDURE leafadd(sponsor VARCHAR(255), mother VARCHAR(255), child VARCHAR(255))
BEGIN

SELECT @myLeft := lft FROM feeder WHERE user = mother;
INSERT INTO feeder_tree (sponsor, user) VALUES (sponsor, child);

UPDATE feeder SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE feeder SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE feeder SET amount = amount + 1 WHERE user = mother;
UPDATE user_tree SET feeder = 'yes' WHERE user = child;

INSERT INTO feeder(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);

END //
DELIMITER ;

drop procedure feedercall;
DELIMITER //
CREATE PROCEDURE feedercall (user VARCHAR(255))
BEGIN

SELECT parent.user FROM user_tree AS node, user_tree AS parent WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.user = user AND parent.feeder is not null ORDER BY parent.lft;

END //
DELIMITER ;


CREATE TABLE `earnings` (
	`user` VARCHAR(255) NOT NULL,
	`feeder` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`stage1` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`stage2` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`stage3` INT(11) UNSIGNED ZEROFILL NOT NULL,
		`stage4` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`powerbank` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`phone` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`laptop` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`leadership` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`empower` INT(11) UNSIGNED ZEROFILL NOT NULL,
	`salary` INT(11) UNSIGNED ZEROFILL NOT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

drop table user;
CREATE TABLE user( user_id INT( 11 ) UNIQUE PRIMARY KEY AUTO_INCREMENT NOT NULL, sponsor text,  username varchar( 255 ) UNIQUE NOT NULL, full_name varchar ( 255 ) NOT NULL, verification text, status text, email varchar ( 255 ) UNIQUE NOT NULL, phone VARCHAR(255) NOT NULL, code INT( 11 ) NOT NULL, password varchar( 255 ) NOT NULL, paid varchar( 255 ))	;

CREATE TABLE `profile` (
	`user` INT(11) NOT NULL,
	`bank` TEXT NOT NULL,
	`account_name` TEXT NOT NULL,
	`account_number` VARCHAR(255) NOT NULL
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

DELIMITER //
CREATE PROCEDURE `register`( sponsor TEXT, full_name VARCHAR( 255 ), phone VARCHAR( 255 ), code INT( 11 ), username VARCHAR( 255 ), email VARCHAR ( 255 ), password VARCHAR( 255 ), status VARCHAR( 255 ), verification TEXT)                                 
 BEGIN

SELECT @myLeft := lft FROM user_tree WHERE user = sponsor;

UPDATE user_tree SET rgt = rgt + 2 WHERE rgt > @myLeft;

UPDATE user_tree SET lft = lft + 2 WHERE lft > @myLeft;

INSERT INTO user_tree(user, rgt, lft) VALUES(username, @myLeft + 2, @myLeft + 1);

INSERT INTO user (sponsor, full_name, phone, code, username, email, password, status, verification) VALUES ( sponsor, full_name, phone,code, username, email, password, 'active', 'no');

END//
DELIMITER ;

CREATE TABLE `user_tree` (
	`sponsor` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`lft` INT(11) NOT NULL,
	`rgt` INT(11) NOT NULL,
	`feeder` VARCHAR(255)  NULL,
	`stage1` VARCHAR(255)  NULL,
	`stage2` VARCHAR(255)  NULL,
	`stage3` VARCHAR(255)  NULL,
	`stage4` VARCHAR(255)  NULL
	
);

DELIMITER //
CREATE PROCEDURE stage1in(sponsor INT(11), mother INT(11), child INT(11))
BEGIN
SELECT @myLeft := lft FROM stage1 WHERE user = mother;
INSERT INTO stage1_tree (sponsor, user) VALUES (sponsor, child);
UPDATE sttage1 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage1 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage1 SET amount = amount + 1 WHERE user = mother;
UPDATE user_tree SET stage1 =  'yes' WHERE user = child;

INSERT INTO stage1(user, lft, rgt) VALUES(child, @myLeft + 1, @myLeft + 2);

END //
DELIMITER ;