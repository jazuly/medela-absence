/*
  Warnings:

  - You are about to drop the column `login_datetime` on the `absenses` table. All the data in the column will be lost.
  - You are about to drop the column `logout_datetime` on the `absenses` table. All the data in the column will be lost.
  - Added the required column `login` to the `absenses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "absenses" DROP COLUMN "login_datetime",
DROP COLUMN "logout_datetime",
ADD COLUMN     "login" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "logout" TIMESTAMP(3);
