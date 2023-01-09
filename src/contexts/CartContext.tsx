import React, { createContext, useState } from 'react'

type CartContextProviderProps = {
  children: React.ReactNode
}

type ProductId = {
  id: string
}

export type ProductType = ProductId & {
  id: string
  imageUrl: string
  name: string
  price: string
  priceId: string
  priceWithoutFormatting: number
}

type CartContextValues = {
  cartItems: ProductType[]
  addItemsToCart: (product: ProductType) => void
  removeItemFromCart: (productId: string) => void
  itemAlreadExistsInCart: (productId: string) => boolean
}

export const CartContext = createContext({} as CartContextValues)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([])

  function addItemsToCart(product: ProductType) {
    setCartItems((state) => [...state, product])
  }

  function removeItemFromCart(productId: string) {
    const cartItemsWithoutDeletedOne = cartItems.filter((cartItem) => {
      return cartItem.id !== productId
    })

    setCartItems(cartItemsWithoutDeletedOne)
  }

  function itemAlreadExistsInCart(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemsToCart,
        removeItemFromCart,
        itemAlreadExistsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
