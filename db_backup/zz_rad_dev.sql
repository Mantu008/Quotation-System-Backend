/*
SQLyog Ultimate v11.5 (64 bit)
MySQL - 10.11.2-MariaDB : Database - zz_rad_dev_1
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `access_role` */

DROP TABLE IF EXISTS `access_role`;

CREATE TABLE `access_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `deleteable` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `access_role` */

/*Table structure for table `access_role_perm` */

DROP TABLE IF EXISTS `access_role_perm`;

CREATE TABLE `access_role_perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `access_role_id` int(11) NOT NULL,
  `perm_id` int(11) NOT NULL,
  `value` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `access_role_id` (`access_role_id`,`perm_id`),
  KEY `perm_id` (`perm_id`),
  CONSTRAINT `access_role_perm_ibfk_1` FOREIGN KEY (`access_role_id`) REFERENCES `access_role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `access_role_perm_ibfk_2` FOREIGN KEY (`perm_id`) REFERENCES `perm` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4389 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `access_role_perm` */

/*Table structure for table `access_token` */

DROP TABLE IF EXISTS `access_token`;

CREATE TABLE `access_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` tinyint(4) NOT NULL,
  `token_type` char(10) DEFAULT NULL,
  `token` char(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `expiry_at` datetime NOT NULL DEFAULT addtime(current_timestamp(),'720:00:00'),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `access_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `access_token` */

/*Table structure for table `app` */

DROP TABLE IF EXISTS `app`;

