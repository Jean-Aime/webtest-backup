-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2026 at 10:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jas_consulting`
--

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` varchar(191) NOT NULL,
  `careerId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `resumeUrl` varchar(191) NOT NULL,
  `coverLetter` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `career`
--

CREATE TABLE `career` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `department` varchar(191) NOT NULL,
  `location` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `experience` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `requirements` varchar(191) NOT NULL,
  `benefits` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `career`
--

INSERT INTO `career` (`id`, `title`, `slug`, `department`, `location`, `type`, `experience`, `description`, `requirements`, `benefits`, `featured`, `publishedAt`, `expiresAt`, `createdAt`, `updatedAt`) VALUES
('cmkwpxntc000gtxslu599fjox', 'Senior Management Consultant', 'senior-management-consultant', 'Consulting', 'New York, NY', 'Full-time', 'Senior', 'Lead strategic consulting engagements for Fortune 500 clients...', '[\"MBA or equivalent\",\"5+ years consulting experience\",\"Strong analytical skills\"]', '[\"Competitive salary\",\"Health insurance\",\"401k matching\",\"Flexible work\"]', 1, '2026-01-27 14:55:35.377', '2025-12-31 00:00:00.000', '2026-01-27 14:55:35.377', '2026-01-27 14:55:35.377'),
('cmkwpxntc000htxslg6cmrhrl', 'Data Scientist', 'data-scientist', 'Technology', 'San Francisco, CA', 'Full-time', 'Mid-level', 'Build AI/ML solutions for client engagements...', '[\"MS in Computer Science or related\",\"3+ years ML experience\",\"Python, TensorFlow\"]', '[\"Competitive salary\",\"Stock options\",\"Learning budget\",\"Remote work\"]', 1, '2026-01-27 14:55:35.377', '2025-12-31 00:00:00.000', '2026-01-27 14:55:35.377', '2026-01-27 14:55:35.377');

-- --------------------------------------------------------

--
-- Table structure for table `expert`
--

CREATE TABLE `expert` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL,
  `bio` varchar(191) NOT NULL,
  `expertise` varchar(191) NOT NULL,
  `locations` varchar(191) NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `linkedin` varchar(191) DEFAULT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expert`
--

INSERT INTO `expert` (`id`, `name`, `slug`, `role`, `bio`, `expertise`, `locations`, `image`, `email`, `linkedin`, `featured`, `createdAt`, `updatedAt`) VALUES
('cmkwpxnfw0000txsltho91t1i', 'Sarah Chen', 'sarah-chen', 'Managing Partner, Digital Transformation', 'Sarah leads our digital transformation practice with over 20 years of experience helping Fortune 500 companies modernize their operations.', '[\"Digital Strategy\",\"AI & ML\",\"Cloud Migration\",\"Agile Transformation\"]', '[\"New York\",\"San Francisco\"]', '/images/experts/sarah-chen.jpg', 'sarah.chen@jas.com', 'https://linkedin.com/in/sarahchen', 1, '2026-01-27 14:55:34.892', '2026-01-27 14:55:34.892'),
('cmkwpxngn0001txsl3dztm97i', 'Michael Rodriguez', 'michael-rodriguez', 'Partner, Financial Services', 'Michael specializes in financial services transformation, risk management, and regulatory compliance.', '[\"Risk Management\",\"Regulatory Compliance\",\"Financial Technology\",\"M&A Advisory\"]', '[\"New York\",\"London\"]', '/images/experts/michael-rodriguez.jpg', 'michael.rodriguez@jas.com', 'https://linkedin.com/in/michaelrodriguez', 1, '2026-01-27 14:55:34.919', '2026-01-27 14:55:34.919');

-- --------------------------------------------------------

--
-- Table structure for table `industry`
--

CREATE TABLE `industry` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `challenges` varchar(191) NOT NULL,
  `trends` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `industry`
--

