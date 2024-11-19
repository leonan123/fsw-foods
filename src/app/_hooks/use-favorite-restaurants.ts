'use client'

import type { UserFavoriteRestaurant } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  getUserFavoriteRestaurants,
  toggleFavoriteRestaurant,
} from '../_actions/restaurant'

interface UseFavoriteRestaurantsProps {
  restaurantId: string
}

export function useFavoriteRestaurants({
  restaurantId,
}: UseFavoriteRestaurantsProps) {
  const { data } = useSession()
  const [userFavoriteRestaurants, setUserFavoriteRestaurants] = useState<
    UserFavoriteRestaurant[]
  >([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    getUserFavoriteRestaurants(data?.user.id).then((favoriteRestaurants) => {
      setIsFavorite(
        favoriteRestaurants.some(
          ({ restaurant }) => restaurant.id === restaurantId,
        ),
      )
      setUserFavoriteRestaurants(favoriteRestaurants)
    })
  }, [data, restaurantId])

  async function handleFavoriteClick() {
    if (!data?.user.id) return

    try {
      await toggleFavoriteRestaurant(data.user.id, restaurantId)

      toast.success(
        isFavorite
          ? 'Restaurante removido dos favoritos.'
          : 'Restaurante favoritado.',
      )
    } catch (err) {
      console.error(err)
      toast.error('Ocorreu um erro ao favoritar o restaurante.')
    }
  }

  return {
    userFavoriteRestaurants,
    handleFavoriteClick,
    isFavorite,
  }
}
