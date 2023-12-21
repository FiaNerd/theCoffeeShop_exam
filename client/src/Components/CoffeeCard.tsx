import useProducts from '../hooks/useProducts'

const CoffeeCard = () => {
  const { data: coffeeProducts } = useProducts()

  if (!coffeeProducts) {
    return null
  }

  // Function to limit text to three sentences
  const limitDescription = (text: string, sentenceLimit = 1) => {
    const sentences = text.split('.') // Assuming sentences end with a period.
    const truncatedText = sentences.slice(0, sentenceLimit).join('.') + '...'
    return truncatedText
  }

  // const formatCurrency = (amount: number) => {
  //   return amount.toLocaleString('sv-SE', {
  //     style: 'currency',
  //     currency: 'SEK',
  //   })
  // }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-8 text-dark-deep-brown'>
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
              <p className='text-paragraph mb-4'>
                {limitDescription(product.description)}
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-heading font-bold'>
              {((product.price / 100).toFixed(2))} SEK
              </p>
              <button
                className='font-heading text-white text-bold text-2xl text-center border-2 border-white rounded-md cursor-pointer bg-deep-brown hover:bg-white hover:border-deep-brown hover:text-deep-brown uppercase hover:bg-opacity-80 focus:outline-none focus:ring focus:border-deep-red px-4 py-1'
                type='submit'>
                Lägg till
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CoffeeCard
