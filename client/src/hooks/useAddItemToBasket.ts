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
        ['addBasket'],
        (prevBasket: Basket | undefined) => {
          if (!prevBasket) {
            return { ...rest, basketId, items: [] }
          }

          const updatedItems = [...prevBasket.items, ...rest.items]
          console.log(updatedItems)

          return {
            ...rest,
            basketId,
            items: updatedItems,
          }
        }
      )
    },
    onError: (error) => {
      console.error('Mutation error:', error)
    },
  })
}

export default useAddItemToBasket
