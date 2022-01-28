/*
Navicat MySQL Data Transfer

Source Server         : Maricott
Source Server Version : 80027
Source Host           : 139.162.4.155:3308
Source Database       : maricott

Target Server Type    : MYSQL
Target Server Version : 80027
File Encoding         : 65001

Date: 2022-01-25 16:07:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_project
-- ----------------------------
DROP TABLE IF EXISTS `tbl_project`;
CREATE TABLE `tbl_project` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `type` bigint DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint DEFAULT '1' COMMENT '1: Delay, 2:In progress, 3:Complete',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for tbl_project_type
-- ----------------------------
DROP TABLE IF EXISTS `tbl_project_type`;
CREATE TABLE `tbl_project_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for tbl_task
-- ----------------------------
DROP TABLE IF EXISTS `tbl_task`;
CREATE TABLE `tbl_task` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `lead` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `real_end_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `status` enum('Processing','Delay','Completed','Planned') CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `parent_task_id` bigint DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `complete_percent` smallint DEFAULT NULL,
  `working_days` int DEFAULT NULL,
  `task_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for tbl_task_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_task_info`;
CREATE TABLE `tbl_task_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `task_id` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  `notes` varchar(1000) DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
