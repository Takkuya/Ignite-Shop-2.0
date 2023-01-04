import { styled } from '..'

export const ProductContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '0 1rem',

  maxWidth: 1180,

  '@media (min-width: 768px)': {
    display: 'grid',
    gridTemplateColumns: ' 1fr 1fr',
    alignItems: 'stretch',
    gap: '4rem',
    margin: '0 auto',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '100vw',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },

  '@media (min-width: 768px)': {
    maxWidth: 576,
    height: 656,
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1rem',

  '@media (min-width: 768px)': {
    marginTop: '0',
  },

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300',
  },

  p: {
    marginTop: '1.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',

    '@media (min-width: 768px)': {
      marginTop: '2.5rem',
    },
  },

  button: {
    // joga o botão para a parte de baixo
    marginTop: '2rem',
    marginBottom: '5rem',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',

    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '@media (min-width: 768px)': {
      marginBottom: '0',
      marginTop: 'auto',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})
