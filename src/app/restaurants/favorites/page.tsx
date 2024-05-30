import { getServerSession } from 'next-auth'

import { Header } from '@/app/_components/header'
import { RestaurantItem } from '@/app/_components/restaurant-item'
import { db } from '@/app/_lib/prisma'

export default async function FavoriteRestaurantsPage() {
  const session = await getServerSession()

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <Header />

      <h2 className="mx-5 mt-5 text-lg font-semibold">
        Restaurantes Favoritos
      </h2>

      <div className="mx-5 my-5 flex flex-col gap-6">
        {userFavoriteRestaurants.length > 0 ? (
          userFavoriteRestaurants.map(({ restaurant }) => (
            <RestaurantItem
              key={restaurant.id}
              className="min-w-full max-w-full"
              restaurant={restaurant}
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))
        ) : (
          <h3>Você ainda não marcou nenhum restaurante como favorito.</h3>
        )}
      </div>
    </>
  )
}
