import axios from 'axios'
import { Handbag, X } from 'phosphor-react'
import { useContext } from 'react'
import Drawer from 'react-modern-drawer'
import { CartContext } from '../../contexts/CartContext'
import { ShirtCard } from '../ShirtCard'
import {
  Body,
  CartButton,
  DrawerWrapper,
  Footer,
  Header,
  Price,
  ProductsInformationWrapper,
} from './styles'

type CustomDrawerProps = {
  isDrawerOpen: boolean
  handleDrawer: () => void
}

export const CustomDrawer = ({
  isDrawerOpen,
  handleDrawer,
}: CustomDrawerProps) => {
  const { cartItemsWithoutId, productId, cartItems } = useContext(CartContext)

  async function handleBuyProduct() {
    try {
      // conectando com a API do next (api/checkout.ts)
      const response = await axios.post('/api/checkout', {
        lineItems: cartItemsWithoutId,
        productId,
      })

      const { checkoutUrl } = response.data

      // redirecionando para uma aplicação externa (nesse caso o Stripe)
      // não coloco o setIsCreatingCheckoutSession para false pois estamos redirecionando o usuário no final da execução
      window.location.href = checkoutUrl
    } catch (err) {
      // o melhor seria conectar a alguma ferramenta de observabilidade (datadog/sentry)
      // para conseguirmos obter as informações dos erros
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const cartItemsLength = cartItemsWithoutId.length

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
      <Drawer
        size={'30rem'}
        open={isDrawerOpen}
        onClose={handleDrawer}
        direction="right"
      >
        <DrawerWrapper>
          <Header>
            <button onClick={handleDrawer}>
              <X size={24} weight="bold" />
            </button>
          </Header>
          <Body>
            <h3>Sacola de compras</h3>
            <div>
              {cartItems.map((item) => {
                return <ShirtCard product={item} key={item.id} />
              })}
            </div>
          </Body>
          <Footer>
            <ProductsInformationWrapper>
              <div>
                <span>Quantidade</span>
                <span>{cartItemsLength} itens</span>
              </div>
              <div>
                <strong>Valor total</strong>
                <Price>{cartItemsTotalPriceFormatted}</Price>
              </div>
            </ProductsInformationWrapper>
            <button onClick={handleBuyProduct}>Finalizar compra</button>
          </Footer>
        </DrawerWrapper>
      </Drawer>
      {cartItemsLength !== 0 ? (
        <CartButton onClick={handleDrawer}>
          <span>{cartItemsLength}</span>
          <Handbag size={24} weight="bold" />
        </CartButton>
      ) : null}
    </>
  )
}
