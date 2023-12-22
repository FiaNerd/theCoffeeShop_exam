import { Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'

const CoffeeCard = () => {
  const { data: coffeeProducts } = useProducts()

  if (!coffeeProducts) {
    return null
  }

  const limitDescription = (text: string, sentenceLimit = 1) => {
    const sentences = text.split('.') //
    const truncatedText = sentences.slice(0, sentenceLimit).join('.') + '...'
    return truncatedText
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
      {coffeeProducts.map((product) => (
        <div
          key={product.productId}
          className='relative flex flex-col rounded-xl bg-white bg-clip-border overflow-hidden shadow-md'>
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

            <div className='flex flex-col'>
              <p className='flex text-xl font-bold mb-2 justify-end'>
                {(product.price / 100).toFixed(2)} SEK
              </p>
              <div className='flex justify-between items-center'>
                <Link to={`/product/${product.productId}`}>
                  <button
                    className='font-heading text-white bg-orange text-bold text-2xl text-center rounded cursor-pointer border-orange border-2 hover:border-2  hover:border-deep-brown hover:text-deep-brown uppercase hover:bg-opacity-80 px-4 py-1'
                    type='submit'>
                    Läs mer
                  </button>
                </Link>
                <button
                  className='font-heading text-white text-bold text-2xl text-center rounded cursor-pointer border-deep-brown border-2 bg-deep-brown hover:border-2 hover:border-deep-brown hover:bg-deep-brown hover:text-white uppercase hover:bg-opacity-80  px-4 py-1'
                  type='submit'>
                  Lägg till
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoffeeCard
