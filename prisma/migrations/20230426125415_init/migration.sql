/*
  Warnings:

  - You are about to drop the column `Projekt` on the `tbldrucker` table. All the data in the column will be lost.
  - You are about to drop the column `Adminkonto Name` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Adminkonto Password` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Bemerkungen` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Betriebssystem` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Bilder` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Datum` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Gerät` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `ID` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Router` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Teamviewer ID` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Teamviewer Passwort` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Userkonto Name` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `Userkonto Password` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to drop the column `installierte Software` on the `tblnotebook` table. All the data in the column will be lost.
  - You are about to alter the column `Hersteller` on the `tblnotebook` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `Typ` on the `tblnotebook` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `Anlagenummer` on the `tblprojekte` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.
  - You are about to drop the `tblacu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblartikel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblartikelkategorie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblartikelzustand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblbe-assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblnotebook_1` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblusrzugangsdaten` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tblzubehör` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[ID]` on the table `tbldrucker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Seriennummer]` on the table `tbldrucker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NotebookID]` on the table `tblnotebook` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Seriennummer,Typ,Hersteller]` on the table `tblnotebook` will be added. If there are existing duplicate values, this will fail.
  - Made the column `ID` on table `tbldrucker` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Hersteller` on table `tbldrucker` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `NotebookID` to the `tblnotebook` table without a default value. This is not possible if the table is not empty.
  - Made the column `Seriennummer` on table `tblnotebook` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `tblnotebook_ID_key` ON `tblnotebook`;

-- DropIndex
DROP INDEX `tblprojekte_ID_key` ON `tblprojekte`;

-- AlterTable
ALTER TABLE `tbldrucker` DROP COLUMN `Projekt`,
    MODIFY `ID` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `Hersteller` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`ID`);

-- AlterTable
ALTER TABLE `tblnotebook` DROP COLUMN `Adminkonto Name`,
    DROP COLUMN `Adminkonto Password`,
    DROP COLUMN `Bemerkungen`,
    DROP COLUMN `Betriebssystem`,
    DROP COLUMN `Bilder`,
    DROP COLUMN `Datum`,
    DROP COLUMN `Gerät`,
    DROP COLUMN `ID`,
    DROP COLUMN `Router`,
    DROP COLUMN `Teamviewer ID`,
    DROP COLUMN `Teamviewer Passwort`,
    DROP COLUMN `Userkonto Name`,
    DROP COLUMN `Userkonto Password`,
    DROP COLUMN `installierte Software`,
    ADD COLUMN `Admin` INTEGER NULL,
    ADD COLUMN `Bemerkung` VARCHAR(255) NULL,
    ADD COLUMN `EditDatum` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `EinkaufsDatum` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `NotebookID` INTEGER NOT NULL,
    ADD COLUMN `Teamviewer_ID` INTEGER NULL,
    ADD COLUMN `Userkonto` INTEGER NULL,
    ADD COLUMN `Wert` DECIMAL(10, 2) NULL DEFAULT 0.00,
    MODIFY `Hersteller` VARCHAR(50) NULL,
    MODIFY `Typ` VARCHAR(50) NULL,
    MODIFY `Seriennummer` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`NotebookID`);

-- AlterTable
ALTER TABLE `tblprojekte` MODIFY `Anlagenummer` INTEGER NULL,
    ADD PRIMARY KEY (`ID`);

-- DropTable
DROP TABLE `tblacu`;

-- DropTable
DROP TABLE `tblartikel`;

-- DropTable
DROP TABLE `tblartikelkategorie`;

-- DropTable
DROP TABLE `tblartikelzustand`;

-- DropTable
DROP TABLE `tblbe-assets`;

-- DropTable
DROP TABLE `tblnotebook_1`;

-- DropTable
DROP TABLE `tblusrzugangsdaten`;

-- DropTable
DROP TABLE `tblzubehör`;

-- CreateTable
CREATE TABLE `artikel` (
    `artikel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `artikelname` VARCHAR(255) NOT NULL,
    `unterkategorie_id` INTEGER NOT NULL,
    `preis` DECIMAL(10, 2) NULL,
    `beschreibung` TEXT NULL,
    `bild_url` VARCHAR(255) NULL,
    `zustand` VARCHAR(15) NOT NULL,
    `einkaufs_datum` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `belegt_von` DATETIME(0) NULL,
    `belegt_bis` DATETIME(0) NULL,
    `anlagenummer` VARCHAR(15) NULL,
    `edit_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `besitzer_id` INTEGER NULL,

    INDEX `artikel_personal_Personalnummer_fk`(`besitzer_id`),
    INDEX `unterkategorie_id`(`unterkategorie_id`),
    PRIMARY KEY (`artikel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assets` (
    `ID` INTEGER NOT NULL,
    `Inventarnummer` INTEGER NULL,

    UNIQUE INDEX `tblbe-assets_ID_uindex`(`ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
CREATE TABLE `kategorien` (
    `kategorie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategoriename` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `kategoriename`(`kategoriename`),
    PRIMARY KEY (`kategorie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal` (
    `Personalnummer` INTEGER NOT NULL,
    `Vorname` VARCHAR(50) NULL,
    `Nachname` VARCHAR(50) NULL,
    `Geburtsdatum` DATE NULL,
    `Abteilung` VARCHAR(50) NULL,
    `Position` VARCHAR(50) NULL,
    `Gehalt` DECIMAL(10, 2) NULL,
    `usrzugangs_daten_ID` INTEGER NULL,

    INDEX `usrzugangs_daten_ID`(`usrzugangs_daten_ID`),
    PRIMARY KEY (`Personalnummer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projekt_artikel` (
    `projekt_artikel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `projekt_id` INTEGER NOT NULL,
    `artikel_id` INTEGER NOT NULL,
    `menge` INTEGER NOT NULL,

    INDEX `artikel_id`(`artikel_id`),
    INDEX `projekt_id`(`projekt_id`),
    PRIMARY KEY (`projekt_artikel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unterkategorie` (
    `unterkategorie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `unterkategoriename` VARCHAR(255) NOT NULL,
    `kategorie_id` INTEGER NOT NULL,

    INDEX `kategorie_id`(`kategorie_id`),
    PRIMARY KEY (`unterkategorie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usrzugangsdaten` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Programm` VARCHAR(50) NOT NULL,
    `UserName` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(50) NOT NULL,
    `Role` VARCHAR(50) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tbldrucker_ID_uindex` ON `tbldrucker`(`ID`);

-- CreateIndex
CREATE UNIQUE INDEX `drucker_Seriennummer_uindex` ON `tbldrucker`(`Seriennummer`);

-- CreateIndex
CREATE UNIQUE INDEX `tblnotebook_Notebook_ID_uindex` ON `tblnotebook`(`NotebookID`);

-- CreateIndex
CREATE INDEX `tblnotebook___fk_` ON `tblnotebook`(`Userkonto`);

-- CreateIndex
CREATE INDEX `tblnotebook_tblusrzugangsdaten_ID_fk` ON `tblnotebook`(`Teamviewer_ID`);

-- CreateIndex
CREATE INDEX `tblnotebook_tblusrzugangsdaten_ID_fk_2` ON `tblnotebook`(`Admin`);

-- CreateIndex
CREATE UNIQUE INDEX `tblnotebook_` ON `tblnotebook`(`Seriennummer`, `Typ`, `Hersteller`);

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`unterkategorie_id`) REFERENCES `unterkategorie`(`unterkategorie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_personal_Personalnummer_fk` FOREIGN KEY (`besitzer_id`) REFERENCES `personal`(`Personalnummer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `tblbe-assets_artikel_artikel_id_fk` FOREIGN KEY (`ID`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `electronics` ADD CONSTRAINT `acu_artikel_artikel_id_fk` FOREIGN KEY (`ID`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`usrzugangs_daten_ID`) REFERENCES `usrzugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projekt_artikel` ADD CONSTRAINT `projekt_artikel_ibfk_1` FOREIGN KEY (`projekt_id`) REFERENCES `tblprojekte`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projekt_artikel` ADD CONSTRAINT `projekt_artikel_ibfk_2` FOREIGN KEY (`artikel_id`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tblnotebook` ADD CONSTRAINT `tblnotebook___fk_` FOREIGN KEY (`Userkonto`) REFERENCES `usrzugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tblnotebook` ADD CONSTRAINT `tblnotebook_tblusrzugangsdaten_ID_fk` FOREIGN KEY (`Teamviewer_ID`) REFERENCES `usrzugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tblnotebook` ADD CONSTRAINT `tblnotebook_tblusrzugangsdaten_ID_fk_2` FOREIGN KEY (`Admin`) REFERENCES `usrzugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `unterkategorie` ADD CONSTRAINT `unterkategorie_ibfk_1` FOREIGN KEY (`kategorie_id`) REFERENCES `kategorien`(`kategorie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
