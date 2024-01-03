import { useNavigate, useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
import Button from '../components/Partial/Button'
import { formatPrice } from '../utils/formatPrice'
import { useAppDispatch, useAppSelector } from '../redux/configureStore'
import { addBasketItemAsync, removeItemFromBasketAsync } from '../components/basket/basketSlice'
import PageNotFound from '../components/Partial/PageNotFound'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { data: product, isLoading } = useProduct(productId!)
  const dispatch = useAppDispatch()
  const { basket } = useAppSelector(state => state.basket)
  
  const item = basket?.items.find(
    (item) => item.productId === product?.productId
    )


    if (!product) {
      return <PageNotFound />
    }
  

  return isLoading || !product ? (
    <p className={`text-2xl font-bold ${isLoading ? 'hidden' : ''}`}>
      {isLoading ? 'Laddar...' : 'Ingen produkt hittades'}
    </p>
  ) : (
    <>
      <div className='w-full flex flex-col md:flex-row mx-auto gap-6 max-w-[960px]'>
        <img
          src={`http://localhost:5173/src/assets/${product.imageUrl}`}
          className='w-full object-cover mb-4 md:w-1/2 md:mb-0'
          alt={product.name}
        />

        <div className='w-full md:w-1/2 md:ml-4'>
          <p className='text-orange font-bold text-sm text-center uppercase'>
            {product.type.join(' ')}
          </p>
          <h1 className='text-5xl mt-4 max-sm:text-3xl text-center uppercase mb-2'>
            {product.name}
          </h1>
          <h2 className='text-center mb-4'>{product.blendDescription}</h2>

          <div className='flex items-center justify-center flex-col'>
            <p className='mb-8 border-b-[1px] border-orange pb-4 text-center uppercase font-bold w-1/2'>
              {product.roastLevel}
            </p>
          </div>

          <div className='flex flex-col justify-between flex-1 space-between'>
            <div className='flex flex-col flex-grow justify-between'>
              <p className='mb-8'>{product.description}</p>
            </div>

            <div className='flex flex-col justify-end gap-4 mt-auto'>
              <p className='font-bold text-4xl self-end flex-shrink-0'>
                {formatPrice(product.price)}
              </p>

              <div className='flex flex-row flex-1 items-end text-sm'> 
                <div className='flex flex-row h-auto w-full mb-4 rounded-lg justify-between relative bg-transparent mt-1'>
                  <div className='flex flex-row w-20 md:w-32'>
                    <button
                      className='disabled:opacity-75 bg-deep-red text-white w-20 hover:opacity-80 h-full rounded-l cursor-pointer outline-none'
                      onClick={() => dispatch(removeItemFromBasketAsync({ productId: product.productId, quantity: 1}))}
                      disabled={
                        item?.quantity === 0 || item?.quantity === undefined
                      }>
                      <span className='m-auto text-2xl font-thin'>−</span>
                    </button>

                    <div className='justify-center focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none'
                        >
                      {item?.quantity ?? 0}
                    </div>

                    <button
                      data-action='increment'
                      className='bg-deep-red text-white w-20 hover:opacity-80 rounded-r cursor-pointer'
                      onClick={() => dispatch(addBasketItemAsync({ productId: product.productId, quantity: 1 }))}
                      >
                      <span className='m-auto text-2xl font-thin'>+</span>
                    </button>
                  </div>
                </div>
              </div>

              <Button
                buttonType='create'
                typeAction='submit'
                iconType='cart'
                className='w-full'
                onClick={() => dispatch(addBasketItemAsync({ productId: product.productId, quantity: 1 }))}
                >
                Lägg till
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full md:w-1/2 md:ml-4 flex flex-row gap-2 hover:text-orange'>
        <Button
          buttonType='back'
          typeAction='button'
          iconType='arrow'
          onClick={() => navigate(-1)}
          className='mt-4 hover:text-orange'>
          Tillbaka
        </Button>
      </div>
    </>
  )
}

export default ProductDetailPage
