import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeItemFromBasket } from '../services/CoffeeAPI'

interface RemoveBasketParams {
  productId: string
  quantity: number
}

const useRemoveItemFromBasket = () => {
  const queryClient = useQueryClient()

  return(
    useMutation({
      mutationFn: (params: RemoveBasketParams) =>
      removeItemFromBasket(params.productId, params.quantity),
      onSuccess: (removeItem) => {
        queryClient.removeQueries()
      }
    },
    )
  )
}

export default useRemoveItemFromBasket
