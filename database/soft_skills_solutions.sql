-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: soft_skills_solutions
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
INSERT INTO `contact_messages` VALUES (1,'Maya ','sarah.javaid.232012045@mypgi.edu.pk','+92 325 2467463','programs','Hello, I would like to know more about your Cloud Computing program. Could you please share the course duration, fee structure, and class schedule? Thank you.','2026-06-29 07:00:11'),(2,'Maya ','sarah.javaid.232012045@mypgi.edu.pk','+92 325 2467463','programs','Hello, I would like to know more about your Cloud Computing program. Could you please share the course duration, fee structure, and class schedule? Thank you.','2026-06-29 07:00:17'),(3,'Maya ','sarah.javaid.232012045@mypgi.edu.pk','+92 325 2467463','programs','Hello, I would like to know more about your Cloud Computing program. Could you please share the course duration, fee structure, and class schedule? Thank you.','2026-06-29 07:00:18');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `course` varchar(100) NOT NULL,
  `education` varchar(100) DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,'Mahnoor','mahnoor@example.com','03001234567','Pakistan','Web Development','BS Software Engineering','I want to enroll.','2026-06-28 12:50:07','Approved',NULL),(2,'Ali Raza','ali.raza.dev2026@example.com','03124567890','','AI & Machine Learning','Bachelor\'s Degree','I am interested in joining the AI & Machine Learning course. Please share the course schedule, fee structure, and starting date.','2026-06-28 12:59:52','Approved',NULL),(3,'Ahmed Hassan','ahmed.hassan101@example.com','03114567890','','FBISE Grade 8-12 Program','Other','I would like to enroll in this program. Please share the class timings and fee details.','2026-06-28 13:03:53','Approved',NULL),(4,'Ayesha Khan','ayesha.khan@example.com','03014567891','','Cloud Computing','High School','I am a beginner and want to learn Cloud Computing from scratch.','2026-06-28 13:37:53','Approved',10),(5,'Zainab Ali','zainab.ali@example.com','03001234567','','Full Stack Development','High School','I am a beginner and want to start my career in web development.','2026-06-28 13:54:20','Pending',NULL),(6,'Aryan A. Sharma','aryan@gmail.com','0919876543210','','Data Science','High School','I want to enroll in Beginner course of Data Science. Inorder to get details about advanced tech. Kindly share with me fees structure.','2026-06-28 14:11:35','Pending',NULL),(7,'Danyal G. Zafar','ali@gmail.com','03194424560','','Blockchain','Intermediate / A-Level','I want to enroll in this course for getting details about Block-Chain. And kindly share fees structure','2026-06-28 14:20:11','Pending',NULL),(8,'Khadija K. Hussain','khadija@gmail.com','9876543210','','Graphic Design','High School','I want to enroll in beginners course of Graphic Designing. And share kindly fee structure. ','2026-06-28 14:30:28','Pending',NULL),(9,'Ali Raza','ali.raza@example.com','03011234567','','Federal Board Curriculum (Grades 8-12)','Intermediate / A-Level','I want to improve my understanding of Federal Board syllabus and prepare for exams with proper guidance.','2026-06-28 14:33:16','Pending',NULL),(10,'Fizza','sarah.javaid.232012045@mypgi.edu.pk','03194585840','','DevOps & Automation','Bachelor\'s Degree','I want to learn about Deployment and handlng of projects from designing to deployment and handling afterwards. Can you plz share details about teachers who would be offering this course.  ','2026-06-28 17:01:38','Approved',NULL),(11,'Sania','sarah111@gmail.com','9876543210','','Cloud Computing','Intermediate / A-Level','I want to learn cloud computing because it\'s latest field. ','2026-06-28 18:38:05','Rejected',NULL),(16,'Aryan A. Sharma','javaidmoris789@gmail.com','0919876543210','','Cloud Computing','Intermediate / A-Level','I want to learn from basic. ','2026-06-29 02:46:23','Approved',8),(31,'Hina Khan','sarahjavaid111@gmail.com','+92 345 5566778','','Federal Board Curriculum (Grades 8-12)','Bachelor\'s Degree','I want to understand the British Curriculum better so I can support students effectively and improve my teaching methods.','2026-07-03 13:21:49','Approved',13),(32,'Maya','sarajavaidd@gmail.com','+92 300 1234567','','IGCSE & O Level Preparation','Intermediate / A-Level','I want to strengthen my understanding of IGCSE & O Level subjects, improve my exam preparation techniques, and achieve excellent grades. This course will help me build a strong foundation and prepare confidently for my examinations.','2026-07-03 13:50:40','Approved',14);
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `research_orders`
--

DROP TABLE IF EXISTS `research_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `research_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `service` varchar(100) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `requirements` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(50) DEFAULT 'awaiting_reply',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `research_orders`
--

