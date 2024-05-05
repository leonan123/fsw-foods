import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { DeliveryInfo } from '@/app/_components/delivery-info'
import { ProductList } from '@/app/_components/product-list'
import { db } from '@/app/_lib/prisma'

import { RestaurantImage } from '../_components/restaurant-image'

interface RestaurantPageProps {
  params: Readonly<{
    id: string
  }>
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!restaurant) {
    return notFound()
  }

  return (
    <main>
      <RestaurantImage alt={restaurant.name} src={restaurant.imageUrl} />

      <div className="relative z-10 -mt-5 rounded-se-3xl rounded-ss-3xl bg-white pb-5 pt-5">
        <div className="space-y-3">
          <div className="mx-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative size-8 overflow-hidden rounded-full">
                <Image
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>

              <h1 className="text-xl font-semibold">{restaurant.name}</h1>
            </div>

            <div
              className="flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1"
              role="aria-label"
              aria-roledescription="restaurant rating"
            >
              <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-primary-foreground">
                5.0
              </span>
            </div>
          </div>

          <div className="mx-5">
            <DeliveryInfo
              deliveryFee={Number(restaurant.deliveryFee)}
              deliveryTimeMinutes={restaurant.deliveryTimeMinutes}
            />
          </div>

          <div className="mx-5 flex items-center gap-4">
            {restaurant.categories.map((category) => (
              <div
                key={category.id}
                className="w-1/2 rounded-sm bg-background py-1 text-center text-sm text-muted-foreground"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="mx-5 font-semibold">Mais pedidos</h2>
          <ProductList products={restaurant.products} />
        </div>

        {restaurant.categories.map((category) => (
          <div className="mt-8 space-y-4" key={category.id}>
            <h2 className="mx-5 font-semibold">{category.name}</h2>
            <ProductList products={category.products} />
          </div>
        ))}
      </div>
    </main>
  )
}
