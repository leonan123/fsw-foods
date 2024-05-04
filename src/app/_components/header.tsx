import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'

export function Header() {
  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <Link href="#">
        <Image
          src="/logo.svg"
          alt="FSW Foods"
          width={100}
          height={30}
          className="h-auto w-auto"
        />
      </Link>

      <Button variant="ghost" size="icon">
        <MenuIcon />
      </Button>
    </header>
  )
}
