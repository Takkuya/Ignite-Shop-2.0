/* eslint-disable no-unused-vars */
import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  //   const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
  //     useState(false)

  //   async function handleBuyProduct() {
  //     try {
  //       setIsCreatingCheckoutSession(true)
  //       // conectando com a API do next (api/checkout.ts)
  //       const response = await axios.post('/api/checkout', {
  //         priceId: product.defaultPriceId,
  //       })

  //       const { checkoutUrl } = response.data

  //       // redirecionando para uma aplicação externa (nesse caso o Stripe)
  //       // não coloco o setIsCreatingCheckoutSession para false pois estamos redirecionando o usuário no final da execução
  //       window.location.href = checkoutUrl
  //     } catch (err) {
  //       setIsCreatingCheckoutSession(false)
  //       // o melhor seria conectar a alguma ferramenta de observabilidade (datadog/sentry)
  //       // para conseguirmos obter as informações dos erros
  //       alert('Falha ao redirecionar ao checkout')
  //     }
  //   }

  // pegando o estado se está carregando ou não
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Is Loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>
          <button
          // disabled={isCreatingCheckoutSession}
          // onClick={handleBuyProduct}
          >
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

// utilizamos isso, quando temos páginas estáticas que possuem parâmetros, informações dinâmicas
// isso porque, o productId é um id que vem na URL, porém na hora da build, o next não sabe
// de onde vem esse id
// sempre vamos usar o getStaticPaths para dizer ao next quais são as páginas/parâmetros que queremos gerar verões
// estáticas
export const getStaticPaths: GetStaticPaths = async () => {
  // esse método devolve os ids
  // retorna um array com vários objetos, nesses objetos eu retorno os parâmetros dos produtos que eu
  // q quero gerar a versão estática
  return {
    paths: [{ params: { id: 'prod_N4ZYf5cunzfN9G' } }],
    // quando passamos fallback false, quando tentamos acessar a página de um produto a qual não passamos no
    // path ele vai acabar dando 404
    fallback: true,
  }
}

// tipagem, genérico
// primeiro parâmetro => qual o tipo que estou passando para as props
// segundo parâmetro => qual vai ser o formato de objeto de params
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  // tenho acesso ao id do produto que vem através da URL
  const productId = params!.id

  // buscando produto de dentro do Stripe
  const product = await stripe.products.retrieve(productId, {
    // passamos o preço direto já que ele não é uma lista
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
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
        description: product.description,
        // default price => preço padrão do produto, mesmo que tenha mais de 1 produto, preço comum do produto
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hora
  }
}
