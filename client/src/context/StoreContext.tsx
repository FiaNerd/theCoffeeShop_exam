import { ReactNode, useState } from 'react'
import { Basket } from '../types/Basket.types'
import { StoreContext } from './storeContext'

type BasketProviderProps = {
  children: ReactNode
}

export const StoreProvider = ({ children }: BasketProviderProps) => {
  const [basket, setBasket] = useState<Basket | null>(null)

  function removeItemFromCart(productId: string, quantity: number) {
    if (!basket) return

    const updateBasket = [...basket.items]

    const itemIndex = updateBasket.findIndex((i) => i.productId === productId)
    if (itemIndex >= 0) {
      updateBasket[itemIndex].quantity -= quantity

      if (updateBasket[itemIndex].quantity === 0)
        updateBasket.splice(itemIndex, 1)
      setBasket((prevState) => {
        return { ...prevState!, updateBasket }
      })
    }
  }

  return (
    <StoreContext.Provider value={{ basket, setBasket, removeItemFromCart }}>
      {children}
    </StoreContext.Provider>
  )
}
