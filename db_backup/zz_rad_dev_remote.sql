-- --------------------------------------------------------
-- Host:                         165.22.216.3
-- Server version:               10.11.2-MariaDB - MariaDB Server
-- Server OS:                    Linux
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for zz_rad_dev_1
CREATE DATABASE IF NOT EXISTS `zz_rad_dev_1` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `zz_rad_dev_1`;

-- Dumping structure for table zz_rad_dev_1.prod_meta
CREATE TABLE IF NOT EXISTS `prod_meta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` int(11) NOT NULL,
  `heading` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prod_id` (`prod_id`),
  CONSTRAINT `prod_meta_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `prod` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_meta: ~0 rows (approximately)

-- Dumping structure for table zz_rad_dev_1.prod_meta_item
CREATE TABLE IF NOT EXISTS `prod_meta_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_meta_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prod_meta_id` (`prod_meta_id`),
  CONSTRAINT `prod_meta_item_ibfk_1` FOREIGN KEY (`prod_meta_id`) REFERENCES `prod_meta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_meta_item: ~0 rows (approximately)

-- Dumping structure for table zz_rad_dev_1.prod_mo_no
CREATE TABLE IF NOT EXISTS `prod_mo_no` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` smallint(11) DEFAULT NULL,
  `name` varchar(200) NOT NULL,
  `prefix` varchar(50) NOT NULL,
  `postfix` varchar(50) NOT NULL,
  `hsn_code` varchar(10) NOT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `prod_mo_no_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_mo_no: ~0 rows (approximately)

-- Dumping structure for table zz_rad_dev_1.prod_mo_no_prod_spec
CREATE TABLE IF NOT EXISTS `prod_mo_no_prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_mo_no_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_mo_no_id_2` (`prod_mo_no_id`,`spec_name`),
  CONSTRAINT `prod_mo_no_prod_spec_ibfk_1` FOREIGN KEY (`prod_mo_no_id`) REFERENCES `prod_mo_no` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_mo_no_prod_spec: ~0 rows (approximately)

-- Dumping structure for table zz_rad_dev_1.prod_mo_no_prod_spec_val
CREATE TABLE IF NOT EXISTS `prod_mo_no_prod_spec_val` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_mo_no_prod_spec_id` int(11) NOT NULL,
  `spec_value` varchar(200) NOT NULL,
  `spec_code` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_mo_no_product_spec_id_2` (`prod_mo_no_prod_spec_id`,`spec_value`),
  CONSTRAINT `prod_mo_no_prod_spec_val_ibfk_1` FOREIGN KEY (`prod_mo_no_prod_spec_id`) REFERENCES `prod_mo_no_prod_spec` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=881 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_mo_no_prod_spec_val: ~0 rows (approximately)

-- Dumping structure for table zz_rad_dev_1.prod_spec
CREATE TABLE IF NOT EXISTS `prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  `spec_val` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`prod_id`,`spec_name`),
  CONSTRAINT `prod_spec_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `prod` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13830 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table zz_rad_dev_1.prod_spec: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
