-- MySQL dump 10.13  Distrib 5.5.40, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: NGN
-- ------------------------------------------------------
-- Server version	5.5.40-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Authors`
--

DROP TABLE IF EXISTS `Authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Authors` (
  `primeKey` int(11) NOT NULL AUTO_INCREMENT,
  `AUTH_HANDLE` varchar(255) NOT NULL,
  `AUTH_AVATAR` varchar(255) NOT NULL,
  `AUTH_EMAIL` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `AUTH_FULLNAME` varchar(255) DEFAULT NULL,
  `AUTH_DESCRIPTION` text NOT NULL,
  PRIMARY KEY (`primeKey`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Authors`
--

LOCK TABLES `Authors` WRITE;
/*!40000 ALTER TABLE `Authors` DISABLE KEYS */;
INSERT INTO `Authors` VALUES (1,'brando','/imgs/prof1.png','lawlzfactor@live.com','sha1$9024e0b0$1$8de0665f1ac9db59869d04f9c37740c261afc68e','Brandon Xaltipa','Hey guys. I\'m the admin and creator of this nifty little site. Odds are, you won\'t see me post much, but I\'ll be here behind the scenes keeping an eye on everything!'),(2,'Hanna','/imgs/prof2.png','hannarocker12@gmail.com','sha1$7aa4d633$1$e2abbfc8221d970c2dac1e24a8c52cd83bdadfe8','Hanna Tunnelsnakes','I\'m Hanna i\'m  a swedish/french trilingual girl who likes games. I\'m mostly into rpgs with a good story. My favourite games are probably fallout new vegas and the dead island series.  However I also enjoy the occasional indie game and MMO.'),(3,'Magnus King','/imgs/prof3.png','ak74uveteran@gmail.com','sha1$6af7938e$1$bec81609e3dbb98d26b9ff6e27b173a47334d7b2','Magnus King','Magnus King is a novice graphic designer currently living in the state of Connecticut. Besides his detrimental obsession with lame team-based shooters and MOBAs, he has a strong passion for music, literature, culinary arts, and psychology/philosophy.'),(4,'mcgrumm2015','/imgs/prof4.png','mctrenchcoaty@gmail.com','sha1$0aff9812$1$90faedf293c362ced4b851af2c794afdfcd34abe','Abel van der Sluijs','Hello, I am John Grimm, writer of articles for this very site you\'re reading'),(5,'S A V I E','/imgs/prof5.png','benji.vangeene@gmail.com','sha1$7f7ed603$1$c66460e595a662b4a5141d6839aaa98575d4f490','Benji Van Geene','I\'m a 17 year old full time MRA neckbeard, my hobbies include gaming, boardgames and lurking in dark alleys. my main games are Borderlands 2 and hearthstone, but i have over 120 on steam. I game on PC.'),(6,'Courtney Smith','/imgs/prof6.png','clairevanilla69@gmail.com','sha1$5eb23d4b$1$736d88c6ec6417237a185b8ff7714177b61cf1c6','Courtney Laine Smith','fighting game fanatic that is also really into WipEout, Shin Megami Tensei, and most Nintendo IPs.'),(7,'fasdfasd','/images/userprof/ngn_lCUVohdCG6.jpg','fasdfasdfasdf','sha1$fa4d7676$1$d5ca42224a617a31ed5b244217434391f3d2f905','sdfsd','fasdfasd'),(8,'asdfasdfasdf','/images/userprof/ngn_fFtUEVJSpp.gif','asdfsdfasd','sha1$0912c6fa$1$566b08a93fbd650d4b03433b71017aada0a8f7ec','asdfsad','fasdf'),(9,'asdf','/images/userprof/ngn_7YVRylv2VS.gif','afd','sha1$a8508f73$1$efb0ffb7b16849f3ce76d82f5ebac889dace6666','sadf','asdf'),(10,'asdasd','/images/userprof/ngn_MAMCHB2xfp.gif','addd','sha1$6d1f199b$1$78f87ab91278517958248930b1a044ef8660b091','asda','sdasd'),(11,'asd','/images/userprof/ngn_St8bK0hCAM.gif','asd','sha1$53e97b02$1$02ee5cbfd581bd9003ecab6b392c96eb8145d3c8','asd','asd'),(12,'asdas','/images/userprof/ngn_xjJsX3nHS6.png','ddddddddddd','sha1$b96131a8$1$4c0fd4fd1f1c8235cca8e0c858214565bedd9553','asdasd','asdasd'),(13,'ffffffffffff','/images/userprof/ngn_RRwjKNh9zh.png','fffffffffffff','sha1$b8cf3a06$1$9e255d7a51a0e2309727aa35dbdced41dae21ce3','sadfasdf','ffffffffffffff'),(14,'sgdf','/images/userprof/ngn_ShnHYp8qlN.png','sfgd','sha1$d4c7553f$1$e11fc42f7c3ae5476b2b46a6c9f491ac51fb0efc','fdgs','sdfg'),(15,'Austin Lee','/images/userprof/ngn_dyxKqD7l9g.png','Rozu618@gmail.com','sha1$2cd71d15$1$0cfd9f7356462914f7e821f6ad47d8c316dd9112','Austin','Lee'),(16,'f','images/userprof/6464.png','asdasd','sha1$f3201064$1$475737d72d6329efdd3f0c582eb526725938af74','fsd','sdf'),(17,'fds','images/userprof/6464.png','sdf','sha1$b1b15828$1$f6e720c04e1e023bc54188227fe6b1abd1d7dcbb','ddd','ddd'),(18,'shitfuck','images/userprof/6464.png','assfuck','sha1$73ee79f8$1$80c05b6dccf78e06afb1e589b518488e89039971','nigga','john'),(19,'Jake','images/userprof/6464.png','covetedbody@gmail.com','sha1$c3fefa3a$1$96b15278893c1f66b2009d635292ea68d6c25ac3','Jake','Merrill');
/*!40000 ALTER TABLE `Authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Thread_Comments`
--

DROP TABLE IF EXISTS `Thread_Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Thread_Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `COMMENT_CONTENT` text NOT NULL,
  `COMMENT_DATE` datetime NOT NULL,
  `COMMENT_AUTH` varchar(255) NOT NULL,
  `COMMENT_THREAD` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Thread_Comments`
--

LOCK TABLES `Thread_Comments` WRITE;
/*!40000 ALTER TABLE `Thread_Comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Thread_Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Thread_Meta_Tags`
--

DROP TABLE IF EXISTS `Thread_Meta_Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Thread_Meta_Tags` (
  `THREAD_ID` int(10) unsigned NOT NULL,
  `THREAD_META_TAG` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Thread_Meta_Tags`
--

LOCK TABLES `Thread_Meta_Tags` WRITE;
/*!40000 ALTER TABLE `Thread_Meta_Tags` DISABLE KEYS */;
INSERT INTO `Thread_Meta_Tags` VALUES (15,'dsaf'),(15,'sadf'),(15,'asdaas'),(15,'asf'),(15,'ewr'),(15,'23'),(15,'123');
/*!40000 ALTER TABLE `Thread_Meta_Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Thread_Photos_Videos`
--

DROP TABLE IF EXISTS `Thread_Photos_Videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Thread_Photos_Videos` (
  `THREAD_ID` int(10) unsigned NOT NULL,
  `THREAD_IMAGES` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Thread_Photos_Videos`
--

LOCK TABLES `Thread_Photos_Videos` WRITE;
/*!40000 ALTER TABLE `Thread_Photos_Videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Thread_Photos_Videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Threads`
--

DROP TABLE IF EXISTS `Threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Threads` (
  `primeKey` int(11) NOT NULL AUTO_INCREMENT,
  `THREAD_NAME` tinytext NOT NULL,
  `THREAD_DESC` text NOT NULL,
  `THREAD_DATE` date DEFAULT NULL,
  `THREAD_CONTENT` text NOT NULL,
  `THREAD_UPVOTES` int(10) NOT NULL,
  `THREAD_DOWNVOTES` int(10) NOT NULL,
  `THREAD_AUTH` varchar(255) NOT NULL,
  `THREAD_CATEG` varchar(255) NOT NULL,
  `THREAD_ID` varchar(255) NOT NULL,
  `COMMENTS` tinyint(1) NOT NULL,
  PRIMARY KEY (`primeKey`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Threads`
--

LOCK TABLES `Threads` WRITE;
/*!40000 ALTER TABLE `Threads` DISABLE KEYS */;
INSERT INTO `Threads` VALUES (8,'I\'m Addicted To Destiny And It\'s Kinda Awesome','','2015-01-19','Here\'s the thing about Destiny: When it came out, it was underwhelming to say the least. It was not what I thought it was. I imagined a massive open world much like World of Warcraft, except instead of Azeroth you would be on an old and broken Earth. That is not what Destiny is. Destiny is five or six instanced areas with the most annoying loading screens known to man sandwiched between them. And I love it. I love Destiny so, so much. It has replaced even World of Warcraft in my MMO gamer heart. Why, you may ask, do you love Destiny so much? Well, subjectively, I am a shoot and loot fanatic, shout out to Borderlands, so I can\'t get enough of this stuff. Objectively, or as objective as you can get with these things, the gunplay is solid as all get out and the soundtrack and visuals are beautiful. \r\nThere is something unique about Destiny in the way they\'ve set up their leveling system: After level 20 the only way you can level up is gear progression. If you want to be at level cap you need the gear to do it. You can get new gear by running in Strikes, or as many MMO veterans would call, dungeons. At the end of Strikes you\'re guaranteed gear, a ship, an armor decal, stuff like that. The harder strike, the better stuff. Strikes also give you Vanguard Marks which you can use to buy Legendary gear. World of Warcraft fans will know this method of getting people to play all too well. The difference is, Destiny is more accessible. It\'s easier to run Strikes, get gear and marks and buy Legendary gear. Why? Because it was designed for console. Not to imply that console gamers are worse gamers or anything to that effect, but they get bored quickly. If you\'re not moving forward whats the point of playing? Destiny is from a generation were developers have learned that grinding for gear, should it be too tedious, turns them away from the game. \r\nThis is where Bungie, I think, has hit the sweet spot in grinding. You can gain 100 Vanguard marks in one week, with 75 needed to by Legendary gear. If you you do a couple of Strikes almost everyday of the week, you\'re good. Plus you have 25 marks left over for next week! I\'ve now gotten two pieces of legendary gear through this process in the past two weeks and it feels splendid. My Hunter is now level 26 and I\'m wondering if I should run Vault of Glass. I\'m addicted to the game for at least right now, but let\'s see how I feel going forward. Thanks for reading Guardians, Jake out.  ',0,0,'Jake','MMO','I\'m-Addicted-Destiny-And-It\'s-Kinda-Awesome',0);
/*!40000 ALTER TABLE `Threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Accounts`
--

DROP TABLE IF EXISTS `User_Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Accounts` (
  `primeKey` int(11) NOT NULL AUTO_INCREMENT,
  `USER_EMAIL` varchar(255) NOT NULL,
  `USER_FIRSTNAME` text NOT NULL,
  `USER_LASTNAME` text NOT NULL,
  `USER_AVATAR` varchar(255) NOT NULL,
  `USER_DOB` datetime DEFAULT NULL,
  `USER_TOS_ACCEPT` tinyint(1) NOT NULL,
  `USER_PASSWORD` varchar(255) NOT NULL,
  `USER_SALT` varchar(255) NOT NULL,
  `USER_UNIQUE_ID` int(10) unsigned NOT NULL,
  PRIMARY KEY (`primeKey`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Accounts`
--

LOCK TABLES `User_Accounts` WRITE;
/*!40000 ALTER TABLE `User_Accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter`
--

LOCK TABLES `newsletter` WRITE;
/*!40000 ALTER TABLE `newsletter` DISABLE KEYS */;
INSERT INTO `newsletter` VALUES (1,'olof206@gmail.com','Olof','Rosberg'),(2,'covetedbody@gmail.com','Jake ','Merrill'),(3,'Rozu618@gmail.com','Austin','Lee');
/*!40000 ALTER TABLE `newsletter` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-20  2:37:09
