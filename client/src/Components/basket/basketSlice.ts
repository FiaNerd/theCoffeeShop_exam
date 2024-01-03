import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Basket } from '../../types/Basket.types';
import { addItemToBasket } from '../../services/CoffeeAPI';

interface BasketState {
    basket: Basket | null
    requestStatus: string
}

const initialState: BasketState = {
    basket: null,
    requestStatus: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: string; quantity?: number }>(
    '/basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }) => {
  
      try {
        return addItemToBasket(productId, quantity);
        
      } catch (error) {
        console.error('Error adding item to basket:', error);
        throw error;
      }
    }
  );
  

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
  extraReducers: (builder => {
      builder.addCase(addBasketItemAsync.pending, (state, action) => {
          console.log("Action", action)
          state.requestStatus = 'pendingAddItem'
      })
      builder.addCase(addBasketItemAsync.fulfilled, (state,action)=> {
        state.basket = action.payload
        state.requestStatus = 'idle'
      })
      builder.addCase(addBasketItemAsync.rejected, (state)=> {
        state.requestStatus = 'idle'
      })
  })
});

export const { setBasket, removeItem, updateQuantityInBasket } = basketSlice.actions;
