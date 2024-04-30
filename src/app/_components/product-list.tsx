import type { Prisma } from '@prisma/client'

import { ProductItem } from './product-item'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}

export async function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
