/*
  Warnings:

  - A unique constraint covering the columns `[dep_id]` on the table `Objects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dep_id` to the `Objects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Objects` ADD COLUMN `dep_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Objects_dep_id_key` ON `Objects`(`dep_id`);

-- AddForeignKey
ALTER TABLE `Objects` ADD CONSTRAINT `Objects_dep_id_fkey` FOREIGN KEY (`dep_id`) REFERENCES `Departament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
