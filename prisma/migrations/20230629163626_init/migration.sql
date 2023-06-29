-- CreateTable
CREATE TABLE `tblprojekte` (
    `ID` INTEGER NOT NULL,
    `Standort` TINYTEXT NULL,
    `Niederlassung` VARCHAR(255) NULL,
    `Auftragsart` VARCHAR(255) NULL,
    `Status` VARCHAR(255) NULL,
    `Logistikkoordinator` VARCHAR(255) NULL,
    `LK_1` VARCHAR(255) NULL,
    `LK_2` VARCHAR(255) NULL,
    `ZuKo` VARCHAR(255) NULL,
    `Auftragsdatum` VARCHAR(255) NULL,
    `Startdatum` VARCHAR(255) NULL,
    `Kommentar` VARCHAR(255) NULL,
    `Anlagenummer` INTEGER NULL,
    `PM_1` VARCHAR(255) NULL,
    `PM_2` VARCHAR(255) NULL,
    `Endtermin` VARCHAR(255) NULL,
    `Netto_Auftragswert` VARCHAR(255) NULL,

    PRIMARY KEY (`ID`)
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
CREATE TABLE `artikel` (
    `artikel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `artikelname` VARCHAR(255) NOT NULL,
    `unterkategorie_id` INTEGER NOT NULL,
    `preis` DECIMAL(10, 2) NULL,
    `beschreibung` TEXT NULL,
    `bild_url` VARCHAR(255) NULL,
    `zustand` VARCHAR(15) NULL,
    `einkaufs_datum` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `belegt_von` DATETIME(0) NULL,
    `belegt_bis` DATETIME(0) NULL,
    `anlagenummer` VARCHAR(15) NULL,
    `edit_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `besitzer_id` INTEGER NULL,
    `firma` VARCHAR(50) NULL,
    `model` VARCHAR(35) NULL,
    `seriennummer` VARCHAR(55) NULL,

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
CREATE TABLE `simkarten` (
    `simkarten_id` INTEGER NOT NULL AUTO_INCREMENT,
    `kundennummer` VARCHAR(255) NOT NULL,
    `rufnummer` VARCHAR(255) NOT NULL,
    `tarif` VARCHAR(255) NOT NULL,
    `pin` VARCHAR(255) NOT NULL,
    `puk` VARCHAR(255) NOT NULL,
    `einsatzort` VARCHAR(255) NOT NULL,
    `aktiv` BOOLEAN NOT NULL,
    `artikel_id` INTEGER NOT NULL,

    INDEX `artikel_id`(`artikel_id`),
    PRIMARY KEY (`simkarten_id`)
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
CREATE TABLE `unterkategorie` (
    `unterkategorie_id` INTEGER NOT NULL AUTO_INCREMENT,
    `unterkategoriename` VARCHAR(255) NOT NULL,
    `kategorie_id` INTEGER NOT NULL,

    INDEX `kategorie_id`(`kategorie_id`),
    PRIMARY KEY (`unterkategorie_id`)
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
ALTER TABLE `projekt_artikel` ADD CONSTRAINT `projekt_artikel_ibfk_1` FOREIGN KEY (`projekt_id`) REFERENCES `tblprojekte`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projekt_artikel` ADD CONSTRAINT `projekt_artikel_ibfk_2` FOREIGN KEY (`artikel_id`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_ibfk_1` FOREIGN KEY (`unterkategorie_id`) REFERENCES `unterkategorie`(`unterkategorie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_personal_Personalnummer_fk` FOREIGN KEY (`besitzer_id`) REFERENCES `personal`(`Personalnummer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `assets` ADD CONSTRAINT `tblbe-assets_artikel_artikel_id_fk` FOREIGN KEY (`ID`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `simkarten` ADD CONSTRAINT `simkarten_artikel_id_fkey` FOREIGN KEY (`artikel_id`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `electronics` ADD CONSTRAINT `acu_artikel_artikel_id_fk` FOREIGN KEY (`ID`) REFERENCES `artikel`(`artikel_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `unterkategorie` ADD CONSTRAINT `unterkategorie_ibfk_1` FOREIGN KEY (`kategorie_id`) REFERENCES `kategorien`(`kategorie_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`usrzugangs_daten_ID`) REFERENCES `zugangsdaten`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
