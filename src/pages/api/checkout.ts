import { NextApiRequest, NextApiResponse } from 'next'
import { ProductType } from '../../contexts/CartContext'
import { stripe } from '../../lib/stripe'

// lembrando que estamos fazendo isso pelo lado do server side pois: primeiro: o código contém informações sensíveis (chave do stripe)
// segundo: o código é executado por uma ação do usuário (clicar no botão de comprar)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // id do preço relacionado ao produto
  // pegamos priceId do corpo da requisição, o que foi passado na rota product/id.tsx
  const { products } = req.body as { products: ProductType[] }

  // divergência de métodos HTTP, caso o usuário acesse a rota com outro método
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // inserindo erros
  if (!products) {
    return res.status(404).json({ error: 'Product not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    // para onde vou redirecionar o usuário depois que ele efetuou a compra/não fez a compra
    success_url: successUrl,
    cancel_url: cancelUrl,
    // só as credenciais do cartão e já vai finalizar
    mode: 'payment',
    // array com várias informações sobre quais produtos o usuário está comprando
    line_items: products.map((product) => ({
      price: product.priceId,
      quantity: 1,
    })),
  })

  //   const product = await stripe.products.retrieve(productId, {
  //     // passamos o preço direto já que ele não é uma lista
  //     expand: ['default_price'],
  //   })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
    // productInfo: product,
  })
}
