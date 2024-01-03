import { useEffect } from 'react'
import useProducts from '../hooks/useProducts'
import { useInView } from 'react-intersection-observer'
import { useParams } from 'react-router-dom'
import Button from '../components/partial/Button'
import CoffeeCard from '../components/product/CoffeeCard'

const HomePage = () => {
  const { type } = useParams()
  const { inView } = useInView()

  const {
    data: coffeeProducts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
  } = useProducts(type || '')

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    if (!isLoading && !hasNextPage) {
      console.log('Fetching next page after 5 seconds...')
      setTimeout(() => {
        if (!isLoading && !hasNextPage) {
          fetchNextPage()
        }
      }, 5000)
    }
  }, [isLoading, hasNextPage, fetchNextPage])

  if (isLoading) {
    return <p>Loading...</p>
  }

  console.log('coffeeProducts:', coffeeProducts)

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
          coffeeProducts.pages.length > 0 &&
          coffeeProducts.pages
            .map((page) => page.items)
            .flat()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((product: any) => (
              <CoffeeCard key={product.id} product={product} />
            ))}
      </div>

      {hasNextPage && (
        <div className='flex mx-auto justify-center'>
          <Button
            buttonType='load-more'
            typeAction={'button'}
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Laddar...' : 'Ladda fler'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default HomePage
