'use client'

import type { Restaurant } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Header } from '../_components/header'
import { RestaurantItem } from '../_components/restaurant-item'
import { Search } from '../_components/search'
import { searchRestaurants } from './_actions/search'

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    async function getRestaurants() {
      const foundRestaurants = await searchRestaurants(search ?? '')
      setRestaurants(foundRestaurants)
    }

    getRestaurants()
  }, [search])
  return (
    <>
      <Header />

      <main className="mx-5 mt-6 space-y-6">
        <Search />

        <div>
          {search && (
            <p className="mb-3 text-xs text-muted-foreground">
              Resultados para &quot;{search}&quot;
            </p>
          )}

          <div className="flex flex-col gap-4">
            {restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
