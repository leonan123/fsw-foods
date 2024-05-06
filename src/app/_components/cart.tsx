'use client'

import React from 'react'

import { useCart } from '../_contexts/cart'
import { formatCurrency } from '../_helpers/price'
import { CartItem } from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function Cart() {
  const { products, subtotalPrice, totalDiscountsPrice, totalPrice } = useCart()

  return (
    <>
      <div className="flex flex-1 flex-col justify-between gap-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>

      {products.length > 0 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="flex flex-col justify-center p-5">
              <div className="flex items-center justify-between border-b border-muted pb-2.5 text-xs">
                <p className="text-muted-foreground">Subtotal</p>
                <p>{formatCurrency(subtotalPrice)}</p>
              </div>

              <div className="flex items-center justify-between border-b border-muted py-2.5 text-xs">
                <p className="text-muted-foreground">Entrega</p>
                <p>
                  {Number(products[0].restaurant.deliveryFee) > 0 ? (
                    formatCurrency(Number(products[0].restaurant.deliveryFee))
                  ) : (
                    <span className="uppercase text-primary">Grátis</span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between border-b border-muted py-2.5 text-xs">
                <p className="text-muted-foreground">Descontos</p>
                <p>- {formatCurrency(totalDiscountsPrice)}</p>
              </div>

              <div className="flex items-center justify-between pt-2.5 text-sm font-semibold">
                <p>Total</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full">
            Finalizar Pedido
          </Button>
        </div>
      )}
    </>
  )
}