INSERT INTO `industry` (`id`, `name`, `slug`, `description`, `overview`, `challenges`, `trends`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('cmkwpxnh40002txsla890q141', 'Financial Services', 'financial-services', 'Transform your financial institution with cutting-edge technology and strategic insights', 'Navigate the complex landscape of modern finance with our comprehensive consulting services.', '[\"Regulatory Compliance\",\"Digital Disruption\",\"Cybersecurity Threats\",\"Legacy System Modernization\"]', '[\"Open Banking\",\"DeFi & Blockchain\",\"AI-Powered Risk Management\",\"Embedded Finance\"]', 1, '/images/industries/financial-services.jpg', '2026-01-27 14:55:34.936', '2026-01-27 14:55:34.936'),
('cmkwpxnib0003txsl933mlvse', 'Healthcare & Life Sciences', 'healthcare-life-sciences', 'Innovate patient care and operational excellence in healthcare', 'Transform healthcare delivery with data-driven insights and digital innovation.', '[\"Patient Data Security\",\"Interoperability\",\"Cost Management\",\"Regulatory Compliance\"]', '[\"Telemedicine\",\"AI Diagnostics\",\"Personalized Medicine\",\"Value-Based Care\"]', 1, '/images/industries/healthcare.jpg', '2026-01-27 14:55:34.979', '2026-01-27 14:55:34.979');

-- --------------------------------------------------------

--
-- Table structure for table `insight`
--

CREATE TABLE `insight` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `trending` tinyint(1) NOT NULL DEFAULT 0,
  `gated` tinyint(1) NOT NULL DEFAULT 0,
  `downloadUrl` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `readTime` int(11) NOT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `authorId` varchar(191) NOT NULL,
  `topics` varchar(191) NOT NULL,
  `regions` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `insight`
--

INSERT INTO `insight` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `trending`, `gated`, `downloadUrl`, `image`, `readTime`, `publishedAt`, `createdAt`, `updatedAt`, `authorId`, `topics`, `regions`) VALUES
('cmkwpxnm1000btxslc0vr60qt', 'The Future of Banking: AI-Powered Customer Experience', 'future-banking-ai-customer-experience', 'Article', 'Artificial intelligence is revolutionizing how banks interact with customers...', 'Discover how AI is transforming customer experience in banking', 1, 1, 0, NULL, '/images/insights/ai-banking.jpg', 8, '2026-01-27 14:55:35.113', '2026-01-27 14:55:35.113', '2026-01-27 14:55:35.113', 'cmkwpxnfw0000txsltho91t1i', '[\"Artificial Intelligence\",\"Customer Experience\",\"Banking\"]', '[\"North America\",\"Europe\"]'),
('cmkwpxnnb000dtxslrpfusjua', 'Healthcare Digital Transformation: A Comprehensive Guide', 'healthcare-digital-transformation-guide', 'Whitepaper', 'This comprehensive guide explores the key strategies for successful digital transformation in healthcare...', 'Complete roadmap for healthcare digital transformation', 1, 0, 1, '/downloads/healthcare-digital-guide.pdf', '/images/insights/healthcare-digital.jpg', 15, '2026-01-27 14:55:35.159', '2026-01-27 14:55:35.159', '2026-01-27 14:55:35.159', 'cmkwpxngn0001txsl3dztm97i', '[\"Digital Transformation\",\"Healthcare\",\"Technology\"]', '[\"Global\"]');

-- --------------------------------------------------------

--
-- Table structure for table `lead`
--

