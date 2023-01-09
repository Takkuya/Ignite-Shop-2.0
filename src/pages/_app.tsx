import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import logoImg from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'
import Link from 'next/link'
import { CustomDrawer } from '../components/Drawer'
import { CartContextProvider } from '../contexts/CartContext'
import Head from 'next/head'

// aplicando estilos globais
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <CartContextProvider>
        <Header>
          <Link href="/">
            <img src={logoImg.src} alt="" />
          </Link>
          <CustomDrawer />
        </Header>

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
