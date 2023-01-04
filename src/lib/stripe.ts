import Stripe from 'stripe'

// primeiro parâmetro => API key
// appInfo => todas as chamada do stripe vão ficar um log, aparecendo o nome da aplicação
// que fez a requisição
// inserimos o ! no final da secret key, para garantir para o TypeScript que o valor sempre
// vai estar disponível
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
  appInfo: {
    name: 'Ignite Shop',
  },
})
