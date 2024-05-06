import type { Prisma } from '@prisma/client'

export type ProductWithRestaurant = Prisma.ProductGetPayload<{
  include: { restaurant: true }
}>
