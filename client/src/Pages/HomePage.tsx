import { useEffect } from 'react'
import Button from '../components/partial/Button'
import CoffeeCard from '../components/product/CoffeeCard'
import { fetchFilters, fetchProductsAsync, productSelectors } from '../components/product/productSlice'
import { useAppDispatch, useAppSelector } from '../redux/configureStore'

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
    <div className='flex-1 container max-w-[1280px] mx-auto mb-4 mt-8'>
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

      <div className='flex mx-auto justify-center mb-8'>
          <Button
            buttonType='load-more'
            typeAction={'button'}
            onClick={() => console.log("Click")}>
              Ladda fler
          </Button>
        </div>
    </div>
  )
}

export default HomePage



