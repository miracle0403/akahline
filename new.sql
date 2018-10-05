-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2018 at 08:35 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `firstspill` (IN `mother` INT(11))  BEGIN
SELECT DISTINCT node.user, (COUNT(parent.user) - (sub_tree.depth + 1)) AS depth
FROM feeder AS node,
        feeder AS parent,
        feeder AS sub_parent,
        (
                SELECT node.user, (COUNT(parent.user) - 1) AS depth
                FROM feeder AS node,
                feeder AS parent
                WHERE node.lft BETWEEN parent.lft AND parent.rgt
                AND node.user = mother
                GROUP BY node.user
                ORDER BY node.lft
        )AS sub_tree
WHERE node.lft BETWEEN parent.lft AND parent.rgt
        AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
        AND sub_parent.user = sub_tree.user
GROUP BY node.user
HAVING depth > 0
ORDER BY node.lft;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `leafadd` (IN `mother` INT(11), IN `child` INT(11))  BEGIN

SELECT @myLeft := lft FROM feeder WHERE user = mother;
UPDATE feeder SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE feeder SET lft = lft + 2 WHERE lft > @myLeft;

INSERT INTO feeder(user,lft,rgt) VALUES(child, @myLeft + 1, @myLeft + 2);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register` (IN `sponsor` TEXT, IN `name` TEXT, IN `phone` INT(11), IN `code` INT(11), IN `username` TEXT, IN `email` TEXT, IN `password` TEXT, IN `status` INT(11))  BEGIN
                          INSERT INTO user (full_name, phone, code, username, email, password, status) VALUES (name, phone, code, username, email, password, status);
                          SELECT @user := LAST_INSERT_ID() AS user_id;
                          UPDATE user SET sponsor = sponsor WHERE user_id = @user;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `feeder`
--

CREATE TABLE `feeder` (
  `user` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeder`
--

INSERT INTO `feeder` (`user`, `lft`, `rgt`) VALUES
(1, 1, 6),
(4, 4, 5),
(5, 2, 3);

-- --------------------------------------------------------

--
-- Table structure for table `feeder_tree`
--

