import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { Header } from '../_components/header'
import { authConfig } from '../_lib/auth'
import { db } from '../_lib/prisma'
import { OrderItem } from './_components/order-item'

export default async function MyOrdersPage() {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    redirect('/')
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      },
      products: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
      <Header />

      <div className="mx-5 space-y-6 pb-5">
        <h1 className="mt-6 text-lg font-semibold">Meus pedidos</h1>

        <main className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}

          {/* <Card>
            <CardContent className="space-y-3 p-5">
              <Badge className="bg-green-600 hover:bg-green-500">
                Em transporte
              </Badge>

              <Link
                className="flex items-center justify-between border-b border-muted pb-2.5"
                href="#"
              >
                <div className="flex items-center gap-1.5">
                  <div className="relative size-4 overflow-hidden rounded-full">
                    <Image
                      src="https://utfs.io/f/7f52b936-9f7a-40cc-b22f-b62727ddb9cc-fu3r05.png"
                      fill
                      className="object-cover"
                      alt=""
                    />
                  </div>

                  <h2 className="text-sm font-semibold">Sushidojo</h2>
                </div>

                <ChevronRightIcon size={20} />
              </Link>

              <Link
                className="flex items-center justify-between border-b border-muted pb-2.5 text-xs"
                href="#"
              >
                <div className="flex items-center gap-1.5">
                  <div className="flex size-5 items-center justify-center overflow-hidden rounded-full bg-muted-foreground text-primary-foreground">
                    1
                  </div>

                  <h3 className="text-muted-foreground">Ramen Clássico</h3>
                </div>
              </Link>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <h4>{formatCurrency(55.2)}</h4>
                </div>

                <Button
                  variant="link"
                  disabled
                  size="sm"
                  className="h-auto text-xs font-semibold"
                >
                  {' '}
                  Adicionar à Sacola
                </Button>
              </div>
            </CardContent>
          </Card> */}
        </main>
      </div>
    </>
  )
}
