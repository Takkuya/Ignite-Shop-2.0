import { X } from 'phosphor-react'
import Drawer from 'react-modern-drawer'
import { ShirtCard } from '../ShirtCard'
import {
  Body,
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
  return (
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
            <ShirtCard />
            <ShirtCard />
            <ShirtCard />
          </div>
        </Body>
        <Footer>
          <ProductsInformationWrapper>
            <div>
              <span>Quantidade</span>
              <span>3 itens</span>
            </div>
            <div>
              <strong>Valor total</strong>
              <Price> R$ 270,00</Price>
            </div>
          </ProductsInformationWrapper>
          <button>Finalizar compra</button>
        </Footer>
      </DrawerWrapper>
    </Drawer>
  )
}
