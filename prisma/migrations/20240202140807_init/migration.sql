/*
  Warnings:

  - The primary key for the `LogModel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LogModel" DROP CONSTRAINT "LogModel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "LogModel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "LogModel_id_seq";