CREATE TABLE `app` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `info_key` varchar(50) NOT NULL,
  `info_value` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `info_key` (`info_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `app` */

/*Table structure for table `bank` */

DROP TABLE IF EXISTS `bank`;

CREATE TABLE `bank` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `acct_no` varchar(200) NOT NULL,
  `ifsc` varchar(200) NOT NULL,
  `branch` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `bank` */

/*Table structure for table `bus_info` */

DROP TABLE IF EXISTS `bus_info`;

CREATE TABLE `bus_info` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `info_key` varchar(100) NOT NULL,
  `info_val` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`info_key`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `bus_info` */

insert  into `bus_info`(`id`,`info_key`,`info_val`) values (1,'quo_cover_text',''),(2,'prep_by',''),(3,'veri_by',''),(4,'auth_by',''),(5,'footer_text',''),(6,'quo_sub','Cost Quotaion'),(7,'full_quo_no_format','QT-{quo_fy}-{customer_code}-{quo_no}'),(8,'state_id','12'),(9,'default_tax_id','3'),(10,'default_payment_terms','100% Advance'),(11,'default_delivery_terms','100%  Payment before delivary'),(12,'subject_name','Subject : '),(13,'full_pi_no_format','PI-{pi_fy}-{customer_code}-{pi_no}'),(14,'pi_cover_text',''),(15,'pi_sub','Proforma Invoice '),(16,'company_name',''),(17,'company_owner_name',''),(18,'company_owner_contact_no',''),(19,'company_owner_email',''),(20,'thanks_letter_text','thanks'),(21,'full_so_no_format','SO-{so_fy}-{so_no}');

/*Table structure for table `bus_info_custom` */

DROP TABLE IF EXISTS `bus_info_custom`;

CREATE TABLE `bus_info_custom` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `no` tinyint(4) NOT NULL,
  `info_key` varchar(100) NOT NULL,
  `info_val` varchar(5000) NOT NULL,
  `is_in_quo` tinyint(1) NOT NULL,
  `is_in_pi` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `bus_info_custom` */

insert  into `bus_info_custom`(`id`,`no`,`info_key`,`info_val`,`is_in_quo`,`is_in_pi`) values (1,1,'Terms And Condition','tnc',1,0),(2,5,'Bank Details','bank',1,1),(3,3,'Our Product Range:','prod',1,1),(4,4,'Statutory Details:','stat',1,1),(7,2,'Terms And Conditions','tnc',0,1);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `category` */

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `company` */

insert  into `company`(`id`,`name`) values (2,'A');

/*Table structure for table `competitor` */

DROP TABLE IF EXISTS `competitor`;

CREATE TABLE `competitor` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `competitor` */

insert  into `competitor`(`id`,`name`) values (29,'C');

/*Table structure for table `contact` */

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state_id` tinyint(4) DEFAULT NULL,
  `country` varchar(200) NOT NULL,
  `pin` mediumint(9) DEFAULT NULL,
  `job_title` varchar(200) NOT NULL,
  `contact_no1` varchar(20) DEFAULT NULL,
  `contact_no2` varchar(20) DEFAULT NULL,
  `contact_no3` varchar(200) NOT NULL,
  `email1` varchar(100) DEFAULT NULL,
  `email2` varchar(200) NOT NULL,
  `contact_nature_id` smallint(6) DEFAULT NULL,
  `inq_src_id` smallint(6) DEFAULT NULL,
  `industry_id` smallint(6) DEFAULT NULL,
  `desc` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `state_id` (`state_id`),
  KEY `contact_nature_id` (`contact_nature_id`),
  KEY `inq_src_id` (`inq_src_id`),
  KEY `industry_id` (`industry_id`),
  CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_ibfk_2` FOREIGN KEY (`contact_nature_id`) REFERENCES `contact_nature` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_ibfk_3` FOREIGN KEY (`inq_src_id`) REFERENCES `inq_src` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_ibfk_4` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1008 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `contact` */

/*Table structure for table `contact_nature` */

DROP TABLE IF EXISTS `contact_nature`;

CREATE TABLE `contact_nature` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `contact_nature` */

insert  into `contact_nature`(`id`,`name`) values (18,'a'),(19,'D');

/*Table structure for table `contact_supp` */

DROP TABLE IF EXISTS `contact_supp`;

CREATE TABLE `contact_supp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state_id` tinyint(4) DEFAULT NULL,
  `country` varchar(200) NOT NULL,
  `pin` mediumint(9) DEFAULT NULL,
  `job_title` varchar(200) NOT NULL,
  `contact_no1` varchar(20) DEFAULT NULL,
  `contact_no2` varchar(20) DEFAULT NULL,
  `contact_no3` varchar(200) NOT NULL,
  `email1` varchar(100) DEFAULT NULL,
  `email2` varchar(200) NOT NULL,
  `contact_nature_id` smallint(6) DEFAULT NULL,
  `inq_src_id` smallint(6) DEFAULT NULL,
  `industry_id` smallint(6) DEFAULT NULL,
  `desc` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `state_id` (`state_id`),
  KEY `contact_nature_id` (`contact_nature_id`),
  KEY `inq_src_id` (`inq_src_id`),
  KEY `industry_id` (`industry_id`),
  CONSTRAINT `contact_supp_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_supp_ibfk_2` FOREIGN KEY (`contact_nature_id`) REFERENCES `contact_nature` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_supp_ibfk_3` FOREIGN KEY (`inq_src_id`) REFERENCES `inq_src` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contact_supp_ibfk_4` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `contact_supp` */

/*Table structure for table `currency` */

DROP TABLE IF EXISTS `currency`;

CREATE TABLE `currency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `symbol` varchar(100) NOT NULL,
  `is_default` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `currency` */

insert  into `currency`(`id`,`name`,`symbol`,`is_default`) values (1,'INR','Rs.',1),(2,'USD','$',0);

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state_id` tinyint(4) DEFAULT NULL,
  `country` varchar(200) NOT NULL,
  `pin` mediumint(9) DEFAULT NULL,
  `ship_name` varchar(100) DEFAULT NULL,
  `ship_add` varchar(500) DEFAULT NULL,
  `ship_city` varchar(100) DEFAULT NULL,
  `ship_state_id` tinyint(4) DEFAULT NULL,
  `ship_country` varchar(200) NOT NULL,
  `ship_pin` mediumint(9) DEFAULT NULL,
  `gst_no` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `contact_no1` varchar(20) DEFAULT NULL,
  `contact_no2` varchar(20) DEFAULT NULL,
  `desc` varchar(200) NOT NULL,
  `contact_nature_id` smallint(6) DEFAULT NULL,
  `inq_src_id` smallint(6) DEFAULT NULL,
  `industry_id` smallint(6) DEFAULT NULL,
  `machine_id` smallint(6) DEFAULT NULL,
  `consump` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `competitor1` smallint(6) DEFAULT NULL,
  `competitor2` smallint(6) DEFAULT NULL,
  `class_ud` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`),
  KEY `state_id` (`state_id`),
  KEY `contact_nature_id` (`contact_nature_id`),
  KEY `inq_src_id` (`inq_src_id`),
  KEY `industry_id` (`industry_id`),
  KEY `machine_id` (`machine_id`),
  KEY `competitor1` (`competitor1`),
  KEY `competitor2` (`competitor2`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_2` FOREIGN KEY (`contact_nature_id`) REFERENCES `contact_nature` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_3` FOREIGN KEY (`inq_src_id`) REFERENCES `inq_src` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_4` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_5` FOREIGN KEY (`machine_id`) REFERENCES `machine` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_6` FOREIGN KEY (`competitor1`) REFERENCES `competitor` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `customer_ibfk_7` FOREIGN KEY (`competitor2`) REFERENCES `competitor` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1262 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `customer` */

/*Table structure for table `customer_contact` */

DROP TABLE IF EXISTS `customer_contact`;

CREATE TABLE `customer_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `customer_contact_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `customer_contact_ibfk_2` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1666 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `customer_contact` */

/*Table structure for table `default_oth_charge` */

DROP TABLE IF EXISTS `default_oth_charge`;

CREATE TABLE `default_oth_charge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `amt` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `default_oth_charge` */

insert  into `default_oth_charge`(`id`,`name`,`amt`) values (2,'Packaging And forwarding','100.00');

/*Table structure for table `goods_issued` */

DROP TABLE IF EXISTS `goods_issued`;

CREATE TABLE `goods_issued` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fy` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`fy`,`no`),
  KEY `created_by_user_id` (`created_by_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `goods_issued` */

/*Table structure for table `goods_issued_item` */

DROP TABLE IF EXISTS `goods_issued_item`;

CREATE TABLE `goods_issued_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_issued_id` int(11) NOT NULL,
  `mfg_prod_id` int(11) NOT NULL,
  `qty` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_id` (`mfg_prod_id`),
  KEY `goods_rcvd_id` (`goods_issued_id`),
  CONSTRAINT `goods_issued_item_ibfk_1` FOREIGN KEY (`goods_issued_id`) REFERENCES `goods_issued` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goods_issued_item_ibfk_2` FOREIGN KEY (`mfg_prod_id`) REFERENCES `mfg_prod` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `goods_issued_item` */

/*Table structure for table `goods_rcvd` */

DROP TABLE IF EXISTS `goods_rcvd`;

CREATE TABLE `goods_rcvd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fy` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `supplier_invoice_no` varchar(100) NOT NULL,
  `supplier_invoice_date` date DEFAULT NULL,
  `po_no` varchar(100) NOT NULL,
  `po_date` date DEFAULT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`fy`,`no`),
  KEY `supp_id` (`supplier_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `goods_rcvd_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `goods_rcvd` */

/*Table structure for table `goods_rcvd_item` */

DROP TABLE IF EXISTS `goods_rcvd_item`;

CREATE TABLE `goods_rcvd_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_rcvd_id` int(11) NOT NULL,
  `mfg_prod_id` int(11) NOT NULL,
  `make` varchar(100) NOT NULL,
  `qty_ordered` decimal(10,2) DEFAULT NULL,
  `qty_rcvd` decimal(10,2) DEFAULT NULL,
  `qty_rejected` decimal(10,2) DEFAULT NULL,
  `qty_actual` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_id` (`mfg_prod_id`),
  KEY `goods_rcvd_id` (`goods_rcvd_id`),
  CONSTRAINT `goods_rcvd_item_ibfk_1` FOREIGN KEY (`goods_rcvd_id`) REFERENCES `goods_rcvd` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `goods_rcvd_item_ibfk_2` FOREIGN KEY (`mfg_prod_id`) REFERENCES `mfg_prod` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `goods_rcvd_item` */

/*Table structure for table `gst_rate` */

DROP TABLE IF EXISTS `gst_rate`;

CREATE TABLE `gst_rate` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `cgst` decimal(10,2) NOT NULL,
  `sgst` decimal(10,2) NOT NULL,
  `igst` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tax_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `gst_rate` */

insert  into `gst_rate`(`id`,`name`,`cgst`,`sgst`,`igst`) values (1,'GST 0%','0.00','0.00','0.00'),(2,'GST 5','2.50','2.50','5.00'),(3,'GST 18','9.00','9.00','18.00'),(4,'GST 9%','4.50','4.50','9.00');

/*Table structure for table `industry` */

DROP TABLE IF EXISTS `industry`;

CREATE TABLE `industry` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `industry` */

insert  into `industry`(`id`,`name`) values (26,'Clothing'),(29,'Cosmetics'),(35,'Electronics'),(33,'Mobile'),(28,'Shoes');

/*Table structure for table `inq_src` */

DROP TABLE IF EXISTS `inq_src`;

CREATE TABLE `inq_src` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `inq_src` */

/*Table structure for table `item_grp` */

DROP TABLE IF EXISTS `item_grp`;

CREATE TABLE `item_grp` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `item_grp` */

/*Table structure for table `location` */

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=596 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `location` */

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `login` */

/*Table structure for table `machine` */

DROP TABLE IF EXISTS `machine`;

CREATE TABLE `machine` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `machine` */

/*Table structure for table `mfg_category` */

DROP TABLE IF EXISTS `mfg_category`;

CREATE TABLE `mfg_category` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `mfg_category` */

/*Table structure for table `mfg_prod` */

DROP TABLE IF EXISTS `mfg_prod`;

CREATE TABLE `mfg_prod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item_grp_id` smallint(6) NOT NULL,
  `mfg_category_id` smallint(6) NOT NULL,
  `item` varchar(200) NOT NULL,
  `item_code` varchar(200) DEFAULT NULL,
  `descr` varchar(500) NOT NULL,
  `location_id` smallint(6) DEFAULT NULL,
  `unit_id` smallint(6) DEFAULT NULL,
  `qty` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `status` varchar(200) NOT NULL,
  `reorder_qty` decimal(10,4) DEFAULT NULL,
  `reorder_qty_var_prcnt` decimal(10,4) DEFAULT NULL,
  `min_order_qty` decimal(10,4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `item` (`item`),
  UNIQUE KEY `item_code` (`item_code`),
  KEY `item_grp_id` (`item_grp_id`),
  KEY `mfg_category_id` (`mfg_category_id`),
  KEY `location_id` (`location_id`),
  KEY `unit_id` (`unit_id`),
  CONSTRAINT `mfg_prod_ibfk_1` FOREIGN KEY (`item_grp_id`) REFERENCES `item_grp` (`id`),
  CONSTRAINT `mfg_prod_ibfk_2` FOREIGN KEY (`mfg_category_id`) REFERENCES `mfg_category` (`id`),
  CONSTRAINT `mfg_prod_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `mfg_prod_ibfk_4` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=685 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `mfg_prod` */

/*Table structure for table `money_rcvd` */

DROP TABLE IF EXISTS `money_rcvd`;

CREATE TABLE `money_rcvd` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fy` smallint(6) NOT NULL,
  `no` int(11) NOT NULL,
  `date` date NOT NULL,
  `customer_id` int(11) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  `money_rcvd_against_type_id` tinyint(4) DEFAULT NULL,
  `quo_id` int(11) DEFAULT NULL,
  `pi_id` int(11) DEFAULT NULL,
  `customer_bank_name` varchar(500) NOT NULL,
  `payment_method_id` smallint(6) DEFAULT NULL,
  `tx_no` varchar(500) NOT NULL,
  `tx_date` date DEFAULT NULL,
  `bill_no` varchar(500) NOT NULL,
  `our_bank_id` smallint(6) DEFAULT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`fy`,`no`),
  KEY `from_customer_id` (`customer_id`),
  KEY `quo_id` (`quo_id`),
  KEY `pi_id` (`pi_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `our_bank_id` (`our_bank_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `money_rcvd_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `money_rcvd_ibfk_2` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `money_rcvd_ibfk_3` FOREIGN KEY (`pi_id`) REFERENCES `pi` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=212 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `money_rcvd` */

/*Table structure for table `payment_method` */

DROP TABLE IF EXISTS `payment_method`;

CREATE TABLE `payment_method` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `payment_method` */

/*Table structure for table `perm` */

DROP TABLE IF EXISTS `perm`;

CREATE TABLE `perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=234 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `perm` */

/*Table structure for table `pi` */

DROP TABLE IF EXISTS `pi`;

CREATE TABLE `pi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` tinyint(4) NOT NULL,
  `quo_id` int(11) DEFAULT NULL,
  `fy` smallint(6) NOT NULL,
  `no` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `sub` varchar(200) NOT NULL,
  `ref_no` varchar(50) NOT NULL,
  `ref_date` date DEFAULT NULL,
  `inq_no` varchar(50) NOT NULL,
  `inq_date` date DEFAULT NULL,
  `payment_terms` varchar(1000) NOT NULL,
  `delivery_terms` varchar(1000) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `tot_qty` decimal(10,2) NOT NULL,
  `tot_item_val` decimal(10,2) NOT NULL,
  `tot_oth_charge` decimal(10,2) NOT NULL,
  `is_disc` tinyint(4) NOT NULL,
  `disc_rate` decimal(10,2) NOT NULL,
  `disc_rate_type_id` tinyint(4) NOT NULL,
  `disc_amt` decimal(10,2) NOT NULL,
  `taxable_amt` decimal(10,2) NOT NULL,
  `tot_tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `round_off` decimal(10,2) NOT NULL,
  `amt_payable` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`no`,`fy`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `customer_id` (`customer_id`),
  KEY `contact_id` (`contact_id`),
  KEY `quo_id` (`quo_id`),
  CONSTRAINT `pi_ibfk_2` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pi_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `pi_ibfk_4` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `pi` */

/*Table structure for table `pi_item` */

DROP TABLE IF EXISTS `pi_item`;

CREATE TABLE `pi_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pi_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `model_no` varchar(100) NOT NULL,
  `hsn_code` varchar(10) NOT NULL,
  `qty` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `disc_rate` decimal(10,2) NOT NULL,
  `disc_rate_type_id` tinyint(4) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`pi_id`),
  CONSTRAINT `pi_item_ibfk_1` FOREIGN KEY (`pi_id`) REFERENCES `pi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=751 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `pi_item` */

/*Table structure for table `pi_item_prod_spec` */

DROP TABLE IF EXISTS `pi_item_prod_spec`;

CREATE TABLE `pi_item_prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pi_item_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  `spec_val` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quo_item_id` (`pi_item_id`,`spec_name`),
  CONSTRAINT `pi_item_prod_spec_ibfk_1` FOREIGN KEY (`pi_item_id`) REFERENCES `pi_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6802 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `pi_item_prod_spec` */

/*Table structure for table `pi_oth_charge` */

DROP TABLE IF EXISTS `pi_oth_charge`;

CREATE TABLE `pi_oth_charge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pi_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`pi_id`),
  CONSTRAINT `pi_oth_charge_ibfk_1` FOREIGN KEY (`pi_id`) REFERENCES `pi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=363 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `pi_oth_charge` */

/*Table structure for table `pi_tax` */

DROP TABLE IF EXISTS `pi_tax`;

CREATE TABLE `pi_tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pi_id` int(11) NOT NULL,
  `tax_name` varchar(50) NOT NULL,
  `rate` decimal(4,2) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`pi_id`),
  CONSTRAINT `pi_tax_ibfk_1` FOREIGN KEY (`pi_id`) REFERENCES `pi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=565 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `pi_tax` */

/*Table structure for table `prod` */

DROP TABLE IF EXISTS `prod`;

CREATE TABLE `prod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` smallint(6) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `model_no` varchar(100) DEFAULT NULL,
  `hsn_code` varchar(10) DEFAULT NULL,
  `rate` decimal(10,2) DEFAULT NULL,
  `gst_rate_id` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `model_no` (`model_no`),
  KEY `gst_rate_id` (`gst_rate_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `prod_ibfk_1` FOREIGN KEY (`gst_rate_id`) REFERENCES `gst_rate` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `prod_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=702 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `prod` */

/*Table structure for table `prod_mo_no` */

DROP TABLE IF EXISTS `prod_mo_no`;

CREATE TABLE `prod_mo_no` (
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

/*Data for the table `prod_mo_no` */

/*Table structure for table `prod_mo_no_prod_spec` */

DROP TABLE IF EXISTS `prod_mo_no_prod_spec`;

CREATE TABLE `prod_mo_no_prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_mo_no_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_mo_no_id_2` (`prod_mo_no_id`,`spec_name`),
  CONSTRAINT `prod_mo_no_prod_spec_ibfk_1` FOREIGN KEY (`prod_mo_no_id`) REFERENCES `prod_mo_no` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `prod_mo_no_prod_spec` */

/*Table structure for table `prod_mo_no_prod_spec_val` */

DROP TABLE IF EXISTS `prod_mo_no_prod_spec_val`;

CREATE TABLE `prod_mo_no_prod_spec_val` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_mo_no_prod_spec_id` int(11) NOT NULL,
  `spec_value` varchar(200) NOT NULL,
  `spec_code` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_mo_no_product_spec_id_2` (`prod_mo_no_prod_spec_id`,`spec_value`),
  CONSTRAINT `prod_mo_no_prod_spec_val_ibfk_1` FOREIGN KEY (`prod_mo_no_prod_spec_id`) REFERENCES `prod_mo_no_prod_spec` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=881 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `prod_mo_no_prod_spec_val` */

/*Table structure for table `prod_spec` */

DROP TABLE IF EXISTS `prod_spec`;

CREATE TABLE `prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  `spec_val` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id` (`prod_id`,`spec_name`),
  CONSTRAINT `prod_spec_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `prod` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13830 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `prod_spec` */

/*Table structure for table `quo` */

DROP TABLE IF EXISTS `quo`;

CREATE TABLE `quo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_by_user_id` tinyint(4) NOT NULL,
  `fy` smallint(6) NOT NULL,
  `no` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `sub` varchar(200) NOT NULL,
  `ref_no` varchar(50) NOT NULL,
  `ref_date` date DEFAULT NULL,
  `inq_no` varchar(50) NOT NULL,
  `inq_date` date DEFAULT NULL,
  `payment_terms` varchar(1000) NOT NULL,
  `delivery_terms` varchar(1000) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `contact_id` int(11) DEFAULT NULL,
  `tot_qty` decimal(10,2) NOT NULL,
  `tot_item_val` decimal(10,2) NOT NULL,
  `tot_oth_charge` decimal(10,2) NOT NULL,
  `is_disc` tinyint(4) NOT NULL,
  `disc_rate` decimal(10,2) NOT NULL,
  `disc_rate_type_id` tinyint(4) NOT NULL,
  `disc_amt` decimal(10,2) NOT NULL,
  `taxable_amt` decimal(10,2) NOT NULL,
  `tot_tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `round_off` decimal(10,2) NOT NULL,
  `amt_payable` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`no`,`fy`),
  KEY `created_by_user_id` (`created_by_user_id`),
  KEY `customer_id` (`customer_id`),
  KEY `contact_id` (`contact_id`),
  CONSTRAINT `quo_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `quo_ibfk_3` FOREIGN KEY (`contact_id`) REFERENCES `contact` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=702 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `quo` */

/*Table structure for table `quo_item` */

DROP TABLE IF EXISTS `quo_item`;

CREATE TABLE `quo_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quo_id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `model_no` varchar(100) NOT NULL,
  `hsn_code` varchar(10) NOT NULL,
  `qty` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `disc_rate` decimal(10,2) NOT NULL,
  `disc_rate_type_id` tinyint(4) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`quo_id`),
  CONSTRAINT `quo_item_ibfk_1` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2230 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `quo_item` */

/*Table structure for table `quo_item_prod_spec` */

DROP TABLE IF EXISTS `quo_item_prod_spec`;

CREATE TABLE `quo_item_prod_spec` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quo_item_id` int(11) NOT NULL,
  `spec_name` varchar(200) NOT NULL,
  `spec_val` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `quo_item_id` (`quo_item_id`,`spec_name`),
  CONSTRAINT `quo_item_prod_spec_ibfk_1` FOREIGN KEY (`quo_item_id`) REFERENCES `quo_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20500 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `quo_item_prod_spec` */

/*Table structure for table `quo_oth_charge` */

DROP TABLE IF EXISTS `quo_oth_charge`;

CREATE TABLE `quo_oth_charge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quo_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`quo_id`),
  CONSTRAINT `quo_oth_charge_ibfk_1` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=756 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `quo_oth_charge` */

/*Table structure for table `quo_tax` */

DROP TABLE IF EXISTS `quo_tax`;

CREATE TABLE `quo_tax` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quo_id` int(11) NOT NULL,
  `tax_name` varchar(50) NOT NULL,
  `rate` decimal(4,2) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quotation_id` (`quo_id`),
  CONSTRAINT `quo_tax_ibfk_1` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1371 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `quo_tax` */

/*Table structure for table `sales` */

DROP TABLE IF EXISTS `sales`;

CREATE TABLE `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `fy` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `target_del_dt` date DEFAULT NULL,
  `actual_del_dt` date DEFAULT NULL,
  `tot_qty` decimal(10,2) NOT NULL,
  `tot_item_val` decimal(10,2) NOT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`fy`,`no`) USING BTREE,
  KEY `customer_id` (`customer_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `sales` */

/*Table structure for table `sales_item` */

DROP TABLE IF EXISTS `sales_item`;

CREATE TABLE `sales_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sales_id` int(11) NOT NULL,
  `model_no` varchar(100) NOT NULL,
  `qty` decimal(10,2) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_id` (`sales_id`),
  CONSTRAINT `sales_item_ibfk_1` FOREIGN KEY (`sales_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `sales_item` */

/*Table structure for table `so` */

DROP TABLE IF EXISTS `so`;

CREATE TABLE `so` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `created_from_id` tinyint(4) NOT NULL,
  `quo_id` int(11) DEFAULT NULL,
  `pi_id` int(11) DEFAULT NULL,
  `note` varchar(5000) NOT NULL,
  `fy` smallint(6) NOT NULL,
  `no` int(11) NOT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fy` (`fy`,`no`) USING BTREE,
  KEY `quo_id` (`quo_id`),
  KEY `pi_id` (`pi_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `so_ibfk_1` FOREIGN KEY (`quo_id`) REFERENCES `quo` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `so_ibfk_2` FOREIGN KEY (`pi_id`) REFERENCES `pi` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=330 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `so` */

/*Table structure for table `state` */

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code_name` varchar(50) NOT NULL,
  `code_no` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code_name` (`code_name`),
  UNIQUE KEY `code_no` (`code_no`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `state` */

insert  into `state`(`id`,`name`,`code_name`,`code_no`) values (1,'Andhra Pradesh','AP',28),(2,'Andhra Pradesh (New)','AD',37),(3,'Arunachal Pradesh','AR',12),(4,'Assam','AS',18),(5,'Bihar','BH',10),(6,'Chandigarh','CH',4),(7,'Chattisgarh','CT',22),(8,'Dadra and Nagar Haveli','DN',26),(9,'Daman and Diu','DD',25),(10,'Delhi','DL',7),(11,'Goa','GA',30),(12,'Gujarat','GJ',24),(13,'Haryana','HR',6),(14,'Himachal Pradesh','HP',2),(15,'Jammu and Kashmir','JK',1),(16,'Jharkhand','JH',20),(17,'Karnataka','KA',29),(18,'Kerala','KL',32),(19,'Lakshadweep Islands','LD',31),(20,'Madhya Pradesh','MP',23),(21,'Maharashtra','MH',27),(22,'Manipur','MN',14),(23,'Meghalaya','ME',17),(24,'Mizoram','MI',15),(25,'Nagaland','NL',13),(26,'Odisha','OR',21),(27,'Pondicherry','PY',34),(28,'Punjab','PB',3),(29,'Rajasthan','RJ',8),(30,'Sikkim','SK',11),(31,'Tamil Nadu','TN',33),(32,'Telangana','TS',36),(33,'Tripura','TR',16),(34,'Uttar Pradesh','UP',9),(35,'Uttarakhand','UT',5),(36,'West Bengal','WB',19);

/*Table structure for table `supplier` */

DROP TABLE IF EXISTS `supplier`;

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state_id` tinyint(4) DEFAULT NULL,
  `country` varchar(200) NOT NULL,
  `pin` mediumint(9) DEFAULT NULL,
  `ship_name` varchar(100) DEFAULT NULL,
  `ship_add` varchar(500) DEFAULT NULL,
  `ship_city` varchar(100) DEFAULT NULL,
  `ship_state_id` tinyint(4) DEFAULT NULL,
  `ship_country` varchar(200) NOT NULL,
  `ship_pin` mediumint(9) DEFAULT NULL,
  `gst_no` varchar(50) NOT NULL,
  `owner` varchar(100) DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  `contact_no1` varchar(20) DEFAULT NULL,
  `contact_no2` varchar(20) DEFAULT NULL,
  `desc` varchar(200) NOT NULL,
  `contact_nature_id` smallint(6) DEFAULT NULL,
  `inq_src_id` smallint(6) DEFAULT NULL,
  `industry_id` smallint(6) DEFAULT NULL,
  `machine_id` smallint(6) DEFAULT NULL,
  `consump` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `competitor1` smallint(6) DEFAULT NULL,
  `competitor2` smallint(6) DEFAULT NULL,
  `class_ud` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`),
  KEY `state_id` (`state_id`),
  KEY `contact_nature_id` (`contact_nature_id`),
  KEY `inq_src_id` (`inq_src_id`),
  KEY `industry_id` (`industry_id`),
  KEY `machine_id` (`machine_id`),
  KEY `competitor1` (`competitor1`),
  KEY `competitor2` (`competitor2`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `supplier_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_2` FOREIGN KEY (`contact_nature_id`) REFERENCES `contact_nature` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_3` FOREIGN KEY (`inq_src_id`) REFERENCES `inq_src` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_4` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_5` FOREIGN KEY (`machine_id`) REFERENCES `machine` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_6` FOREIGN KEY (`competitor1`) REFERENCES `competitor` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `supplier_ibfk_7` FOREIGN KEY (`competitor2`) REFERENCES `competitor` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `supplier` */

/*Table structure for table `supplier_contact` */

DROP TABLE IF EXISTS `supplier_contact`;

CREATE TABLE `supplier_contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `contact_supp_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`supplier_id`),
  KEY `contact_id` (`contact_supp_id`),
  CONSTRAINT `supplier_contact_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `supplier_contact_ibfk_2` FOREIGN KEY (`contact_supp_id`) REFERENCES `contact_supp` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `supplier_contact` */

/*Table structure for table `target` */

DROP TABLE IF EXISTS `target`;

CREATE TABLE `target` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` tinyint(4) NOT NULL,
  `from_month` int(11) NOT NULL,
  `from_yr` int(11) NOT NULL,
  `to_month` int(11) NOT NULL,
  `to_yr` int(11) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  `cnt_month` int(11) NOT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `created_by_user_id` (`created_by_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `target` */

/*Table structure for table `target_det` */

DROP TABLE IF EXISTS `target_det`;

CREATE TABLE `target_det` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `target_id` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `yr` int(11) NOT NULL,
  `yr_month_no` int(11) NOT NULL,
  `amt` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `target_id` (`target_id`),
  CONSTRAINT `target_det_ibfk_1` FOREIGN KEY (`target_id`) REFERENCES `target` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `target_det` */

/*Table structure for table `thanks_letter_log` */

DROP TABLE IF EXISTS `thanks_letter_log`;

CREATE TABLE `thanks_letter_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `created_by_user_id` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  KEY `created_by_user_id` (`created_by_user_id`),
  CONSTRAINT `thanks_letter_log_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `thanks_letter_log` */

/*Table structure for table `unit` */

DROP TABLE IF EXISTS `unit`;

CREATE TABLE `unit` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `unit` */

insert  into `unit`(`id`,`name`) values (2,'Coil'),(3,'kg'),(1,'PC');

/*Table structure for table `update_log` */

DROP TABLE IF EXISTS `update_log`;

CREATE TABLE `update_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(20) NOT NULL,
  `status_id` int(11) NOT NULL,
  `path` varchar(200) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `update_log` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` tinyint(1) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `access_role_id` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `name` (`name`),
  KEY `access_role_id` (`access_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`username`,`password`,`contact_no`,`email`,`access_role_id`) values (1,'roshni','roshni','roshni','','',1);

/*Table structure for table `year` */

DROP TABLE IF EXISTS `year`;

CREATE TABLE `year` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `company_id` tinyint(4) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `is_default` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `company_id` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `year` */

insert  into `year`(`id`,`company_id`,`date_from`,`date_to`,`is_default`) values (1,1,'2023-04-01','2025-03-31',1);

/* Trigger structure for table `customer` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_customer` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_customer` BEFORE INSERT ON `customer` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `goods_issued` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_goods_issued` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_goods_issued` BEFORE INSERT ON `goods_issued` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `goods_rcvd` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_goods_rcvd` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_goods_rcvd` BEFORE INSERT ON `goods_rcvd` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `money_rcvd` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_money_rcvd` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_money_rcvd` BEFORE INSERT ON `money_rcvd` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `sales` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_sales` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_sales` BEFORE INSERT ON `sales` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `so` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_so` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_so` BEFORE INSERT ON `so` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `supplier` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_supplier` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_supplier` BEFORE INSERT ON `supplier` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `target` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_target` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_target` BEFORE INSERT ON `target` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/* Trigger structure for table `thanks_letter_log` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `before_insert_thanks_letter_log` */$$

/*!50003 CREATE */ /*!50003 TRIGGER `before_insert_thanks_letter_log` BEFORE INSERT ON `thanks_letter_log` FOR EACH ROW BEGIN
		SET NEW.created_at = ADDTIME(NOW(), "5:30");
    END */$$


DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
