import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import { CategoryList } from './_components/category-list'
import { Header } from './_components/header'
import { ProductList } from './_components/product-list'
import { PromoBanner } from './_components/promo-banner'
import { RestaurantList } from './_components/restaurant-list'
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

      <Suspense>
        <div className="mt-6 px-5">
          <Search />
        </div>
      </Suspense>

      <div className="mt-6 px-5">
        <CategoryList />
      </div>

      <div className="mt-6 px-5">
        <PromoBanner
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizzas"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Produtos recomendados</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <ProductList products={products} />
      </div>

      <div className="mt-6 px-5">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A partir de R$17,90 em Lanches"
        />
      </div>

      <div className="my-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes recomendados</h2>
          <Button
            variant="ghost"
            size="sm"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        <RestaurantList />
      </div>
    </div>
  )
}
