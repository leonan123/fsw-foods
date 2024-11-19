'use client'

import { HeartIcon } from 'lucide-react'

import { useFavoriteRestaurants } from '../_hooks/use-favorite-restaurants'
import { cn } from '../_lib/utils'
import { Button } from './ui/button'

interface FavoriteRestaurantButtonProps {
  restaurantId: string
}

export function FavoriteRestaurantButton({
  restaurantId,
}: FavoriteRestaurantButtonProps) {
  const { isFavorite, handleFavoriteClick } = useFavoriteRestaurants({
    restaurantId,
  })

  return (
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
  )
}
