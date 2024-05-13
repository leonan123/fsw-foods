'use client'

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

export function Header() {
  const { data } = useSession()

  function handleSignInClick() {
    signIn()
  }

  function handleSignOutClick() {
    signOut()
  }

  return (
    <header className="flex items-center justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="FSW Foods"
          width={100}
          height={30}
          className="h-auto w-auto"
        />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="space-y-6">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-3">
            {data?.user ? (
              <>
                <Avatar className="size-12 border-2 border-primary">
                  <AvatarImage src={data.user.image || ''} />
                  <AvatarFallback className="bg-muted uppercase">
                    {data?.user?.name?.split(' ')[0][0]}
                    {data?.user?.name?.split(' ')[0][1]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h5 className="font-semibold">{data?.user?.name}</h5>
                  <p className="text-xs text-muted-foreground">
                    {data?.user?.email}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex w-full items-center justify-between">
                <h5 className="font-semibold">Olá. Faça seu login!</h5>

                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon size={20} />
                </Button>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-1">
            <Button asChild className="w-full justify-start gap-3 rounded-full">
              <Link href="/" className="">
                <HomeIcon size={16} />
                <span className="text-sm">Início</span>
              </Link>
            </Button>

            {data?.user && (
              <>
                <Button
                  asChild
                  className="w-full justify-start gap-3 rounded-full border-none"
                  variant="outline"
                >
                  <Link href="/">
                    <ScrollTextIcon size={16} />
                    <span className="text-sm font-normal">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full justify-start gap-3 rounded-full border-none"
                  variant="outline"
                >
                  <Link href="/">
                    <HomeIcon size={16} />
                    <span className="text-sm font-normal">
                      Restaurantes Favoritos
                    </span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {data?.user && (
            <>
              <Separator />

              <Button
                className="w-full justify-start gap-3 rounded-full border-none"
                variant="outline"
                onClick={handleSignOutClick}
              >
                <LogOutIcon size={16} />
                <span className="text-sm font-normal">Sair da conta</span>
              </Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </header>
  )
}
