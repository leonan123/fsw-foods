import { Header } from './_components/ui/header'
import { Search } from './_components/ui/search'

export default function Home() {
  return (
    <div>
      <Header />

      <div className="mt-6 px-5">
        <Search />
      </div>
    </div>
  )
}
