import { Link, useParams } from 'react-router-dom'
import { Product } from '../types/ProductsAPI.types'

interface IProps {
  product: Product
}

const CoffeeCard = ({ product }: IProps) => {
  const { type } = useParams()

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
            {(product.price / 100).toFixed(2)} SEK
          </p>

          <div className='flex flex-col w-full justify-between items-center mt-4 sm:mt-0'>
            <button className='flex items-center justify-center gap-4 bg-orange mb-4 w-full py-3 rounded  hover:opacity-80'>
              <svg width='22' height='20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z'
                  fill='white'
                />
              </svg>
              <span className='text-white font-bold uppercase'>Lägg till</span>
            </button>

            <div className='w-full'>
              <Link to={`/product/${type}/${product.productId}`}>
                <button className='text-center border-2 w-full text-dark-deep-brown font-bold uppercase border-orange py-3 rounded hover:opacity-80'>
                  Läs mer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoffeeCard
