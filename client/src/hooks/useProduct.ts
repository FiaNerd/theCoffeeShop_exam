import { useQuery } from '@tanstack/react-query'
import * as CoffeeProduct from '../services/CoffeeAPI'

const useProduct = (guid: string) => {
	return useQuery({
    queryKey: ['Single product', guid],
    queryFn: () => CoffeeProduct.getProduct(guid),
  })
}

export default useProduct
