import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, } from '../../redux/configureStore'
import { Product } from '../../types/products'
import { formatPrice } from '../../utils/formatPrice'
import { addBasketItemAsync } from '../basket/basketSlice'
import Button from '../partial/Button'

interface IProps {
  product: Product
}

const CoffeeCard = ({ product }: IProps) => {
  const { type } = useParams()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(state => state.basket)


  const limitDescription = (text: string | undefined, wordLimit = 10) => {
    if (!text) {
      return '';
    }
  
    const words = text.split(' ');
    const truncatedText = words.slice(0, wordLimit).join(' ') + '...';
    return truncatedText;
  };
  

  return (
    <div className='relative flex flex-col rounded-xl bg-white bg-clip-border overflow-hidden shadow-md'>
      <img
        src={`${product.imageUrl}`}
        className='w-full object-cover'
        alt={product.name}
      />
      <div className='p-6 flex flex-col justify-between flex-1'>
        <div>
          <h3 className='text-sub-title font-bold mb-2'>{product.name}</h3>
          {product.type && Array.isArray(product.type) && (
            <p className='font-bold mb-2'>{product.type.join(', ')}</p>
          )}
          <p className='font-bold mb-2'>{product.roastLevel}</p>
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
            disabled={status === 'pendingAddItem' + product.id}
            isLoading={status === 'pendingAddItem' + product.id}
            onClick={() => {
              dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }));
            }}
          >
            Lägg till
          </Button>

            <div className='w-full'>
              <Link to={`/produkt/${type}/${product.id}`}>
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
