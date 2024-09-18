-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2024 at 04:24 PM
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
-- Database: `stuntcare`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL,
  `sumber` varchar(255) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artikel`
--

INSERT INTO `artikel` (`id`, `judul`, `deskripsi`, `tanggal`, `sumber`, `gambar`, `kategori`, `createdAt`, `updatedAt`) VALUES
(1, 'Apa itu stunting fase 2', 'Stunting adalah kondisi terhambatnya pertumbuhan fisik dan perkembangan otak pada anak-anak, biasanya disebabkan oleh kurangnya asupan gizi yang memadai dan infeksi pada masa awal kehidupan', '2024-05-14 00:00:00', 'http://sumber.com', 'https://link.gambar.com', 'Semua Kategori', '2024-05-15 14:14:54', '2024-05-15 14:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `mpasi`
--

CREATE TABLE `mpasi` (
  `id` int(11) NOT NULL,
  `makanan` varchar(255) NOT NULL,
  `porsi` int(11) DEFAULT NULL,
  `bahan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`bahan`)),
  `cara_masak` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`cara_masak`)),
  `kandungan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`kandungan`)),
  `kategori` varchar(255) NOT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mpasi`
--

INSERT INTO `mpasi` (`id`, `makanan`, `porsi`, `bahan`, `cara_masak`, `kandungan`, `kategori`, `gambar`, `createdAt`, `updatedAt`) VALUES
(1, 'Bubur Perubahan', 2, '{\"kentang\":\"10 gr\",\"telur\":\"1 butir\",\"kaldu sapi\":\"50 ml\"}', '[\"Kupas dan potong kentang menjadi potongan kecil-kecil.\",\"Rebus kentang hingga empuk, lalu tiriskan.\",\"Kocok telur dan tambahkan ke dalam kentang yang telah dihaluskan.\",\"Panaskan kaldu sapi dan tambahkan ke dalam campuran kentang dan telur. Aduk hingga merata.\",\"Masak campuran tersebut dengan api kecil hingga mengental dan menjadi bubur yang lembut.\",\"Angkat dan biarkan dingin sebelum disajikan kepada bayi.\"]', '{\"kalori\":\"100 kkal\",\"protein\":\"6 gr\",\"lemak\":\"3,5 gr\",\"karbohidrat\":\"7,8 gr\"}', '6-8 bulan', 'https://link.perubahan.com', '2024-05-15 14:01:10', '2024-05-15 14:22:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mpasi`
--
ALTER TABLE `mpasi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `artikel`
--
ALTER TABLE `artikel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mpasi`
--
ALTER TABLE `mpasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
