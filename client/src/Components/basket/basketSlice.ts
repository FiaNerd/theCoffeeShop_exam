import { createSlice } from '@reduxjs/toolkit';
import { Basket } from '../../types/Basket.types';

interface BasketState {
    basket: Basket | null
}

const initialState: BasketState = {
    basket: null
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    removeItem: (state, action) => {
        const { productId, quantity } = action.payload
        const itemIndex = state.basket?.items.findIndex(item => item.productId === productId)

        if(itemIndex === -1 || itemIndex === undefined){
            return
        }

        state.basket!.items[itemIndex].quantity -= quantity

        if(state.basket?.items[itemIndex].quantity === 0){
            state.basket.items.splice(itemIndex, 1)
        }
    },
    updateQuantityInBasket: (state, action) => {
        const { productId, newQuantity } = action.payload;
        const itemIndex = state.basket?.items.findIndex(item => item.productId === productId);
    
        if (itemIndex !== -1 && itemIndex !== undefined) {
          state.basket!.items[itemIndex].quantity = newQuantity;
        }
      },
  },
 
});

export const { setBasket, removeItem, updateQuantityInBasket } = basketSlice.actions;
