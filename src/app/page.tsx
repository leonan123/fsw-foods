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
    </div>
  )
}
