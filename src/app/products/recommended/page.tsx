import { Header } from '@/app/_components/header'
import { ProductItem } from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    take: 10,
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <>
      <Header />

      <h2 className="mx-5 mt-5 text-lg font-semibold">
        Produtos recomendados ({products.length})
      </h2>

      <div className="mx-5 my-5 grid grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
