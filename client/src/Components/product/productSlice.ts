import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types/ProductsAPI.types";
import { RootState } from "../../redux/configureStore";
import { getProduct, getProducts } from "../../services/CoffeeAPI";

const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });
  
  export const fetchProductsAsync = createAsyncThunk<Products>(
    'products/fetchProductsAsync',
    async () => {
      try {
        return await getProducts();
      } catch (error) {
        console.log(error);
        return [];
      }
    }
  );
  
  export const fetchProductAsync = createAsyncThunk<Product | null, string>(
    'products/fetchProductAsync',
    async (productId) => {
      try {
        const product = await getProduct(productId!);
        return product;
      } catch (error) { 
        console.error(error);
        return null;
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
      builder.addCase(fetchProductsAsync.rejected, (state) => {
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
      builder.addCase(fetchProductAsync.rejected, (state) => {
        state.status = 'idle'
      })
    },
  });
  
  export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.product
  );
  