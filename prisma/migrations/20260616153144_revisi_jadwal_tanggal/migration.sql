-- CreateTable
CREATE TABLE `User` (
    `id_user` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `no_hp` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lapangan` (
    `id_lapangan` VARCHAR(191) NOT NULL,
    `nama_lapangan` VARCHAR(191) NOT NULL,
    `jenis_lapangan` VARCHAR(191) NOT NULL,
    `harga_perjam` INTEGER NOT NULL,

    PRIMARY KEY (`id_lapangan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jadwal` (
    `id_jadwal` VARCHAR(191) NOT NULL,
    `id_lapangan` VARCHAR(191) NOT NULL,
    `tanggal` DATETIME(3) NOT NULL,
    `hari` VARCHAR(191) NOT NULL,
    `jam_mulai` VARCHAR(191) NOT NULL,
    `jam_selesai` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'TERSEDIA',

    PRIMARY KEY (`id_jadwal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peminjaman` (
    `id_pinjam` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NOT NULL,
    `id_lapangan` VARCHAR(191) NOT NULL,
    `id_jadwal` VARCHAR(191) NOT NULL,
    `tgl_pinjam` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tgl_main` DATETIME(3) NOT NULL,
    `total_harga` INTEGER NOT NULL,
    `status_pinjam` VARCHAR(191) NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id_pinjam`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pembayaran` (
    `id_bayar` VARCHAR(191) NOT NULL,
    `id_pinjam` VARCHAR(191) NOT NULL,
    `tgl_bayar` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metode_bayar` VARCHAR(191) NOT NULL,
    `total_bayar` INTEGER NOT NULL,
    `status_bayar` VARCHAR(191) NOT NULL DEFAULT 'BELUM_BAYAR',

    PRIMARY KEY (`id_bayar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Jadwal` ADD CONSTRAINT `Jadwal_id_lapangan_fkey` FOREIGN KEY (`id_lapangan`) REFERENCES `Lapangan`(`id_lapangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_lapangan_fkey` FOREIGN KEY (`id_lapangan`) REFERENCES `Lapangan`(`id_lapangan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `Jadwal`(`id_jadwal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pembayaran` ADD CONSTRAINT `Pembayaran_id_pinjam_fkey` FOREIGN KEY (`id_pinjam`) REFERENCES `Peminjaman`(`id_pinjam`) ON DELETE RESTRICT ON UPDATE CASCADE;
