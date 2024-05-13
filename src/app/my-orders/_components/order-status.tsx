import type { OrderStatus as IOrderStatus } from '@prisma/client'

import { Badge } from '@/app/_components/ui/badge'

function getOrderStatusLabel(status: IOrderStatus) {
  const statusMap: Record<IOrderStatus, string> = {
    CANCELED: 'Cancelado',
    CONFIRMED: 'Confirmado',
    DELIVERING: 'Em transporte',
    PREPARING: 'Em preparo',
    FINISHED: 'Entregue',
  }

  return statusMap[status]
}

export function OrderStatus({ status }: { status: IOrderStatus }) {
  return (
    <>
      {status === 'CONFIRMED' && (
        <Badge className="bg-emerald-500 hover:bg-emerald-500">
          {getOrderStatusLabel(status)}
        </Badge>
      )}

      {status === 'CANCELED' && (
        <Badge className="bg-rose-600 hover:bg-rose-600">
          {getOrderStatusLabel(status)}
        </Badge>
      )}

      {status === 'FINISHED' && (
        <Badge className="bg-background text-muted-foreground hover:bg-background">
          {getOrderStatusLabel(status)}
        </Badge>
      )}

      {status === 'DELIVERING' && (
        <Badge className="bg-sky-500 hover:bg-sky-500">
          {getOrderStatusLabel(status)}
        </Badge>
      )}

      {status === 'PREPARING' && (
        <Badge className="bg-amber-500 hover:bg-amber-500">
          {getOrderStatusLabel(status)}
        </Badge>
      )}
    </>
  )
}
