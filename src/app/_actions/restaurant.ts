'use server'
import type { Prisma } from '@prisma/client'

// import { revalidatePath } from 'next/cache'
import { db } from '../_lib/prisma'

export async function toggleFavoriteRestaurant(
  userId: string,
  restaurantId: string,
) {
  const isFavorite = await db.userFavoriteRestaurant.findFirst({
    where: {
      userId,
      restaurantId,
    },
  })

  if (isFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    })

    // revalidatePath('/')
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  })

  // revalidatePath('/')
}

type UserFavoriteRestaurantWithRestaurant =
  Prisma.UserFavoriteRestaurantGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true
        }
      }
    }
  }>

export async function getUserFavoriteRestaurants(
  userId?: string,
): Promise<UserFavoriteRestaurantWithRestaurant[] | []> {
  if (!userId) return []

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: {
        select: {
          id: true,
        },
      },
    },
  })

  return userFavoriteRestaurants
}
