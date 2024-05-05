import { notFound } from 'next/navigation'

import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'

interface ProductsByCategoryPage {
  params: {
    id: string
  }
}

export default async function ProductsByCategoryPage({
  params: { id },
}: ProductsByCategoryPage) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: true,
        },
      },
    },
  })

  if (!category) {
    return notFound()
  }

  return (
    <>
      <Header />

      <h2 className="mx-5 mt-5 text-lg font-semibold">
        {category.name} ({category.products.length})
      </h2>

      <div className="mx-5 my-5 grid grid-cols-2 gap-6">
        {category.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
