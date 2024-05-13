'use client'

import { OrderStatus } from '@prisma/client'
import { Loader2Icon, NotepadTextIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

import { createOrder } from '../_actions/order'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../_components/ui/alert-dialog'
import { useCart } from '../_contexts/cart'
import { formatCurrency } from '../_helpers/price'
import { CartItem } from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

export function Cart() {
  const { data } = useSession()
  const {
    products,
    subtotalPrice,
    totalDiscountsPrice,
    totalPrice,
    clearCart,
  } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  async function handleFinishOrderClick() {
    if (!data?.user) return

    const restaurant = products[0].restaurant

    setIsSubmitting(true)

    try {
      await createOrder({
        subtotalPrice,
        totalPrice,
        totalDiscounts: totalDiscountsPrice,
        deliveryFee: restaurant.deliveryFee,
        deliveryTimeMinutes: restaurant.deliveryTimeMinutes,
        status: OrderStatus.CONFIRMED,
        restaurant: {
          connect: {
            id: restaurant.id,
          },
        },
        user: {
          connect: { id: data.user.id },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })

      clearCart()
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
      setIsConfirmDialogOpen(false)
    }
  }

  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="flex flex-1 flex-col gap-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>
          <div className="space-y-6">
            <Card>
              <CardContent className="flex flex-col justify-center p-5">
                <div className="flex items-center justify-between border-b border-muted pb-2.5 text-xs">
                  <p className="text-muted-foreground">Subtotal + Entrega</p>
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

            <Button
              size="lg"
              className="w-full"
              onClick={() => setIsConfirmDialogOpen(true)}
              disabled={isSubmitting}
            >
              Finalizar Pedido
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
          <NotepadTextIcon size={44} strokeWidth={1.5} />
          <p className="text-center font-medium">Seu carrinho está vazio</p>
        </div>
      )}

      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar seu pedido ?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button onClick={handleFinishOrderClick} disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2Icon className="mr-2 size-4 animate-spin" />
              )}
              Finalizar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
