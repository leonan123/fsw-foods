import { Header } from '@/app/_components/header'
import { RestaurantItem } from '@/app/_components/restaurant-item'
import { db } from '@/app/_lib/prisma'

export default async function RecommendedRestaurants() {
  const restaurants = await db.restaurant.findMany()

  return (
    <>
      <Header />

      <h2 className="mx-5 mt-5 text-lg font-semibold">
        Restaurantes Favoritos
      </h2>

      <div className="mx-5 my-5 flex flex-col gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
      </div>
    </>
  )
}
