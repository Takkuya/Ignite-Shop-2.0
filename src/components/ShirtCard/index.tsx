import Image from 'next/image'
import { useContext } from 'react'
import { CartContext, ProductType } from '../../contexts/CartContext'
import { ImageContainer, ShirtCardContainer, TextWrapper } from './styles'

type ShirtCardProps = {
  product: ProductType
}

export const ShirtCard = ({ product }: ShirtCardProps) => {
  const { removeItemFromCart } = useContext(CartContext)

  function handleRemoveItemFromCart() {
    removeItemFromCart(product.id)
  }

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
        <button onClick={handleRemoveItemFromCart}>Remover</button>
      </TextWrapper>
    </ShirtCardContainer>
  )
}
