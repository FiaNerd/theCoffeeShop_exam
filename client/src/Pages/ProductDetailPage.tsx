import { useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const { data: product } = useProduct(productId!)

  if (!product) {
    return
  }

  console.log(product.name)

  return (
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
                <svg
                  width='22'
                  height='20'
                  xmlns='http://www.w3.org/2000/svg'></svg>
                <span className='text-white font-bold'>Lägg till</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
