/*
  Warnings:

  - You are about to drop the `Notebook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zugangsdaten` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Notebook` DROP FOREIGN KEY `Notebook_adminZugangId_fkey`;

-- DropForeignKey
ALTER TABLE `Notebook` DROP FOREIGN KEY `Notebook_userZugangId_fkey`;

-- DropTable
DROP TABLE `Notebook`;

-- DropTable
DROP TABLE `Zugangsdaten`;

-- CreateTable
CREATE TABLE `electronics` (
    `ID` INTEGER NOT NULL,
    `MAC-Adresse` VARCHAR(255) NULL,
    `IP-Adresse ACU` VARCHAR(256) NULL,
    `Router` VARCHAR(255) NULL,
    `IP-Adresse Router` VARCHAR(255) NULL,

    UNIQUE INDEX `acu_ID_uindex`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zugangsdaten` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Programm` VARCHAR(50) NOT NULL,
    `UserName` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `Role` VARCHAR(50) NULL,
    `simkartenSimkarten_id` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `electronics` ADD CONSTRAINT `acu_artikel_artikel_id_fk` FOREIGN KEY (`ID`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`usrzugangs_daten_ID`) REFERENCES `zugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
