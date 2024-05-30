import { getServerSession } from 'next-auth'

import { authConfig } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { RestaurantItem } from './restaurant-item'

export async function RestaurantList() {
  const session = await getServerSession(authConfig)
  const restaurants = await db.restaurant.findMany({ take: 10 })

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  })

  return (
    <div className="flex items-center gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  )
}
