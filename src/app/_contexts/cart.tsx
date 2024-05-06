'use client'

import type { Prisma } from '@prisma/client'
import { createContext, useContext, useMemo, useState } from 'react'

import { calculateProductTotalPrice } from '../_helpers/price'
import type { ProductWithRestaurant } from '../types/product'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }> {
  quantity: number
}

interface ICartContext {
  products: CartProduct[]
  subtotalPrice: number
  totalDiscountsPrice: number
  totalPrice: number
  addProductToCart: (product: ProductWithRestaurant, quantity: number) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

const CartContext = createContext<ICartContext>({} as ICartContext)

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subtotalPrice = useMemo(() => {
    if (products.length === 0) {
      return 0
    }

    return (
      products.reduce(
        (acc, product) => acc + Number(product.price) * product.quantity,
        0,
      ) + Number(products[0].restaurant.deliveryFee)
    )
  }, [products])

  const totalPrice = useMemo(() => {
    if (products.length === 0) {
      return 0
    }

    return (
      products.reduce(
        (acc, product) =>
          acc + calculateProductTotalPrice(product) * product.quantity,
        0,
      ) + Number(products[0].restaurant.deliveryFee)
    )
  }, [products])

  const totalDiscountsPrice = subtotalPrice - totalPrice

  function increaseProductQuantity(productId: string) {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          }
        }

        return product
      })
    })
  }

  function decreaseProductQuantity(productId: string) {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return {
            ...product,
            quantity: product.quantity - 1,
          }
        }

        return product
      })
    })
  }

  function addProductToCart(product: ProductWithRestaurant, quantity: number) {
    setProducts((prevProducts) => {
      const productIndex = prevProducts.findIndex(
        (prevProduct) => prevProduct.id === product.id,
      )

      if (productIndex >= 0) {
        return prevProducts.map((prevProduct, index) => {
          if (index === productIndex) {
            return {
              ...prevProduct,
              quantity: prevProduct.quantity + quantity,
            }
          }

          return prevProduct
        })
      }

      return [...prevProducts, { ...product, quantity }]
    })
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.filter((product) => product.id !== productId)
    })
  }

  return (
    <CartContext.Provider
      value={{
        products,
        subtotalPrice,
        totalDiscountsPrice,
        totalPrice,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
