import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import {
  AddToCartButton,
  HomeContainer,
  Product,
  TextContainer,
} from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { Handbag } from 'phosphor-react'
import { useContext } from 'react'
import { CartContext, ProductType } from '../contexts/CartContext'

type HomeProps = {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const { addItemsToCart, itemAlreadExistsInCart } = useContext(CartContext)

  // refs => serve para termos a referĂȘncia de um elemento na DOM
  // assim como se fosse um document.getElementById eu tenho a referĂȘncia
  // para um elemento da DOM
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 576px)': {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      '(min-width: 800px)': {
        slides: {
          perView: 2,
          spacing: 48,
        },
      },
      '(min-width: 1050px)': {
        slides: {
          perView: 3,
          spacing: 48,
        },
      },
    },
  })

  function handleAddItemToCart(product: ProductType) {
    addItemsToCart(product)
  }

  return (
    <>
      {/* tudo colocado nesse Head vai refletir no Head do document */}
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product key={product.id} className="keen-slider__slide">
              <Link href={`/product/${product.id}`} prefetch={false}>
                <Image src={product.imageUrl} width={600} height={450} alt="" />
              </Link>

              <footer>
                <TextContainer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </TextContainer>

                <AddToCartButton
                  disabled={itemAlreadExistsInCart(product.id)}
                  onClick={() => handleAddItemToCart(product)}
                >
                  <Handbag size={32} weight="bold" />
                </AddToCartButton>
              </footer>
            </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

// obtendo propriedades do server side (lado do servidor)
// devolve algumas propriedades
// lembrando que quando usamos getStaticProps nĂłs nĂŁo temos acesso
// ao contexto da requisiĂ§ĂŁo (req, res), ou seja quando usamos getStaticProps
// nĂŁo temos informaĂ§Ă”es sobre o usuĂĄrio logado, cookies, etc.
// jĂĄ que o getStaticProps Ă© executado quando rodamos a build da aplicaĂ§ĂŁo
// ou seja, pĂĄginas estĂĄticas => iguais para todos os usuĂĄrios que acessarem elas
// se a minha pĂĄgina tem alguma informaĂ§ĂŁo dinĂąmica (id do usuĂĄrio exemplo), o
// getStaticProps nĂŁo vai funcionar
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    // como retornamos uma lista, preciso usar o data, quando for um Ășnico produto
    // poderia expandir direto o default price
    expand: ['data.default_price'],
  })

  // fazendo uma transformaĂ§ĂŁo de dados, basicamente pegando apenas os dados necessĂĄrios
  const products = response.data.map((product) => {
    // preciso fazer isso para indetificar que expandimos o price
    // basicamente estou "forĂ§ando" falando que isso sempre Ă© um Stripe.price
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      priceId: price.id,
      name: product.name,
      imageUrl: product.images[0],
      // dessa forma o intellisense funciona normalmente
      // dividimos por 100 pois o Stripe retorna os preĂ§os em centavos
      // podemos inserir a formataĂ§ĂŁo do preĂ§o aqui dentro, porĂ©m, caso fosse a formataĂ§ĂŁo de uma
      // data por exemplo, isso nĂŁo ia dar certo, pois uma data muda a cada segundo/hora/minuto
      // e essa pĂĄgina muda a cada 2 horas
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      priceWithoutFormatting: Number(price.unit_amount_decimal),
    }
  })

  return {
    props: {
      products,
    },
    // nĂșmero em segundos, em quanto tempo a pĂĄgina "estĂĄtica" vai ser gerada novamente
    // se eu colocar 10 seg, a cada 10 segundos que um usuĂĄrio acessar a pĂĄgina
    // o next vai criar uma nova versĂŁo dessa pĂĄgina
    revalidate: 60 * 60 * 2, // 2 horas
  }
}
