import Image from 'next/image'

import { CategoryList } from './_components/category-list'
import { Header } from './_components/header'
import { Search } from './_components/search'

export default function Home() {
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
    </div>
  )
}
