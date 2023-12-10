-- CreateTable
CREATE TABLE `Logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `ci` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `People` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `ci` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `session` BOOLEAN NOT NULL DEFAULT false,
    `last_session` DATETIME(3) NULL,
    `create` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `token` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `People_ci_key`(`ci`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `n_identification` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `show_me` BOOLEAN NOT NULL DEFAULT true,
    `creathe_by` INTEGER NOT NULL,
    `date_id` INTEGER NOT NULL,
    `clasification_id` INTEGER NOT NULL,
    `quantity_id` INTEGER NOT NULL,

    UNIQUE INDEX `Objects_date_id_key`(`date_id`),
    UNIQUE INDEX `Objects_clasification_id_key`(`clasification_id`),
    UNIQUE INDEX `Objects_quantity_id_key`(`quantity_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dates_objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creathe` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update` DATETIME(3) NOT NULL,
    `delete` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quantity_objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fisica` INTEGER NOT NULL,
    `contable` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clasification_objects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `sub_group_id` INTEGER NOT NULL,
    `secction_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sub_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_group` VARCHAR(191) NOT NULL,
    `group_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Secction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `secction` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Objects` ADD CONSTRAINT `Objects_date_id_fkey` FOREIGN KEY (`date_id`) REFERENCES `Dates_objects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Objects` ADD CONSTRAINT `Objects_clasification_id_fkey` FOREIGN KEY (`clasification_id`) REFERENCES `Clasification_objects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Objects` ADD CONSTRAINT `Objects_quantity_id_fkey` FOREIGN KEY (`quantity_id`) REFERENCES `Quantity_objects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
