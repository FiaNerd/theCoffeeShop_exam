import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types/ProductsAPI.types";
import { RootState } from "../../redux/configureStore";
import { getFilters, getProduct, getProducts } from "../../services/CoffeeAPI";

const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });
  
  export const fetchProductsAsync = createAsyncThunk<Products>(
    'products/fetchProductsAsync',
    async (_, thunkAPI) => {
      try {
        return await getProducts();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  )
  
  export const fetchProductAsync = createAsyncThunk<Product, string, { rejectValue: { error: string } }>(
    'products/fetchProductAsync',
    async (productId, thunkAPI) => {
      try {
        const product = await getProduct(productId);
        return product as Product;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        console.error(error);
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
  export const fetchFilters = createAsyncThunk(
    'product/fetchFilters',
    async (_, thunkAPI) => {
      try {
        const response = await getFilters();
        console.log('Response from getFilters:', response); 
        return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
  
  
  export const productSlice = createSlice({
    name: 'product',
      initialState: productsAdapter.getInitialState({
      productsLoaded: false,
      filtersLoaded: false,
      types: [] as string[],
      roastLevels: [] as string[],
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
      builder.addCase(fetchFilters.pending, (state) => {
        state.status = 'pendingFetchFilters'
      })
      builder.addCase(fetchFilters.fulfilled, (state, action) => {
        console.log('Action payload in fetchFilters.fulfilled:', action.payload);
        state.types = action.payload.types;
        state.roastLevels = action.payload.roastLevels;
        state.status = 'idle';
        state.filtersLoaded = true;
      });
      
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = 'idle'; 
      console.log(action.payload)
    })
    },
  });
  
  export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.product
  );
  