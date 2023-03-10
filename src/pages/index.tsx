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

  // refs => serve para termos a referência de um elemento na DOM
  // assim como se fosse um document.getElementById eu tenho a referência
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

    return {
      id: product.id,
      priceId: price.id,
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
      priceWithoutFormatting: Number(price.unit_amount_decimal),
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
