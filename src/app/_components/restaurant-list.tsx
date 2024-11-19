import { db } from '../_lib/prisma'
import { RestaurantItem } from './restaurant-item'

export async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({ take: 10 })

  return (
    <div className="flex items-center gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}
