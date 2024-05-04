import type { Product } from '@prisma/client'

export function calculateProductTotalPrice(product: Product): number {
  const productPrice = Number(product.price)
  const productDiscountPercentage = product.discountPercentage

  if (productDiscountPercentage === 0) {
    return productPrice
  }

  const discount = productPrice * (productDiscountPercentage / 100)

  return productPrice - discount
}

export function formatCurrency(value: number): string {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
    .format(value)
    .replace(/\s/g, '')
}
