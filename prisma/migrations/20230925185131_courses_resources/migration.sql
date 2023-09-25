-- AlterTable
ALTER TABLE "User" ADD COLUMN "password" TEXT;
ALTER TABLE "User" ADD COLUMN "role" TEXT DEFAULT 'student';

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'folder',
    "parentId" TEXT,
    CONSTRAINT "Resource_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FileData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "FileData_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL DEFAULT 'CTI',
    "rootFolderId" TEXT NOT NULL,
    CONSTRAINT "Course_rootFolderId_fkey" FOREIGN KEY ("rootFolderId") REFERENCES "Resource" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToStudentList" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_CourseToStudentList_A_fkey" FOREIGN KEY ("A") REFERENCES "Course" ("slug") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CourseToStudentList_B_fkey" FOREIGN KEY ("B") REFERENCES "StudentList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentListToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_StudentListToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "StudentList" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentListToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FileData_resourceId_key" ON "FileData"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "FileData_path_key" ON "FileData"("path");

-- CreateIndex
CREATE UNIQUE INDEX "Course_rootFolderId_key" ON "Course"("rootFolderId");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToStudentList_AB_unique" ON "_CourseToStudentList"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToStudentList_B_index" ON "_CourseToStudentList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentListToUser_AB_unique" ON "_StudentListToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentListToUser_B_index" ON "_StudentListToUser"("B");
