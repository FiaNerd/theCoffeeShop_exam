import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Basket } from '../../types/Basket.types';
import { addItemToBasket, removeItemFromBasket } from '../../services/CoffeeAPI';

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
      console.log('Thunk is executing');
      try {
        return await addItemToBasket(productId, quantity);
      } catch (error) {
        console.error('Async operation failed. Error:', error);
        throw error;
      }
    }
  );


  export const removeItemFromBasketAsync = createAsyncThunk<void, { productId: string, quantity: number }>(
    'basket/removeItemFromBasketAsync',
    async ({ productId, quantity }) => {
      console.log('Thunk is executing');
      try {
        await removeItemFromBasket(productId, quantity);
      } catch (error) {
        console.error('Async operation failed. Error:', error);
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
        },
        extraReducers: (builder) => {
          builder
            .addCase(addBasketItemAsync.pending, (state, action) => {
              state.requestStatus = 'pendingAddItem' + action.meta.arg.productId;
            })
            .addCase(addBasketItemAsync.fulfilled, (state, action) => {
              state.basket = action.payload;
              state.requestStatus = 'idle';
            })
            .addCase(addBasketItemAsync.rejected, (state) => {
              state.requestStatus = 'idle';
            })
            .addCase(removeItemFromBasketAsync.pending, (state, action) => {
              state.requestStatus = 'pendingRemoveItem' + action.meta.arg.productId;
            })
            .addCase(removeItemFromBasketAsync.fulfilled, (state, action) => {
              const { productId, quantity } = action.meta.arg;
              
              const itemIndex = state.basket?.items.findIndex(item => item.productId === productId);
      
              if (itemIndex === -1 || itemIndex === undefined) {
                return;
              }

              state.basket!.items[itemIndex].quantity -= quantity;
      
              if (state.basket?.items[itemIndex].quantity === 0) {
                state.basket.items.splice(itemIndex, 1);
              }
      
              state.requestStatus = 'idle';
            })
            .addCase(removeItemFromBasketAsync.rejected, (state, action) => {
              console.error('Error removing item:', action.error);
              state.requestStatus = 'idle';
            });
        },
      });
      

export const { setBasket } = basketSlice.actions;
