-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 23, 2024 at 02:43 PM
-- Server version: 10.3.32-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikeventdb`
--

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `nameOf`, `description`, `president`, `email`, `websiteUrl`, `createdAt`, `updatedAt`, `clubId`) VALUES
(1, 'Waikato Ulysses Branch', 'Waikato Ulysses Branch Desc', 'A Brunskill', 'waikato@ulysses.org.uk', 'https://www.facebook.com/groups/ulysseswaikato', '2024-09-22 23:02:48', '2024-09-22 23:02:48', 1),
(2, 'Rotorua Branch', 'Rotorua Branch Desc', 'Rotorua Branch Pres', 'Rotorua Branch email', 'Rotorua Branch web', '2024-09-22 23:02:48', '2024-09-22 23:02:48', NULL);

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`id`, `nameOf`, `description`, `president`, `email`, `websiteUrl`, `mainImageRef`, `googleMapUrl`, `createdAt`, `updatedAt`) VALUES
(1, 'Ulysses Club of NZ', 'Ulysses Club of NZ Desc', 'Andy Smith', 'contact@ulysses.org.nz', 'https://ulysses.org.co.nz', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42'),
(2, 'Hamilton Social Riders Club', 'Hamilton Social Riders Club Desc', 'NA', 'social@bike.org', '', NULL, NULL, '2024-09-22 23:00:42', '2024-09-22 23:00:42');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
