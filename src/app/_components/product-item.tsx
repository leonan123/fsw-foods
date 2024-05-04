'use client'

import type { Prisma, Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price'
import { DiscountBadge } from './discount-badge'

interface ProductItemProps {
  product: Product &
    Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true
          }
        }
      }
    }>
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link
      className="min-w-[150px] snap-start space-y-2"
      href={`/products/${product.id}`}
    >
      <div className="relative h-[150px] w-full">
        {product.discountPercentage && (
          <DiscountBadge
            discountPercentage={product.discountPercentage}
            className="absolute left-2 top-2 z-10 "
          />
        )}

        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
      </div>

      <div>
        <h2 className="truncate text-sm font-medium">{product.name}</h2>
        <div className="flex items-center gap-1.5">
          <h3 className="font-bold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  )
}
