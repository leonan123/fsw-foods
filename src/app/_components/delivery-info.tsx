import { BikeIcon, ClockIcon } from 'lucide-react'

import { formatCurrency } from '../_helpers/price'
import { Card, CardContent } from './ui/card'

interface DeliveryInfoProps {
  deliveryFee: number
  deliveryTimeMinutes: number
}

export function DeliveryInfo({
  deliveryFee,
  deliveryTimeMinutes,
}: DeliveryInfoProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-around py-2.5 text-xs ">
        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Entrega</span>
            <BikeIcon size={14} />
          </div>

          <p className="font-semibold">
            {Number(deliveryFee) > 0
              ? formatCurrency(Number(deliveryFee))
              : 'Grátis'}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Entrega</span>
            <ClockIcon size={14} />
          </div>

          <p className="font-semibold">
            {deliveryTimeMinutes + 'Min' ?? 'Indefinido'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
