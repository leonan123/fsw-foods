'use server'

import type { Prisma } from '@prisma/client'

import { db } from '../_lib/prisma'

export async function createOrder(data: Prisma.OrderCreateInput) {
  return await db.order.create({ data })
}
