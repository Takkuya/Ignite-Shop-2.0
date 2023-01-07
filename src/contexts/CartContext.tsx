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

export type CartItems = CartItemsWithoutId & {
  id: string
  priceId: string
  name: string
  imageUrl: string
}

type ProductValues = {
  id: string
  priceId: string
  name: string
  imageUrl: string
  price: string
}

type CartContextValues = {
  cartItems: CartItems[]
  cartItemsWithoutId: CartItemsWithoutId[]
  productId: ProductId[]
  addItemsToCart: (product: ProductValues) => void
}

export const CartContext = createContext({} as CartContextValues)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItems[]>([])

  function addItemsToCart(product: any) {
    setCartItems([...cartItems, product])

    console.log('aiaiaiaiaia', cartItems)
  }

  console.log('cartItems', cartItems)

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

  console.log(productId)

  //   async function fetchItemsFromStripe() {
  //     const product = await stripe.products.retrieve(productId, {
  //       // passamos o preço direto já que ele não é uma lista
  //       expand: ['default_price'],
  //     })
  //     setLegal(product)

  //     console.log(products)
  //   }

  console.log('Items no carrinho', cartItems)

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
