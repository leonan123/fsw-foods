import type { Prisma, Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'

import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price'

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
    <div className="min-w-[150px] snap-start space-y-2">
      <div className="relative h-[150px] w-full">
        {product.discountPercentage && (
          <div className="absolute left-2 top-2 z-10 flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-muted">
            <ArrowDownIcon size={12} strokeWidth={3} />
            <span className="text-sm font-semibold">
              {product.discountPercentage}%
            </span>
          </div>
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
    </div>
  )
}
