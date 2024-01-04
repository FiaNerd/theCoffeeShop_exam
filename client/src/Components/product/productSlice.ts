import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types/ProductsAPI.types";
import { RootState } from "../../redux/configureStore";
import { getProducts } from "../../services/CoffeeAPI";

const productsAdapter = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id,
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });
  
  export const fetchProductAsync = createAsyncThunk<Products>(
    'products/fetchProductAsync',
    async () => {
      try {
        return await getProducts();
      } catch (error) {
        console.log(error);
        return [];
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
      builder.addCase(fetchProductAsync.pending, (state) => {
        state.status = 'pendingFetchProducts';
      });
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.status = 'idle';
        state.productsLoaded = true;
      });
      builder.addCase(fetchProductAsync.rejected, (state) => {
        state.status = 'idle';
      });
    },
  });
  
  export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.product
  );
  