import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, createContext, useContext, useState } from 'react'
import useAddItemToBasket from '../hooks/useAddItemToBasket'
import useRemoveItemFromBasket from '../hooks/useRemoveItemFromBasket'
import { Basket } from '../types/basket'

interface StoreContextValue {
  basket: Basket | null
  setBasket: (basket: Basket) => void
  addToBasket: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void 
  removeItem: (productId: string, quantity: number) => void
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
)

// eslint-disable-next-line react-refresh/only-export-components
export const useStoreContext = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw Error('Oops - we do not seem to be inside the provider')
  }

  return context
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreProvider = ({ children }: PropsWithChildren<any>) => {
  const [basket, setBasket] = useState<Basket | null>(null)
  const addItemToBasketMutation = useAddItemToBasket()
  const removeItemFromBasket = useRemoveItemFromBasket()

  const addToBasket = async (productId: string) => {
    try {
      const result = await addItemToBasketMutation.mutateAsync({
        productId,
        quantity: 1,
      })

      if (result) {
        setBasket(result)
      } else {
        console.error('Error adding item to basket. Empty or invalid response.')
      }
    } catch (error) {
      console.error('Error adding item to basket:', error)
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    setBasket((prevBasket) => {
      if (!prevBasket) return prevBasket

      const updatedItems = prevBasket.items.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity }
        }
        return item
      })

      return { ...prevBasket, items: updatedItems }
    })
  }

  const removeItem = async (
    productId: string,
    quantity: number | undefined
  ) => {
    try {
      await removeItemFromBasket.mutateAsync({
        productId,
        quantity: quantity || 1,
      })

      setBasket((prevBasket) => {
        if (!prevBasket) {
          return prevBasket
        }

        const updatedItems = prevBasket.items
          .map((item) => {
            if (item.productId === productId) {
              const updatedQuantity = Math.max(
                0,
                item.quantity - (quantity || 1)
              )
              return { ...item, quantity: updatedQuantity }
            }
            return item
          })
          .filter((item) => item.quantity > 0)

        return { ...prevBasket, items: updatedItems }
      })
    } catch (error) {
      console.error('Error removing item from basket:', error)
    }
  }

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider
        value={{ basket, setBasket, addToBasket, updateQuantity, removeItem }}>
        {children}
      </StoreContext.Provider>
    </QueryClientProvider>
  )
}

export default StoreProvider
