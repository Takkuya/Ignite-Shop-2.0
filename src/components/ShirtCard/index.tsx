import Image from 'next/image'
import { CartItems } from '../../contexts/CartContext'
import { ImageContainer, ShirtCardContainer, TextWrapper } from './styles'

type ShirtCardProps = {
  product: CartItems
}

export const ShirtCard = ({ product }: ShirtCardProps) => {
  return (
    <ShirtCardContainer>
      <ImageContainer>
        <Image width={120} height={90} src={product.imageUrl} alt="" />
      </ImageContainer>
      <TextWrapper>
        <div>
          <span>{product.name}</span>
          <strong>{product.price}</strong>
        </div>
        <button>Remover</button>
      </TextWrapper>
    </ShirtCardContainer>
  )
}
