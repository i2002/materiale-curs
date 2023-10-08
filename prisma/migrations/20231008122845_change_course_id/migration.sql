/*
  Warnings:

  - You are about to drop the column `courseSlug` on the `Resource` table. All the data in the column will be lost.
  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `A` on the `_CourseToStudentList` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `courseId` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL DEFAULT 'CTI'
);
INSERT INTO "new_Course" ("name", "semester", "slug", "specialization", "year") SELECT "name", "semester", "slug", "specialization", "year" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
CREATE UNIQUE INDEX "Course_slug_key" ON "Course"("slug");
CREATE TABLE "new_Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "parentId" TEXT,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Resource_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Resource" ("id", "name", "parentId", "type", "courseId") SELECT "id", "name", "parentId", "type", "courseId" FROM (SELECT r.id AS "id", r.name AS "name", r.parentId AS "parentId", r.type AS "type", c.id AS "courseId" FROM "Resource" AS r JOIN "Course" c ON r.courseSlug = c.slug);
DROP TABLE "Resource";
ALTER TABLE "new_Resource" RENAME TO "Resource";
CREATE TABLE "new__CourseToStudentList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseToStudentList_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseToStudentList_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CourseToStudentList" ("A", "B") SELECT "A", "B" FROM (SELECT c.id AS "A", cs.B as "B" FROM "_CourseToStudentList" AS cs JOIN "Course" AS c ON cs.A = c.slug);

DROP TABLE "_CourseToStudentList";
ALTER TABLE "new__CourseToStudentList" RENAME TO "_CourseToStudentList";
CREATE UNIQUE INDEX "_CourseToStudentList_AB_unique" ON "_CourseToStudentList"("A", "B");
CREATE INDEX "_CourseToStudentList_B_index" ON "_CourseToStudentList"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
