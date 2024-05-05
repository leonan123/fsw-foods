import type { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link
      className="inline-flex snap-start items-center gap-2 rounded-full border border-muted/50 px-4 py-3 shadow-md"
      href={`/categories/${category.id}/products`}
    >
      <div className="relative size-6">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="50px"
          className="object-contain"
        />
      </div>
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  )
}
