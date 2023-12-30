import { useNavigate, useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
import Button from '../components/Partial/Button'
import { useStoreContext } from '../context/StoreProvider'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const { data: product, isLoading } = useProduct(productId!)

  const navigate = useNavigate()

  const { basket, addToBasket, updateQuantity, removeItem } = useStoreContext()

  const item = basket?.items.find(
    (item) => item.productId === product?.productId
  )

  const handleAddItem = (productId: string) => {
    addToBasket(productId)
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity)
  }

  const handleRemoveItem = (productId: string) => {
    const item = basket?.items.find((item) => item.productId === productId)

    if (item && item.quantity > 0) {
      removeItem(productId, 1)
    }
  }

  if (!productId) {
    return <p className='text-2xl font-bold'>Ogiltigt produkt-ID</p>
  }

  return isLoading || !product ? (
    <p className={`text-2xl font-bold ${isLoading ? 'hidden' : ''}`}>
      {isLoading ? 'Laddar...' : 'Ingen produkt hittades'}
    </p>
  ) : (
    <>
      <div className='w-full flex flex-col md:flex-row mx-auto gap-6 mt-[10em] max-w-[960px]'>
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
                {(product.price / 100).toFixed(2)} SEK
              </p>

              <div className='flex items-center w-full gap-5 flex-row sm:justify-between'>
                <div className='flex items-center h-full justify-between p-3 rounded-lg w-36'>
                  <button
                    className='bg-deep-red text-white w-20 hover:opacity-80 h-full rounded-l cursor-pointer outline-none'
                    onClick={() => handleRemoveItem(product.productId)}>
                    <span className='m-auto text-2xl font-thin'>−</span>
                  </button>
                  <input
                    type='number'
                    className='focus:outline-none h-full text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"'
                    value={item?.quantity ?? 0}
                    onChange={(e) =>
                      handleQuantityChange(
                        product.productId,
                        parseInt(e.target.value, 10)
                      )
                    }
                  />

                  <button
                    data-action='increment'
                    className='bg-deep-red text-white w-20 hover:opacity-80 rounded-r cursor-pointer'
                    onClick={() => handleAddItem(product.productId)}>
                    <span className='m-auto text-2xl font-thin'>+</span>
                  </button>
                </div>

                <Button
                  buttonType='create'
                  typeAction='submit'
                  iconType='cart'
                  className='w-full'
                  onClick={() => handleAddItem(product.productId)}>
                  Lägg till
                </Button>
              </div>
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
