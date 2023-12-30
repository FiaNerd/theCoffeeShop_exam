import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { Basket } from '../types/Basket.types'
import useAddItemToBasket from '../hooks/useAddItemToBasket'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // Importera QueryClient och QueryClientProvider

interface StoreContextValue {
  basket: Basket | null
  setBasket: (basket: Basket) => void
  addToBasket: (productId: string) => void
  updateQuantity: (productId: string, newQuantity: number) => void // Add this line
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

  const addToBasket = async (productId: string) => {
    console.log('Adding item to basket:', productId)
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

  const removeItem = (productId: string, quantity: number) => {
    if (!basket) return

    const items = [...basket.items]

    const itemIndex = items.findIndex((i) => i.productId === productId)
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1)
      setBasket((prevState) => {
        return { ...prevState!, items }
      })
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
