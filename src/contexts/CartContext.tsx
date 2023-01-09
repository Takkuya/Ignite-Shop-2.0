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
}

export const CartContext = createContext({} as CartContextValues)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([])

  function addItemsToCart(product: ProductType) {
    const isItemInCart = cartItems.findIndex((item) => {
      return item.id === product.id
    })

    if (isItemInCart) {
      setCartItems((state) => [...state, product])
    } else {
      alert('Você já adicionou esse item ao carrinho')
      setCartItems((state) => [...state])
    }
  }

  function removeItemFromCart(productId: string) {
    const cartItemsWithoutDeletedOne = cartItems.filter((cartItem) => {
      return cartItem.id !== productId
    })

    setCartItems(cartItemsWithoutDeletedOne)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemsToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
