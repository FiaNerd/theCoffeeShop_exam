import { useEffect, useState } from 'react';
import CoffeeCard from '../components/CoffeeCard'
import Button from '../components/Partial/Button'
import useProducts from '../hooks/useProducts'


const HomePage = () => {
  const [page, setPage] = useState(1)
  const pageSize = 8


  const { 
    data: coffeeProducts, 
    isLoading, 
     fetchNextPage,
    hasNextPage,
    isFetchingNextPage 
  } = useProducts(page)


  // useEffect(() => {
  //   const onScroll = (event) => {

  //   } 
  //   document.addEventListener("scroll", onScroll)

  //   return () => (
  //     document.removeEventListner("scroll", onScroll)
  //   )
  // },[])

  return (
    <div>
      <h1
        className={`text-dark-deep-brown mb-4 to uppercase ${
          isLoading ? 'hidden' : ''
        }`}>
        Vårt kaffe
      </h1>

      <div className='grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
        {coffeeProducts &&
          coffeeProducts.map((product) => (
            <CoffeeCard key={product.productId} product={product} />
          ))}
      </div>
      <div className='flex mx-auto'>
        <Button buttonType='load-more' typeAction={'button'}>
          Ladda fler
        </Button>
      </div>
    </div>
  )
}

export default HomePage
