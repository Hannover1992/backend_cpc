-- CreateTable
CREATE TABLE `Handy` (
    `handy_id` INTEGER NOT NULL AUTO_INCREMENT,
    `imei_1` VARCHAR(255) NOT NULL,
    `besitzer` VARCHAR(255) NOT NULL,
    `sim_karten_nummer` VARCHAR(255) NULL,
    `bildschirmsperre_pin` VARCHAR(255) NULL,
    `email_adresse` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `artikel_artikel_id_fk` INTEGER NOT NULL,

    UNIQUE INDEX `Handy_artikel_artikel_id_fk_key`(`artikel_artikel_id_fk`),
    INDEX `artikel_artikel_id_fk`(`artikel_artikel_id_fk`),
    PRIMARY KEY (`handy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Handy` ADD CONSTRAINT `handy_artikel_artikel_id_fk` FOREIGN KEY (`artikel_artikel_id_fk`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
