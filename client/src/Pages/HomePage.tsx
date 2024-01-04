import CoffeeCard from '../components/product/CoffeeCard'
import { useAppDispatch, useAppSelector } from '../redux/configureStore'
import {  fetchFilters, fetchProductsAsync, productSelectors } from '../components/product/productSlice'
import { useEffect } from 'react'

const HomePage = () => {
 
  const products = useAppSelector(productSelectors.selectAll)
  const { productsLoaded, filtersLoaded } = useAppSelector(state => state.product)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [dispatch, productsLoaded]);
  
  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFilters());
    }
  }, [dispatch, filtersLoaded]);
  
  return (
    <div>
      <h1
        className='text-dark-deep-brown mb-4 to uppercase'>
        Vårt kaffe
      </h1>

      <div className='grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
        {products &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            products.map((product: any) => (
              <CoffeeCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  )
}

export default HomePage



