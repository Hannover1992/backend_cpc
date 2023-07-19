-- CreateTable
CREATE TABLE `notebook` (
    `notebook_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_konto_name` VARCHAR(255) NULL,
    `admin_konto_password` VARCHAR(255) NULL,
    `user_konto_name` VARCHAR(255) NULL,
    `user_konto_password` VARCHAR(255) NULL,
    `artikel_artikel_id_fk` INTEGER NOT NULL,

    UNIQUE INDEX `notebook_artikel_artikel_id_fk_key`(`artikel_artikel_id_fk`),
    INDEX `artikel_artikel_id_fk`(`artikel_artikel_id_fk`),
    PRIMARY KEY (`notebook_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notebook` ADD CONSTRAINT `notebook_artikel_artikel_id_fk` FOREIGN KEY (`artikel_artikel_id_fk`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
