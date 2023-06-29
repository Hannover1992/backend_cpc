/*
  Warnings:

  - A unique constraint covering the columns `[artikel_id]` on the table `simkarten` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `simkarten_artikel_id_key` ON `simkarten`(`artikel_id`);