CREATE TABLE `lead` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `company` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `message` varchar(191) DEFAULT NULL,
  `source` varchar(191) NOT NULL,
  `metadata` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mediaitem`
--

CREATE TABLE `mediaitem` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `excerpt` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `attachments` varchar(191) NOT NULL,
  `publishedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mediaitem`
--

INSERT INTO `mediaitem` (`id`, `title`, `slug`, `type`, `content`, `excerpt`, `featured`, `image`, `attachments`, `publishedAt`, `createdAt`, `updatedAt`) VALUES
('cmkwpxnu9000itxslhnlm2izv', 'JAS.COM Announces New AI Practice', 'jas-announces-ai-practice', 'Press Release', 'JAS.COM today announced the launch of its new AI & Machine Learning practice...', 'New practice to help clients leverage AI for business transformation', 1, '/images/media/ai-practice.jpg', '[\"/downloads/press-release-ai.pdf\"]', '2026-01-27 14:55:35.409', '2026-01-27 14:55:35.409', '2026-01-27 14:55:35.409'),
('cmkwpxnu9000jtxslhyvxln0z', 'JAS.COM Named Leader in Digital Transformation', 'jas-leader-digital-transformation', 'News', 'Industry analyst firm recognizes JAS.COM as a leader in digital transformation consulting...', 'Recognition for excellence in digital transformation services', 1, '/images/media/award.jpg', '[]', '2026-01-27 14:55:35.409', '2026-01-27 14:55:35.409', '2026-01-27 14:55:35.409');

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `country` varchar(191) NOT NULL,
  `city` varchar(191) NOT NULL,
  `address` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`id`, `name`, `slug`, `region`, `country`, `city`, `address`, `phone`, `email`, `lat`, `lng`, `image`, `createdAt`, `updatedAt`) VALUES
('cmkwpxnsr000etxslu9unw5er', 'New York', 'new-york', 'North America', 'United States', 'New York', '200 West Street, New York, NY 10013', '+1 212 555 0100', 'newyork@jas.com', 40.7128, -74.006, '/images/offices/new-york.jpg', '2026-01-27 14:55:35.355', '2026-01-27 14:55:35.355'),
('cmkwpxnsr000ftxsl6hr8ybfy', 'London', 'london', 'Europe', 'United Kingdom', 'London', '1 Canada Square, Canary Wharf, London E14 5AB', '+44 20 7123 4567', 'london@jas.com', 51.5074, -0.1278, '/images/offices/london.jpg', '2026-01-27 14:55:35.355', '2026-01-27 14:55:35.355');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `overview` varchar(191) NOT NULL,
  `methodologies` varchar(191) NOT NULL,
  `tools` varchar(191) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `image` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `slug`, `description`, `overview`, `methodologies`, `tools`, `featured`, `image`, `createdAt`, `updatedAt`) VALUES
('cmkwpxnjk0004txslvx9ih2lo', 'Digital Transformation', 'digital-transformation', 'End-to-end digital transformation to modernize your business', 'We help organizations reimagine their business models, operations, and customer experiences through digital innovation.', '[\"Design Thinking\",\"Agile\",\"DevOps\",\"Lean Startup\"]', '[\"AWS\",\"Azure\",\"Salesforce\",\"SAP\",\"Tableau\"]', 1, '/images/services/digital-transformation.jpg', '2026-01-27 14:55:35.025', '2026-01-27 14:55:35.025'),
('cmkwpxnk70005txsljk7zmlg4', 'Strategy & Operations', 'strategy-operations', 'Strategic planning and operational excellence for sustainable growth', 'Develop winning strategies and optimize operations to achieve your business objectives.', '[\"Porter\'s Five Forces\",\"Blue Ocean Strategy\",\"Balanced Scorecard\",\"Six Sigma\"]', '[\"Tableau\",\"Power BI\",\"SAP\",\"Oracle\"]', 1, '/images/services/strategy.jpg', '2026-01-27 14:55:35.047', '2026-01-27 14:55:35.047');

-- --------------------------------------------------------

--
-- Table structure for table `subservice`
--

CREATE TABLE `subservice` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) NOT NULL,
  `serviceId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subservice`
--

INSERT INTO `subservice` (`id`, `name`, `description`, `serviceId`) VALUES
('cmkwpxnlh0006txslfmybjpzu', 'Cloud Migration', 'Seamless transition to cloud infrastructure', 'cmkwpxnjk0004txslvx9ih2lo'),
('cmkwpxnlh0007txslx8r9zr8s', 'AI & Machine Learning', 'Intelligent automation and predictive analytics', 'cmkwpxnjk0004txslvx9ih2lo'),
('cmkwpxnlh0008txsljhcjngq9', 'Business Model Innovation', 'Reimagine your value proposition', 'cmkwpxnk70005txsljk7zmlg4'),
('cmkwpxnlh0009txsljdyvgolf', 'Operational Excellence', 'Optimize processes and reduce costs', 'cmkwpxnk70005txsljk7zmlg4');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'admin',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES
('cmkwyzuj9000013x45sn64w9m', 'admin@jas.com', '$2b$10$VwAu2dA1KLtgw6RQy0eRK.nmcL4njgfJzG945n5w9g7jUgjV3cNIS', 'Admin User', 'admin', '2026-01-27 19:09:13.935', '2026-01-27 19:09:13.935');

-- --------------------------------------------------------

--
-- Table structure for table `_experttoindustry`
--

CREATE TABLE `_experttoindustry` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_experttoindustry`
--

INSERT INTO `_experttoindustry` (`A`, `B`) VALUES
('cmkwpxnfw0000txsltho91t1i', 'cmkwpxnh40002txsla890q141'),
('cmkwpxngn0001txsl3dztm97i', 'cmkwpxnib0003txsl933mlvse');

-- --------------------------------------------------------

