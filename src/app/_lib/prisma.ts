/* eslint-disable no-var */
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export const db = prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
