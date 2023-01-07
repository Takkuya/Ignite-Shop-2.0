import React, { createContext, useState } from 'react'

type CartContextProviderProps = {
  children: React.ReactNode
}

type CartItemsWithoutId = {
  price: string
  quantity: number
}

type ProductId = {
  id: string
}

export type CartItems = ProductId & {
  imageUrl: string
  name: string
  price: string
  priceId: string
  priceWithoutFormatting: number
}

type CartContextValues = {
  cartItems: CartItems[]
  cartItemsWithoutId: CartItemsWithoutId[]
  productId: ProductId[]
  addItemsToCart: (product: CartItems) => void
}

export const CartContext = createContext({} as CartContextValues)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([])

  function addItemsToCart(product: CartItems) {
    setCartItems([...cartItems, product])
  }

  const cartItemsWithoutId = cartItems.map((cartItem: CartItems) => {
    return {
      price: cartItem.priceId,
      quantity: 1,
    }
  })

  const productId = cartItems.map((cartItem: CartItems) => {
    return {
      id: cartItem.id,
    }
  })

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsWithoutId,
        productId,
        addItemsToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
