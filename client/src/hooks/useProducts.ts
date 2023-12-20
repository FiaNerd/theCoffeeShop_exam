import { useQuery } from '@tanstack/react-query'
import * as CoffeeProducts from '../services/CoffeeAPI'

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => CoffeeProducts.getProducts(),
  })
}

export default useProducts
