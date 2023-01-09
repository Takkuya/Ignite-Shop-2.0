import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { Handbag, X } from 'phosphor-react'
import { useContext, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { ShirtCard } from '../ShirtCard'
import {
  CartButton,
  CartClose,
  CartContent,
  CartFinalization,
  CartProduct,
  EmptyCartWrapper,
  FinalizationDetails,
} from './styles'

export const CustomDrawer = () => {
  const { cartItems } = useContext(CartContext)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      // conectando com a API do next (api/checkout.ts)
      const response = await axios.post('/api/checkout', {
        products: cartItems,
      })

      const { checkoutUrl } = response.data

      // redirecionando para uma aplicação externa (nesse caso o Stripe)
      // não coloco o setIsCreatingCheckoutSession para false pois estamos redirecionando o usuário no final da execução
      window.location.href = checkoutUrl
    } catch (err) {
      // o melhor seria conectar a alguma ferramenta de observabilidade (datadog/sentry)
      // para conseguirmos obter as informações dos erros
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const cartItemsLength = cartItems.length

  const cartItemsTotalPrice = cartItems.reduce(
    (acc, currentValue) => {
      return {
        priceWithoutFormatting: (acc.priceWithoutFormatting +=
          currentValue.priceWithoutFormatting),
      }
    },
    { priceWithoutFormatting: 0 },
  )

  const cartItemsTotalPriceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cartItemsTotalPrice.priceWithoutFormatting! / 100)

  return (
    <>
      <Dialog.Root>
        {/* asChild => o que estpa dentro que vai ser o botão de trigger */}
        <Dialog.Trigger asChild>
          {cartItemsLength !== 0 ? (
            <CartButton>
              <span>{cartItemsLength}</span>
              <Handbag size={24} weight="bold" />
            </CartButton>
          ) : null}
        </Dialog.Trigger>
        <Dialog.Portal>
          <CartContent>
            <CartClose>
              <X size={24} weight="bold" />
            </CartClose>
            <h2>Sacola de compras</h2>
            <section>
              {cartItemsLength <= 0 && (
                <EmptyCartWrapper>
                  <h1>OOPS</h1>
                  <span>
                    Parece que você não adicionou nada ao seu carrinho
                  </span>
                </EmptyCartWrapper>
              )}
              {cartItems.map((cartItem) => (
                <CartProduct key={cartItem.id}>
                  <ShirtCard product={cartItem} />
                </CartProduct>
              ))}
            </section>
            <CartFinalization>
              <FinalizationDetails>
                <div>
                  <span>Quantidade</span>
                  <p>
                    {cartItemsLength} {cartItemsLength === 1 ? 'item' : 'itens'}
                  </p>
                </div>
                <div>
                  <span>Valor total</span>
                  <p>{cartItemsTotalPriceFormatted}</p>
                </div>
              </FinalizationDetails>
              <button
                onClick={handleBuyProduct}
                disabled={isCreatingCheckoutSession || cartItemsLength <= 0}
              >
                Finalizar compra
              </button>
            </CartFinalization>
          </CartContent>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
