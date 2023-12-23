import CoffeeCard from '../components/CoffeeCard'
import useProducts from '../hooks/useProducts'

const HomePage = () => {
  const { data: coffeeProducts } = useProducts()


  return (
    <div className=''>
      <h1 className='text-dark-deep-brown mb-4 to uppercase '>Vårt kaffe</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
        {coffeeProducts &&
          coffeeProducts.map((product) => (
            <CoffeeCard key={product.productId} product={product} />
          ))}
      </div>
    </div>
  )
}

export default HomePage
