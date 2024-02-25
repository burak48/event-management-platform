/*
  Warnings:

  - The primary key for the `Events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `event_id` on the `Events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Events" DROP CONSTRAINT "Events_pkey",
DROP COLUMN "event_id",
ADD COLUMN     "event_id" UUID NOT NULL,
ADD CONSTRAINT "Events_pkey" PRIMARY KEY ("event_id");
