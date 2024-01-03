import { useParams } from 'react-router-dom'
import CoffeeCard from '../components/product/CoffeeCard'
import PageNotFound from '../components/partial/PageNotFound'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import useProducts from '../hooks/useProducts'
import Button from '../components/partial/Button'

const ProductPage = () => {
  const { type, productId } = useParams()
  const { inView } = useInView()

  const {
    data: coffeeProducts,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useProducts(type || '')

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isError) {
    return <PageNotFound />
  }

  const trimmedType = type ?? ''


  const filterProducts = () => {
    const allProducts =
      coffeeProducts?.pages?.flatMap((page) => page.items) ?? []


    const normalizedTrimmedType = trimmedType.toLowerCase().trim()

    const filteredProducts = allProducts.filter((product) => {
      const productTypes = product.type.map((productType: string) =>
        productType.toLowerCase().trim()
      )


        allProducts.map((product) => ({
          productId: product.productId,
          type: product.type,
        }))


      const normalizedProductTypes = productTypes.map((productType: string) =>
        productType.toLowerCase().trim()
      )

      const isTypeMatched = normalizedProductTypes.some((productType: string) =>
        productType.includes(normalizedTrimmedType)
      )

      const isProductIdMatched = productId
        ? String(product.productId) === productId
        : true

      return isTypeMatched && isProductIdMatched
    })

    console.log('Filtered Products:', filteredProducts.length)
    console.groupEnd()

    return filteredProducts
  }

  const filteredProducts = filterProducts()

  return (
    <>
      {filteredProducts.length > 0 && (
        <h1 className='text-dark-deep-brown mb-4 uppercase'>{trimmedType}</h1>
      )}

      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
          {filteredProducts.map((product) => (
            <CoffeeCard key={product.productId} product={product} />
          ))}
        </div>
      ) : (
        trimmedType && (
          <p className={`text-2xl font-bold ${isLoading ? 'hidden' : ''}`}>
            Inga produkter hittades
          </p>
        )
      )}

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
    </>
  )
}

export default ProductPage
