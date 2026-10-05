/*
  Warnings:

  - Added the required column `descripcion` to the `clases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clases` ADD COLUMN `descripcion` VARCHAR(255) NOT NULL;
