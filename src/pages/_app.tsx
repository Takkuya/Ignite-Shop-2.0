import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import logoImg from '../assets/Logo.svg'
import { Container, Header } from '../styles/pages/app'
import Link from 'next/link'

// aplicando estilos globais
globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Link href="/">
          <img src={logoImg.src} alt="" />
        </Link>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
