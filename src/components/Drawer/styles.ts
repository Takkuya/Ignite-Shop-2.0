import { styled } from '../../styles'
import * as Dialog from '@radix-ui/react-dialog'

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  // encostado no topo, direita e embaixo
  top: 0,
  right: 0,
  bottom: 0,

  width: '30rem',
  background: '$gray800',
  padding: '3rem',
  paddingTop: '4.5rem',

  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',

  h2: {
    fontWeight: 700,
    fontSize: '$lg',
    color: '$gray100',

    marginBottom: '2rem',
  },

  '> section': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,

    overflowY: 'auto',
  },
})

export const CartClose = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  color: '$gray500',
  position: 'absolute',

  top: '1.75rem',
  right: '1.75rem',
})

export const EmptyCartWrapper = styled('div', {
  marginTop: '2rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',

  textAlign: 'center',

  span: {
    marginTop: '0.25rem',
    color: '$gray300',
  },
})

export const CartProduct = styled('div', {
  width: '100%',
  display: 'flex',
  gap: '1.25rem',
  alignItems: 'center',
  height: '5.8125rem',
})

export const CartProductImage = styled('div', {
  height: '5.8125rem',
  width: '6.3125rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: 8,

  img: {
    objectFit: 'cover',
  },
})

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  p: {
    color: '$gray300',
    fontSize: '$md',
  },

  strong: {
    marginTop: 4,
    fontSize: '$md',
    fontWeight: 700,
  },

  button: {
    // colar embaixo da sidebar
    marginTop: 'auto',
    width: 'max-content',
    background: 'none',
    color: '$green500',
    fontSize: '1rem',
    fontWeight: 700,

    border: 'none',
  },
})

export const CartFinalization = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  // os auto só funciona com display flex
  marginTop: 'auto',

  button: {
    width: '100%',
    background: '$green500',
    color: '$white',
    fontSize: '$md',
    height: '4.3125rem',

    border: 'none',
    borderRadius: 8,
    fontWeight: 700,

    '&:not(:disabled):hover': {
      background: '$green300',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
})

export const FinalizationDetails = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 55,

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    '&:last-child': {
      fontWeight: 'bold',

      span: {
        fontSize: '$md',
      },

      p: {
        color: '$gray100',
        fontSize: '$xl',
      },
    },
  },
})

export const CartButton = styled('button', {
  background: '$gray800',
  border: 0,
  borderRadius: 6,
  padding: '0.75rem',

  cursor: 'pointer',

  svg: {
    color: '$gray300',
    width: '1.5rem',
    height: '1.5rem',
  },

  '&:hover': {
    transition: '0.2s all',

    svg: {
      color: '$gray100',
    },
  },

  span: {
    margin: '-1.25rem 0 0 1.5rem',

    position: 'absolute',
    borderRadius: 1000,

    background: '$green500',
    border: '3px solid',
    borderColor: '$gray900',

    color: '$white',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    width: 24,
    height: 24,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
