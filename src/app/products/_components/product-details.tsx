'use client'

import type { Prisma } from '@prisma/client'
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { DiscountBadge } from '@/app/_components/discount-badge'
import { ProductList } from '@/app/_components/product-list'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'

type Product = Prisma.ProductGetPayload<{
  include: {
    restaurant: true
  }
}>

interface ProductDetailsProps {
  product: Product
  complementaryProducts?: Product[]
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  function handleIncreaseQuantity() {
    setQuantity((state) => state + 1)
  }

  function handleDecreaseQuantity() {
    setQuantity((state) => {
      if (state > 1) {
        return state - 1
      }

      return state
    })
  }

  return (
    <>
      <div className="flex items-center gap-2 px-5">
        <div className="relative h-7 w-7">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            sizes="100px"
            className="rounded-full object-cover"
            priority
          />
        </div>

        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>

              {product.discountPercentage > 0 && (
                <DiscountBadge
                  discountPercentage={product.discountPercentage}
                />
              )}
            </div>

            <span className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-8 border-background bg-primary-foreground hover:bg-background"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <span className="pointer-events-none min-w-5 select-none text-center">
              {quantity}
            </span>

            <Button
              variant="default"
              size="icon"
              className="size-8"
              onClick={handleIncreaseQuantity}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>

        <Card className="mx-5">
          <CardContent className="flex items-center justify-around py-2.5 text-xs ">
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Entrega</span>
                <BikeIcon size={14} />
              </div>

              <p className="font-semibold">
                {Number(product.restaurant.deliveryFee) > 0
                  ? formatCurrency(Number(product.restaurant.deliveryFee))
                  : 'Grátis'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>Entrega</span>
                <ClockIcon size={14} />
              </div>

              <p className="font-semibold">
                {product.restaurant.deliveryTimeMinutes &&
                  product.restaurant.deliveryTimeMinutes}{' '}
                Min
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {complementaryProducts && (
          <div className="space-y-3">
            <h3 className="px-5 font-semibold">Sucos</h3>
            <ProductList products={complementaryProducts} />
          </div>
        )}

        <Button className="mx-5 mb-5" size="lg">
          Adicionar à Sacola
        </Button>
      </div>
    </>
  )
}
