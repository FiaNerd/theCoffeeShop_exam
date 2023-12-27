import { createContext } from 'react';
import { Basket } from '../types/Basket.types';

export interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItemFromCart: (productId: string, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(
  undefined
);
