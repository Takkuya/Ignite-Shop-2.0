import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'

type HomeProps = {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  // refs => serve para termos a referência de um elemento na DOM
  // assim como se fosse um document.getElementById eu tenho a referência
  // para um elemento da DOM
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <>
      {/* tudo colocado nesse Head vai refletir no Head do document */}
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

// obtendo propriedades do server side (lado do servidor)
// devolve algumas propriedades
// lembrando que quando usamos getStaticProps nós não temos acesso
// ao contexto da requisição (req, res), ou seja quando usamos getStaticProps
// não temos informações sobre o usuário logado, cookies, etc.
// já que o getStaticProps é executado quando rodamos a build da aplicação
// ou seja, páginas estáticas => iguais para todos os usuários que acessarem elas
// se a minha página tem alguma informação dinâmica (id do usuário exemplo), o
// getStaticProps não vai funcionar
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    // como retornamos uma lista, preciso usar o data, quando for um único produto
    // poderia expandir direto o default price
    expand: ['data.default_price'],
  })

  // fazendo uma transformação de dados, basicamente pegando apenas os dados necessários
  const products = response.data.map((product) => {
    // preciso fazer isso para indetificar que expandimos o price
    // basicamente estou "forçando" falando que isso sempre é um Stripe.price
    const price = product.default_price as Stripe.Price
    console.log(product.images[0])

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      // dessa forma o intellisense funciona normalmente
      // dividimos por 100 pois o Stripe retorna os preços em centavos
      // podemos inserir a formatação do preço aqui dentro, porém, caso fosse a formatação de uma
      // data por exemplo, isso não ia dar certo, pois uma data muda a cada segundo/hora/minuto
      // e essa página muda a cada 2 horas

      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
    }
  })

  return {
    props: {
      products,
    },
    // número em segundos, em quanto tempo a página "estática" vai ser gerada novamente
    // se eu colocar 10 seg, a cada 10 segundos que um usuário acessar a página
    // o next vai criar uma nova versão dessa página
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
