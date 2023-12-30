import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeItemFromBasket } from '../services/CoffeeAPI'
import { Basket } from '../types/Basket.types'

interface RemoveBasketParams {
  productId: string
  quantity: number
}

const useRemoveItemFromBasket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: RemoveBasketParams) =>
      removeItemFromBasket(params.productId, params.quantity),
    onSuccess: (removedItem) => {
      queryClient.setQueryData<Basket | null>(['basket'], (prevBasket) => {
        if (!prevBasket) {
          return prevBasket
        }

        const updatedBasket: Basket = {
          ...prevBasket,
          items: prevBasket.items.filter(
            (item) => item.productId !== removedItem.productId
          ),
        }

        return updatedBasket
      })
    },
  })
}

export default useRemoveItemFromBasket

// interface RemoveBasketParams {
//   productId: string
//   quantity: number
// }

// const useRemoveItemFromBasket = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (params: RemoveBasketParams) =>
//       removeItemFromBasket(params.productId, params.quantity),
//     onSuccess: (removeItem) => {
//       queryClient.setQueryData<Basket | null>(['basket'], (prevBasket) => {
//         if (!prevBasket) {
//           return prevBasket
//         }

//         const updatedBasket = {
//           ...prevBasket,
//           items: prevBasket.items.filter(
//             (item) => item.productId !== removeItem.productId
//           ),
//         }

//         return updatedBasket;
//       })
//     },
//   })
// }

// export default useRemoveItemFromBasket
