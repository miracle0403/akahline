-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 09, 2018 at 02:16 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `new`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `feederAmount` (`user` VARCHAR(255))  BEGIN
INSERT INTO earnings (user, feeder, stage1, stage2, stage3, stage4, car, powerbank, phone, salary, laptop, empower, leadership) VALUES (user, 4000, 0, 0,0,0,0,0,0,0,0,0,0);

INSERT INTO transactions (user, credit, balance_bf, description, balance) VALUES (user, 4000, 0, 'feeder cash', 4000);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `leafadd` (`sponsor` VARCHAR(255), `mother` VARCHAR(255), `child` VARCHAR(255))  BEGIN

SELECT @myLeft := lft FROM feeder WHERE user = mother;
INSERT INTO feeder_tree (sponsor, user) VALUES (sponsor, child);

UPDATE feeder SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE feeder SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE feeder SET amount = amount + 1 WHERE user = mother;
UPDATE user_tree SET feeder = 'yes' WHERE user = child;

INSERT INTO feeder(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (`sponsor` TEXT, `full_name` VARCHAR(255), `phone` VARCHAR(255), `code` INT(11), `username` VARCHAR(255), `email` VARCHAR(255), `password` VARCHAR(255), `status` VARCHAR(255), `verification` TEXT)  BEGIN

SELECT @myLeft := lft FROM user_tree WHERE user = sponsor;

UPDATE user_tree SET rgt = rgt + 2 WHERE rgt > @myLeft;

UPDATE user_tree SET lft = lft + 2 WHERE lft > @myLeft;

INSERT INTO user_tree(sponsor, user, rgt, lft) VALUES(sponsor, username, @myLeft + 2, @myLeft + 1);

INSERT INTO user (sponsor, full_name, phone, code, username, email, password, status, verification) VALUES ( sponsor, full_name, phone,code, username, email, password, 'active', 'no');
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `stage1in` (`sponsor` VARCHAR(255), `mother` VARCHAR(255), `child` VARCHAR(255))  BEGIN
SELECT @myLeft := lft FROM stage1 WHERE user = mother;
UPDATE stage1 SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE stage1 SET lft = lft + 2 WHERE lft > @myLeft;
UPDATE stage1 SET amount = amount + 1 WHERE user = mother;
INSERT INTO stage1(user, lft, rgt, amount) VALUES(child, @myLeft + 1, @myLeft + 2, 0);
INSERT INTO stage1_tree ( sponsor, user) VALUES (sponsor, child);

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `earnings`
--

CREATE TABLE `earnings` (
  `user` varchar(255) NOT NULL,
  `feeder` int(11) NOT NULL,
  `stage1` int(11) NOT NULL,
  `stage2` int(11) NOT NULL,
  `stage3` int(11) NOT NULL,
  `stage4` int(11) NOT NULL,
  `powerbank` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `laptop` int(11) NOT NULL,
  `leadership` int(11) NOT NULL,
  `empower` int(11) NOT NULL,
  `salary` int(11) NOT NULL,
  `car` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `earnings`
--

INSERT INTO `earnings` (`user`, `feeder`, `stage1`, `stage2`, `stage3`, `stage4`, `powerbank`, `phone`, `laptop`, `leadership`, `empower`, `salary`, `car`) VALUES
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('chichichi1gtu', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('yeyuffrhyfkhf', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('gdfghdkhgdrjl', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('fdshyhjhfhynh', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('hjdshjdfhjdf', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('jgyfduhdfkjdf', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('hjfdhfhgg', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('bgvsdkhdsbhjfhjb', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('hhjugkfdhj', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
('ghfdsbhjdfj', 4000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `feeder`
--

CREATE TABLE `feeder` (
  `user` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeder`
--

INSERT INTO `feeder` (`user`, `amount`, `lft`, `rgt`) VALUES
('chichichichi', 3, 1, 170),
('chichichi1', 10, 6, 169),
('jgfvfdkjfghfcgh', 0, 4, 5),
('cvdeghhhhhh', 0, 2, 3),
('chichichi1gtu', 4, 133, 168),
('yeyuffrhyfkhf', 4, 95, 132),
('gdfghdkhgdrjl', 4, 57, 94),
('fdshyhjhfhynh', 4, 7, 42),
('fhdfkfdjukdfjk', 3, 160, 167),
('hdfkg@vhfb', 3, 124, 131),
('ghfgfdkjfdbhj', 3, 86, 93),
('hjdsjkdfsjzdfsk', 3, 34, 41),
('jfdkjzdfshdfs', 3, 152, 159),
('khvzdfskjdfk;ljdf', 3, 116, 123),
('hfdskdfkjdfkj', 3, 78, 85),
('gfcfxcjd', 3, 26, 33),
('vhjcfxhbdfjbkdf', 3, 144, 151),
('hhjugkfdhj', 4, 106, 115),
('ghfdsbhjdfj', 4, 68, 77),
('hjdshjdfhjdf', 4, 16, 25),
('bgvsdkhdsbhjfhjb', 4, 134, 143),
('jgyfduhdfkjdf', 4, 96, 105),
('hjfdhfhgg', 4, 58, 67),
('kgdsgdfsbhdfjb', 3, 8, 15),
('hdfsjdfjk', 0, 23, 24),
('jfdkjlfdl', 0, 141, 142),
('jkgdkjjkd', 0, 103, 104),
('jvjcvhjufdl', 0, 13, 14),
('hdfsjkdfh', 0, 165, 166),
('hjkfrhkufjfd', 0, 129, 130),
('hdfsjkdfhy', 0, 91, 92),
('khfdjdfkjl', 0, 39, 40),
('jfduhffd8ugf', 0, 157, 158),
('hudfiufduee', 0, 121, 122),
('hbdfsjkfdgt', 0, 83, 84),
('bhjufdhjdf', 0, 31, 32),
('gfchukfdhj', 0, 149, 150),
('bhfdjkcvffg', 0, 113, 114),
('khfjvchhj', 0, 75, 76),
('hudhjfduee', 0, 65, 66),
('jcxjfdjhjill', 0, 163, 164),
('hjkfdhjkfdfds', 0, 127, 128),
('dfsjuzcvfg', 0, 89, 90),
('hudfhfddfh', 0, 37, 38),
('ghkfhjfdk.y', 0, 155, 156),
('jvcxknldf@', 0, 119, 120),
('ghkchjfgf', 0, 81, 82),
('hjfdkjdfjk', 0, 29, 30),
('bhfdhjvffg', 0, 147, 148),
('hjbgfjfdjhfdhyu', 0, 111, 112),
('gfiugfugtf', 0, 73, 74),
('gyufdufdilhfd', 0, 21, 22),
('hyjdfshyjugfdkh', 0, 139, 140),
('gdsfgfdjhfrt', 0, 101, 102),
('hfdkfdukhfd', 0, 63, 64),
('jvcxknldhf@', 0, 11, 12),
('jDuiZyv7qU', 0, 137, 138),
('uidfgfrdgvdfk', 0, 117, 118),
('jhbgfdvgdfud', 0, 61, 62),
('dytfhylkjyugj', 0, 109, 110),
('dythhgtrlkjyugj', 0, 71, 72),
('yuigfrlkjyugj', 0, 19, 20),
('hjcxkjyugj', 0, 99, 100),
('kbdfbdxhjknjlojn', 0, 9, 10),
('ierytdehhiorej', 0, 161, 162),
('mghcvkhfkjdhfkl', 0, 125, 126),
('lohkjcfiug', 0, 87, 88),
('logjcfjgjk', 0, 35, 36),
('gdfhfdugtd', 0, 153, 154),
('uhhfidugtd', 0, 79, 80),
('kjhfhghfrgh', 0, 27, 28),
('kkjhkjcdfhdf', 0, 145, 146),
('nnbvllbgfol', 0, 97, 98),
('kfhdiuhdfh', 0, 59, 60),
('kj.fhdkhfhdhu', 0, 135, 136),
('kjgfhfhjgtgy', 0, 107, 108),
('khdhhfiu', 0, 69, 70);

-- --------------------------------------------------------

--
-- Table structure for table `feeder_tree`
--

CREATE TABLE `feeder_tree` (
  `matrix_id` int(11) NOT NULL,
  `sponsor` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `a` varchar(255) DEFAULT NULL,
  `b` varchar(255) DEFAULT NULL,
  `c` varchar(255) DEFAULT NULL,
  `d` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeder_tree`
--

INSERT INTO `feeder_tree` (`matrix_id`, `sponsor`, `user`, `a`, `b`, `c`, `d`) VALUES
(1, 'be', 'chichichichi', 'chichichi1', 'jgfvfdkjfghfcgh', 'cvdeghhhhhh', NULL),
(2, 'be', 'chichichi1', 'chichichi1gtu', 'yeyuffrhyfkhf', 'gdfghdkhgdrjl', 'fdshyhjhfhynh'),
(3, 'be', 'jgfvfdkjfghfcgh', NULL, NULL, NULL, NULL),
(4, 'be', 'cvdeghhhhhh', NULL, NULL, NULL, NULL),
(5, 'chichichichi', 'chichichi1gtu', 'fhdfkfdjukdfjk', 'jfdkjzdfshdfs', 'vhjcfxhbdfjbkdf', 'bgvsdkhdsbhjfhjb'),
(6, 'chichichichi', 'yeyuffrhyfkhf', 'hdfkg@vhfb', 'khvzdfskjdfk;ljdf', 'hhjugkfdhj', 'jgyfduhdfkjdf'),
(7, 'chichichichi', 'gdfghdkhgdrjl', 'ghfgfdkjfdbhj', 'hfdskdfkjdfkj', 'ghfdsbhjdfj', 'hjfdhfhgg'),
(8, 'chichichichi', 'khkgdhrgdffdu', NULL, NULL, NULL, NULL),
(9, 'chichichichi', 'khkgdhrgdffdd', NULL, NULL, NULL, NULL),
(10, 'chichichichi', 'ugdfnsdjudfu', NULL, NULL, NULL, NULL),
(11, 'chichichichi', 'hyfdhjufbgkjdfh', NULL, NULL, NULL, NULL),
(12, 'chichichichi', 'hjgdhgfklj', 'ghdfgkfjgdfkjlfd', NULL, NULL, NULL),
(13, 'chichichichi', 'yrhugfkjg', NULL, NULL, NULL, NULL),
(14, 'chichichichi', 'fdshyhjhfhynh', 'hjdsjkdfsjzdfsk', 'gfcfxcjd', 'hjdshjdfhjdf', 'kgdsgdfsbhdfjb'),
(15, 'chichichichi', 'fhdfkfdjukdfjk', 'hdfsjkdfh', 'jcxjfdjhjill', 'ierytdehhiorej', NULL),
(16, 'chichichichi', 'hdfkg@vhfb', 'hjkfrhkufjfd', 'hjkfdhjkfdfds', 'mghcvkhfkjdhfkl', NULL),
(17, 'chichichichi', 'ghfgfdkjfdbhj', 'hdfsjkdfhy', 'dfsjuzcvfg', 'lohkjcfiug', NULL),
(18, 'chichichichi', 'ghdfgkfjgdfkjlfd', NULL, NULL, NULL, NULL),
(19, 'chichichichi', 'hjdsjkdfsjzdfsk', 'khfdjdfkjl', 'hudfhfddfh', 'logjcfjgjk', NULL),
(20, 'chichichichi', 'jfdkjzdfshdfs', 'jfduhffd8ugf', 'ghkfhjfdk.y', 'gdfhfdugtd', NULL),
(21, 'chichichichi', 'khvzdfskjdfk;ljdf', 'hudfiufduee', 'jvcxknldf@', 'uidfgfrdgvdfk', NULL),
(22, 'chichichichi', 'hfdskdfkjdfkj', 'hbdfsjkfdgt', 'ghkchjfgf', 'uhhfidugtd', NULL),
(23, 'chichichichi', 'gfcfxcjd', 'bhjufdhjdf', 'hjfdkjdfjk', 'kjhfhghfrgh', NULL),
(24, 'chichichichi', 'vhjcfxhbdfjbkdf', 'gfchukfdhj', 'bhfdhjvffg', 'kkjhkjcdfhdf', NULL),
(25, 'chichichichi', 'hhjugkfdhj', 'bhfdjkcvffg', 'hjbgfjfdjhfdhyu', 'dytfhylkjyugj', 'kjgfhfhjgtgy'),
(26, 'chichichichi', 'ghfdsbhjdfj', 'khfjvchhj', 'gfiugfugtf', 'dythhgtrlkjyugj', 'khdhhfiu'),
(27, 'chichichichi', 'hjdshjdfhjdf', 'hdfsjdfjk', 'gyufdufdilhfd', 'yuigfrlkjyugj', NULL),
(28, 'chichichichi', 'bgvsdkhdsbhjfhjb', 'jfdkjlfdl', 'hyjdfshyjugfdkh', 'jDuiZyv7qU', 'kj.fhdkhfhdhu'),
(29, 'chichichichi', 'jgyfduhdfkjdf', 'jkgdkjjkd', 'gdsfgfdjhfrt', 'hjcxkjyugj', 'nnbvllbgfol'),
(30, 'chichichichi', 'hjfdhfhgg', 'hudhjfduee', 'hfdkfdukhfd', 'jhbgfdvgdfud', 'kfhdiuhdfh'),
(31, 'chichichichi', 'kgdsgdfsbhdfjb', 'jvjcvhjufdl', 'jvcxknldhf@', 'kbdfbdxhjknjlojn', NULL),
(32, 'chichichichi', 'hdfsjdfjk', NULL, NULL, NULL, NULL),
(33, 'chichichichi', 'jfdkjlfdl', NULL, NULL, NULL, NULL),
(34, 'chichichichi', 'jkgdkjjkd', NULL, NULL, NULL, NULL),
(35, 'chichichichi', 'jvjcvhjufdl', NULL, NULL, NULL, NULL),
(36, 'chichichichi', 'hdfsjkdfh', NULL, NULL, NULL, NULL),
(37, 'chichichichi', 'hjkfrhkufjfd', NULL, NULL, NULL, NULL),
(38, 'chichichichi', 'hdfsjkdfhy', NULL, NULL, NULL, NULL),
(39, 'chichichichi', 'khfdjdfkjl', NULL, NULL, NULL, NULL),
(40, 'chichichichi', 'jfduhffd8ugf', NULL, NULL, NULL, NULL),
(41, 'chichichichi', 'hudfiufduee', NULL, NULL, NULL, NULL),
(42, 'chichichichi', 'hbdfsjkfdgt', NULL, NULL, NULL, NULL),
(43, 'chichichichi', 'bhjufdhjdf', NULL, NULL, NULL, NULL),
(44, 'chichichichi', 'gfchukfdhj', NULL, NULL, NULL, NULL),
(45, 'chichichichi', 'bhfdjkcvffg', NULL, NULL, NULL, NULL),
(46, 'chichichichi', 'khfjvchhj', NULL, NULL, NULL, NULL),
(47, 'chichichichi', 'hudhjfduee', NULL, NULL, NULL, NULL),
(48, 'chichichichi', 'jcxjfdjhjill', NULL, NULL, NULL, NULL),
(49, 'chichichichi', 'hjkfdhjkfdfds', NULL, NULL, NULL, NULL),
(50, 'chichichichi', 'dfsjuzcvfg', NULL, NULL, NULL, NULL),
(51, 'chichichichi', 'hudfhfddfh', NULL, NULL, NULL, NULL),
(52, 'chichichichi', 'ghkfhjfdk.y', NULL, NULL, NULL, NULL),
(53, 'chichichichi', 'jvcxknldf@', NULL, NULL, NULL, NULL),
(54, 'chichichichi', 'ghkchjfgf', NULL, NULL, NULL, NULL),
(55, 'chichichichi', 'hjfdkjdfjk', NULL, NULL, NULL, NULL),
(56, 'chichichichi', 'bhfdhjvffg', NULL, NULL, NULL, NULL),
(57, 'chichichichi', 'hjbgfjfdjhfdhyu', NULL, NULL, NULL, NULL),
(58, 'chichichichi', 'gfiugfugtf', NULL, NULL, NULL, NULL),
(59, 'chichichichi', 'gyufdufdilhfd', NULL, NULL, NULL, NULL),
(60, 'chichichichi', 'hyjdfshyjugfdkh', NULL, NULL, NULL, NULL),
(61, 'chichichichi', 'gdsfgfdjhfrt', NULL, NULL, NULL, NULL),
(62, 'chichichichi', 'hfdkfdukhfd', NULL, NULL, NULL, NULL),
(63, 'chichichichi', 'jvcxknldhf@', NULL, NULL, NULL, NULL),
(64, 'chichichichi', 'jDuiZyv7qU', NULL, NULL, NULL, NULL),
(65, 'chichichichi', 'uidfgfrdgvdfk', NULL, NULL, NULL, NULL),
(66, 'chichichichi', 'jhbgfdvgdfud', NULL, NULL, NULL, NULL),
(67, 'chichichichi', 'dytfhylkjyugj', NULL, NULL, NULL, NULL),
(68, 'chichichichi', 'dythhgtrlkjyugj', NULL, NULL, NULL, NULL),
(69, 'chichichichi', 'yuigfrlkjyugj', NULL, NULL, NULL, NULL),
(70, 'chichichichi', 'hjcxkjyugj', NULL, NULL, NULL, NULL),
(71, 'chichichichi', 'kbdfbdxhjknjlojn', NULL, NULL, NULL, NULL),
(72, 'chichichichi', 'ierytdehhiorej', NULL, NULL, NULL, NULL),
(73, 'chichichichi', 'mghcvkhfkjdhfkl', NULL, NULL, NULL, NULL),
(74, 'chichichichi', 'lohkjcfiug', NULL, NULL, NULL, NULL),
(75, 'chichichichi', 'logjcfjgjk', NULL, NULL, NULL, NULL),
(76, 'chichichichi', 'gdfhfdugtd', NULL, NULL, NULL, NULL),
(77, 'chichichichi', 'uhhfidugtd', NULL, NULL, NULL, NULL),
(78, 'chichichichi', 'kjhfhghfrgh', NULL, NULL, NULL, NULL),
(79, 'chichichichi', 'kkjhkjcdfhdf', NULL, NULL, NULL, NULL),
(81, 'chichichichi', 'nnbvllbgfol', NULL, NULL, NULL, NULL),
(82, 'chichichichi', 'kfhdiuhdfh', NULL, NULL, NULL, NULL),
(83, 'chichichichi', 'kj.fhdkhfhdhu', NULL, NULL, NULL, NULL),
(84, 'chichichichi', 'kjgfhfhjgtgy', NULL, NULL, NULL, NULL),
(85, 'chichichichi', 'khdhhfiu', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pin`
--

CREATE TABLE `pin` (
  `user` varchar(255) DEFAULT NULL,
  `serial` text NOT NULL,
  `pin` varchar(255) NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pin`
--

INSERT INTO `pin` (`user`, `serial`, `pin`, `date`) VALUES
('chichichi1', 'wsn0uk3sHF', '$2a$10$hYGp908ZACn038M1dTfpuugULIt52D3wkDEX1DwZ/PDHrI6ovr7su', '2018-10-05 13:13:43'),
('jgfvfdkjfghfcgh', '8G2C054Q7p', '$2a$10$QRyKjS7CvxBuHqBTlDYIPezpjykrDo0/LYV0CrwmeJmqT/P7Omb2K', '2018-10-05 13:17:12'),
('cvdeghhhhhh', 'xWlbUZD5lI', '$2a$10$RKnLGkiZLT1NUIgLkrPVTe5QoxnI6HtBV4V5my3oYouhLREdpJeBC', '2018-10-05 13:22:19'),
('chichichi1gtu', 'hB9tvrcYwC', '$2a$10$5RgslVsaSZ4p9DZkbo5WP.UHGivJxtDu577Kb9w0Zhy5yFIYmcofG', '2018-10-05 13:24:46'),
('yeyuffrhyfkhf', 'SCC4ylwWB5', '$2a$10$U.JfvWGSdCRPohImfrIIte1L3zO3/HuELE1HxT9csC2yCVPWlXvzy', '2018-10-05 13:33:28'),
('gdfghdkhgdrjl', 'H4693pR4ew', '$2a$10$.QPi1EemjBwZ5VR/yYUhUu.nL.ltm8wFu.N4Rr8GzHKRbAocTr1gW', '2018-10-05 13:39:42'),
(NULL, 'weRkrTCGJ5', '$2a$10$0MkCmIeg56NUGdo6KxCl2uzfyRZpZ3MDHRb4VfE4bGC6ZrJw3kJqy', '2018-10-05 13:44:39'),
(NULL, '321lBLxD9T', '$2a$10$3fVjcLDH0exEGBcpmcXgJudmK8uIZnhJTwb0DGH1kPrUDlhar4xx.', '2018-10-05 13:46:13'),
('khkgdhrgdffdu', 'pA1e1Ah7Sc', '$2a$10$rTsI8HDCVL3om9jstrdDbevuZ4hgUXarRTt8Gs0iAWePBhsSURGt6', '2018-10-05 13:48:34'),
(NULL, 'OaOJc2hnrj', '$2a$10$JeRYGD1fFJi1mipd6DznIOB6YB7lvoGa2cXCBimGAG8Ni7pPhKhrK', '2018-10-05 13:53:40'),
('khkgdhrgdffdd', 'sCZjHwrmAR', '$2a$10$bZDszhjE.UcDU4H8/jG0g.4Xa9IkVB5ppL3cqjqM2IRJ4OQ6mqVQy', '2018-10-05 13:54:01'),
(NULL, 'tRcLA8MBCP', '$2a$10$tQRTQ5tv2SkAIJ9N73L7s.YIM5d7qbfnF2vNhKCJY3Om6nYzzoaIS', '2018-10-05 13:57:13'),
(NULL, 'iWv2J1nuE4', '$2a$10$j5.i/5xjWpDEuM5M9fmU2OiaBkV4znMntOjXO/Y4DbEC5mLstovne', '2018-10-05 13:57:30'),
(NULL, 'tVTa75LvkE', '$2a$10$qFMvNmL6iQA2VDPPU.RlIeYw4MUmdmjBqb1qMxtXHHKoEDaOIGL12', '2018-10-05 14:04:29'),
(NULL, 'WPiFc8Es6L', '$2a$10$ORAAFAI7nwsa0yRLF95InuQZRzrmYc2lq2vcD/LX/HsAzSXcv80zK', '2018-10-05 14:05:42'),
('ugdfnsdjudfu', 'ZciM0Ci6oo', '$2a$10$drls9tgt2QHwUKf.V4rBg.rdvHV.o9.y6h0wrLDZ2Wq4dUaqITZLC', '2018-10-05 14:06:19'),
('hyfdhjufbgkjdfh', 'fW7PHaNpqR', '$2a$10$4WPdqFQC7P/K/2VWHN7OoO32ldCO6p9fjkbpptO0uaTzkiWRIvSvG', '2018-10-05 14:19:36'),
(NULL, 'mjQvjRq3Qy', '$2a$10$CYAFRmgO7voNybzvlkgs4ej7KNY4PebLqSHvXh6G4ZedxUCC9jP8W', '2018-10-05 14:21:08'),
(NULL, '1JeoTL5pLh', '$2a$10$/ghZ0RK0NIGzWAeWYaBPpel/altEp5I1O6Oe97/MqdTjbFTiHBYLq', '2018-10-05 14:24:37'),
(NULL, 'TxScsGdj2m', '$2a$10$rrlUYFQ.4otjQUEOP9vNmuB2QiCz7A1OBJY.QGnTe6gxn73iSFb4K', '2018-10-05 14:25:19'),
(NULL, 'DRCAULiqq8', '$2a$10$WWYVNU.QeBB7ym8OUDKvFOB8ZrlWVptNHCxr9BhJtgegnTFSiSHoG', '2018-10-05 14:29:26'),
('hjgdhgfklj', 'WQMjCWVrWd', '$2a$10$7A/WRO5r2BZDs3vAN7j.aOH0sNTV4.WOIo59mIL1B/YO0w/oK8mPu', '2018-10-05 14:32:31'),
('yrhugfkjg', 'DEwFoi6eB7', '$2a$10$mSWw0usRUTBkHxZ7HIPKf.hujkI8JZueezV9hZ1XWthbROuKBWAzK', '2018-10-05 14:41:47'),
('fdshyhjhfhynh', '49AHR9tNWM', '$2a$10$Gbw7WhFbuv4XX7P/Ti8/UO/r6UznSbhzvZIe3rvOjmqJgHYzj0MDi', '2018-10-05 14:50:07'),
('fhdfkfdjukdfjk', 'upAeb6PFID', '$2a$10$3GFYlrHJIo9PRH9zB1o6KO5T1g/0am3sE6hn4Z4RfRiQVOLYlz4yq', '2018-10-05 14:56:55'),
('hdfkg@vhfb', 'IVDUt5kd56', '$2a$10$1NW42jbwFt2ca./F3.20S.iYFNHGhQhRvtISWIVoeN/dDpVZpWVkK', '2018-10-05 14:59:59'),
('ghdfgkfjgdfkjlfd', 'QALu2dr8yI', '$2a$10$gfHsR.sgRr/aPGAbFB29wuXmDLjoT5PD91.W37L5hnHbCj72XFfMS', '2018-10-05 15:01:38'),
('ghfgfdkjfdbhj', 'kO1sz4ikCW', '$2a$10$oT0zKW460t4e.1BxaclkZOV/uOmTQh5NYknU8w8.9ILyuHUOpOHYi', '2018-10-05 15:02:24'),
('hjdsjkdfsjzdfsk', 'swA0HqCGKs', '$2a$10$cGddL7WhC06tUvDcELB/GeJdAA9FcjbctQcTOuOWsaTdzrqRviWJy', '2018-10-05 15:06:22'),
('khvzdfskjdfk;ljdf', 'V4OtCebALh', '$2a$10$VGt26HC.bnoTQA8A4gt3pOebwMgSE/u3ijdZqJ9RufVdQxaYAC9d.', '2018-10-05 15:07:05'),
('jfdkjzdfshdfs', '2DWYilRali', '$2a$10$WxkeetnCeCCYyM/VLJ78ZeqkchdUgUMiof6ARbRHH5GLkN8HRk4b.', '2018-10-05 15:08:27'),
('hfdskdfkjdfkj', 'IprkhGlzfh', '$2a$10$FHJ7o/txgW4aaPefV8T3WeQig05TkFODxczGX4zeRMdvwA5S.WF3i', '2018-10-05 15:15:21'),
('gfcfxcjd', '5aur2NGB0d', '$2a$10$nOTUH4QFWEUel/Mp.yWETOCQ0u2BNKl516iNvZJVqw7Y3sjI8FJMC', '2018-10-05 15:17:29'),
('hhjugkfdhj', 'YGG0b5eYh4', '$2a$10$GbVOJa0zxriDxLhYVuejg.sHUJUtjtIIMamLmMOfnzm6qQTAxvZlW', '2018-10-05 15:19:07'),
('vhjcfxhbdfjbkdf', 'zxvzA3hC7l', '$2a$10$kGu3e6JSOuAgj43MtRBnMe53vqH.JHZtJWdFruvQd0/OMXoCDcaUq', '2018-10-05 15:20:03'),
('ghfdsbhjdfj', 'NcnbE3FCtF', '$2a$10$OYQZEe70O19EnkDznhvVOO1kOFqQJnt8bdpFgsU/2kBRQf9SwYTJ6', '2018-10-05 15:21:55'),
('hjdshjdfhjdf', 'hDF6CSh8PE', '$2a$10$8THQHowy7FloCmMqmjkCvOAhR4vmAQwtOR/wJa1GGitZTHfr1gure', '2018-10-05 15:23:11'),
('bgvsdkhdsbhjfhjb', 'i8IIjuSTNp', '$2a$10$ttaG38ysvvC4TgvVYWSXQ.BxSv7n1z8iEXoZwMDMcP4F00Ch9pZm2', '2018-10-05 15:23:55'),
('jgyfduhdfkjdf', '7JSWkwY9jc', '$2a$10$tf5p4eAF3WN7uAJGByWDeOrMAgXbwIdLd/JgNGcEhQCsYqLe6zum.', '2018-10-05 15:28:18'),
('hjfdhfhgg', '8UZ2j5KxAS', '$2a$10$ywmeqGcjM6bINq74AMTz1OcGFFZ.VfGL3X.l5lw0vd1nhv9r2TKFK', '2018-10-05 15:31:02'),
('kgdsgdfsbhdfjb', 'ifL24wTJIV', '$2a$10$EDeb2DZ7leIWuqkyVux4lu7lAYzDsTBgqec.jdgJRiyXYyyDKvdu.', '2018-10-05 15:31:50'),
('hdfsjdfjk', 'nZyjJZEfN8', '$2a$10$07DCx1ZcAxXBTuvWq/gzvei5t7Hpsbe7qWXK8gaxVrv6/k58Jd0r6', '2018-10-05 15:37:12'),
(NULL, 'OlWcO0T8pw', '$2a$10$2TNdaT0IC1b2rbv2DGdkFOYobbW.lVZqZcDqqrXICKSpYatk8.ldm', '2018-10-05 15:39:26'),
('jfdkjlfdl', 'oUmRv9e0iB', '$2a$10$3l.m0OjUR97pjX/h0NSF4Oww0zs9RTbi9nodjifU6ThJTwt9osNFu', '2018-10-05 15:40:15'),
('jkgdkjjkd', 'K68I4J9OEu', '$2a$10$yz0aKGnh1uMpNWz/Bps84OFB5WtCt9vexXAs4DhrPf4TVZuMo8ddq', '2018-10-05 15:41:09'),
('jvjcvhjufdl', '8fIb7bRkvB', '$2a$10$.35VM7u0XFcXg0mUazsRyOumI1bbbBWLA4CVFeVMqYNNemVischm2', '2018-10-05 15:41:53'),
('hdfsjkdfh', 'bACxh9ldqZ', '$2a$10$qMaUN7756ee2P80G256QZuyqwb8jyCPl25lCYSfR8l5u9hZKWjTea', '2018-10-05 15:46:53'),
('hjkfrhkufjfd', 'ND5nbJjEAv', '$2a$10$vLrnZoEjwHU8zFV78BO4auBKTnFudZaVWI1qR23.1Kdl3Eq0HkGO.', '2018-10-05 15:48:56'),
('hdfsjkdfhy', 'wcvH1jfvMe', '$2a$10$aBd5zsEMKdUJEyQO.pj2lOIAvwxXYZar.Axwe.mavNK2s8ffwfFjS', '2018-10-05 15:50:17'),
('khfdjdfkjl', 'U7jALpveev', '$2a$10$BwREkkzoSW/KIXt.SOFKNOFoe9ay96VboFdx7b22x0q9oP92kChwy', '2018-10-05 15:53:21'),
('jfduhffd8ugf', 'zS15swLDL2', '$2a$10$65wozOnQW0/22t6Fhf9auuCSFtvhXC3zWKtHC48e51WVIONVBiA/m', '2018-10-05 15:55:00'),
('hudfiufduee', 'kx8ZaxQm5h', '$2a$10$W4nu3/H4iq5dB0KzqoZC7OLdykpPODU.1rwYoTQdEr9LEFMuBCus.', '2018-10-05 15:55:54'),
('hbdfsjkfdgt', 'q8j5j8evNN', '$2a$10$7y6LJM7QD/kFglzkTFuxZOjT/Py8Tc6iCf3/0DzXESyon/o2x3N.S', '2018-10-05 15:56:37'),
('bhjufdhjdf', 'b9prG7Bnli', '$2a$10$eHGezYik0tUQe1avVK0SUOJlRKNQdR3UKP3i5uw5Ohhlv8Z0Z/C8i', '2018-10-05 16:00:06'),
(NULL, 'hn041voMuj', '$2a$10$5PgWLk7hefk4a2UffFzGf.MjqOXj7TGAd1Mol7ArjfcEdCGSLRqSq', '2018-10-05 16:09:57'),
('gfchukfdhj', 'VXc01TKqxx', '$2a$10$M2oVxPJ04d/8D4CPbRcaPuFKxzAEvIYP3kjr5K4PbcESJm21YeDsC', '2018-10-05 16:12:52'),
('bhfdjkcvffg', 'CHYN1jRVQ7', '$2a$10$c8nI/BN31vL5jO1i7E7eReerQiYBrjxwYKU0RDKuGaXmwOOsz/D3C', '2018-10-05 16:14:14'),
(NULL, 'nDtAALPxvK', '$2a$10$UUI66EvPJZ7CNG2Zq/525u6iYgfZsZDZfiyfHzhsg.6CzhLp57.B2', '2018-10-05 16:15:43'),
('khfjvchhj', 'caSMM6vGcD', '$2a$10$5d4/E678wT7qmIlo3zw5f.MgvhTF6i9r8NNBXltZl7tkhsoGJaNwW', '2018-10-05 16:16:27'),
('hudhjfduee', 'ODfkTuVy68', '$2a$10$ruUwiqeX3U3p00nTCC7C0uFZffMAXMTHmML5OhhmcyykyR/8De8D2', '2018-10-05 16:17:05'),
('jcxjfdjhjill', 'J5pJ3pTA81', '$2a$10$0LYq4Fs968kEGwydBY1pKOuSHOC7KuUbxzFf3hFlm8El6uIchRFUS', '2018-10-05 16:18:09'),
('hjkfdhjkfdfds', 'nLR85midbZ', '$2a$10$yR/t0G0HsnA7vUmA5mmOdO2YJra4GzT8sshfLInankkI4jUmNFNVq', '2018-10-05 16:19:12'),
('dfsjuzcvfg', 'bh0hMcFFjL', '$2a$10$84Az7KwspJrVuDzby7aiN.j8v1f1qTibc394WvWmJnc8IltZkDdEu', '2018-10-05 16:20:11'),
('hudfhfddfh', '4q0l5GtxJ2', '$2a$10$z3HLltCRBvhR0f9tftQeH.g/BciSKEs2Fb39Pn8ttTjxHYuAB6xZe', '2018-10-05 16:21:23'),
('ghkfhjfdk.y', 'fq2qxJkjYD', '$2a$10$aLUu2J9tKIIU228RVRExQ.9cKfAaIbRHdhXxPZV58vZn8AjrE8szu', '2018-10-05 16:22:58'),
('jvcxknldf@', '7wZxt1BLqf', '$2a$10$n.5v46Mp5OpQ5O4uur2fheZLc0jzDOKnqanNYMNaA4BKTI5mUjf5G', '2018-10-05 16:24:05'),
('ghkchjfgf', 'fw8PCqj9xI', '$2a$10$dVxfwO9bfCA4gggmQf.fw.OhOFp/APQJdVEFaxotFRO7fsB1kNqsu', '2018-10-05 16:26:21'),
('hjfdkjdfjk', 'hdJ7LldnLr', '$2a$10$cI2MSFRFwv/NAyDoZO0E3uOHUd8Ug6Q4GyzDn21xbd6jf66vKQB52', '2018-10-05 16:31:21'),
(NULL, 'ReKapvzkGA', '$2a$10$dPIX6cBTuF4QPjHbuyMqs.0hTO3bY3mfOUfKiUuN9L.BGmhKD9kna', '2018-10-05 16:32:10'),
('bhfdhjvffg', '83BTRFdjoP', '$2a$10$uNEk73O8Q5twL7rSH6IaNOeFexdop8fLwTV/TyJMbcVXdbubWYnbq', '2018-10-05 16:33:28'),
('hjbgfjfdjhfdhyu', 'GhZnPUdTBQ', '$2a$10$gR9qG92LD1Kq8YNTMmSUduhuB8b2nh/IKXRYm3elAQm4mvJJSUa.y', '2018-10-05 16:34:58'),
('gfiugfugtf', 'aYECzFJLLu', '$2a$10$U.GpsyyextfBhA5cCCOtjuo.FeEJ9TJHllarvG1AuR7IAtsPw31eO', '2018-10-05 16:36:06'),
('gyufdufdilhfd', '0jjLDJrM47', '$2a$10$jTeXqEGWKXpKKLq0.mWhKOit.rOERzhRQzjep2v/xiUDRvQH4hJrm', '2018-10-05 16:37:09'),
('hyjdfshyjugfdkh', 'UMUrPEnmQY', '$2a$10$VUFNhDxogL49Cm9CvLHeWuwwuOaPAvXV4HcDONizysNbKoIbpgQ9q', '2018-10-05 16:38:21'),
('gdsfgfdjhfrt', 'xykluYcRrK', '$2a$10$KdEDQHA/Sn8d.PqeLL0B/u9vEj1CEPPTz/20s5CWu3qHHZYF/9Ybi', '2018-10-05 16:39:51'),
('hfdkfdukhfd', 'fJVbOslh55', '$2a$10$tYI9Qb9Kv3Ao0X/BfV9D6ePbLJdQadW429OfdiVM8S9M9w9dvSLYG', '2018-10-05 16:40:59'),
('jvcxknldhf@', '8HskwLx2nx', '$2a$10$IErLsuB/HNlN9Em1WjXBjOae8fflMkXA9v43lETzP.XdbgQZulN2S', '2018-10-05 16:42:10'),
('jDuiZyv7qU', 'jDuiZyv7qU', '$2a$10$VlirmJ6Xjzys6VtmgWNFSuK8PEnXu69rC9fM1rebEbqTudyDC9GHu', '2018-10-05 16:42:45'),
(NULL, '23DJYfUAGF', '$2a$10$SWICHAnz4ECv9y07PyrdfundQ07fPXDWpsUHcQn01Lv8G4gakP3Hy', '2018-10-08 12:47:28'),
(NULL, '5FwFGLQ05u', '$2a$10$vz.qczlsT7kDiEDfgsQ2DeI3Exq9qnfoJqfSM1FOTtf0gx2wXycKu', '2018-10-08 12:48:15'),
(NULL, 'IGCck5uCtb', '$2a$10$6MdxgRDO1Gf7V7osBUlNmebHRz3i1bfY2TOfYgjooKPDsvIfLHj8G', '2018-10-08 12:48:54'),
(NULL, 'CSkvYo1D01', '$2a$10$Sfow1hW8LShFIva.3YnC6Os3kpOu9oPVuMTP1zYIdZ7sAf6WsYTt2', '2018-10-08 12:50:45'),
(NULL, 'Vl9IVZ50KL', '$2a$10$mWU6DDQFfp1nMKn9JlfREu95Fk.dfpThcCkRWZQ4r2n1i3KCvzK6S', '2018-10-08 12:52:20'),
('uidfgfrdgvdfk', 'VKhTTGHyGf', '$2a$10$B2lyrDgD06.3PASgcvz29earXlKoWpDVRVElWYLf1fLlI37pAyOdK', '2018-10-08 12:58:17'),
(NULL, 'QDvf9Obi6L', '$2a$10$mcLT05LaJTCLKrf6c.1pLuZ3FZilu94BSV.wBDT1rUhYJ/KN5dWBe', '2018-10-08 13:02:27'),
(NULL, '7K29MeQ3bS', '$2a$10$zZQblEyV5mo6J/hi0C88reGqmHEsXXmsdW6TCDQuVfWwMcINntr2m', '2018-10-08 13:02:39'),
(NULL, '2Z5AmUYx4u', '$2a$10$JmmET1pnfXmtpEI6xqMpuOcOuqtCo67Q9P78LYEDnKXnBAR2fneXm', '2018-10-08 13:03:15'),
(NULL, 'tY6pQ2uwZb', '$2a$10$CGp7HEzEG.YP7fiP3FhnvepKIX1Bell7ZZ6qa0pQbR77b47Kw1NXi', '2018-10-08 13:04:38'),
(NULL, '3W1pULX0uq', '$2a$10$wAo6wrFOQX0QrbSJBRmLuu0.rfUwl4xTkh00YFV38xKtHAj2LteqS', '2018-10-08 13:04:48'),
(NULL, '5M07UusyP8', '$2a$10$lWILjABKYuUpsB/4.2JK7Ob.TRhdEjH45xTL2EOTBFZz9OIaXwnI.', '2018-10-08 13:07:17'),
(NULL, '3oGWcjxeDR', '$2a$10$.ldQp4W1M5BjYsBN8wZCI.FjmLM3gqQJWoM4vMQRpZKZhAYKvKTKa', '2018-10-08 13:07:21'),
('jhbgfdvgdfud', 'LPPTTpjjXr', '$2a$10$sbvlRgIZO.WjWwornqyyoO9lJ.fPn67GVFdPVZ3QHy8n6VyMZExqK', '2018-10-08 14:02:39'),
('dytfhylkjyugj', 'izNREF1YxZ', '$2a$10$4zmcudSuWg4Wv3d7ULYCGOaqOvGXnP2/bk62/n2zZGCWLz54OCEF6', '2018-10-08 14:11:34'),
('dythhgtrlkjyugj', 'kA4e8k50ZR', '$2a$10$Ahv4pmmMIctQWhlZky8G2..x8VBKVHMzhKou/7q8uTBw1PYV.aiqO', '2018-10-08 14:26:43'),
(NULL, 'ubS4mBM01V', '$2a$10$C6Zm6/.3GLcbxkgy7icDqu0o1zl8bqKdjDFJ0UFTZ4utSJ5xfK5vi', '2018-10-08 14:34:44'),
('yuigfrlkjyugj', 'a9uCE25FW0', '$2a$10$PVRGfG1lPjiiHlbpIFNMIulMctD87LZns3RefI1EhhHiVbyP.hNhC', '2018-10-08 14:35:30'),
('hjcxkjyugj', 'ECP8qHtBd2', '$2a$10$LasJZEx/UgygQwBDHulCFu3vUaLc.tkKJSuQv.ugMN7x2GQ7oE06q', '2018-10-08 14:36:30'),
(NULL, '4F4K7D5TBX', '$2a$10$iNevz35ICBeaVggMWAk89OJG7l3uAFFCc/k28eKub7XZuHHlGikgK', '2018-10-08 14:41:21'),
('kbdfbdxhjknjlojn', 'jtsUSQHR7P', '$2a$10$3caHjBpGSLUD00jK38PBvueiT5/gjyULMSk8yAU0uzVFSV8rl5F/W', '2018-10-08 14:47:29'),
(NULL, 'LqODlWJCAP', '$2a$10$VBgKRDX8HoGft3BWmfaJKONuLW.s9fXV7TMJTJdY0R.WBIxMj1aKe', '2018-10-08 14:59:29'),
('ierytdehhiorej', 'KhFf6wYQJL', '$2a$10$E69ypcoLkTvJKTy50g5sCO69DiQwIbNVB6.q4H.L5oIu7v8vAM/eS', '2018-10-08 15:08:14'),
('mghcvkhfkjdhfkl', 'kxWKFOhbWD', '$2a$10$TdYAUVm5rjtaCmEF6aUwEu6xJsnpXrH6MgI4X7MbH9Xic2zwh3qOa', '2018-10-08 15:09:57'),
('lohkjcfiug', 'VJUjPAJbHY', '$2a$10$OMNej95wrmBu1kGd8YKrpOi623jtKkMbezMaGK3r3cTJaRLU2v9Y6', '2018-10-08 15:11:45'),
('logjcfjgjk', 'nlNX6IA0Lc', '$2a$10$D3C9shL3NjQ7Jr5ES7Ul/.6NwxL2VwdmqIDTxCWhB4b3BIflIksP6', '2018-10-08 15:13:35'),
('gdfhfdugtd', 'ENtXkmsNVx', '$2a$10$Zaky2FHuyQhDPwtqEFPL8OoJqDxaFUYEgcQg05JvPO4F2/kPgcsTO', '2018-10-08 15:18:28'),
('uhhfidugtd', '70Tn8WiOZW', '$2a$10$IBPkNUSrePbmU.rJI21oJ.kn9.vZGymEL2NN.0QgQQhXkqRfXTX4y', '2018-10-08 15:21:48'),
('kjhfhghfrgh', 'FIszLzksmL', '$2a$10$O5Gw0jEyFApDqY.O6w0sp.ao0IGYQgCTQcBP9cn5m/.K/WJ2WvVAm', '2018-10-08 15:23:44'),
('kkjhkjcdfhdf', 'IrPsKNULl3', '$2a$10$GU17vgvlLyayQrD9bg6UuuTC9zWgMv2Ly2o9rUEFeqSlKtnnuGlte', '2018-10-08 15:25:17'),
('nbjkdcfkjd', 'Q3wDGPPk5b', '$2a$10$DUcK8myiIhbZcrg0KNKYreVlGV35UTG7Es6pTMELp0IadqHubtTWm', '2018-10-08 15:30:48'),
('nnbvllbgfol', 'RiA9AOQuHB', '$2a$10$nypXdDfV4RChggzFxpaWPeS7u005srQoI5B9RuufAsYGCq58/scEy', '2018-10-08 15:43:10'),
(NULL, 'VHs9jFKKOl', '$2a$10$l1LUgSkTA6gNnpd4p6eU.u50H0aD2z5wATUhbteoRip6UcC2tALHm', '2018-10-08 16:26:48'),
('kfhdiuhdfh', 'NOnz51KpbR', '$2a$10$PO7y/v4DlQobA4qTlCsQd.Fmvy4hIj88yOq.lig/BtY26zSr7wK8W', '2018-10-08 16:27:10'),
(NULL, 'Oer8yjDOoT', '$2a$10$KfnCP1gInyciDWjQRLRsEeDzEiV7OxAdP5N5a0/QE.5sqDO1h/jJ.', '2018-10-08 16:29:04'),
(NULL, '3vBJ6BId4U', '$2a$10$oinhuWmNV3L46SW2Hv3/yeVT8knbUmK9Bvs2JEZUxBNMhCt5B5uA2', '2018-10-08 16:57:38'),
('kj.fhdkhfhdhu', 'radJu9Nwzl', '$2a$10$13kEOZ3mriTRI8wkUf1pp.j/L/nD0GYWdacgCDyfMxLAg1D7RRD/i', '2018-10-08 17:01:09'),
(NULL, 'lW1kxKkIwX', '$2a$10$rsf8nsa0g.yVczX7WiZW4.1WvqIfGDyh.nHZUEsjRt1.67/2dqqN2', '2018-10-08 17:02:48'),
('kjgfhfhjgtgy', '6V5UU3WLry', '$2a$10$VybkInABQOa3VpX.pvHore1Yt.H3PuGEjxRop8r.tQRJlqQVhr3UG', '2018-10-08 17:05:12'),
('khdhhfiu', '9vsMWZ3jFF', '$2a$10$8aC1HS8hiLsnlWprxwZHt..6X2CEMWLvakyKczOXJiJe9Ni.s2a92', '2018-10-08 17:11:34');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `user` varchar(255) NOT NULL,
  `bank` text NOT NULL,
  `account_name` text NOT NULL,
  `account_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user`, `bank`, `account_name`, `account_number`) VALUES
('uidfgfrdgvdfk', 'ACCESS BANK', 'hgrdskfvdku;kj', '1234567890');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('rKNdfSJ2OYl7a-W3QCr6ojtT7blz0akq', 1539130399, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":{\"user_id\":65}}}');

-- --------------------------------------------------------

--
-- Table structure for table `stage1`
--

CREATE TABLE `stage1` (
  `user` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stage1`
--

INSERT INTO `stage1` (`user`, `amount`, `lft`, `rgt`) VALUES
('chichichichi', 1, 1, 12),
('chichichi1', 4, 2, 11),
('chichichi1gtu', 0, 9, 10),
('yeyuffrhyfkhf', 0, 7, 8),
('gdfghdkhgdrjl', 0, 5, 6),
('fdshyhjhfhynh', 0, 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `stage1_tree`
--

CREATE TABLE `stage1_tree` (
  `matrix_id` int(11) NOT NULL,
  `sponsor` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `a` varchar(255) DEFAULT NULL,
  `b` varchar(255) DEFAULT NULL,
  `c` varchar(255) DEFAULT NULL,
  `d` varchar(255) DEFAULT NULL,
  `aa` varchar(255) DEFAULT NULL,
  `ab` varchar(255) DEFAULT NULL,
  `ac` varchar(255) DEFAULT NULL,
  `ad` varchar(255) DEFAULT NULL,
  `ba` varchar(255) DEFAULT NULL,
  `bb` varchar(255) DEFAULT NULL,
  `bc` varchar(255) DEFAULT NULL,
  `bd` varchar(255) DEFAULT NULL,
  `ca` varchar(255) DEFAULT NULL,
  `cb` varchar(255) DEFAULT NULL,
  `cc` varchar(255) DEFAULT NULL,
  `cd` varchar(255) DEFAULT NULL,
  `da` varchar(255) DEFAULT NULL,
  `db` varchar(255) DEFAULT NULL,
  `dc` varchar(255) DEFAULT NULL,
  `dd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `stage1_tree`
--

INSERT INTO `stage1_tree` (`matrix_id`, `sponsor`, `user`, `a`, `b`, `c`, `d`, `aa`, `ab`, `ac`, `ad`, `ba`, `bb`, `bc`, `bd`, `ca`, `cb`, `cc`, `cd`, `da`, `db`, `dc`, `dd`) VALUES
(1, 'be', 'chichichichi', 'chichichi1', NULL, NULL, NULL, 'chichichi1gtu', 'yeyuffrhyfkhf', 'gdfghdkhgdrjl', 'fdshyhjhfhynh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'be', 'be', 'chichichichi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'be', 'chichichi1', 'chichichi1gtu', 'yeyuffrhyfkhf', 'gdfghdkhgdrjl', 'fdshyhjhfhynh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'chichichichi', 'chichichi1gtu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'chichichichi', 'yeyuffrhyfkhf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'chichichichi', 'gdfghdkhgdrjl', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'chichichichi', 'fdshyhjhfhynh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stage2`
--

CREATE TABLE `stage2` (
  `user` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stage3`
--

CREATE TABLE `stage3` (
  `user` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stage4`
--

CREATE TABLE `stage4` (
  `user` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `user` varchar(255) NOT NULL,
  `balance_bf` int(11) NOT NULL,
  `credit` int(11) DEFAULT NULL,
  `debit` int(11) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `debit_receipt` varchar(255) DEFAULT NULL,
  `balance` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user`, `balance_bf`, `credit`, `debit`, `description`, `debit_receipt`, `balance`, `date`) VALUES
(1, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 13:49:07'),
(2, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 13:55:22'),
(3, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 14:07:54'),
(4, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 14:20:07'),
(5, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 14:33:41'),
(6, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 14:42:30'),
(7, 'chichichi1', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 14:50:46'),
(8, 'chichichi1gtu', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 15:25:42'),
(9, 'yeyuffrhyfkhf', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 15:29:22'),
(10, 'gdfghdkhgdrjl', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 15:31:32'),
(11, 'fdshyhjhfhynh', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-05 15:32:21'),
(12, 'hjdshjdfhjdf', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 15:26:57'),
(13, 'jgyfduhdfkjdf', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 15:43:55'),
(14, 'hjfdhfhgg', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 16:27:50'),
(15, 'bgvsdkhdsbhjfhjb', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 17:01:48'),
(16, 'hhjugkfdhj', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 17:07:35'),
(17, 'ghfdsbhjdfj', 0, 4000, NULL, 'feeder cash', NULL, 4000, '2018-10-08 17:13:18');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `sponsor` text,
  `username` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `verification` text,
  `status` text,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `code` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `paid` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `sponsor`, `username`, `full_name`, `verification`, `status`, `email`, `phone`, `code`, `password`, `paid`, `date`) VALUES
(1, 'be', 'chichichichi', 'chichi', 'no', 'no', 'bvgjhds@cnv.dfg', '', 0, 'jfgjghgfghgj', 'yes', '2018-10-05 00:00:00'),
(2, 'chichichichi', 'chichichi1', 'chichichi', 'no', 'active', 'chichi@chi.co', '8061178755', 234, '$2a$10$meaCYqLoo1R9PfHrB6urZu87glFv3kEdLuAsD2GBBHYMyc0WmysOa', NULL, '2018-10-05 13:16:14'),
(3, 'chichichichi', 'jgfvfdkjfghfcgh', 'dvfjfhbvckl', 'no', 'active', 'jgfgg@fhgg.com', '8061177583', 234, '$2a$10$Y3h9HILynGW0ld9ROmae3.wBLC3tdqV8WBjgbuZP.UvuBrdOi8O4K', NULL, '2018-10-05 13:19:16'),
(4, 'chichichichi', 'cvdeghhhhhh', 'chichtrugff', 'no', 'active', 'cnfdgh@dfgfd.co', '8061178755', 234, '$2a$10$GBYsshuFb8of9N36K1g4wOd7Oc.fx30VH1fQhbahYOjiwQsVdgKim', NULL, '2018-10-05 13:23:19'),
(5, 'chichichi1', 'chichichi1gtu', 'chichichi1uouo', 'no', 'active', 'chichichi1@hgb.co', '8061179365', 234, '$2a$10$yOW7bXj7DGc4Tbs6INXuP.ry3hlq1lvovZrr3tMWnKhO7SKC5s16y', NULL, '2018-10-05 13:25:19'),
(6, 'chichichi1', 'yeyuffrhyfkhf', 'xffhdkjfiyjyy', 'no', 'active', 'hfyjug@vyjhg.co', '8061177588', 234, '$2a$10$1CFztWNiVyEMJilpoAn/MeyrUHmp6ORw7mUq7ex4kKCj09SgsLVru', NULL, '2018-10-05 13:35:14'),
(7, 'chichichi1', 'gdfghdkhgdrjl', 'ggriu;ogruhyufr', 'no', 'active', 'fudfk@kjfdkjb.co', '8061178755', 234, '$2a$10$on6MAttt3sPplBwUJvDIGe/PvStpKQsUHaNq57crULLl5mB0rPXYy', NULL, '2018-10-05 13:40:14'),
(8, 'chichichi1', 'khkgdhrgdffdu', 'ghdfgdfhh', 'no', 'active', 'kbhkjgf@juygzdrh.co', '8061178755', 234, '$2a$10$cg.iiFNrHLnTKfpERDmIKOwSse9virM4ImxablLbZKhoKw.2YMBg2', NULL, '2018-10-05 13:49:07'),
(9, 'chichichi1', 'khkgdhrgdffdd', 'ghdfgdfhh', 'no', 'active', 'kbdffhkjgf@juygzdrh.co', '8061178755', 234, '$2a$10$qAmXwx36ek1ZcEEZLIeZze1AmSpy/gzQI.cpvm/hjYWfMwOW/ibA2', NULL, '2018-10-05 13:55:21'),
(10, 'chichichi1', 'ugdfnsdjudfu', 'ghdfgdfufdfd', 'no', 'active', 'kbgbdfvj@gtguh.co', '8061177588', 234, '$2a$10$eVKts.E4fqkh27L/MJH9XuVC.CXu73txYqeiQz.GXluGryQ7wMquK', NULL, '2018-10-05 14:07:54'),
(11, 'chichichi1', 'hyfdhjufbgkjdfh', 'ghdfgdfufdfd', 'no', 'active', 'vjdf@jhgfvf.com', '8061177588', 234, '$2a$10$T8AYhIpkEYxhVMuTdWcc6eTG7qB312uA2IKFD7hPqwOk70zd7e1Ru', NULL, '2018-10-05 14:20:06'),
(12, 'chichichi1', 'hjgdhgfklj', 'hbdfjkhghjkj', 'no', 'active', 'kjgkj@hjmvhv.com', '8061177588', 234, '$2a$10$.2NLYijmis24Z4jIAYb.KOWJArUGxninh2tfENtrjdARWpC6PIrAe', NULL, '2018-10-05 14:33:41'),
(13, 'chichichi1', 'yrhugfkjg', 'hbdfjkhghjkj', 'no', 'active', 'gdhj@hjgfhgv.com', '8061177588', 234, '$2a$10$Ez3zSAh8f3mgQw88uWTqBucpUI6DpY6.sqSEDNz2vIog0SPo0WzLO', NULL, '2018-10-05 14:42:30'),
(14, 'chichichi1', 'fdshyhjhfhynh', 'hbdfjkhghjkj', 'no', 'active', 'gdxkhfd@hjgf.co', '8061177588', 234, '$2a$10$Q9QzK/4P7zENlv3xGrk25ueJSkeTjMqKK5kUA.VV604cEuG4FrqWW', NULL, '2018-10-05 14:50:46'),
(15, 'chichichi1', 'fhdfkfdjukdfjk', 'ghukfdyfttg', 'no', 'active', 'hfdkj@igk.com', '8061178755', 234, '$2a$10$JCtlVmyTXZ8hhRj2hKTHaePTq3k0zzpZp4lTH.KE4XnRkNBD5JU.q', NULL, '2018-10-05 14:58:14'),
(16, 'chichichi1', 'hdfkg@vhfb', 'vhj.dfshjdfshk', 'no', 'active', 'bvfb@hjgf.com', '8061177588', 234, '$2a$10$bcOIkbqviY3wJZd9iIKRgeONVNf1bdaDpfGItHisWZoBQXQKEPkw6', NULL, '2018-10-05 15:01:01'),
(17, 'chichichi1', 'ghfgfdkjfdbhj', 'hkdfvdkjlfdhvzdfjg', 'no', 'active', 'khgbdgf@gfdj.co', '8061177588', 234, '$2a$10$Fx10muVo74WdMh1GT6Z2zObCCsxKigGCtsadehP55ZIgkc/CWbRT.', NULL, '2018-10-05 15:03:07'),
(18, 'chichichi1', 'ghdfgkfjgdfkjlfd', 'ygfhjjkhdctfj', 'no', 'active', 'bkhvgfdjfd@jgffdsj.co', '8061179365', 234, '$2a$10$yeqPxjizetTrcEw7L1OhhOIrFs.VRsn97EMx9DKedatHpap10GgsS', NULL, '2018-10-05 15:03:21'),
(19, 'chichichi1', 'hjdsjkdfsjzdfsk', 'ghfdsyfdgyfdgyi', 'no', 'active', 'hfdkjd@jhfdxh.co', '8061178755', 234, '$2a$10$IvwcwDOqmkU4ltbCpHDGa.uwZsiRrSrYEwZXF/YMmnnNrYzm79j6G', NULL, '2018-10-05 15:06:55'),
(20, 'chichichi1', 'jfdkjzdfshdfs', 'vhjmfdjkdfkl', 'no', 'active', 'jkdffd@kdfxhj.com', '8061178755', 234, '$2a$10$ZTTRrDGzOHomlFamUPSRP.ctRybveexD7OoSUJq9tsmyN521o5sES', NULL, '2018-10-05 15:12:22'),
(21, 'chichichi1', 'khvzdfskjdfk;ljdf', 'bgfdkdfkjfd', 'no', 'active', 'hjbgfdkjfd@gjfjdsj.com', '8061177588', 234, '$2a$10$/Fy4Sp3dMVCPxAMeyPcZMu3Bq9GhF0qPwDtlxsVE2By9Ytlmi6iiO', NULL, '2018-10-05 15:15:47'),
(22, 'chichichi1', 'hfdskdfkjdfkj', 'ugfufdkufdu', 'no', 'active', 'hdfxj2kg@fx.com', '8061177588', 234, '$2a$10$w66G1O3sF7eiFUiyLf4JoOH.3QHwMEnFE9.u1icZ7EeOTx57xDhbG', NULL, '2018-10-05 15:16:38'),
(23, 'chichichi1', 'gfcfxcjd', 'kgfydfsgdfsgu', 'no', 'active', 'khyufdk2h@jffd.co', '8061177588', 234, '$2a$10$STDfvCTNTS6UunCy.8ZVKemJ6pbSRrQabiwbMjhnrq4IDAAoXWq62', NULL, '2018-10-05 15:18:30'),
(24, 'chichichi1', 'vhjcfxhbdfjbkdf', 'kgdfdkfd', 'no', 'active', 'bvcd@hdf.co', '8061177588', 234, '$2a$10$Q9jVG7oe2jlEAyFnsSZrG.AYSHMZxPEp2xGY4AZRLeQ8HMF0hR.9.', NULL, '2018-10-05 15:20:38'),
(25, 'chichichi1', 'hhjugkfdhj', 'hjdfsghjdfshj', 'no', 'active', 'hjkfd@jdfs.co', '8061179365', 234, '$2a$10$FIavLaemOty1U1eNd83pf.9mmdpBAR19AzArYlpHRhe1ApX7i.dwS', NULL, '2018-10-05 15:20:51'),
(26, 'chichichi1', 'ghfdsbhjdfj', 'hjkfdhudfk', 'no', 'active', 'hf#@hfd.co', '8061178755', 234, '$2a$10$ZYRNxNt9K2BaD3R91vhwyO64JHjZoYf2Bd61PiR/a60PlnodAl11u', NULL, '2018-10-05 15:23:03'),
(27, 'chichichi1', 'hjdshjdfhjdf', 'kjfdhugfhu', 'no', 'active', 'hcx2g@hfv.co', '8061178755', 234, '$2a$10$0HEKHJmo.rk6E2OCoawOHuXXnB.MrQSNTMADsGNs9QHBdL3DwfVHG', NULL, '2018-10-05 15:23:43'),
(28, 'chichichi1', 'bgvsdkhdsbhjfhjb', 'gdsufdiuvdfgudh', 'no', 'active', 'kjsdjkdf@jhdchfdfd.co', '8061177588', 234, '$2a$10$O.6DcTi1fu4EaUyd7upuweZh.D3f0Fzsw.nXK54wsnNY46DC45nT6', NULL, '2018-10-05 15:25:41'),
(29, 'chichichi1', 'jgyfduhdfkjdf', 'hfdiodgf', 'no', 'active', 'ghjde@hjbfd.co', '8061177588', 234, '$2a$10$IbqKUcD6spcvI2.VB3NQp.6e8opd.yU5sDOpSm95gNQhBUVL22Rju', NULL, '2018-10-05 15:29:21'),
(30, 'chichichi1', 'hjfdhfhgg', 'hufdudfu', 'no', 'active', 'jf@khhd.com', '8061177588', 234, '$2a$10$QaNlUtSBA2f3b6JCDlLwXuaDwxv0WZICqjVSqkYrRk7BS1Rn67TuC', NULL, '2018-10-05 15:31:31'),
(31, 'chichichi1', 'kgdsgdfsbhdfjb', 'hydsudfsgkudfsgk', 'no', 'active', 'ghgf@jhgdfshj.co', '8061177588', 234, '$2a$10$hGLPBk7G.1yKu.hisnn3/OHMxXsb2i1WExulxvg7RjCt2FRUvLfeK', NULL, '2018-10-05 15:32:20'),
(32, 'chichichi1', 'hdfsjdfjk', 'AGS2298751708', 'no', 'active', 'hfd@hjdfs.com', '8061177588', 234, '$2a$10$XbmtQ7Nnj0zmAL7yevbamOYhevZ8W2tY844tueEk.ewMDk686yrBi', NULL, '2018-10-05 15:40:00'),
(33, 'chichichi1', 'jfdkjlfdl', 'kjfdjfdjlhy', 'no', 'active', 'kjlfd@jfddf.com', '8061177588', 234, '$2a$10$MVangTXrMUeHHpc9jyB4..4w5C6A97/BxqZt2g1hzNChdA.0M42LW', NULL, '2018-10-05 15:40:55'),
(34, 'chichichi1', 'jkgdkjjkd', 'jfdufdjuhdf', 'no', 'active', 'jkfds@hjds.com', '8061178755', 234, '$2a$10$dJbwKd6qwPFCPZeuXB7spOpWzBVTEejvjTYvKOZqczyvgw8N1PdiC', NULL, '2018-10-05 15:41:40'),
(35, 'chichichi1', 'jvjcvhjufdl', 'jkfdfdkj', 'no', 'active', 'kjdxc2@2jvcjm.com', '8061177588', 234, '$2a$10$bhCr4Fh.aH04zsLtud8F4OPun9hSuiaqQim4xPbyF3CQdNDaQQqZW', NULL, '2018-10-05 15:45:49'),
(36, 'chichichi1', 'hdfsjkdfh', 'bcfhbcxfj', 'no', 'active', 'hjfd@hjk.com', '8061177588', 234, '$2a$10$r2c96k8ibuW6Ew4kXHV76.DZ.DMWp6dmwSw1r/eiUw49iq5RJZNiK', NULL, '2018-10-05 15:48:43'),
(37, 'chichichi1', 'hjkfrhkufjfd', 'hdfshj80611', 'no', 'active', 'hjg@hf.com', '8061177588', 234, '$2a$10$GcsoVg195u3cwOUk1EiqZeqX7YbbAu4LgQFjm.Z7QBDxzJm.ZnkYe', NULL, '2018-10-05 15:49:42'),
(38, 'chichichi1', 'hdfsjkdfhy', 'gdfshudfu', 'no', 'active', 'fdhj@ghdx.com', '8061177588', 234, '$2a$10$pOlIaJib1cRHNYLmsdmeNOg.9/z29/xZItFIPmOSgTGmKRmXUU5fi', NULL, '2018-10-05 15:50:52'),
(39, 'chichichi1', 'khfdjdfkjl', 'hfrduhgf', 'no', 'active', 'hufd@yufdg.com', '8061177588', 234, '$2a$10$g/xiZmVSA3RR2NgUv7PT7.CMGgcP6vjg2L3n4M1VmNa6sgEsISzvG', NULL, '2018-10-05 15:54:41'),
(40, 'chichichi1', 'jfduhffd8ugf', 'ncxjxdfkjlfd', 'no', 'active', 'jdf@hjkrkl.com', '8061177588', 234, '$2a$10$jnWNWU/HH2OEuoxbDvyAj.bqobo80yvgxpr7B7/ju1utzOa2lyHJG', NULL, '2018-10-05 15:55:35'),
(41, 'chichichi1', 'hudfiufduee', 'iudsiehiyghy', 'no', 'active', 'dsds@jurfjfd.cdsujk', '8061177588', 234, '$2a$10$C7s46I5kz4/8lJHfFRmQ8.2VXduoD./QE9Ki7s4g4yxIk5sCigAbq', NULL, '2018-10-05 15:56:20'),
(42, 'chichichi1', 'hbdfsjkfdgt', 'jfdkjdfjg', 'no', 'active', 'hjdf@ghjdf.co', '8061177588', 234, '$2a$10$RRTEilfAQqFJMLjoACY.ie4S5lVQnajFvlolUe7zXBVXT0i1K0Tva', NULL, '2018-10-05 15:57:02'),
(43, 'chichichi1', 'bhjufdhjdf', 'kjfdkhfdkjl', 'no', 'active', 'jdf@hjfd.com', '8061177588', 234, '$2a$10$Up6jn3ih4acSEyuqYg6zkuCI7bGx9SiID33.eMcTDXok0HOKlmkwS', NULL, '2018-10-05 16:00:37'),
(44, 'chichichi1', 'gfchukfdhj', 'hufjfddb', 'no', 'active', 'jfd2h@hjfdjk.com', '8061177588', 234, '$2a$10$2k1odL2dt7TGLbng0Y5JzejJLT9mh6LQTGBxwR/CPpyS8fjBxqoTG', NULL, '2018-10-05 16:14:01'),
(45, 'chichichi1', 'bhfdjkcvffg', 'ncxjxdfkjlfd', 'no', 'active', 'jdf@hjkyurkl.com', '8061177588', 234, '$2a$10$zHtuhZ/H0/O33vWNPaYMHu/Ma/XDjgzkiK/dmOtAzeQfuYy3png5C', NULL, '2018-10-05 16:14:42'),
(46, 'chichichi1', 'khfjvchhj', 'bcfhbcxfjgthy', 'no', 'active', 'jufd@hfd.co', '8061178755', 234, '$2a$10$Ex4MnD2/qTHlP4myPK6cxeyz6WP2CiNRjG8fsES8yJcIw2I0vrZZC', NULL, '2018-10-05 16:16:55'),
(47, 'chichichi1', 'hudhjfduee', 'iudsiehiyghy', 'no', 'active', 'djfds@jurfjfd.cdsujk', '8061177588', 234, '$2a$10$98eumfYahDODs25NiG8AIuNo06P5.yheThf04jyvwGXycmUF5jIsC', NULL, '2018-10-05 16:17:41'),
(48, 'chichichi1', 'jcxjfdjhjill', 'hfrduhgf', 'no', 'active', 'hgufd@yufdg.com', '8061177588', 234, '$2a$10$D7uU5OTKiFMAW4Ezj2GiPeOeQK7H0vYgO6LVQvyd1TL/1aH9vRVQG', NULL, '2018-10-05 16:18:40'),
(49, 'chichichi1', 'hjkfdhjkfdfds', 'hfrduhgf', 'no', 'active', 'jdfsrsgfd@yufdg.com', '8061177588', 234, '$2a$10$qTL7cQrijC14mJZaC/CoBe8TLSM1NJFYS0iqgtjGLIFAK0D7Cc.Ae', NULL, '2018-10-05 16:19:39'),
(50, 'chichichi1', 'dfsjuzcvfg', 'jfdkjdfjg', 'no', 'active', 'hfjfd@hjfds.co', '8061177588', 234, '$2a$10$trtH1W4mC1GPFRpEYequ0.mYAPYGPmMaJzkhirsM5YzKATU6SBf8W', NULL, '2018-10-05 16:20:41'),
(51, 'chichichi1', 'hudfhfddfh', 'dfsudsfhu', 'no', 'active', 'huyfdbd@hjdsk.com', '8061177588', 234, '$2a$10$jgRFyhi2pbk/Gd7E1eO6RuUjiImVSz2iAILKeMhk7M8Cj/jah9QkO', NULL, '2018-10-05 16:22:09'),
(52, 'chichichi1', 'ghkfhjfdk.y', 'hufdjudfjhdf', 'no', 'active', 'hfddf@hjfx.com', '8061179365', 234, '$2a$10$EQsiluh67VTrgGZWcd1faOrvkegzAWqqDbCGMXWUpqqcx7nqcGdim', NULL, '2018-10-05 16:23:24'),
(53, 'chichichi1', 'jvcxknldf@', 'ugfbkj;gflgdh', 'no', 'active', 'nhmgdd@hfcx.co', '8061178755', 234, '$2a$10$6SbKtYYwoa0ek8Bx0/g2Iu5rGLb6IODXo99.bvSb6PsTOzYZO6K2a', NULL, '2018-10-05 16:25:02'),
(54, 'chichichi1', 'ghkchjfgf', 'klhfdkjlyttu', 'no', 'active', 'dgkhf@hjgf.biz', '8061177588', 234, '$2a$10$WzB0fsZ9Fpj3NbW/uAPE0eiupSriqlCe4WGxB/8x.qcJfcw7nEwi.', NULL, '2018-10-05 16:29:01'),
(55, 'chichichi1', 'hjfdkjdfjk', 'hufjfddb', 'no', 'active', 'fdgtf2h@hjfdjk.com', '8061177588', 234, '$2a$10$mby7pYX.OlXfm9bwpRhRB.MfJpJpUalaUWPk8liM8NueE.a8BhUHa', NULL, '2018-10-05 16:32:02'),
(56, 'chichichi1', 'bhfdhjvffg', 'ncxjxdfkjlfd', 'no', 'active', 'jdf@hhyjkyurkl.com', '8061177588', 234, '$2a$10$tGvwOssK2Qzau3fQb9RtauyCGJJwgGZQWLsY/MxkV0PSZkJksLw5e', NULL, '2018-10-05 16:34:17'),
(57, 'chichichi1', 'hjbgfjfdjhfdhyu', 'bcfhbcxfjgthy', 'no', 'active', 'hyjgyjghg@hjfdfd.website', '8061178755', 234, '$2a$10$ETLb.HfEbrKaGS5azWu87eA66oJXwvrOLvjJSEB3u/Rg8sGf.J.mC', NULL, '2018-10-05 16:35:29'),
(58, 'chichichi1', 'gfiugfugtf', 'iudsiehiyghy', 'no', 'active', 'ghjfdhfd@hjfxhjfdx.co', '8061177588', 234, '$2a$10$LMuCcZOyDThpmpL/kGMQDOkCRwDewIa9E7KcsdT4VwuMtq23Vssmq', NULL, '2018-10-05 16:36:34'),
(59, 'chichichi1', 'gyufdufdilhfd', 'hfrduhgf', 'no', 'active', 'ugkfdkfd@cfxkjlfd.co', '8061177588', 234, '$2a$10$m8XpeHYMf52oZTm.2gZwW.Pc04L/vpOHW6PXpEdIQI6Zz7oZvU.ZC', NULL, '2018-10-05 16:37:54'),
(60, 'chichichi1', 'hyjdfshyjugfdkh', 'jfdkjdfjg', 'no', 'active', 'hjfddf@hyjfd.com', '8061177588', 234, '$2a$10$/41NuVnRf2kA4w3.51HBButJuUgJHjeOJpswwNXFpg3vwj/k6hK.2', NULL, '2018-10-05 16:39:01'),
(61, 'chichichi1', 'gdsfgfdjhfrt', 'dfsudsfhu', 'no', 'active', 'yufdfd@ghjfdsg.com', '8061177588', 234, '$2a$10$8ap2atluHCh47xdoz8Gu1OlG2dmCredrXrkXxAdd1HzyPZ5n1.G1K', NULL, '2018-10-05 16:40:18'),
(62, 'chichichi1', 'hfdkfdukhfd', 'hufdjudfjhdf', 'no', 'active', 'hhkfd@hjfsfds.co', '8061179365', 234, '$2a$10$GxWKuzu1SdTnd4wCIBiXMuVApgQt9J2Bb1E198vMmP21dfVmn5FBy', NULL, '2018-10-05 16:41:27'),
(63, 'chichichi1', 'jvcxknldhf@', 'ugfbkj;gflgdh', 'no', 'active', 'nhm4gdd@hfcx.co', '8061178755', 234, '$2a$10$PInV0WGeYmpG9pWLK.zrTO8zrZpvEj.JopG199JSpT845uQcGxI1G', NULL, '2018-10-05 16:42:47'),
(64, 'chichichi1', 'jDuiZyv7qU', 'klhfdkjlyttu', 'no', 'active', 'dgkhf@hjDuiZyv7qUf.biz', '8061177588', 234, '$2a$10$AHUQ0DFA1npuq0nB4FQFq.9qI0PFjgmUSo.oJ0UWGkFXihaWHugPW', NULL, '2018-10-05 16:43:46'),
(65, 'chichichi1', 'uidfgfrdgvdfk', 'jkfbgdfskjgdflfdkl', 'no', 'active', 'judfkhfkd@jkffd.co', '8071179366', 234, '$2a$10$F1TqRCyVS3BBON/uVoYsq.ELKHO834y3nBy.lQNMx09CiHShAaPZe', NULL, '2018-10-08 12:58:58'),
(66, 'chichichi1', 'jhbgfdvgdfud', 'hfdufdjufd', 'no', 'active', 'gfufd@hjfgiu.com', '8061178755', 234, '$2a$10$OA5z1x/xElS5SdfDXv5tKe2bd2kAda9cqzT2xhWYr4bKFzy.T70pe', NULL, '2018-10-08 14:07:25'),
(67, 'chichichi1', 'dytfhylkjyugj', 'kgtyugthfyjgy', 'no', 'active', 'jhkh@ifd.co', '8061177588', 234, '$2a$10$O0K3MJxgIoWX50RK1aSwIu3qKJ2MUSU9umD3DJJGv9400NGOgX/Fa', NULL, '2018-10-08 14:12:01'),
(68, 'chichichi1', 'dythhgtrlkjyugj', 'kgtyugthfyjgy', 'no', 'active', 'jhkt5t5h@ifd.co', '8061177588', 234, '$2a$10$WvSG8tYNT8jYonkXDgJlF.n5BfBooKTm8ULJb/WFXOYD6McKLUXOe', NULL, '2018-10-08 14:33:07'),
(69, 'chichichi1', 'yuigfrlkjyugj', 'kgtyugthfyjgy', 'no', 'active', 'hjdf@ggj.co', '8061177588', 234, '$2a$10$v8NSMnZx4Mn/LxQ2do0LwOMdfCER/b/Xs8AsRbGeGBHyBxvtivrnK', NULL, '2018-10-08 14:36:03'),
(70, 'chichichi1', 'hjcxkjyugj', 'kgtyugthfyjgy', 'no', 'active', 'cmdbx@ggj.co', '8061177588', 234, '$2a$10$MfQTE5ZfM9s6UnAICf4B2u.uiWZVHkutaQrrpWvk8l.kzghbCnEvG', NULL, '2018-10-08 14:37:01'),
(71, 'chichichi1', 'kbdfbdxhjknjlojn', 'kjfdofgudoiuo', 'no', 'active', 'dsn@jugjuds.co', '8061178755', 234, '$2a$10$M7JNl7giLi3dIQlBSvHeWOfBo2zM/GUOoHD1JtGe7SeYiLxAhu7Xm', NULL, '2018-10-08 14:48:03'),
(72, 'chichichi1', 'ierytdehhiorej', 'kjfdofgudoiuo', 'no', 'active', 'fgdsh@hfgds.com', '8061178755', 234, '$2a$10$0Nvd8XtDTsHO92JEzHNlhuTJE4PpNneT6AUcFzg8E6zKHsaDqfnCu', NULL, '2018-10-08 15:08:48'),
(73, 'chichichi1', 'mghcvkhfkjdhfkl', 'kjfdofgudoiuo', 'no', 'active', 'fdih@dsih.biz', '8061178755', 234, '$2a$10$eqfq0jNTZWeLma3Zw8Sdy.k0YjFMqsUMO7.sZA.UnRoYnSFrlsUx6', NULL, '2018-10-08 15:10:29'),
(74, 'chichichi1', 'lohkjcfiug', 'kjfdofgudoiuo', 'no', 'active', 'kjghdfkjhf@gkjhy.co', '8061178755', 234, '$2a$10$fvXQZjWIyyKvflzVT402v.bKTVqNW41tPN5H6CnZDyfTfVHGF5ZTG', NULL, '2018-10-08 15:12:24'),
(75, 'chichichi1', 'logjcfjgjk', 'kjfdofgudoiuo', 'no', 'active', 'jcjgfd@gkjhjg.com', '8061178755', 234, '$2a$10$Eq/WPG4PQAV.pyzajlWa9O.lk2juFvX6vlsWyT8AhmHt5P44jBU0S', NULL, '2018-10-08 15:14:07'),
(76, 'chichichi1', 'gdfhfdugtd', 'jdsygdfgdfj', 'no', 'active', 'hjffg@ghfdsf.co', '8061177588', 234, '$2a$10$c0iOIlA2YA40AwGx.rC.tOVciAE8PlSgoa.yvdOoHS/8dSuVnXSbS', NULL, '2018-10-08 15:20:46'),
(77, 'chichichi1', 'uhhfidugtd', 'jdsygdfgdfj', 'no', 'active', 'hjffg@guigcff.co', '8061177588', 234, '$2a$10$aOjmR4vQXH2900gdWgOJDOopC4fMabgbe4U/.cyEuNkPP.3GjOBn.', NULL, '2018-10-08 15:22:16'),
(78, 'chichichi1', 'kjhfhghfrgh', 'jdsygdfgdfj', 'no', 'active', 'ufdyg@hhy.co', '8061177588', 234, '$2a$10$kbROsuUOBdC0HT8wSi4IbueEpTDoejWiLduYMn.mjaPiE/ax0o3Ka', NULL, '2018-10-08 15:24:14'),
(79, 'chichichi1', 'kkjhkjcdfhdf', 'ggjorjhfuhy', 'no', 'active', 'uftyttytg@hhy.co', '8061177588', 234, '$2a$10$ishWBL2/w963Ot.NKGhuk.5FPM8LdFS7jAgqoJUvdGLglJ7KfRuqy', NULL, '2018-10-08 15:25:46'),
(81, 'chichichi1', 'nbjkdcfkjd', 'ggjorjhfuhy', 'no', 'active', 'bhdhb@kgyjg.co', '8061177588', 234, '$2a$10$zuENN4xbSfny/f3dDQTM7uiuKuw4LWak4hVJEXq56naCe05KrNcn2', NULL, '2018-10-08 15:39:20'),
(82, 'chichichi1', 'nnbvllbgfol', 'ggjorjhfuhy', 'no', 'active', 'igfi23@kgfrd.com', '8061177588', 234, '$2a$10$mj2Z2bciC2gPEQIn0JxYvOt/AG8Cqrw.lUAg.bZeOKTsF0q5Pirbm', NULL, '2018-10-08 15:43:53'),
(83, 'chichichi1', 'kfhdiuhdfh', 'ggjorjhfuhy', 'no', 'active', 'hdfiufh@ljdfk.com', '8061177588', 234, '$2a$10$dTgx8tg92q2DTTciLwUdF.TuDM6nSqbqVem1K/a5tg.DgyWVwuh.i', NULL, '2018-10-08 16:27:49'),
(84, 'chichichi1', 'kj.fhdkhfhdhu', 'ggjorjhfuhy', 'no', 'active', 'udfhf@hjd.com', '8061177588', 234, '$2a$10$Is8V1I4eG/dTXs1IUsFAVO2Ihul1q02AqduBmpr1NZXpDdqGEssZi', NULL, '2018-10-08 17:01:47'),
(85, 'chichichi1', 'kjgfhfhjgtgy', 'ggjorjhfuhy', 'no', 'active', 'hjffj#@kjhjh.com', '8061177588', 234, '$2a$10$6A0KPY0H7cXdUR0cZh.D3uDGQFCJ86o6r/4U21LmxuWI7CRN/4Ywm', NULL, '2018-10-08 17:07:34'),
(86, 'chichichi1', 'khdhhfiu', 'hjudffdhgdfjgjkj', 'no', 'active', 'hvkdhkdj@lhfdgf.com', '8061179365', 234, '$2a$10$ZlvsZIjh6P93QEsEj41/au9lyMYL3dDQLeYC2Iz1eonlxURif/VdS', NULL, '2018-10-08 17:13:17');

-- --------------------------------------------------------

--
-- Table structure for table `user_tree`
--

CREATE TABLE `user_tree` (
  `sponsor` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL,
  `feeder` varchar(255) DEFAULT NULL,
  `stage1` varchar(255) DEFAULT NULL,
  `stage2` varchar(255) DEFAULT NULL,
  `stage3` varchar(255) DEFAULT NULL,
  `stage4` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_tree`
--

INSERT INTO `user_tree` (`sponsor`, `user`, `lft`, `rgt`, `feeder`, `stage1`, `stage2`, `stage3`, `stage4`) VALUES
('be', 'chichichichi', 1, 172, 'yes', 'yesw', 'yes', 'yes', 'yes'),
('chichichichi', 'chichichi1', 6, 171, 'yes', 'yes', NULL, NULL, NULL),
('chichichichi', 'jgfvfdkjfghfcgh', 4, 5, 'yes', NULL, NULL, NULL, NULL),
('chichichichi', 'cvdeghhhhhh', 2, 3, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'chichichi1gtu', 169, 170, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'yeyuffrhyfkhf', 167, 168, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'gdfghdkhgdrjl', 165, 166, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'khkgdhrgdffdu', 163, 164, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'khkgdhrgdffdd', 161, 162, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ugdfnsdjudfu', 159, 160, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hyfdhjufbgkjdfh', 157, 158, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjgdhgfklj', 155, 156, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'yrhugfkjg', 153, 154, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'fdshyhjhfhynh', 151, 152, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'fhdfkfdjukdfjk', 149, 150, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hdfkg@vhfb', 147, 148, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ghfgfdkjfdbhj', 145, 146, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ghdfgkfjgdfkjlfd', 143, 144, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjdsjkdfsjzdfsk', 141, 142, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jfdkjzdfshdfs', 139, 140, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'khvzdfskjdfk;ljdf', 137, 138, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hfdskdfkjdfkj', 135, 136, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gfcfxcjd', 133, 134, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'vhjcfxhbdfjbkdf', 131, 132, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hhjugkfdhj', 129, 130, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'ghfdsbhjdfj', 127, 128, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'hjdshjdfhjdf', 125, 126, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'bgvsdkhdsbhjfhjb', 123, 124, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'jgyfduhdfkjdf', 121, 122, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'hjfdhfhgg', 119, 120, 'yes', 'yes', NULL, NULL, NULL),
('chichichi1', 'kgdsgdfsbhdfjb', 117, 118, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hdfsjdfjk', 115, 116, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jfdkjlfdl', 113, 114, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jkgdkjjkd', 111, 112, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jvjcvhjufdl', 109, 110, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hdfsjkdfh', 107, 108, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjkfrhkufjfd', 105, 106, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hdfsjkdfhy', 103, 104, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'khfdjdfkjl', 101, 102, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jfduhffd8ugf', 99, 100, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hudfiufduee', 97, 98, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hbdfsjkfdgt', 95, 96, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'bhjufdhjdf', 93, 94, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gfchukfdhj', 91, 92, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'bhfdjkcvffg', 89, 90, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'khfjvchhj', 87, 88, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hudhjfduee', 85, 86, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jcxjfdjhjill', 83, 84, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjkfdhjkfdfds', 81, 82, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'dfsjuzcvfg', 79, 80, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hudfhfddfh', 77, 78, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ghkfhjfdk.y', 75, 76, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jvcxknldf@', 73, 74, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ghkchjfgf', 71, 72, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjfdkjdfjk', 69, 70, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'bhfdhjvffg', 67, 68, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjbgfjfdjhfdhyu', 65, 66, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gfiugfugtf', 63, 64, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gyufdufdilhfd', 61, 62, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hyjdfshyjugfdkh', 59, 60, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gdsfgfdjhfrt', 57, 58, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hfdkfdukhfd', 55, 56, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jvcxknldhf@', 53, 54, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jDuiZyv7qU', 51, 52, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'uidfgfrdgvdfk', 49, 50, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'jhbgfdvgdfud', 47, 48, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'dytfhylkjyugj', 45, 46, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'dythhgtrlkjyugj', 43, 44, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'yuigfrlkjyugj', 41, 42, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'hjcxkjyugj', 39, 40, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kbdfbdxhjknjlojn', 37, 38, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'ierytdehhiorej', 35, 36, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'mghcvkhfkjdhfkl', 33, 34, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'lohkjcfiug', 31, 32, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'logjcfjgjk', 29, 30, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'gdfhfdugtd', 27, 28, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'uhhfidugtd', 25, 26, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kjhfhghfrgh', 23, 24, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kkjhkjcdfhdf', 21, 22, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'nbjkdcfkjd', 19, 20, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'nbjkdcfkjd', 17, 18, NULL, NULL, NULL, NULL, NULL),
('chichichi1', 'nnbvllbgfol', 15, 16, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kfhdiuhdfh', 13, 14, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kj.fhdkhfhdhu', 11, 12, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'kjgfhfhjgtgy', 9, 10, 'yes', NULL, NULL, NULL, NULL),
('chichichi1', 'khdhhfiu', 7, 8, 'yes', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feeder_tree`
--
ALTER TABLE `feeder_tree`
  ADD PRIMARY KEY (`matrix_id`);

--
-- Indexes for table `pin`
--
ALTER TABLE `pin`
  ADD UNIQUE KEY `user` (`user`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `stage1_tree`
--
ALTER TABLE `stage1_tree`
  ADD PRIMARY KEY (`matrix_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feeder_tree`
--
ALTER TABLE `feeder_tree`
  MODIFY `matrix_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `stage1_tree`
--
ALTER TABLE `stage1_tree`
  MODIFY `matrix_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
