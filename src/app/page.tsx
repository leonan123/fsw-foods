import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'

import { CategoryList } from './_components/category-list'
import { Header } from './_components/header'
import { ProductList } from './_components/product-list'
import { Search } from './_components/search'
import { Button } from './_components/ui/button'
import { db } from './_lib/prisma'

export default async function Home() {
  const products = await db.product.findMany({
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
    take: 10,
  })

  return (
    <div>
      <Header />

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6 px-5">
        <CategoryList />
      </div>

      <div className="mt-6 px-5">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          sizes="100vw"
          quality={100}
          className="h-auto w-screen"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos recomendados</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        <ProductList products={products} />
      </div>
    </div>
  )
}
