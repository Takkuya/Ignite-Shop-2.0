import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  gap: '0.5rem',

  '@media (min-width: 768px)': {
    gap: '1rem',
  },
})

export const Header = styled('header', {
  padding: '2rem 1rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

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

  '@media (min-width: 768px)': {
    padding: '2rem 0',
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
})
