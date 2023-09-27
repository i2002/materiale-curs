/*
  Warnings:

  - You are about to drop the column `rootFolderId` on the `Course` table. All the data in the column will be lost.
  - Added the required column `courseSlug` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "parentId" TEXT,
    "courseSlug" TEXT NOT NULL,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Resource_courseSlug_fkey" FOREIGN KEY ("courseSlug") REFERENCES "Course" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("id", "name", "parentId", "type") SELECT "id", "name", "parentId", "type" FROM "Resource";
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new_Course" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL DEFAULT 'CTI'
);
INSERT INTO "new_Course" ("name", "semester", "slug", "specialization", "year") SELECT "name", "semester", "slug", "specialization", "year" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
