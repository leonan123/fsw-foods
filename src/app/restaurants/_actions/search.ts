'use server'

import type { Restaurant } from '@prisma/client'

import { db } from '@/app/_lib/prisma'

export async function searchRestaurants(search: string): Promise<Restaurant[]> {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })

  return restaurants
}
