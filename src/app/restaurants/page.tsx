import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

import { Header } from '../_components/header'
import { db } from '../_lib/prisma'
import { Restaurants } from './_components/restaurants'

export default async function RestaurantsPage() {
  const session = await getServerSession()
  const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user.id,
    },
  })

  return (
    <>
      <Header />

      <Suspense fallback={<p>Carregando...</p>}>
        <Restaurants userFavoriteRestaurants={userFavoriteRestaurant} />
      </Suspense>
    </>
  )
}
