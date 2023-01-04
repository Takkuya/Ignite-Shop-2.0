import { styled } from '..'

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',

  // cálculo
  // pego a largura inteira da tela - largura inteira da tela - 1180px (tamanho do carrousel de camisetas) / 2
  // fizemos isso para caso o usuário der zoom out, o conteúdo sempre ficar mais centralizado, com uma margin left auto
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 500,

  '@media (min-width: 768px)': {
    minHeight: 600,
  },
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',

  // para esconder o footer saindo da tela ao dar hover
  overflow: 'hidden',
  minWidth: 440,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // não distorce a imagem, fazendo ela caber no container
  img: {
    objectFit: 'cover',
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '1.25rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba( 0, 0, 0, 0.6)',

    transform: 'translateY(0%)',
    opacity: 1,
    transition: 'all 0.2s ease-in-out',

    strong: {
      fontSize: '$lg',
      color: '$gray100',
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    '@media (min-width: 768px)': {
      opacity: 0,
      transform: 'translateY(110%)',
    },
  },

  '@media (min-width: 768px)': {
    '&:hover': {
      footer: {
        transform: 'translateY(0%)',
        opacity: 1,
      },
    },
  },
})

export const TextContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
})

export const AddToCartButton = styled('button', {
  background: '$green500',
  padding: '0.75rem',
  border: 0,
  borderRadius: 6,

  cursor: 'pointer',

  svg: {
    width: '2rem',
    height: '2rem',
    color: '$white',
  },

  '&:hover': {
    transition: '0.2s all',
    background: '$green300',
  },
})
