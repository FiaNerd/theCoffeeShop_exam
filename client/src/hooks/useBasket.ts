import { useQuery } from '@tanstack/react-query'
import * as CoffeeProducts from '../services/CoffeeAPI'

const useBaskets = () => {
  return useQuery({
    queryKey: ['GetBasket'],
    queryFn: () => CoffeeProducts.getBasket(),
  })
}

export default useBaskets
