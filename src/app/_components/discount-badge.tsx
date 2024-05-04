import { ArrowDownIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '../_lib/utils'

interface DiscountBadge extends ComponentProps<'div'> {
  discountPercentage: number
}

export function DiscountBadge({
  discountPercentage,
  className,
  ...props
}: DiscountBadge) {
  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-full bg-primary px-2 py-0.5 text-muted',
        className,
      )}
      {...props}
    >
      <ArrowDownIcon size={12} strokeWidth={3} />
      <span className="text-sm font-semibold">{discountPercentage}%</span>
    </div>
  )
}
