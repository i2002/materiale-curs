/*
  Warnings:

  - A unique constraint covering the columns `[name,parentId]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Resource_name_parentId_key" ON "Resource"("name", "parentId");
