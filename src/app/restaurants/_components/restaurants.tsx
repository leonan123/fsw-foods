'use client'

import type { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { RestaurantItem } from '@/app/_components/restaurant-item'
import { Search } from '@/app/_components/search'

import { searchRestaurants } from '../_actions/search'

interface RestaurantsProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export function Restaurants({ userFavoriteRestaurants }: RestaurantsProps) {
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
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
