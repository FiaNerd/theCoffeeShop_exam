import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addItemToBasket } from '../services/CoffeeAPI'
import { Basket } from '../types/Basket.types'

interface CreateBasketParams {
  productId: string
  quantity: number
}

 const useAddItemToBasket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateBasketParams) =>
      addItemToBasket(params.productId, params.quantity),
    onSuccess: (addBasket) => {
      console.log('onSuccess, addBasket:', addBasket)

      const { basketId, ...rest } = addBasket

      queryClient.setQueryData<Basket>(
        ['basket'],
        (prevBasket: Basket | undefined) => {
          return {
            ...rest,
            basketId,
            items: [...(prevBasket?.items ?? [])],
          }
        }
      )
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(`There was an error ${error.message}`)
    },
  })
}

export default useAddItemToBasket