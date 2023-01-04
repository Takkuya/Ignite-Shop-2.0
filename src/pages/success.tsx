import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, SuccessContainer } from '../styles/success'

/* 
Temos 3 formas de pegar as informações do produto de acordo com o session id passados na URL
Sendo elas:
Client-side (useEffect), getServerSideProps e getStaticProps
o getStaticProps já não faria sentido nessa página, pois temos uma informação dinâmica que vem da URL
como um parâmetro GET, ou seja, ela seria a mesma página de sucesso para todos os clientes, e também
não faz sentido ter uma página estática de sucesso, geralmente deixamos as páginas estáticas
nas quais estamos buscando mais performance

useEffect => Podemos, porém temos 2 problemáticas, se eu fizer o fetch usando o useEffect,
primeiro vou ter que fazer uma tela de loading, para simbolizar os dados sendo carregados
e o segundo problema é que a API do Stripe não permite chamadas pelo client side, já que estaria
expondo a minha chave secreta do Stripe, e isso seria altamente inseguro

Por isso vamos fazer o fetch usando o getServerSideProps
*/

type SuccessProps = {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        {/* basicamente estamos falando para os crawlsers não indexarem essa página */}
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{customerName}</strong>, sua{' '}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // caso não tenha o sessionId
  // o next permite que a gente faça um redirecionamento do usuário dentro da getServerSideProps
  // faço a verificação do session_id vindo do query pois lá em baixo transformamos ele em String
  // ou seja, ele vai retornar 'undefined' como string ao invés de undefined como undefined mesmo
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        // o redirect só acontece se o session id não for informada, logo não é permanente
        permanent: false,
      },
    }
  }

  // pegar o parâmetro session id vindo da URL
  // renomeando para camelCase
  // const { session_id: sessionId } = query
  // pegando o session id mas forçando para ele sempre ser do tipo String
  const sessionId = String(query.session_id)

  // buscando dentro do Stripe os dados dessa session
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    // expanding para pegar os dados do produto agora
    // mais informações nas docs https://stripe.com/docs/api/checkout/sessions/object
    // também consigo expandir o price, pegando o product, conseguindo informações do produto
    // relacionado ao preço
    // .data => pois é um array, .price pois estamos acessando essa propriedade do objeto
    // e quero expandir o produ ct
    expand: ['line_items', 'line_items.data.price.product'],
  })
  // podemos dar um console.log(session) para conseguirmos ver todas as informações

  // o ? serve para dizer que os objetos sempre vão possuir algum valor
  const customerName = session.customer_details?.name
  // pegando apenas o primeiro produto, pois por enquanto só temos 1 produto no checkout
  // Stripe.Product pois expandimos ele, então especissszficamos que já expandimos essa propriedade
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        // retornando apenas as informações que eu preciso
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
