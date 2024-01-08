import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addItemToBasket, removeItemFromBasket } from '../../services/CoffeeAPI';
import { Basket } from '../../types/Basket';

interface BasketState {
    basket: Basket | null
    status: string
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, { productId: string; quantity?: number }>(
    '/basket/addBasketItemAsync',
    async ({ productId, quantity = 1 }, ThunkAPI) => {
      try {
        return await addItemToBasket(productId, quantity);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Async operation failed. Error:', error);
        return ThunkAPI.rejectWithValue({error: error.data})
      }
    }
  );


  export const removeItemFromBasketAsync = createAsyncThunk<void, { productId: string, quantity: number }>(
    'basket/removeItemFromBasketAsync',
    async ({ productId, quantity }, ThunkAPI) => {
      try {
        await removeItemFromBasket(productId, quantity);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Async operation failed. Error:', error);
        return ThunkAPI.rejectWithValue({error: error.data})
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
              state.status = 'pendingAddItem' + action.meta.arg.productId;
            })
            .addCase(addBasketItemAsync.fulfilled, (state, action) => {
              console.log('Basket after adding item:', state.basket);
              state.basket = action.payload;
              state.status = 'idle';
            })
            .addCase(addBasketItemAsync.rejected, (state, action) => {
              state.status = 'idle';
              console.log(action.payload)
            })
            .addCase(removeItemFromBasketAsync.pending, (state, action) => {
              state.status = 'pendingRemoveItem' + action.meta.arg.productId;
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
      
              state.status = 'idle';
            })
            .addCase(removeItemFromBasketAsync.rejected, (state, action) => {
              console.log(action.payload)
              state.status = 'idle';
            });
        },
      });
      

export const { setBasket } = basketSlice.actions;