LOCK TABLES `research_orders` WRITE;
/*!40000 ALTER TABLE `research_orders` DISABLE KEYS */;
INSERT INTO `research_orders` VALUES (3,'Ali Khan','sarah.javaid.232012045@mypgi.edu.pk','03194585840','Research Proposal','Blockchain Technology in Supply Chain Management','2026-07-15','Need a comprehensive literature review covering recent journal articles, key research gaps, and future research directions. APA 7th edition referencing is required.','2026-06-30 02:13:10','awaiting_reply'),(4,'Maya ','sarajavaidd@gmail.com','+92 301 4567890','Graphs & Plotting','The Impact of Artificial Intelligence on Modern Healthcare','2026-07-15','I need a 12-page IEEE-format research paper with abstract, literature review, methodology, results, conclusion, and references. Please use at least 25 recent journal articles (2022–2026) and ensure plagiarism is below 10%.','2026-06-30 02:16:06','awaiting_reply');
/*!40000 ALTER TABLE `research_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `enrollment_id` int DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','admin') DEFAULT 'student',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `users_ibfk_1` (`enrollment_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Mahnoor','mahnoor@example.com','$2b$10$qgitsamdBzmp3FralrwCDuCB39uizrkawNnerusOMJMUPkJRrXRky','student','2026-06-28 17:50:20'),(3,NULL,'Administrator','admin@gmail.com','$2b$10$Heh1Dk6XrlH6VEYyJEwmLuDNpPJnjtG8j2NGlCTA.pPbyN8.rOFdm','admin','2026-06-29 01:43:54'),(4,2,'Ali Raza','ali.raza.dev2026@example.com','$2b$10$EuhjXDSACfM8PLSpVUl15OvhpxvU.HjnMUg1v8p8AYNAh5AQrkIX6','student','2026-06-29 02:15:14'),(5,3,'Ahmed Hassan','ahmed.hassan101@example.com','$2b$10$WhWwN/GaoWPE5GGj3XpcTeg1K.dv7C3gWK4uX/uNhBYzkK5LvlcUa','student','2026-06-29 03:14:06'),(6,10,'Fizza','sarah.javaid.232012045@mypgi.edu.pk','$2b$10$zOtbkH1JaGoI0Ze9kLQYKuYQuSTFkJvAHsuM17MX0okG/JvvgtEOK','student','2026-06-29 03:15:41'),(8,16,'Aryan A. Sharma','javaidmoris789@gmail.com','$2b$10$dkwbs54nw9sxHhz6qaXMJepbJDxyQWZip5Wuspytm.nZ5Z5lODa76','student','2026-06-29 06:38:41'),(10,4,'Ayesha Khan','ayesha.khan@example.com','$2b$10$v/j3AYkaNUt3XFofSUJBYOequiOgoIXTGE5wz1dp/SzzwxjkN0cBm','student','2026-06-29 07:47:21'),(13,31,'Hina Khan','sarahjavaid111@gmail.com','$2b$10$O5mhnPfH91sXqNxSJjKZOeMSBwRV6Mj66t3AR1wytVgYMNIQUn6mi','student','2026-07-03 13:26:48'),(14,32,'Maya','sarajavaidd@gmail.com','$2b$10$h9ZO7Mr1Vn10RQSCGuSfkeYBQK5mzbr19M8wcCEGQXgd3oDDt9oKG','student','2026-07-03 13:51:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zoom_bookings`
--

DROP TABLE IF EXISTS `zoom_bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zoom_bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `course` varchar(100) NOT NULL,
  `preferred_date` date NOT NULL,
  `preferred_time` time NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `meeting_link` varchar(255) DEFAULT NULL,
  `meeting_id` varchar(100) DEFAULT NULL,
  `meeting_password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zoom_bookings`
--

LOCK TABLES `zoom_bookings` WRITE;
/*!40000 ALTER TABLE `zoom_bookings` DISABLE KEYS */;
INSERT INTO `zoom_bookings` VALUES (1,'Mahnoor','sarah@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Approved','https://us05web.zoom.us/j/84345469721?pwd=rneG88GiM4uAhONVgpptMmwDd5bvyL.1','84345469721','k1x916','2026-07-08 09:53:11'),(2,'Mahnoor','sarahjavaid111@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Approved','https://us05web.zoom.us/j/89146024918?pwd=sw2VbJ4PWjajTvSUuVSlMiEVUJmKTs.1','89146024918','nS8D4Y','2026-07-08 11:02:45'),(3,'Mahnoor','sarahjavaid111@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Pending',NULL,NULL,NULL,'2026-07-08 12:38:51'),(4,'Mahnoor','sarahjavaid111@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Pending',NULL,NULL,NULL,'2026-07-08 12:39:09'),(5,'Mahnoor','sarahjavaid111@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Pending',NULL,NULL,NULL,'2026-07-08 12:39:30'),(6,'Mahnoor','sarahjavaid111@gmail.com','03123456789','Web Development','2026-07-20','18:00:00','Pending',NULL,NULL,NULL,'2026-07-08 13:15:34'),(7,'Khadija K. Hussain','sarahjavaid111@gmail.com','9876543210','IGCSE','2026-07-16','20:30:00','Approved','https://us05web.zoom.us/j/87478696836?pwd=NW8bKp2bICrmEAuhWjBxLLcVqytlAl.1','87478696836','eNYSP4','2026-07-08 13:28:02'),(8,'Manvi','sarah.javaid.232012045@mypgi.edu.pk','03194585840','A Level','2026-07-24','22:40:00','Approved','https://us05web.zoom.us/j/89825596350?pwd=9kqgtqAOHU3w3KzJXTna8elpoJCjRD.1','89825596350','2A43Vj','2026-07-08 14:39:25');
/*!40000 ALTER TABLE `zoom_bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-08 22:49:59
