import { useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'
// import PageNotFound from '../components/Partial/PageNotFound'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const { data: product, isLoading } = useProduct(productId!)

  if (!productId) {
    return <p className='text-2xl font-bold'>Ogiltigt produkt-ID</p>
  }

  return isLoading || !product ? (
    <p className={`text-2xl font-bold ${isLoading ? 'hidden' : ''}`}>
      {isLoading ? 'Laddar...' : 'Ingen produkt hittades'}
    </p>
  ) : (
    <div className='w-full flex flex-col md:flex-row gap-6'>
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

        <div
          className='flex flex-col justify-between flex-1 space-between'
          style={{ height: '63%' }}>
          <div className='flex flex-col flex-grow justify-between'>
            <p className='mb-8'>{product.description}</p>
          </div>

          <div className='flex flex-col justify-end gap-4 mt-auto'>
            <p className='font-bold text-4xl self-end flex-shrink-0'>
              {(product.price / 100).toFixed(2)} SEK
            </p>

            <div className='flex items-center w-full gap-5 flex-col sm:flex-row sm:justify-between'>
              <div className='flex items-center justify-between p-3 rounded-lg w-36'>
                <img
                  src='images/icon-minus.svg'
                  alt=''
                  className='cursor-pointer'
                  width={18}
                />
                <div className='font-bold text-text-md'></div>
                <img
                  src='images/icon-plus.svg'
                  alt=''
                  className='cursor-pointer'
                  width={18}
                />
              </div>

              <button className='flex items-center justify-center gap-4 bg-orange w-60 py-3 rounded max-sm:w-full hover:opacity-80'>
                <svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
                    fill='white'
                  />
                </svg>
                <span className='text-white font-bold uppercase'>
                  Lägg till
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
