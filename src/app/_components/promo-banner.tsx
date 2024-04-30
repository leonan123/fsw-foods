import Image, { type ImageProps } from 'next/image'

import { cn } from '../_lib/utils'

export function PromoBanner({ alt, className, ...props }: ImageProps) {
  return (
    <Image
      alt={alt ?? ''}
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      className={cn('h-auto w-screen', className)}
      {...props}
    />
  )
}
