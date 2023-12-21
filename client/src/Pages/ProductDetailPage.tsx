import { useParams } from 'react-router-dom'
import useProduct from '../hooks/useProduct'

const ProductDetailPage = () => {
  const { guid } = useParams()
  const { data: product } = useProduct(guid!)

  if (!product) {
    return
  }

  console.log(product.name)

  return <h1>{product.name}</h1>
}

export default ProductDetailPage
