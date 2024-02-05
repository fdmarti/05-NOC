/*
  Warnings:

  - You are about to drop the column `option` on the `LogModel` table. All the data in the column will be lost.
  - Added the required column `origin` to the `LogModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP COLUMN "option",
ADD COLUMN     "origin" TEXT NOT NULL;
