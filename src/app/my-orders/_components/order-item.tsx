'use client'

import { Prisma } from '@prisma/client'
import { AvatarImage } from '@radix-ui/react-avatar'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

import { Avatar } from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { formatCurrency } from '@/app/_helpers/price'

import { OrderStatus } from './order-status'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: {
          id: true
          name: true
          imageUrl: true
        }
      }
      products: {
        include: {
          product: {
            select: {
              id: true
              name: true
            }
          }
        }
      }
    }
  }>
}

export function OrderItem({ order }: OrderItemProps) {
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <OrderStatus status={order.status} />

        <Link
          className="flex items-center justify-between border-b border-muted pb-2.5"
          href={`/restaurants/${order.restaurant.id}`}
        >
          <div className="flex items-center gap-1.5">
            <Avatar className="size-4 rounded-full">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>

            <h2 className="text-sm font-semibold">{order.restaurant.name}</h2>
          </div>

          <ChevronRightIcon size={20} />
        </Link>

        {order.products.map(({ quantity, product }) => (
          <Link
            key={product.id}
            className="flex items-center justify-between border-b border-muted pb-2.5 text-xs"
            href={`/products/${product.id}`}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-muted-foreground text-primary-foreground">
                {quantity}
              </div>

              <h3 className="text-muted-foreground">{product.name}</h3>
            </div>
          </Link>
        ))}

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <h4>{formatCurrency(Number(order.totalPrice))}</h4>
          </div>

          <Button
            variant="link"
            size="sm"
            className="h-auto text-xs font-semibold"
            disabled={order.status !== 'FINISHED'}
          >
            {' '}
            Adicionar à Sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
