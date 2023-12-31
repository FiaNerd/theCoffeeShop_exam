import { useParams } from 'react-router-dom'
import CoffeeCard from '../components/CoffeeCard'
import useProducts from '../hooks/useProducts'
import PageNotFound from '../components/Partial/PageNotFound'
import Button from '../components/Partial/Button'

interface IProps {
  page: number
  pageSize: number
}

const ProductPage = ({ page, pageSize }: IProps) => {
  const {
    data: coffeeProducts,
    isLoading,
    isError,
  } = useProducts(page, pageSize)
  const { type } = useParams()

  if (isError) {
    return <PageNotFound />
  }

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

  return (
    <div>
      {filteredProducts!.length > 0 && (
        <h1 className='text-dark-deep-brown mb-4 uppercase'>{type}</h1>
      )}

      {filteredProducts!.length > 0 ? (
        <>
          <div className='grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-dark-deep-brown'>
            {filteredProducts?.map((product) => (
              <CoffeeCard key={product.productId} product={product} />
            ))}
          </div>
          <div className='flex mx-auto'>
            <Button buttonType='load-more' typeAction={'button'}>
              Ladda fler
            </Button>
          </div>
        </>
      ) : (
        type && (
          <p className={`text-2xl font-bold ${isLoading ? 'hidden' : ''}`}>
            Inga produkter hittades
          </p>
        )
      )}
    </div>
  )
}

export default ProductPage
