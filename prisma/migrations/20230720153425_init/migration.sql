-- CreateTable
CREATE TABLE `Router` (
    `router_id` INTEGER NOT NULL AUTO_INCREMENT,
    `imei` VARCHAR(255) NOT NULL,
    `ip_adresse` VARCHAR(255) NOT NULL,
    `benutzername` VARCHAR(255) NOT NULL,
    `passwort` VARCHAR(255) NOT NULL,
    `iccid` VARCHAR(255) NOT NULL,
    `pin` VARCHAR(255) NULL,
    `puk` VARCHAR(255) NULL,
    `artikel_artikel_id_fk` INTEGER NOT NULL,

    UNIQUE INDEX `Router_artikel_artikel_id_fk_key`(`artikel_artikel_id_fk`),
    INDEX `artikel_artikel_id_fk`(`artikel_artikel_id_fk`),
    PRIMARY KEY (`router_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Router` ADD CONSTRAINT `router_artikel_artikel_id_fk` FOREIGN KEY (`artikel_artikel_id_fk`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
