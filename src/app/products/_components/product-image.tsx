'use client'

import { ChevronLeftIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/_components/ui/button'

interface ProductImageProps {
  src: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  const router = useRouter()

  function handleBackPageClick() {
    router.back()
  }

  return (
    <div className="relative h-[360px] w-full">
      <Button
        size="icon"
        className="absolute left-5 top-5 z-10 rounded-full bg-primary-foreground text-card-foreground hover:text-primary-foreground"
        onClick={handleBackPageClick}
      >
        <ChevronLeftIcon size={20} />
        <span className="sr-only">Voltar para a página anterior</span>
      </Button>

      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  )
}
