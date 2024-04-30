import type { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="inline-flex snap-start items-center gap-2 rounded-full border border-muted/50 px-4 py-3 shadow-md">
      <div className="relative size-6">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  )
}
