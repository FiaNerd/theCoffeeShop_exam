import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBasket } from '../services/CoffeeAPI'
import { Baskets } from '../types/Basket.types'

interface CreateBasketParams {
  productId: string
  quantity: number
}

export const useCreateBasket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateBasketParams) =>
      createBasket(params.productId, params.quantity),
    onSuccess: (addBasket) => {
      console.log('onSuccess, addBasket:', addBasket)
      queryClient.setQueryData<Baskets>(
        ['basket'],
        (prevBasket: Baskets | undefined) => {
          return [...(prevBasket ?? []), addBasket]
        }
      )
    },
  })
}
