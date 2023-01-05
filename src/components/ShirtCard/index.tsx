import Image from 'next/image'
import camiseta from '../../assets/camisetas/1.png'
import { ImageContainer, ShirtCardContainer, TextWrapper } from './styles'

export const ShirtCard = () => {
  return (
    <ShirtCardContainer>
      <ImageContainer>
        <Image width={120} height={90} src={camiseta} alt="" />
      </ImageContainer>
      <TextWrapper>
        <div>
          <span>Camiseta Beyond the Limits</span>
          <strong>R$ 79,90</strong>
        </div>
        <button>Remover</button>
      </TextWrapper>
    </ShirtCardContainer>
  )
}
