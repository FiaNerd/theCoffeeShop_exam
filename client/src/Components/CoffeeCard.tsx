import { Link, useParams } from 'react-router-dom'
import { Product } from '../types/ProductsAPI.types'
import Button from './Partial/Button'
import { formatPrice } from '../utils/formatPrice'
import { useAppDispatch,  } from '../redux/configureStore'
import useAddItemToBasket from '../hooks/useAddItemToBasket'
import { setBasket } from './basket/basketSlice'

interface IProps {
  product: Product
}

const CoffeeCard = ({ product }: IProps) => {
  const { type } = useParams()
  // const { addToBasket } = useStoreContext()
  const addItemToBasketMutation = useAddItemToBasket()
  const dispatch = useAppDispatch()


  const handleAddItem = async (productId: string) => {

    console.log('Adding item to basket:', productId)
    try {
      const result = await addItemToBasketMutation.mutateAsync({
        productId,
        quantity: 1,
      })

      if (result) {
        dispatch(setBasket(result))
      } else {
        console.error('Error adding item to basket. Empty or invalid response.')
      }
    } catch (error) {
      console.error('Error adding item to basket:', error)
    }
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
    <div className='relative flex flex-col rounded-xl bg-white bg-clip-border overflow-hidden shadow-md'>
      <img
        src={`http://localhost:5173/src/assets${product.imageUrl}`}
        className='w-full object-cover'
        alt={product.name}
      />
      <div className='p-6 flex flex-col justify-between flex-1'>
        <div>
          <h3 className='text-sub-title font-bold mb-2'>{product.name}</h3>
          {product.type && Array.isArray(product.type) && (
            <p className='font-bold mb-2'>Typ: {product.type.join(' ')}</p>
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
              onClick={() => handleAddItem(product.productId)}>
              Lägg till
            </Button>

            <div className='w-full'>
              <Link to={`/products/${type}/${product.productId}`}>
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
