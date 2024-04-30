import { SearchIcon } from 'lucide-react'

import { Input } from './input'
import { Button } from './ui/button'

export function Search() {
  return (
    <div className="flex gap-2">
      <Input placeholder="Buscar restaurantes" className="flex-1 border-none" />

      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </div>
  )
}
