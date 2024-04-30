import { SearchIcon } from 'lucide-react'

import { Button } from './button'
import { Input } from './input'

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
