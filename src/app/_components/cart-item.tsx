'use client'

import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from 'lucide-react'
import Image from 'next/image'

import { type CartProduct, useCart } from '../_contexts/cart'
import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price'
import { Button } from './ui/button'

interface CartItemProps {
  cartProduct: CartProduct
}

export function CartItem({ cartProduct }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useCart()

  function handleDecreaseQuantity() {
    decreaseProductQuantity(cartProduct.id)
  }

  function handleIncreaseQuantity() {
    increaseProductQuantity(cartProduct.id)
  }

  function handleRemoveFromCart() {
    removeProductFromCart(cartProduct.id)
  }

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative size-16 overflow-hidden rounded-md">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>

            {cartProduct.discountPercentage > 0 && (
              <s className="text-xs font-light text-muted-foreground">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </s>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8 border-background bg-primary-foreground hover:bg-background"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <span className="pointer-events-none min-w-5 select-none text-center text-sm">
              {cartProduct.quantity}
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
      </div>

      <div>
        <Button
          variant="outline"
          size="icon"
          className="size-8 border-2 border-background bg-primary-foreground hover:bg-background"
          onClick={handleRemoveFromCart}
        >
          <Trash2Icon size={16} />
        </Button>
      </div>
    </div>
  )
}
