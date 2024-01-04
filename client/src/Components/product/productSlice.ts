import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types/ProductsAPI.types";
import { RootState } from "../../redux/configureStore";
import { getProduct, getProducts } from "../../services/CoffeeAPI";

const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });
  
  export const fetchProductsAsync = createAsyncThunk<Products>(
    'products/fetchProductsAsync',
    async (_, ThunkAPI) => {
      try {
        return await getProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        return ThunkAPI.rejectWithValue({ error: error.data });
      }
    }
  )
  
  export const fetchProductAsync = createAsyncThunk<Product, string, { rejectValue: { error: string } }>(
    'products/fetchProductAsync',
    async (productId, ThunkAPI) => {
      try {
        const product = await getProduct(productId);
        return product as Product;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.error(error);
        return ThunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
  
  
  export const productSlice = createSlice({
    name: 'product',
      initialState: productsAdapter.getInitialState({
      productsLoaded: false,
      status: 'idle',
    }),
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
        state.status = 'pendingFetchProducts';
      });
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = 'idle';
        state.productsLoaded = true;
      });
      builder.addCase(fetchProductsAsync.rejected, (state, action) => {
        console.log(action.payload)
        state.status = 'idle';
      });
      builder.addCase(fetchProductAsync.pending, (state) => {
        state.status = "pendingFetchProduct"
      })
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          productsAdapter.upsertOne(state, action.payload);
        }
        state.status = "idle"
      })
      builder.addCase(fetchProductAsync.rejected, (state, action) => {
        console.log(action)
        state.status = 'idle'
      })
    },
  });
  
  export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.product
  );
  