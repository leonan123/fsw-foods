'use client'

import type { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { toggleFavoriteRestaurant } from '../_actions/restaurant'
import { formatCurrency } from '../_helpers/price'
import { cn } from '../_lib/utils'
import { Button } from './ui/button'

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
  userFavoriteRestaurants: UserFavoriteRestaurant[]
}

export function RestaurantItem({
  restaurant,
  userFavoriteRestaurants,
  className,
}: RestaurantItemProps) {
  const { data } = useSession()
  const isFavorite = userFavoriteRestaurants?.some(
    (favoriteRestaurant) => favoriteRestaurant.restaurantId === restaurant.id,
  )

  async function handleFavoriteClick() {
    if (!data?.user.id) return

    try {
      await toggleFavoriteRestaurant(data.user.id, restaurant.id)

      toast.success(
        isFavorite
          ? 'Restaurante removido dos favoritos.'
          : 'Restaurante favoritado.',
      )
    } catch {
      toast.error('Ocorreu um erro ao favoritar o restaurante.')
    }
  }

  return (
    <div className={cn('min-w-[266px] max-w-[266px] space-y-3', className)}>
      <div className="relative h-[136px] w-full">
        <div className="absolute left-2 top-2 z-10 flex items-center gap-1 rounded-full bg-muted px-2 py-0.5">
          <StarIcon
            size={12}
            strokeWidth={4}
            className="fill-yellow-500 text-yellow-500"
          />
          <span className="text-sm font-bold">5.0</span>
        </div>

        {data?.user.id && (
          <Button
            onClick={handleFavoriteClick}
            variant="ghost"
            size="icon"
            className={cn(
              'group absolute right-2 top-2 z-10 h-7 w-7 rounded-full bg-foreground hover:bg-primary',
              isFavorite && 'bg-primary hover:bg-foreground',
            )}
          >
            <HeartIcon size={16} className="fill-muted text-muted" />
          </Button>
        )}

        <Link
          href={`/restaurants/${restaurant.id}`}
          className="absolute h-full w-full"
        >
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="rounded-lg object-cover"
            sizes="150px"
          />
        </Link>
      </div>

      <div>
        <h3 className="text-sm font-semibold">{restaurant.name}</h3>

        <div className="flex gap-3">
          <div className="flex gap-1">
            <BikeIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {Number(restaurant.deliveryFee) === 0
                ? 'Entrega grátis'
                : formatCurrency(Number(restaurant.deliveryFee))}
            </span>
          </div>

          <div className="flex gap-1">
            <TimerIcon className="text-primary" size={14} />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
