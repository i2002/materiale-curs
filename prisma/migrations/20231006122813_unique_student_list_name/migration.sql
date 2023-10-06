/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `StudentList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentList_name_key" ON "StudentList"("name");
