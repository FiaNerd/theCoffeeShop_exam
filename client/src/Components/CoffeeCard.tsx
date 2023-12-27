import { Link, useParams } from 'react-router-dom'
import { Product } from '../types/ProductsAPI.types'
import Button from './Partial/Button'
import { useAddItemToBasket } from '../hooks/useAddItemToBasket'
import formatPrice from '../utils/formatPrice'

interface IProps {
  product: Product
}

const CoffeeCard = ({ product }: IProps) => {
  const { type } = useParams()
  const createBasketMutation = useAddItemToBasket()

  const handleAddItem = async (productId: string) => {
    await createBasketMutation.mutateAsync({ productId, quantity: 1 })

    const basketId = createBasketMutation.data?.basketId
    console.log('basketId', basketId, createBasketMutation.data?.buyerId)
  }

  const limitDescription = (text: string, sentenceLimit = 1) => {
    const sentences = text.split('.')
    const truncatedText = sentences.slice(0, sentenceLimit).join('.') + '...'
    return truncatedText
  }

  return (
    <div className='relative flex flex-col rounded-xl bg-white bg-clip-border overflow-hidden shadow-md'>
      <img
        src={`http://localhost:5173/src/assets/${product.imageUrl}`}
        className='w-full object-cover'
        alt={product.name}
      />
      <div className='p-6 flex flex-col justify-between flex-1'>
        <div>
          <h3 className='text-sub-title font-bold mb-2'>{product.name}</h3>
          <p className='font-bold mb-2'>Typ: {product.type.join(' ')}</p>
          <p className='font-bold mb-2'>Sort: {product.roastLevel}</p>
          <p className='text-paragraph mb-4'>
            {limitDescription(product.description)}
          </p>
        </div>

        <div className='flex flex-col justify-between items-center w-full'>
          <p className='flex text-xl font-bold mb-2 self-end'>
            {formatPrice(product.price)}
          </p>

          <div className='flex flex-col w-full justify-between items-center mt-4 sm:mt-0'>
            <Button
              buttonType='create'
              typeAction='submit'
              iconType='cart'
              className='w-full mb-4'
              onClick={() => handleAddItem(product.productId)}>
              Lägg till
            </Button>

            <div className='w-full'>
              <Link to={`/product/${type}/${product.productId}`}>
                <Button buttonType='read-more' typeAction='button'>
                  Läs mer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoffeeCard
