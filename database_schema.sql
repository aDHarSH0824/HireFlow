-- MySQL dump for HireFlow Database Schema

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `password` varchar(255) NOT NULL,
  `role` enum('job_seeker','job_poster') NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `job_listings`
--

CREATE TABLE IF NOT EXISTS `job_listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `job_type` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `employer_email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE IF NOT EXISTS `job_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `resume` varchar(255) NOT NULL,
  `poster_id` int(11) DEFAULT NULL,
  `poster_email` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `job_title` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `application_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
