import { styled } from '../../styles'

export const DrawerWrapper = styled('div', {
  background: '$gray900',
  height: '100vh',
  padding: '1.5rem 3rem 3rem 3rem',
})

export const Header = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',

  button: {
    background: 'transparent',
    border: 0,
    fontSize: 0,

    cursor: 'pointer',

    svg: {
      color: '$gray300',
    },
  },
})

export const Body = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',

  marginTop: '1.5rem',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
})

export const Footer = styled('footer', {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  marginTop: 'auto',

  marginBottom: '3rem',

  button: {
    marginTop: '3.5rem',

    background: '$green500',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$lg',

    border: 0,
    borderRadius: 8,

    padding: '1.25rem',

    width: '100%',
    maxWidth: 384,

    cursor: 'pointer',

    '&:hover': {
      transition: '0.2s all',
      background: '$green300',
    },
  },
})

export const ProductsInformationWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    maxWidth: 384,

    '>strong': {
      fontSize: '$md',
      color: '$gray100',
    },
  },

  span: {
    color: '$gray300',
  },
})

export const Price = styled('strong', {
  fontSize: '$xl',
})
