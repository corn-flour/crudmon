/*
  Warnings:

  - You are about to drop the column `ability` on the `Pokemon` table. All the data in the column will be lost.
  - Added the required column `abilityOneId` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Ability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pokemon" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "abilityOneId" TEXT NOT NULL,
    "abilityTwoId" TEXT,
    "hiddenAbilityId" TEXT,
    "typeOne" TEXT NOT NULL,
    "typeTwo" TEXT,
    CONSTRAINT "Pokemon_abilityOneId_fkey" FOREIGN KEY ("abilityOneId") REFERENCES "Ability" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pokemon_abilityTwoId_fkey" FOREIGN KEY ("abilityTwoId") REFERENCES "Ability" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Pokemon_hiddenAbilityId_fkey" FOREIGN KEY ("hiddenAbilityId") REFERENCES "Ability" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pokemon" ("id", "name", "typeOne", "typeTwo") SELECT "id", "name", "typeOne", "typeTwo" FROM "Pokemon";
DROP TABLE "Pokemon";
ALTER TABLE "new_Pokemon" RENAME TO "Pokemon";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
