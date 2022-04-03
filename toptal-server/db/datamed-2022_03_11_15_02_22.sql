-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: datamed
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
  `patientId` char(36) NOT NULL,
  `doctorId` char(36) NOT NULL,
  `locationId` char(36) NOT NULL,
  `specialisationId` char(36) NOT NULL,
  `history` varchar(255) DEFAULT NULL,
  `symptoms` varchar(255) DEFAULT NULL,
  `diagnostic` varchar(255) DEFAULT NULL,
  `recommendation` varchar(255) DEFAULT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0c1af27b469cb8dca420c160d65` (`doctorId`),
  KEY `FK_819e2bab7cad0d2ae2d71075df7` (`locationId`),
  KEY `FK_5f5ffdc6f67c7640cbccfcc0d59` (`specialisationId`),
  KEY `FK_13c2e57cb81b44f062ba24df57d` (`patientId`),
  CONSTRAINT `FK_0c1af27b469cb8dca420c160d65` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_13c2e57cb81b44f062ba24df57d` FOREIGN KEY (`patientId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_5f5ffdc6f67c7640cbccfcc0d59` FOREIGN KEY (`specialisationId`) REFERENCES `specialisations` (`id`),
  CONSTRAINT `FK_819e2bab7cad0d2ae2d71075df7` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 11:00:00','2022-03-05 11:31:00'),(2,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 12:30:00','2022-03-05 13:00:00'),(3,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 13:00:00','2022-03-05 13:30:00'),(4,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 10:30:00','2022-03-05 10:59:00'),(5,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 11:30:00','2022-03-05 12:00:00'),(6,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 12:15:00','2022-03-05 12:30:00'),(7,'59e4348f-fc87-4273-826e-4359bb1440ce','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','5a292915-3735-4324-82a2-d8e821f70058',NULL,NULL,NULL,NULL,'2022-03-05 10:15:00','2022-03-05 10:29:00'),(8,'ed120e9e-c70d-462c-ace2-7842d7cc870d','5e51e1b1-891c-4c52-891e-0c950b904d99','69c1d766-a7d9-4967-8714-9560c49066df','b512d0f8-8c68-4012-b2e3-4c5b8a4c31dc',NULL,NULL,NULL,NULL,'2022-03-05 16:00:00','2022-03-05 16:30:00');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctorsReviews`
--

DROP TABLE IF EXISTS `doctorsReviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctorsReviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `doctorId` char(36) NOT NULL,
  `rate` int NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_647ef4072346069d494a763c279` (`doctorId`),
  CONSTRAINT `FK_647ef4072346069d494a763c279` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
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
  `id` int NOT NULL,
  `doctorId` char(36) NOT NULL,
  `locationId` char(36) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e692e49554dd570880fc574f010` (`doctorId`),
  KEY `FK_334fc75094d5cd178e7d8e9e0ca` (`locationId`),
  CONSTRAINT `FK_334fc75094d5cd178e7d8e9e0ca` FOREIGN KEY (`locationId`) REFERENCES `locations` (`id`),
  CONSTRAINT `FK_e692e49554dd570880fc574f010` FOREIGN KEY (`doctorId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctorsSchedules`
--

LOCK TABLES `doctorsSchedules` WRITE;
/*!40000 ALTER TABLE `doctorsSchedules` DISABLE KEYS */;
INSERT INTO `doctorsSchedules` VALUES (1,'4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','8bd033a3-e5b6-44af-a52d-f1d4947601c3','2022-03-05 10:00:00','2022-03-05 14:00:00'),(2,'5e51e1b1-891c-4c52-891e-0c950b904d99','69c1d766-a7d9-4967-8714-9560c49066df','2022-03-05 15:00:00','2022-03-05 20:00:00'),(3,'4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','69c1d766-a7d9-4967-8714-9560c49066df','2022-03-05 15:00:00','2022-03-05 18:00:13');
/*!40000 ALTER TABLE `doctorsSchedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educations`
--

DROP TABLE IF EXISTS `educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_5d0d9a47cad765292a9abf1fc6` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations`
--

LOCK TABLES `educations` WRITE;
/*!40000 ALTER TABLE `educations` DISABLE KEYS */;
/*!40000 ALTER TABLE `educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `educations_doctors_users`
--

DROP TABLE IF EXISTS `educations_doctors_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educations_doctors_users` (
  `educationsId` char(36) NOT NULL,
  `usersId` char(36) NOT NULL,
  PRIMARY KEY (`educationsId`,`usersId`),
  KEY `IDX_3e5fbd88c3891901400c9e5b99` (`educationsId`),
  KEY `IDX_7bef56a5ccf89062ee2bc365ce` (`usersId`),
  CONSTRAINT `FK_3e5fbd88c3891901400c9e5b992` FOREIGN KEY (`educationsId`) REFERENCES `educations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_7bef56a5ccf89062ee2bc365ce1` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educations_doctors_users`
--

LOCK TABLES `educations_doctors_users` WRITE;
/*!40000 ALTER TABLE `educations_doctors_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `educations_doctors_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_227023051ab1fedef7a3b6c7e2` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES ('8bd033a3-e5b6-44af-a52d-f1d4947601c3','Berceni'),('69c1d766-a7d9-4967-8714-9560c49066df','Floreasca'),('07515eb1-80fb-4dc0-9e19-bb6e42bb7061','Pantelimon');
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
  `patientId` char(36) NOT NULL,
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `hemoleucograma` int NOT NULL,
  `vsh` int NOT NULL,
  `glicemie` int NOT NULL,
  `creatinina` int NOT NULL,
  `colesterol` int NOT NULL,
  `triglicerde` int NOT NULL,
  `calciu` int NOT NULL,
  `magneziu` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_75581ec826718137667a4a36f90` (`patientId`),
  CONSTRAINT `FK_75581ec826718137667a4a36f90` FOREIGN KEY (`patientId`) REFERENCES `users` (`id`)
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
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `userId` char(36) NOT NULL,
  `cnp` varchar(255) NOT NULL,
  `sex` tinyint NOT NULL DEFAULT '1',
  `bloodType` varchar(255) NOT NULL,
  `rhType` tinyint NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `REL_2c24c3490a26d04b0d70f92057` (`userId`),
  CONSTRAINT `FK_2c24c3490a26d04b0d70f92057a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisations`
--

DROP TABLE IF EXISTS `specialisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialisations` (
  `id` char(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a22f44e0688efa39bf78d55fdd` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisations`
--

LOCK TABLES `specialisations` WRITE;
/*!40000 ALTER TABLE `specialisations` DISABLE KEYS */;
INSERT INTO `specialisations` VALUES ('5a292915-3735-4324-82a2-d8e821f70058','Medicina interna'),('b512d0f8-8c68-4012-b2e3-4c5b8a4c31dc','Oftalmologie'),('12730e16-75b0-462b-beff-32fea0346ce3','Ortopedie');
/*!40000 ALTER TABLE `specialisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisations_doctors_users`
--

DROP TABLE IF EXISTS `specialisations_doctors_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialisations_doctors_users` (
  `specialisationsId` char(36) NOT NULL,
  `usersId` char(36) NOT NULL,
  PRIMARY KEY (`specialisationsId`,`usersId`),
  KEY `IDX_a080fbca3517b75d46e5fca081` (`specialisationsId`),
  KEY `IDX_8345a20d6559badc2b310125ce` (`usersId`),
  CONSTRAINT `FK_8345a20d6559badc2b310125ce4` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_a080fbca3517b75d46e5fca0818` FOREIGN KEY (`specialisationsId`) REFERENCES `specialisations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisations_doctors_users`
--

LOCK TABLES `specialisations_doctors_users` WRITE;
/*!40000 ALTER TABLE `specialisations_doctors_users` DISABLE KEYS */;
INSERT INTO `specialisations_doctors_users` VALUES ('12730e16-75b0-462b-beff-32fea0346ce3','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a'),('5a292915-3735-4324-82a2-d8e821f70058','4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a'),('b512d0f8-8c68-4012-b2e3-4c5b8a4c31dc','5e51e1b1-891c-4c52-891e-0c950b904d99');
/*!40000 ALTER TABLE `specialisations_doctors_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userType` int NOT NULL DEFAULT '1',
  `birthDate` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('4a4b81c4-2ee2-47a3-9eb3-00e8ac2aa40a','doctor@gmail.com','$2b$10$aFWYO/4QLOpMllXUfXFz..jh2UBadlYSn3v7YuJWLtgX1XkLfhFXW','2021-10-06 17:29:42.638234','2022-02-13 21:58:22.304031',3,'1996-11-02 00:00:00','Dr. Iohannis'),('59e4348f-fc87-4273-826e-4359bb1440ce','alexiialin96@gmail.com','$2b$10$aFWYO/4QLOpMllXUfXFz..jh2UBadlYSn3v7YuJWLtgX1XkLfhFXW','2021-10-06 17:29:42.638234','2022-02-13 21:58:22.301851',1,'1996-11-02 00:00:00','Alexii Alin'),('5e51e1b1-891c-4c52-891e-0c950b904d98','doctor3@gmail.com','$2b$10$aFWYO/4QLOpMllXUfXFz..jh2UBadlYSn3v7YuJWLtgX1XkLfhFXW','2021-10-06 17:29:42.638234','2022-02-13 21:58:22.307774',3,'1996-11-02 00:00:00','Dr. Boc'),('5e51e1b1-891c-4c52-891e-0c950b904d99','doctor2@gmail.com','$2b$10$aFWYO/4QLOpMllXUfXFz..jh2UBadlYSn3v7YuJWLtgX1XkLfhFXW','2021-10-06 17:29:42.638234','2022-02-13 21:58:22.307774',3,'1996-11-02 00:00:00','Dr. Ponta'),('6648716c-c8ec-4171-b134-b09580e41082','callcenter@gmail.com','$2b$10$aFWYO/4QLOpMllXUfXFz..jh2UBadlYSn3v7YuJWLtgX1XkLfhFXW','2021-10-06 17:29:42.638234','2022-02-13 21:58:22.305957',2,'1996-11-02 00:00:00','Call Center'),('ed120e9e-c70d-462c-ace2-7842d7cc870d','grigoreandreea96@gmail.com','$2b$10$z8nlr6mDkGYOdd0GArrJU.eHHTCJ7tHYrRyHdwMchB7RliJKIFYBG','2021-10-06 18:20:16.266367','2022-02-13 21:58:22.310060',1,'1996-07-08 00:00:00','Grigore Andreea');
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

-- Dump completed on 2022-03-11 15:02:22
