import { Link, useParams } from 'react-router-dom'
import { Product } from '../types/ProductsAPI'
import Button from '../components/partial/Button'
import { formatPrice } from '../utils/formatPrice'
import { useStoreContext } from '../context/StoreProvider'

interface IProps {
  product: Product
}

const CoffeeCard = ({ product }: IProps) => {
  const { type } = useParams()
  const { addToBasket } = useStoreContext()

  const handleAddItem = (productId: string) => {
    addToBasket(productId)
  }

  const limitDescription = (text: string | undefined, sentenceLimit = 1) => {
    if (!text) {
      return ''
    }

    const sentences = text.split('.')
    const truncatedText = sentences.slice(0, sentenceLimit).join('.') + '...'
    return truncatedText
  }

  return (
    <div className='relative flex flex-col roundeds-xl bg-white bg-clip-border overflow-hidden shadow-md'>
      <img
        src={`${product.imageUrl}`}
        className='w-full object-cover'
        alt={product.name}
      />
      <div className='p-6 flex flex-col justify-between flex-1'>
        <div>
          <h3 className='text-sub-title font-bold mb-2'>{product.name}</h3>
          {product.types && Array.isArray(product.types) && (
            <p className='font-bold mb-2'>Typ: {product.types.join(' ')}</p>
          )}
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
              onClick={() => handleAddItem(product.id)}>
              Lägg till
            </Button>

            <div className='w-full'>
              <Link to={`/products/${type}/${product.id}`}>
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
