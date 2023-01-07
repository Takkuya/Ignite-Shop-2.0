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

  '@media (min-width: 768px)': {
    padding: '2rem 0',
  },
})
