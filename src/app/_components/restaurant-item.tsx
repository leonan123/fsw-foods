'use client'

import type { Restaurant } from '@prisma/client'
import { BikeIcon, StarIcon, TimerIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { formatCurrency } from '../_helpers/price'
import { cn } from '../_lib/utils'
import { FavoriteRestaurantButton } from './favorite-restaurant-button'

interface RestaurantItemProps {
  restaurant: Restaurant
  className?: string
}

export function RestaurantItem({ restaurant, className }: RestaurantItemProps) {
  const { data } = useSession()

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
          <FavoriteRestaurantButton restaurantId={restaurant.id} />
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
