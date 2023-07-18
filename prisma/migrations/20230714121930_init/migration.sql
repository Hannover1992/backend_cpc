/*
  Warnings:

  - You are about to drop the `electronics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `zugangsdaten` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `electronics` DROP FOREIGN KEY `acu_artikel_artikel_id_fk`;

-- DropForeignKey
ALTER TABLE `personal` DROP FOREIGN KEY `personal_ibfk_1`;

-- DropTable
DROP TABLE `electronics`;

-- DropTable
DROP TABLE `zugangsdaten`;

-- CreateTable
CREATE TABLE `Notebook` (
    `ID` INTEGER NOT NULL,
    `adminZugangId` INTEGER NOT NULL,
    `userZugangId` INTEGER NOT NULL,

    UNIQUE INDEX `notebook_ID_uindex`(`ID`),
    UNIQUE INDEX `Notebook_adminZugangId_key`(`adminZugangId`),
    UNIQUE INDEX `Notebook_userZugangId_key`(`userZugangId`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zugangsdaten` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Programm` VARCHAR(50) NOT NULL,
    `UserName` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `Role` VARCHAR(50) NULL,
    `simkartenSimkarten_id` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notebook` ADD CONSTRAINT `Notebook_adminZugangId_fkey` FOREIGN KEY (`adminZugangId`) REFERENCES `Zugangsdaten`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notebook` ADD CONSTRAINT `Notebook_userZugangId_fkey` FOREIGN KEY (`userZugangId`) REFERENCES `Zugangsdaten`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
