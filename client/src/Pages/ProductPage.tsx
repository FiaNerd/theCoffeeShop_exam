import { useParams } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import CoffeeCard from '../components/product/CoffeeCard'

const ProductPage = () => {
  const { data: coffeeProducts } = useProducts()
  const { type } = useParams()

  console.log("Type", type)

  const trimmedType = type ?? ''

  const filterProducts = () => {
    return coffeeProducts?.filter((product) => {
      const productTypes = product.type.map((productType) =>
        productType.toLowerCase().trim()
      )

      return productTypes.some((productType) =>
        trimmedType.toLowerCase().includes(productType)
      )
    })
  }

  const filteredProducts = coffeeProducts ? filterProducts() : []

  if (!coffeeProducts) {
    return
  }

  return (
    <div>
      <h1 className='text-dark-deep-brown mb-4 uppercase'>{type}</h1>
  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CoffeeCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
  
}

export default ProductPage