--
-- Table structure for table `_experttoservice`
--

CREATE TABLE `_experttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_experttoservice`
--

INSERT INTO `_experttoservice` (`A`, `B`) VALUES
('cmkwpxnfw0000txsltho91t1i', 'cmkwpxnjk0004txslvx9ih2lo'),
('cmkwpxngn0001txsl3dztm97i', 'cmkwpxnk70005txsljk7zmlg4');

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoinsight`
--

CREATE TABLE `_industrytoinsight` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_industrytoinsight`
--

INSERT INTO `_industrytoinsight` (`A`, `B`) VALUES
('cmkwpxnh40002txsla890q141', 'cmkwpxnm1000btxslc0vr60qt'),
('cmkwpxnib0003txsl933mlvse', 'cmkwpxnnb000dtxslrpfusjua');

-- --------------------------------------------------------

--
-- Table structure for table `_industrytoservice`
--

CREATE TABLE `_industrytoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_insighttoservice`
--

CREATE TABLE `_insighttoservice` (
  `A` varchar(191) NOT NULL,
  `B` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_insighttoservice`
--

INSERT INTO `_insighttoservice` (`A`, `B`) VALUES
('cmkwpxnm1000btxslc0vr60qt', 'cmkwpxnjk0004txslvx9ih2lo'),
('cmkwpxnnb000dtxslrpfusjua', 'cmkwpxnjk0004txslvx9ih2lo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Application_careerId_fkey` (`careerId`);

--
-- Indexes for table `career`
--
ALTER TABLE `career`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Career_slug_key` (`slug`);

--
-- Indexes for table `expert`
--
ALTER TABLE `expert`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Expert_slug_key` (`slug`);

--
-- Indexes for table `industry`
--
ALTER TABLE `industry`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Industry_slug_key` (`slug`);

--
-- Indexes for table `insight`
--
ALTER TABLE `insight`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Insight_slug_key` (`slug`),
  ADD KEY `Insight_authorId_fkey` (`authorId`);

--
-- Indexes for table `lead`
--
ALTER TABLE `lead`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mediaitem`
--
ALTER TABLE `mediaitem`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `MediaItem_slug_key` (`slug`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Office_slug_key` (`slug`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Service_slug_key` (`slug`);

--
-- Indexes for table `subservice`
--
ALTER TABLE `subservice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `SubService_serviceId_fkey` (`serviceId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexes for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD UNIQUE KEY `_ExpertToIndustry_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToIndustry_B_index` (`B`);

--
-- Indexes for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD UNIQUE KEY `_ExpertToService_AB_unique` (`A`,`B`),
  ADD KEY `_ExpertToService_B_index` (`B`);

--
-- Indexes for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD UNIQUE KEY `_IndustryToInsight_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToInsight_B_index` (`B`);

--
-- Indexes for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD UNIQUE KEY `_IndustryToService_AB_unique` (`A`,`B`),
  ADD KEY `_IndustryToService_B_index` (`B`);

--
-- Indexes for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD UNIQUE KEY `_InsightToService_AB_unique` (`A`,`B`),
  ADD KEY `_InsightToService_B_index` (`B`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `application`
--
ALTER TABLE `application`
  ADD CONSTRAINT `Application_careerId_fkey` FOREIGN KEY (`careerId`) REFERENCES `career` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `insight`
--
ALTER TABLE `insight`
  ADD CONSTRAINT `Insight_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `expert` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `subservice`
--
ALTER TABLE `subservice`
  ADD CONSTRAINT `SubService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoindustry`
--
ALTER TABLE `_experttoindustry`
  ADD CONSTRAINT `_ExpertToIndustry_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToIndustry_B_fkey` FOREIGN KEY (`B`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_experttoservice`
--
ALTER TABLE `_experttoservice`
  ADD CONSTRAINT `_ExpertToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `expert` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_ExpertToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoinsight`
--
ALTER TABLE `_industrytoinsight`
  ADD CONSTRAINT `_IndustryToInsight_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToInsight_B_fkey` FOREIGN KEY (`B`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_industrytoservice`
--
ALTER TABLE `_industrytoservice`
  ADD CONSTRAINT `_IndustryToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `industry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_IndustryToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `_insighttoservice`
--
ALTER TABLE `_insighttoservice`
  ADD CONSTRAINT `_InsightToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `insight` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `_InsightToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
