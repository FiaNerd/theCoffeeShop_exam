import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  addItemToBasket,
  getBasket,
  removeItemFromBasket,
} from '../../services/CoffeeAPI'
import { Basket } from '../../types/basket'
import { getCookie } from '../../utils/getCookie'

interface BasketState {
  basket: Basket | null
  status: string
}

const initialState: BasketState = {
  basket: null,
  status: 'idle',
}

export const fetchBasketAsync = createAsyncThunk<Basket>(
  'basket/fetchBasketAsync',
  async (_, thunkAPI) => {
    try {
      return await getBasket()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
    }
  },
  {
    condition: () => {
      if (!getCookie('buyerId')) {
        return false
      }
    },
  }
)

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: string; quantity?: number }
>(
  '/basket/addBasketItemAsync',
  async ({ productId, quantity = 1 }, ThunkAPI) => {
    try {
      return await addItemToBasket(productId, quantity)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Async operation failed. Error:', error)
      return ThunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const removeItemFromBasketAsync = createAsyncThunk<
  void,
  { productId: string; quantity: number }
>(
  'basket/removeItemFromBasketAsync',
  async ({ productId, quantity }, ThunkAPI) => {
    try {
      await removeItemFromBasket(productId, quantity)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Async operation failed. Error:', error)
      return ThunkAPI.rejectWithValue({ error: error.data })
    }
  }
)

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload
    },
    clearBasket: (state) => {
      state.basket = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBasketItemAsync.pending, (state, action) => {
        state.status = 'pendingAddItem' + action.meta.arg.productId
      })

      .addCase(removeItemFromBasketAsync.pending, (state, action) => {
        state.status = 'pendingRemoveItem' + action.meta.arg.productId
      })
      .addCase(removeItemFromBasketAsync.fulfilled, (state, action) => {
        const { productId, quantity } = action.meta.arg

        const itemIndex = state.basket?.items.findIndex(
          (item) => item.productId === productId
        )

        if (itemIndex === -1 || itemIndex === undefined) {
          return
        }


        state.basket!.items[itemIndex].quantity -= quantity

        if (state.basket?.items[itemIndex].quantity === 0) {
          state.basket.items.splice(itemIndex, 1)
        }

        state.status = 'idle'
      })
      .addCase(removeItemFromBasketAsync.rejected, (state, action) => {
        console.log(action.payload)
        state.status = 'idle'
      })
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload
        state.status = 'idle'
      }
    )
    builder.addMatcher(
      isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected),
      (state, action) => {
        state.status = 'idle'
        console.log(action)
      }
    )
  },
})

export const { setBasket, clearBasket } = basketSlice.actions

