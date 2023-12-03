/*
  Warnings:

  - You are about to alter the column `amount` on the `Bid` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "amount" BIGINT NOT NULL,
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
