import { useQuery } from '@tanstack/react-query'
import * as CoffeeProducts from '../services/CoffeeAPI'

const useBasket = () => {
  return useQuery({
    queryKey: ['GetBasket'],
    queryFn: () => CoffeeProducts.getBasket(),
  })
}

export default useBasket
