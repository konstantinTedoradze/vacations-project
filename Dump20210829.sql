CREATE DATABASE  IF NOT EXISTS `myvacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myvacations`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: myvacations
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UC_ID` (`user_id`,`vacation_id`),
  UNIQUE KEY `UniqueID` (`user_id`,`vacation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (21,87,42,1),(22,87,41,1),(34,25,36,1),(35,25,41,1),(37,119,1,1),(38,119,36,1),(39,120,36,1),(41,125,41,1),(43,125,36,1),(44,125,56,1),(45,125,54,1),(46,125,57,1);
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL DEFAULT 'CUSTOMER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (85,'eka','3f00a47253fd3c5df965c5f0227394a1','ekate','jojaant','ADMIN'),(122,'kosss1','d27684dd196acbf2b7ecb26b122ff847','a','asd','CUSTOMER'),(123,'rja','d204e903829c4f94047bf73b26822fe8','d','a','CUSTOMER'),(125,'newuser4','7515e94e1dfe135eb49c1f4d0b011bbe','kosta3','dsaffd','CUSTOMER'),(126,'r','069bdd0f1f8fcb55473abe0d540fd161','l','k','CUSTOMER'),(127,'ee','d204e903829c4f94047bf73b26822fe8','ee','ee','CUSTOMER'),(128,'rr34','d204e903829c4f94047bf73b26822fe8','rr','44','CUSTOMER'),(129,'kmk','d204e903829c4f94047bf73b26822fe8','kk','kkk','CUSTOMER'),(130,'asdfsf','a4d7052aed869b1caf1e7d785fca9fc4','asdfsdf','asdfsfd','CUSTOMER'),(131,'rjeee','d204e903829c4f94047bf73b26822fe8','eeee','eee','CUSTOMER'),(132,'rjdd','d204e903829c4f94047bf73b26822fe8','ddddd','d','CUSTOMER'),(133,'rjhjhj','d204e903829c4f94047bf73b26822fe8','jj','jj','CUSTOMER'),(134,'rj','d204e903829c4f94047bf73b26822fe8','dd','dd','CUSTOMER'),(135,'as','d204e903829c4f94047bf73b26822fe8','as','as','CUSTOMER'),(136,'rj3','d204e903829c4f94047bf73b26822fe8','as','as','CUSTOMER'),(137,'rjrdddd','c76256450cb680968862f8c028ce8e6f','ddddddd','dddddddd','CUSTOMER'),(138,'rj2wrqwergtaerh','d18b404ae52c27ccf3d537f688de4349','e','t','CUSTOMER'),(139,'rj4kos','d204e903829c4f94047bf73b26822fe8','as345agsd','asdgasgdas','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `destination` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `from_date` date DEFAULT NULL,
  `to_date` date DEFAULT NULL,
  `price` int NOT NULL,
  `followers` int NOT NULL DEFAULT '0',
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (36,'Tokyo is the capital and most populous prefecture of Japan. Located at the head of Tokyo Bay, the prefecture forms part of the Kantō region on the central Pacific coast of Japans main island of Honshu','Tokyo, Japan','tokyo.jpg','2010-09-13','2014-09-13',3000,4,0),(41,'Budapest is the capital and the most populous city of Hungary, and the ninth-largest city in the European Union by population within city limits.','Budapest,hungary','budapest.jpg','2012-10-21','2018-10-21',500,3,0),(42,'San Francisco,It is a cultural and financi of the western ','San Francisco','San-Francisco.jpg','2012-10-21','2018-10-21',500,1,0),(53,'London, city, capital of the United Kingdom. By far Britain\'s largest metropolis, it is also the country\'s economic, transportation, and cultural centre','London, Great Britain','london.jpg','2020-09-21','2025-09-21',2500,0,0),(55,'Athens, historic city and capital of Greece. Many of Classical civilization\'s intellectual and artistic ideas originated there, and the city is generally considered to be the birthplace of Western civilization.','Athens, Greece ','athen.jpg','2009-09-21','2014-09-21',2000,0,0),(56,'Budapest is the capital and the most populous city of Hungary, and the ninth-largest city in the European Union by population within city limits.\n','Budapest,hungary','budapest.jpg','2012-10-21','2018-10-21',1800,1,0),(57,'Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy.','Rome, Italy','rome.jpg','2014-09-21','2019-09-21',2000,1,0);
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-29  0:58:18
