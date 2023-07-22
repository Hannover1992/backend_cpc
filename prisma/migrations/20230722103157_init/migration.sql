-- CreateTable
CREATE TABLE `Acu` (
    `acu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `router` VARCHAR(255) NOT NULL,
    `ip_adresse` VARCHAR(255) NOT NULL,
    `artikel_artikel_id_fk` INTEGER NOT NULL,

    UNIQUE INDEX `Acu_artikel_artikel_id_fk_key`(`artikel_artikel_id_fk`),
    INDEX `artikel_artikel_id_fk`(`artikel_artikel_id_fk`),
    PRIMARY KEY (`acu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Acu` ADD CONSTRAINT `acu_artikel_artikel_id_fk_unique` FOREIGN KEY (`artikel_artikel_id_fk`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
