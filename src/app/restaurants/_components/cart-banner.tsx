'use client'

import { Cart } from '@/app/_components/cart'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { useCart } from '@/app/_contexts/cart'
import { formatCurrency } from '@/app/_helpers/price'

interface CartBannerProps {
  restaurantId: string
}

export function CartBanner({ restaurantId }: CartBannerProps) {
  const { products, totalPrice, totalQuantity } = useCart()

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurantId,
  )

  if (!restaurantHasProductsOnCart) return null

  return (
    <div
      data-show={true}
      className="fixed bottom-0 left-0 z-10 flex w-screen items-center justify-between border-t bg-popover px-6 py-4"
    >
      <div>
        <p className="text-xs text-muted-foreground">Total sem entrega</p>

        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(
              totalPrice - Number(products[0].restaurant.deliveryFee),
            )}
          </h3>
          <span className="text-xs text-muted-foreground">
            / {totalQuantity} item(s)
          </span>
        </div>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button className="text-sm">Ver sacola</Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col space-y-6 bg-primary-foreground">
          <SheetHeader className="flex flex-row items-center justify-between space-y-0">
            <SheetTitle className="text-start">Sacola</SheetTitle>
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </div>
  )
}
