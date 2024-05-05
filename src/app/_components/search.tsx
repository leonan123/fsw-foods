'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Input } from './input'
import { Button } from './ui/button'

export function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const search = formData.get('search') as string

    router.push(`/restaurants?search=${search}`)
  }

  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes"
        className="flex-1 border-none"
        name="search"
        required
        defaultValue={searchParams.get('search') ?? ''}
      />

      <Button size="icon">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}