CREATE TABLE `feeder_tree` (
  `matrix_id` int(11) NOT NULL,
  `sponsor` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `a` int(11) DEFAULT NULL,
  `b` int(11) DEFAULT NULL,
  `aa` int(11) DEFAULT NULL,
  `ab` int(11) DEFAULT NULL,
  `ba` int(11) DEFAULT NULL,
  `bb` int(11) DEFAULT NULL,
  `aaa` int(11) DEFAULT NULL,
  `aab` int(11) DEFAULT NULL,
  `aba` int(11) DEFAULT NULL,
  `abb` int(11) DEFAULT NULL,
  `baa` int(11) DEFAULT NULL,
  `bab` int(11) DEFAULT NULL,
  `bba` int(11) DEFAULT NULL,
  `bbb` int(11) DEFAULT NULL,
  `aaaa` int(11) DEFAULT NULL,
  `aaab` int(11) DEFAULT NULL,
  `aaba` int(11) DEFAULT NULL,
  `aabb` int(11) DEFAULT NULL,
  `abaa` int(11) DEFAULT NULL,
  `abab` int(11) DEFAULT NULL,
  `abbb` int(11) DEFAULT NULL,
  `baaa` int(11) DEFAULT NULL,
  `baab` int(11) DEFAULT NULL,
  `baba` int(11) DEFAULT NULL,
  `babb` int(11) DEFAULT NULL,
  `bbaa` int(11) DEFAULT NULL,
  `bbab` int(11) DEFAULT NULL,
  `bbba` int(11) DEFAULT NULL,
  `bbbb` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feeder_tree`
--

INSERT INTO `feeder_tree` (`matrix_id`, `sponsor`, `user`, `a`, `b`, `aa`, `ab`, `ba`, `bb`, `aaa`, `aab`, `aba`, `abb`, `baa`, `bab`, `bba`, `bbb`, `aaaa`, `aaab`, `aaba`, `aabb`, `abaa`, `abab`, `abbb`, `baaa`, `baab`, `baba`, `babb`, `bbaa`, `bbab`, `bbba`, `bbbb`) VALUES
(1, 0, 1, 4, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 1, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 1, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset`
--

CREATE TABLE `password_reset` (
  `user` int(11) NOT NULL,
  `code` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pin`
--

CREATE TABLE `pin` (
  `pin` text NOT NULL,
  `serial` text,
  `user_id` int(11) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_used` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pin`
--

INSERT INTO `pin` (`pin`, `serial`, `user_id`, `date_created`, `date_used`) VALUES
('$2b$15$EsIEunFE2HME4Fx5gKRIaeIehFyku.fYBt0F7AkA.A.mDU4qsoTCS', 'j3IXYChlsH', NULL, '2018-08-04 05:12:21', NULL),
('$2b$15$SW2M4pXiE1mubT3g2ufNkuaNl9hnA6scl9BgLgmbf1COSEqDdIunC', 'ltW22xZXBd', 4, '2018-08-04 05:13:00', NULL),
('$2b$15$DxSCbgZbze6GYFz.XmYgw./b8G0y5aJm7/7o13kb5lWfpREWG0sN2', 'vrmPu5di4N', 5, '2018-08-04 05:16:40', NULL),
('$2b$15$rxvPF8rM0V5aDbd5YcpF4uJAAv1eAuANKdvFLbIVJJS8gseRcPSIu', 'C5ejtDXBfZ', NULL, '2018-08-10 13:37:39', NULL),
('$2b$15$CNxQidy5clCZHIQyICJGs.v8uR0h7pQ12NORYFNE2z9wkHjvRdEGa', 'dOKnNuYpea', NULL, '2018-08-10 13:50:15', NULL),
('$2b$15$rqI7xRa7hNiHZPtVQL/KNewQUpZWVD4klV2ZBaUEd7M8a0eIufMJe', 'V4tWw0zvMw', NULL, '2018-08-10 14:17:45', NULL),
('$2b$15$2UkS7PeJl6DAilML53dLzuWJ0Fnxbap06uZZ3u.Tj/zfra6hTqJEO', 'fD4yVFQ2KV', NULL, '2018-08-10 14:21:39', NULL),
('$2b$15$keuYPdJVrmgw/CmuGZu1VOZfVu21PMyvToJAnRgNVo8taqNh7dybC', 'BQIlZHeYfu', NULL, '2018-08-10 14:23:27', NULL),
('$2b$15$xy1JSXiqaxn.ZwI1wO/xEeiujB35y3vnUbjo7sJs55KVu6PsYwYd.', '3r3ysShcam', 6, '2018-08-10 14:31:36', NULL),
('$2b$15$jhz1t3kLgKZDuXiXuxNkLeQJh4N3QB8bjegby1O6FjytAT6o6bque', 'lptX4ihlMH', NULL, '2018-08-10 14:32:56', NULL),
('$2b$15$FK339R9AuRfKK7eF79brNuJU.bHW9/bcDoNNo36ZcVL48RitKoL4m', 'LhdGUz8eXQ', NULL, '2018-08-10 14:33:15', NULL),
('$2b$15$d.L4NbyAs5t0gHofUswQAODiBQZeYYd.tB4IGi6ipzWyVDJTA.06e', 'aWv3JujF3F', NULL, '2018-08-10 14:34:00', NULL),
('$2b$15$F/zKexlGdSUeXcoI8jnd2uHCxIpoi5Nw8PppI71amxeBPTYbZlMd.', 'ZAcKZaXs1x', NULL, '2018-08-10 14:34:44', NULL),
('$2b$15$X9iv1DHL1fpDbG9EwEw1mOr3lKNtbav9H.5xDHh/CSudf1y8uJjbe', 'r6eRfxraHm', NULL, '2018-08-10 14:39:55', NULL),
('$2b$15$KqqcLicKr3lJontYlYcvaO9qzpxUgqBH9MUjFZdTWwger/6aRiWEG', 'CAYH1DIsBl', NULL, '2018-08-10 14:41:58', NULL),
('$2b$15$F.bOz9Vi45AW.o1LoChsQezAaaIwRinCbQ8t/vVXRCr3DsRm8eoUS', 'dSmC5nxnEE', NULL, '2018-08-10 14:42:28', NULL),
('$2b$15$4sUVrQmQS4MMez9ZZa0XZ.E7OsqGRPQB.NIacX//Om/Ys6eDoWlya', 'ZQmLh6lpdW', NULL, '2018-08-10 14:43:37', NULL),
('$2b$15$41yQNh0gueCaLIdjnYIVZeGmPMEIduC.YbDIY/dJC8MtzPg1LXHRS', 'WDRhKtU2uA', NULL, '2018-08-10 14:44:52', NULL),
('$2b$15$vOxbGD.X4YbHq4mATU551OKKDzG3AIdepkcQ1A/lnGl8e40XSsvqK', 'GMHMDtCoTl', NULL, '2018-08-10 14:47:28', NULL),
('$2b$15$ZJWnXjRSoZChnqKSIU60X.23l4MWSONK4Z0eYhcRtjPzF/JnvlU9q', 'JyATMieAL2', NULL, '2018-08-10 14:48:36', NULL),
('$2b$15$rceNjqWVCg3hbMPsv49a2emp3ZYX0TL0oTmRmAaO/P70mD0or4CDe', '1tfvBmhUGt', NULL, '2018-08-10 14:49:05', NULL),
('$2b$15$qOY9eu9rRI7/gUspvucdhua.WZZ5bX5ShFurI9gkMK9s1WV134w06', 'wbS84xLGFp', NULL, '2018-08-10 14:56:31', NULL),
('$2b$15$LZRQDS06W1DdzId0gCAYluhJvd91/dBlBTqa24kd26HnWhXcw/zRy', 'MGNtRoxz6i', NULL, '2018-08-10 14:57:53', NULL),
('$2b$15$tTpiiKhbZfgkPPeqgEDHD.TkWpV5VPGgpF5a75.VabUdhHsZnZ0n2', 'RuIVhlxmQY', NULL, '2018-08-10 14:58:51', NULL),
('$2b$15$2E3Wet6e8NqdTS7sovI87Odsn5Y3u24FPtVGsBtgym3.9EiBr.nS.', 'VmJH4DHCFV', NULL, '2018-08-10 14:59:44', NULL),
('$2b$15$YQKQNe2Fxkdlt2hdbLISteCK/GLN/BIezh2oYfzWiXn7kmmLvhD..', 'A0bHHnH0kQ', NULL, '2018-08-10 15:01:05', NULL),
('$2b$15$XpIBatgH5XM7Ph2UnhliUeoB/T0W36cNqeTLduzTa6hiUE4KBn1fq', 'itFxUE7I5M', NULL, '2018-08-10 15:03:03', NULL),
('$2b$15$oMy9w.nlJsuSz8Fngh11QODrrT7w0diGdS4l7I8VTX3BAmtGTsbRC', 'LlG1wTIuEv', NULL, '2018-08-10 15:04:23', NULL),
('$2b$15$bJt1hGJ5BeReP9KC2h6Df.DjIg7JdXdN7kVhql86iZbpnmRBvh9ni', 'AeP4X61UZZ', NULL, '2018-08-10 15:05:40', NULL),
('$2b$15$9pXR5Tl9CEo6AioQ/wjiIe2ywp0uY47VYV1y6TU81ox8ocTXF7KoG', 'WmcRUraUjP', NULL, '2018-08-10 15:05:57', NULL),
('$2b$15$z8EooKNa3AmhtaLlJ1Eu5uU6mMwXpTRb4gd5iE6Ql4hDgNoAMX.02', 'oyIPn3hcr1', NULL, '2018-08-10 15:06:32', NULL),
('$2b$15$.0.PP1cuOCrygOnHmoR1De2ZT5GFLzbLRnyqGULnko4MvCrPI8oZ6', 'dtadorhvH3', NULL, '2018-08-10 15:07:03', NULL),
('$2b$15$8BN/k8mkAAkNneW.FQ30E.PQ6Ao5IfL5BSeEHmVmxPZq8WZxXfoWe', 'RyPFbcZ74s', NULL, '2018-08-10 15:07:30', NULL),
('$2b$15$D7Vbq39L8oJDa29Toi.kf.FxK8uiYJhLg9QpBXBwnBE40lzRri8M6', 'DN0PArfROK', NULL, '2018-08-10 15:07:52', NULL),
('$2b$15$qdkLj4zckMIMqKbvcqkY/.pSua4HZe2SMo3uNOudxIRS0eQsS6BwC', '5modsfTLlJ', NULL, '2018-08-10 15:08:04', NULL),
('$2b$15$qpMxDeGzku6E3dUyDLieLOzkF6xzG7zyoBdppOjCL9mh.w7w3MgUC', 'FWtFovn90M', NULL, '2018-08-10 15:08:33', NULL),
('$2b$15$lqHv//B7/K7lEBnwnkzxUOT68MRwO0QXrfjrN4bTkNFA6y.zuDhH6', '50DEbRLssC', NULL, '2018-08-10 15:09:37', NULL),
('$2b$15$lHXrPwgGptMzBF9Y8AOtX.4OvZmRzpmP7bXVMVlyqja/rDvpvqq7O', 'PDbdXVtNp2', NULL, '2018-08-10 15:10:56', NULL),
('$2b$15$1TXOiMeD0kk2/Ygi3LW0xe4afXg4qtFP3Oj.5BWEEZzqF35fFIPUy', 'BDph2EFiWN', NULL, '2018-08-10 15:11:52', NULL),
('$2b$15$a3W.GVq3mV/z6QJVyKseYO8TjUyWm.3hK.cY3LoRQIb60XRa2lfLm', 'XQGe2tjPDd', NULL, '2018-08-12 13:18:35', NULL),
('$2b$15$Gi9lcw3CGvFvZtb29476kefXI4jmk1VsWdsYEa0MZKr.uMf3lTH8O', 'OajmKZGM91', NULL, '2018-08-12 13:26:24', NULL),
('$2b$15$9JSIM8mQtkOR9p0149rDWuHA0yDfQX5i9wPYwyB8HN9MUwWKG.e82', '0hRHC2405p', NULL, '2018-08-12 14:56:41', NULL),
('$2b$15$z358MznkK3hMYXCU2nsYfuQ6fIudXSXP5ymy7ozrc7XlByN/kDKdG', 'xz2N5xo1tT', NULL, '2018-08-12 15:13:32', NULL),
('$2b$15$gI43hsNWpUCQ4ImV5LGGce.oxHuX30ESHMHNpyCr0fLMl4Zpw0roy', 'Eff8Lm2zr5', NULL, '2018-08-12 15:16:02', NULL),
('$2b$15$lbix/my7m2okkND0jmsiKOU0Pj0h8n1Fh3YvvJVOtscTXDqNCJZLe', 'M1Qc1VTUT7', NULL, '2018-08-12 15:17:18', NULL),
('$2b$15$13swbewZ8RBnRBuXtmvD.eijQPxopyM5spICUIynA92FDmavGlTAy', 'SmxEDMEd56', NULL, '2018-08-12 15:19:39', NULL),
('$2b$15$w3I64WtVv7XXfWf6T2GKq.VdhPnpgpjlbALwJeTomGlJNTBcG5TSK', 'O8t41vc17T', NULL, '2018-08-12 15:20:27', NULL),
('$2b$15$4UDEyHg9JxGmIrIFpBAgEeB3tXBv80iKUPAx4u7Zwuf9JXIqva3ta', 'uMR0D4XrA3', NULL, '2018-08-12 15:21:56', NULL),
('$2b$15$QpMiuBRN5qhZH6yUpLZ/5uzymfFMXrdBK8bUmdwjVAPVvJlUyu6Yi', 'NjY8oGy1Za', NULL, '2018-08-12 15:23:30', NULL),
('$2b$15$eu99Hm8cjyd7EBLt4TwQs./xY.sePZuoDJcXkOjSFKxX4zVmEdLjG', 'TbG1ewwWCj', NULL, '2018-08-12 15:25:54', NULL),
('$2b$15$x4TyBH.IFqEysJJQj4j6AeS4KB5vXpI0yQGdLIBeKOAJzVJmjZAn2', 'kjxORPhaoa', NULL, '2018-08-12 15:28:07', NULL),
('$2b$15$3qwrMgoW0hXUSVU/.zVPU.y5VhSw3I5B5L4jvx.NEFbB/nxfXmvka', 'm4DKVNaBiV', NULL, '2018-08-12 15:29:17', NULL),
('$2b$15$/7QzBozpzJZdMuIKvFDrVOvBaw8sWNOKRLZ2g9JoLsYqTvkW6t876', 'yWlYtE5mma', NULL, '2018-08-12 15:35:26', NULL),
('$2b$15$mGkJoGDla6Sqe4xz1EXky.NHJ4zfS3enfHK9GB0mFE0J1ZYlG5JD.', 'cLicNCRAmL', NULL, '2018-08-12 15:39:33', NULL),
('$2b$15$AHmkYFMPUTYOWVkuZfq5.ef1LYv/xAy/S4Q1cke0YYk7t.3MGk9ju', 'mU3J1nBPk9', NULL, '2018-08-12 15:42:15', NULL),
('$2b$15$F1ktOk.wcG/cmXIMxVbEU.SSKkYtN0rcL9ANbPv2iXEku5jChIxUe', 'Qi7OELKiRT', NULL, '2018-08-12 16:43:54', NULL),
('$2b$15$LyI8r4CuFATExdZAs15FtO6z37xoJdzNH1.npa8rtfuQNQeDsrSMy', 'jZckhjwbs8', NULL, '2018-08-15 04:30:51', NULL),
('$2b$15$av7SwvnkKs3pQdLzNvFAS.eMyC9L.D2eyXlp1GZBUA5PqpCe7wJRq', 'oZduQbVPf7', NULL, '2018-08-15 04:42:24', NULL),
('$2b$15$xmP82.ZZP2dU4ojKmNQA0.NkWkzJBCCSWf9NqJIpR6nlZZuG1g3eq', 'dL9s1o1Pmc', NULL, '2018-08-15 05:56:00', NULL),
('$2b$15$xz8naStM9WIFDQU1gg.zquyBLPr.4rM6eP7HR99s0rlWTdgjGIQ8C', 'qOuEfLHVMK', NULL, '2018-08-15 05:59:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pin_entrance`
--

CREATE TABLE `pin_entrance` (
  `user` int(11) NOT NULL,
  `entered_matrix` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pin_entrance`
--

INSERT INTO `pin_entrance` (`user`, `entered_matrix`) VALUES
(4, 1),
(5, 1),
(6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stage1`
--

CREATE TABLE `stage1` (
  `sponsor` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `aa` int(11) NOT NULL,
  `ab` int(11) NOT NULL,
  `ba` int(11) NOT NULL,
  `bb` int(11) NOT NULL,
  `aaa` int(11) NOT NULL,
  `aab` int(11) NOT NULL,
  `aba` int(11) NOT NULL,
  `abb` int(11) NOT NULL,
  `baa` int(11) NOT NULL,
  `bba` int(11) NOT NULL,
  `bbb` int(11) NOT NULL,
  `bab` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stage2`
--

CREATE TABLE `stage2` (
  `sponsor` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `a` int(11) NOT NULL,
  `b` int(11) NOT NULL,
  `aa` int(11) NOT NULL,
  `ab` int(11) NOT NULL,
  `ba` int(11) NOT NULL,
  `bb` int(11) NOT NULL,
  `aaa` int(11) NOT NULL,
  `aab` int(11) NOT NULL,
  `aba` int(11) NOT NULL,
  `abb` int(11) NOT NULL,
  `baa` int(11) NOT NULL,
  `bab` int(11) NOT NULL,
  `bba` int(11) NOT NULL,
  `bbb` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `stage3`
--

CREATE TABLE `stage3` (
  `sponsor` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `a` int(11) DEFAULT NULL,
  `b` int(11) DEFAULT NULL,
  `aa` int(11) DEFAULT NULL,
  `ab` int(11) DEFAULT NULL,
  `ba` int(11) DEFAULT NULL,
  `bb` int(11) DEFAULT NULL,
  `aaa` int(11) NOT NULL,
  `aab` int(11) DEFAULT NULL,
  `aba` int(11) DEFAULT NULL,
  `abb` int(11) DEFAULT NULL,
  `baa` int(11) DEFAULT NULL,
  `bab` int(11) DEFAULT NULL,
  `bba` int(11) DEFAULT NULL,
  `bbb` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `code` int(11) NOT NULL,
  `phone` bigint(20) NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `sponsor` text NOT NULL,
  `verification` text,
  `paid` text,
  `date_joined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `full_name`, `username`, `email`, `code`, `phone`, `password`, `status`, `sponsor`, `verification`, `paid`, `date_joined`) VALUES
(1, 'Miracle Lawrence', 'miracletest', 'miracletest@test.com', 234, 8061179366, 'gterhdbfcd', 0, 'miracletest', NULL, 'yes', '2018-08-03 12:23:22'),
(4, 'miracle lawrence', 'miracletest1', 'mimi@test.cem', 234, 2147483647, '$2b$15$booh5TLs3tSnz75Pj9JzlOeN5mbELWmO2164BT2p0XMTUPp4Bw.la', 0, 'miracletest', NULL, 'yes', '0000-00-00 00:00:00'),
(5, 'mimilovely', 'miracletest2', 'fjj@gggh.hff', 234, 2147483647, '$2b$15$WU2tqXWHH7Ko8ERmjKV9J./sbNpMAO0AzJGshbNIx/O9bkKFG.F7C', 0, 'miracletest', NULL, 'yes', '0000-00-00 00:00:00'),
(6, 'miracle lawrence', 'miracletest3', 'mimi@test.cec', 234, 2147483647, '$2b$15$HF0Qc0TJihAt2ck2iRDyJOawFGX07R2VEp1hcOFUtNGafcXTWzlK6', 0, 'miracletest', NULL, 'yes', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `user` int(11) NOT NULL,
  `code` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `feeder_tree`
--
ALTER TABLE `feeder_tree`
  ADD PRIMARY KEY (`matrix_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

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
  MODIFY `matrix_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
