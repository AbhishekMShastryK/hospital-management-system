-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2024 at 10:33 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

USE hospital_management_application;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_management_application`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AllRecords` ()   SELECT * FROM patient_info$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `patient_info`
--

CREATE TABLE `patient_info` (
  `patientid` varchar(9) NOT NULL,
  `name` varchar(255) NOT NULL,
  `emailid` varchar(255) NOT NULL,
  `dob` varchar(10) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `phonenumber` int(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `insuranceid` varchar(255) NOT NULL,
  `insurancecompany` varchar(255) NOT NULL,
  `insurancestartdate` varchar(10) DEFAULT NULL,
  `insuranceenddate` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_info`
--

INSERT INTO `patient_info` (`patientid`, `name`, `emailid`, `dob`, `gender`, `phonenumber`, `address`, `insuranceid`, `insurancecompany`, `insurancestartdate`, `insuranceenddate`) VALUES
('PT1231231', 'John Doe', 'johndoe1@example.com', '01-01-1980', 'Male', 123, '123 Main St, Anytown, IA 50000', 'INS1234567', 'Health Insurance Co.', '01-01-2023', '12-31-2023'),
('PT2352352', 'Jane Smith', 'janesmith2@example.com', '02-02-1981', 'Female', 234, '456 Oak Dr, Somecity, IA 50001', 'INS2345678', 'Health Insurance Co.', '02-01-2023', '01-31-2024'),
('PT7657657', 'Robert Johnson', 'robertjohnson3@example.com', '03-03-1982', 'Male', 345, '789 Pine Ln, Sometown, IA 50002', 'INS3456789', 'Health Insurance Co.', '03-01-2023', '02-28-2024'),
('PT9879879', 'Mary Williams', 'marywilliams4@example.com', '04-04-1983', 'Female', 456, '321 Elm St, Anyville, IA 50003', 'INS4567890', 'Health Insurance Co.', '04-01-2023', '03-31-2024'),
('PT0680680', 'James Brown', 'jamesbrown5@example.com', '05-05-1984', 'Male', 567, '654 Maple Ave, Someplace, IA 50004', 'INS5678901', 'Health Insurance Co.', '05-01-2023', '04-30-2024'),
('PT3453453', 'Patricia Davis', 'patriciadavis6@example.com', '06-06-1985', 'Female', 678, '987 Cedar Blvd, Anyplace, IA 50005', 'INS6789012', 'Health Insurance Co.', '06-01-2023', '05-31-2024'),
('PT7897897', 'Michael Miller', 'michaelmiller7@example.com', '07-07-1986', 'Male', 789, '246 Birch Pkwy, Someville, IA 50006', 'INS7890123', 'Health Insurance Co.', '07-01-2023', '06-30-2024'),
('PT9199199', 'Linda Wilson', 'lindawilson8@example.com', '08-08-1987', 'Female', 890, '135 Walnut Rd, Anywhere, IA 50007', 'INS8901234', 'Health Insurance Co.', '08-01-2023', '07-31-2024'),
('PT1131131', 'William Moore', 'williammoore9@example.com', '09-09-1988', 'Male', 901, '864 Spruce Ct, Somehere, IA 50008', 'INS9012345', 'Health Insurance Co.', '09-01-2023', '08-31-2024'),
('PT9959959', 'Elizabeth Taylor', 'elizabethtaylor10@example.com', '10-10-1989', 'Female', 12, '579 Cherry Ln, Everywhere, IA 50009', 'INS0123456', 'Health Insurance Co.', '10-01-2023', '09-30-2024');

-- --------------------------------------------------------

--
-- Table structure for table `patient_login`
--

CREATE TABLE `patient_login` (
  `patientid` varchar(9) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patient_login`
--

INSERT INTO `patient_login` (`patientid`, `password`) VALUES
('PT1231231', 'SamplePassword1'),
('PT2352352', 'SamplePassword2'),
('PT7657657', 'SamplePassword3'),
('PT9879879', 'SamplePassword4'),
('PT0680680', 'SamplePassword5'),
('PT3453453', 'SamplePassword6'),
('PT7897897', 'SamplePassword7'),
('PT9199199', 'SamplePassword8'),
('PT1131131', 'SamplePassword9'),
('PT9959959', 'SamplePassword10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
