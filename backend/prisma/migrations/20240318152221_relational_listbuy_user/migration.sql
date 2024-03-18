-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListBuy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "comprado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ListBuy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListBuy" ("comprado", "createdAt", "id", "name", "userId") SELECT "comprado", "createdAt", "id", "name", "userId" FROM "ListBuy";
DROP TABLE "ListBuy";
ALTER TABLE "new_ListBuy" RENAME TO "ListBuy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
