'use client'

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Cart } from '@/app/_components/cart'
import { DeliveryInfo } from '@/app/_components/delivery-info'
import { DiscountBadge } from '@/app/_components/discount-badge'
import { ProductList } from '@/app/_components/product-list'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { useCart } from '@/app/_contexts/cart'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import type { ProductWithRestaurant } from '@/app/types/product'

interface ProductDetailsProps {
  product: ProductWithRestaurant
  complementaryProducts?: ProductWithRestaurant[]
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { addProductToCart } = useCart()

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

  function handleAddToCart() {
    addProductToCart(product, quantity)
    setIsCartOpen(true)
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

        <div className="mx-5">
          <DeliveryInfo
            deliveryFee={Number(product.restaurant.deliveryFee)}
            deliveryTimeMinutes={product.restaurant.deliveryTimeMinutes}
          />
        </div>

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

        <Button className="mx-5 mb-5" size="lg" onClick={handleAddToCart}>
          Adicionar à Sacola
        </Button>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="flex flex-col space-y-6 bg-primary-foreground">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0">
            <SheetTitle className="text-start">Sacola</SheetTitle>
            <SheetClose className="rounded-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <XIcon size={20} />
            </SheetClose>
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </>
  )
}
