-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: datamed
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pacientId` varchar(36) NOT NULL,
  `doctorId` varchar(36) NOT NULL,
  `datetime` datetime NOT NULL,
  `locationId` int NOT NULL,
  `specialisationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `appointments_locations_id_fk` (`locationId`),
  KEY `appointments_specialisations_id_fk` (`specialisationId`),
  KEY `appointments_users_id_fk` (`pacientId`),
  KEY `appointments_users_id_fk_2` (`doctorId`),
  CONSTRAINT `appointments_locations_id_fk` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`),
  CONSTRAINT `appointments_specialisations_id_fk` FOREIGN KEY (`specialisationId`) REFERENCES `specialisations` (`id`),
  CONSTRAINT `appointments_users_id_fk` FOREIGN KEY (`pacientId`) REFERENCES `users` (`id`),
  CONSTRAINT `appointments_users_id_fk_2` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consultations`
--

DROP TABLE IF EXISTS `consultations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `appointmentId` int NOT NULL,
  `history` varchar(4096) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `symptoms` varchar(4096) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `diagnostic` varchar(4096) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `recommendation` varchar(4096) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `consultations_appointments_id_fk` (`appointmentId`),
  CONSTRAINT `consultations_appointments_id_fk` FOREIGN KEY (`appointmentId`) REFERENCES `appointments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultations`
--

LOCK TABLES `consultations` WRITE;
/*!40000 ALTER TABLE `consultations` DISABLE KEYS */;
/*!40000 ALTER TABLE `consultations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorHasEducation`
--

DROP TABLE IF EXISTS `doctorHasEducation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorHasEducation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` varchar(36) NOT NULL,
  `educationId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctorHasEducation_education_id_fk` (`educationId`),
  KEY `doctorHasEducation_users_id_fk` (`doctorId`),
  CONSTRAINT `doctorHasEducation_education_id_fk` FOREIGN KEY (`educationId`) REFERENCES `education` (`id`),
  CONSTRAINT `doctorHasEducation_users_id_fk` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorHasEducation`
--

LOCK TABLES `doctorHasEducation` WRITE;
/*!40000 ALTER TABLE `doctorHasEducation` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctorHasEducation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorHasSpecialisation`
--

DROP TABLE IF EXISTS `doctorHasSpecialisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorHasSpecialisation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specialisationId` int NOT NULL,
  `doctorId` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctorHasSpecialisation_users_id_fk` (`doctorId`),
  KEY `doctorHasSpecialisation_specialisations_id_fk` (`specialisationId`),
  CONSTRAINT `doctorHasSpecialisation_specialisations_id_fk` FOREIGN KEY (`specialisationId`) REFERENCES `specialisations` (`id`),
  CONSTRAINT `doctorHasSpecialisation_users_id_fk` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorHasSpecialisation`
--

LOCK TABLES `doctorHasSpecialisation` WRITE;
/*!40000 ALTER TABLE `doctorHasSpecialisation` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctorHasSpecialisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorsReviews`
--

DROP TABLE IF EXISTS `doctorsReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorsReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` varchar(36) NOT NULL,
  `rate` int NOT NULL,
  `description` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctorsReviews_users_id_fk` (`doctorId`),
  CONSTRAINT `doctorsReviews_users_id_fk` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorsReviews`
--

LOCK TABLES `doctorsReviews` WRITE;
/*!40000 ALTER TABLE `doctorsReviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctorsReviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorsSchedules`
--

DROP TABLE IF EXISTS `doctorsSchedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorsSchedules` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` varchar(36) NOT NULL,
  `locationId` int NOT NULL,
  `startDateTime` datetime DEFAULT NULL,
  `endDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doctorsSchedules_locations_id_fk` (`locationId`),
  KEY `doctorsSchedules_users_id_fk` (`doctorId`),
  CONSTRAINT `doctorsSchedules_locations_id_fk` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`),
  CONSTRAINT `doctorsSchedules_users_id_fk` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorsSchedules`
--

LOCK TABLES `doctorsSchedules` WRITE;
/*!40000 ALTER TABLE `doctorsSchedules` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctorsSchedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(2048) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicalInfos`
--

DROP TABLE IF EXISTS `medicalInfos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicalInfos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pacientId` varchar(36) NOT NULL,
  `height` decimal(10,0) DEFAULT NULL,
  `weight` decimal(10,0) DEFAULT NULL,
  `hemoleucograma` decimal(10,0) DEFAULT NULL,
  `vsh` decimal(10,0) DEFAULT NULL,
  `glicemie` decimal(10,0) DEFAULT NULL,
  `creatinina` decimal(10,0) DEFAULT NULL,
  `colesterol` decimal(10,0) DEFAULT NULL,
  `trigliceride` decimal(10,0) DEFAULT NULL,
  `calciu` decimal(10,0) DEFAULT NULL,
  `magneziu` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `medicalInfo_users_id_fk` (`pacientId`),
  CONSTRAINT `medicalInfo_users_id_fk` FOREIGN KEY (`pacientId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicalInfos`
--

LOCK TABLES `medicalInfos` WRITE;
/*!40000 ALTER TABLE `medicalInfos` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicalInfos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pacients`
--

DROP TABLE IF EXISTS `pacients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pacients` (
  `pacientId` varchar(36) NOT NULL,
  `cnp` varchar(13) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT NULL,
  `bloodType` varchar(4) DEFAULT NULL,
  `rhType` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`pacientId`),
  CONSTRAINT `pacients_users_id_fk` FOREIGN KEY (`pacientId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pacients`
--

LOCK TABLES `pacients` WRITE;
/*!40000 ALTER TABLE `pacients` DISABLE KEYS */;
/*!40000 ALTER TABLE `pacients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisations`
--

DROP TABLE IF EXISTS `specialisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialisations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisations`
--

LOCK TABLES `specialisations` WRITE;
/*!40000 ALTER TABLE `specialisations` DISABLE KEYS */;
/*!40000 ALTER TABLE `specialisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(8192) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userType` int NOT NULL,
  `birthDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_uindex` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-27 10:25:19
