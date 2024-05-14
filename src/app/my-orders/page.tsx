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
      restaurant: true,
      products: {
        include: {
          product: true,
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
        </main>
      </div>
    </>
  )
}
