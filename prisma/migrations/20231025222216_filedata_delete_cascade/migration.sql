-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "resourceId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "FileData_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FileData" ("id", "mimeType", "path", "resourceId", "size") SELECT "id", "mimeType", "path", "resourceId", "size" FROM "FileData";
DROP TABLE "FileData";
ALTER TABLE "new_FileData" RENAME TO "FileData";
CREATE UNIQUE INDEX "FileData_resourceId_key" ON "FileData"("resourceId");
CREATE UNIQUE INDEX "FileData_path_key" ON "FileData"("path");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
