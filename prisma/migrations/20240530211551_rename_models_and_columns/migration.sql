/*
  Warnings:

  - You are about to drop the `UserFavouriteRestaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserFavouriteRestaurant" DROP CONSTRAINT "UserFavouriteRestaurant_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "UserFavouriteRestaurant" DROP CONSTRAINT "UserFavouriteRestaurant_user_id_fkey";

-- DropTable
DROP TABLE "UserFavouriteRestaurant";

-- CreateTable
CREATE TABLE "UserFavoriteRestaurant" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteRestaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRestaurant" ADD CONSTRAINT "UserFavoriteRestaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
