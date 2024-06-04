-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `nomor` VARCHAR(15) NOT NULL,
    `image` VARCHAR(255) NULL,
    `provinsi` VARCHAR(255) NOT NULL,
    `kab_kota` VARCHAR(255) NOT NULL,
    `kecamatan` VARCHAR(255) NOT NULL,
    `kode_pos` VARCHAR(10) NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collectors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `nomor` VARCHAR(15) NOT NULL,
    `image` VARCHAR(255) NULL,
    `provinsi` VARCHAR(255) NOT NULL,
    `kab_kota` VARCHAR(255) NOT NULL,
    `kecamatan` VARCHAR(255) NOT NULL,
    `kode_pos` VARCHAR(10) NOT NULL,
    `tipe` ENUM('HANDPHONE', 'LAPTOP') NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `token` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(100) NULL,
    `storage` VARCHAR(100) NULL,
    `harga` VARCHAR(100) NULL,
    `predict_harga` VARCHAR(100) NULL,
    `ram` VARCHAR(50) NULL,
    `screen_size` VARCHAR(50) NULL,
    `camera` VARCHAR(50) NULL,
    `battery_capacity` VARCHAR(50) NULL,
    `image` VARCHAR(255) NULL,
    `kategori` ENUM('HANDPHONE', 'LAPTOP') NOT NULL,
    `status` ENUM('AVAILABLE', 'SOLDOUT') NOT NULL,
    `minus` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `collector_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_collector_id_fkey` FOREIGN KEY (`collector_id`) REFERENCES `collectors`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
