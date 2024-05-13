'use server'

import type { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

import { db } from '../_lib/prisma'

export async function createOrder(data: Prisma.OrderCreateInput) {
  const order = await db.order.create({ data })
  revalidatePath('/my-orders')
  return order
}
