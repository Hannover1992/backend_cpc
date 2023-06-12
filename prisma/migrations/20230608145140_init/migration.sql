/*
  Warnings:

  - You are about to drop the `usrzugangsdaten` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `personal` DROP FOREIGN KEY `personal_ibfk_1`;

-- AlterTable
ALTER TABLE `artikel` ADD COLUMN `seriennummer` VARCHAR(55) NULL;

-- DropTable
DROP TABLE `usrzugangsdaten`;

-- CreateTable
CREATE TABLE `simkarten` (
    `ID` INTEGER NOT NULL,
    `Kundennummer` VARCHAR(55) NULL,
    `Rufnummer` VARCHAR(55) NULL,
    `Tarif` VARCHAR(55) NULL,
    `zugangsdatenID` INTEGER NULL,

    UNIQUE INDEX `tblbe-simkarten_ID_uindex`(`ID`),
    UNIQUE INDEX `simkarten_zugangsdatenID_key`(`zugangsdatenID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zugangsdaten` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Programm` VARCHAR(50) NOT NULL,
    `UserName` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `Role` VARCHAR(50) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `simkarten` ADD CONSTRAINT `simkarten_zugangsdatenID_fkey` FOREIGN KEY (`zugangsdatenID`) REFERENCES `zugangsdaten`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`usrzugangs_daten_ID`) REFERENCES `zugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
