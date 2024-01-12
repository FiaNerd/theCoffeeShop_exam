import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CoffeeCard from '../../components/product/CoffeeCard'
import { fetchProductsAsync, productSelectors } from '../../components/product/productSlice'
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'

const ProductTypePage = () => {
  const { type } = useParams()
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(!productsLoaded){
      dispatch(fetchProductsAsync())
    }
  },[dispatch, productsLoaded])

  const trimmedType = type ?? ''

  const filterProducts = () => {
    return products?.filter((products) => {
      const productTypes = products.type.map((productType) =>
        productType.toLowerCase().trim()
      )

      return productTypes.some((productType) =>
        trimmedType.toLowerCase().includes(productType)
      )
    })
  }

  const filteredProducts = products ? filterProducts() : []

  if (!products) {
    return
  }

  return (
    <div className='px-4  container max-w-[1280px] mx-auto mb-4 mt-8'>
      <h1 className='text-dark-deep-brown mb-4 uppercase '>{type}</h1>
  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown mb-8'>
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <CoffeeCard key={product.id!} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
  
}

export default ProductTypePage