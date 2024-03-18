/*
  Warnings:

  - Added the required column `userId` to the `ListBuy` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListBuy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "comprado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_ListBuy" ("comprado", "createdAt", "id", "name", "userId") SELECT "comprado", "createdAt", "id", "name", '' FROM "ListBuy";
DROP TABLE "ListBuy";
ALTER TABLE "new_ListBuy" RENAME TO "ListBuy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
