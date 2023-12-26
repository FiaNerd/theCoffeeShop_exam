import { useQuery } from '@tanstack/react-query'
import * as CoffeeProducts from '../services/CoffeeAPI'

const useBaskets = () => {
  return useQuery({
    queryKey: ['All baskets'],
    queryFn: () => CoffeeProducts.getBaskets(),
  })
}

export default useBaskets
