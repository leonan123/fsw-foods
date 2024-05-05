'use client'

import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/_components/ui/button'

interface RestaurantImageProps {
  src: string
  alt: string
}

export function RestaurantImage({ src, alt }: RestaurantImageProps) {
  const router = useRouter()

  function handleBackPageClick() {
    router.back()
  }

  return (
    <div className="relative h-[250px] w-full">
      <Button
        size="icon"
        className="absolute left-5 top-5 z-10 rounded-full bg-primary-foreground text-card-foreground hover:text-primary-foreground"
        onClick={handleBackPageClick}
      >
        <ChevronLeftIcon size={20} />
        <span className="sr-only">Voltar para a página anterior</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="group absolute right-5 top-5 z-10 rounded-full bg-foreground hover:bg-primary"
      >
        <HeartIcon size={22} className="fill-muted text-muted" />
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
