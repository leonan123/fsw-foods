import { db } from '@/app/_lib/prisma'

import { CategoryItem } from './category-item'

export async function CategoryList() {
  const categories = await db.category.findMany({})

  return (
    <div className="flex select-none items-center gap-2 overflow-auto px-0.5 py-1.5 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  )
}
