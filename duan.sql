-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 10, 2023 at 11:28 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `duan`
--

-- --------------------------------------------------------

--
-- Table structure for table `binhluan`
--

CREATE TABLE `binhluan` (
  `id_bl` int(11) NOT NULL,
  `noidung` varchar(255) NOT NULL,
  `id_tk` int(11) NOT NULL,
  `id_sp` int(11) NOT NULL,
  `ngaybinhluan` date NOT NULL,
  `name_tk` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ct_giohang`
--

CREATE TABLE `ct_giohang` (
  `id_ctgiohang` int(11) NOT NULL,
  `color` varchar(10) NOT NULL,
  `kichthuoc` varchar(10) NOT NULL,
  `soluong` int(11) NOT NULL,
  `id_ctsp` int(11) NOT NULL,
  `id_giohang` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ct_hoadon`
--

CREATE TABLE `ct_hoadon` (
  `id_cthd` int(11) NOT NULL,
  `color` varchar(10) DEFAULT NULL,
  `kichthuoc` varchar(10) DEFAULT NULL,
  `price` int(50) DEFAULT NULL,
  `soluong` int(100) DEFAULT NULL,
  `id_hd` int(11) DEFAULT NULL,
  `id_sp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ct_sanpham`
--

CREATE TABLE `ct_sanpham` (
  `id_ctsp` int(11) NOT NULL,
  `color` varchar(10) NOT NULL,
  `kichthuoc` varchar(10) NOT NULL,
  `soluong` int(11) NOT NULL,
  `id_sp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `danhmuc`
--

CREATE TABLE `danhmuc` (
  `id_danhmuc` int(11) NOT NULL,
  `name_danhmuc` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhmuc`
--

INSERT INTO `danhmuc` (`id_danhmuc`, `name_danhmuc`) VALUES
(1, 'Áo Plazer'),
(2, 'Áo Phông'),
(3, 'Áo sơ mi'),
(4, 'Áo Polo'),
(5, 'Áo khoác'),
(6, 'Áo nỉ');

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `id_giohang` int(11) NOT NULL,
  `id_tk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `id_hd` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sdt` int(15) NOT NULL,
  `diachi` varchar(255) NOT NULL,
  `ptvc` varchar(255) NOT NULL,
  `pttt` varchar(255) NOT NULL,
  `trangthai` varchar(255) NOT NULL,
  `id_tk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id_sp` int(11) NOT NULL,
  `name_sp` varchar(50) NOT NULL,
  `img_sp` varchar(225) NOT NULL,
  `price_sp` int(50) NOT NULL,
  `mota` varchar(255) NOT NULL,
  `id_danhmuc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id_sp`, `name_sp`, `img_sp`, `price_sp`, `mota`, `id_danhmuc`) VALUES
(10, 'Áo Nỉ Regular 4015', '20231103_MRDB6s3ENx.jpeg', 449, 'kjalkclacac', 6),
(11, 'Áo Nỉ Regular 4015', '20231103_MRDB6s3ENx.jpeg', 449, 'kjalkclacac', 6),
(12, 'Áo Nỉ Regular 4015', '20231103_MRDB6s3ENx.jpeg', 449, 'kjalkclacac', 6),
(13, 'Áo Nỉ Regular 4015', '20231103_MRDB6s3ENx.jpeg', 449, 'ọinuini', 6);

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `id_tk` int(11) NOT NULL,
  `name_tk` varchar(225) NOT NULL,
  `pass_tk` varchar(225) NOT NULL,
  `email_tk` varchar(255) NOT NULL,
  `address_tk` varchar(255) NOT NULL,
  `tel_tk` varchar(20) NOT NULL,
  `role` tinyint(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `voucher`
--

CREATE TABLE `voucher` (
  `id_vc` int(11) NOT NULL,
  `mavc` int(50) NOT NULL,
  `ngaydang` date NOT NULL,
  `loaimakm` varchar(255) NOT NULL,
  `ngaybatdau` date NOT NULL,
  `ngayketthuc` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD KEY `lk_id_taikhoan` (`id_tk`),
  ADD KEY `lk_id_sanpham` (`id_sp`);

--
-- Indexes for table `ct_giohang`
--
ALTER TABLE `ct_giohang`
  ADD PRIMARY KEY (`id_ctgiohang`);

--
-- Indexes for table `ct_hoadon`
--
ALTER TABLE `ct_hoadon`
  ADD PRIMARY KEY (`id_cthd`);

--
-- Indexes for table `ct_sanpham`
--
ALTER TABLE `ct_sanpham`
  ADD PRIMARY KEY (`id_ctsp`);

--
-- Indexes for table `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`id_danhmuc`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`id_giohang`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`id_hd`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id_sp`),
  ADD KEY `lk_sanpham_danhmuc` (`id_danhmuc`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`id_tk`);

--
-- Indexes for table `voucher`
--
ALTER TABLE `voucher`
  ADD PRIMARY KEY (`id_vc`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ct_giohang`
--
ALTER TABLE `ct_giohang`
  MODIFY `id_ctgiohang` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ct_sanpham`
--
ALTER TABLE `ct_sanpham`
  MODIFY `id_ctsp` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `id_danhmuc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `id_giohang` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `id_hd` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id_sp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `id_tk` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `voucher`
--
ALTER TABLE `voucher`
  MODIFY `id_vc` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `binhluan`
--
ALTER TABLE `binhluan`
  ADD CONSTRAINT `lk_id_sanpham` FOREIGN KEY (`id_sp`) REFERENCES `sanpham` (`id_sp`),
  ADD CONSTRAINT `lk_id_taikhoan` FOREIGN KEY (`id_tk`) REFERENCES `taikhoan` (`id_tk`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `lk_sanpham_danhmuc` FOREIGN KEY (`id_danhmuc`) REFERENCES `danhmuc` (`id_danhmuc`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
