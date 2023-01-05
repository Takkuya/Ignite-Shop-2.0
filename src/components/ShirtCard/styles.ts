import { styled } from '../../styles'

export const ShirtCardContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',

  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 90,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const TextWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'flex-start',

  div: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  span: {
    fontSize: '$md',
    color: '$gray300',
  },

  button: {
    background: 'transparent',
    border: 0,
    color: '$green500',
    fontWeight: 'bold',
    fontSize: '$md',

    cursor: 'pointer',

    '&:hover': {
      transition: '0.2s all',
      color: '$green300',
    },
  },
})
