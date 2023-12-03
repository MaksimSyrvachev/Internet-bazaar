/*
  Warnings:

  - You are about to alter the column `deadlineTime` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - You are about to alter the column `amount` on the `Bid` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Auction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_URL" TEXT,
    "deadlineTime" BIGINT NOT NULL,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    CONSTRAINT "Auction_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Auction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Auction" ("authorId", "categoryId", "deadlineTime", "description", "id", "image_URL", "publishedAt", "title", "updatedAt") SELECT "authorId", "categoryId", "deadlineTime", "description", "id", "image_URL", "publishedAt", "title", "updatedAt" FROM "Auction";
DROP TABLE "Auction";
ALTER TABLE "new_Auction" RENAME TO "Auction";
CREATE TABLE "new_Bid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auctionId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    CONSTRAINT "Bid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bid" ("amount", "auctionId", "bidderId", "createdAt", "id") SELECT "amount", "auctionId", "bidderId", "createdAt", "id" FROM "Bid";
DROP TABLE "Bid";
ALTER TABLE "new_Bid" RENAME TO "Bid";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
