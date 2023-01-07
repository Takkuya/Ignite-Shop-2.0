import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'
import Link from 'next/link'
import 'react-modern-drawer/dist/index.css'
import { useState } from 'react'
import { CustomDrawer } from '../components/Drawer'
import { CartContextProvider } from '../contexts/CartContext'

// aplicando estilos globais
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  function handleDrawer() {
    setIsDrawerOpen((state) => !state)
  }

  return (
    <Container>
      <CartContextProvider>
        <Header>
          <Link href="/">
            <img src={logoImg.src} alt="" />
          </Link>
          <CustomDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawer={handleDrawer}
          />
        </Header>

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
