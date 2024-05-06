import { notFound } from 'next/navigation'

import { db } from '@/app/_lib/prisma'
import type { ProductWithRestaurant } from '@/app/types/product'

import { ProductDetails } from '../_components/product-details'
import { ProductImage } from '../_components/product-image'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  })

  if (!product) {
    return notFound()
  }

  const categoriesWithoutComplementaryProducts = ['sucos', 'sobremesas']

  let juices: ProductWithRestaurant[] | undefined

  if (
    !categoriesWithoutComplementaryProducts.includes(
      product.category.name.toLowerCase(),
    )
  ) {
    juices = await db.product.findMany({
      where: {
        category: {
          name: 'Sucos',
        },
      },
      include: {
        restaurant: true,
      },
    })
  }

  return (
    <main>
      <ProductImage src={product.imageUrl} alt={product.name} />

      <div className="relative z-10 -mt-5 rounded-se-3xl rounded-ss-3xl bg-white pt-5">
        <ProductDetails product={product} complementaryProducts={juices} />
      </div>
    </main>
  )
}
