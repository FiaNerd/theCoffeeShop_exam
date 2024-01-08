import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/configureStore";
import { getFilters, getProduct, getProducts } from "../../services/CoffeeAPI";
import { Product, ProductParams, Products } from "../../types/products";

interface ProductState {
  productsLoaded: boolean
  filtersLoaded: boolean
  status: string
  types: string[]
  roastLevels: string[]
  productParams: ProductParams
}

const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });

  const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams()

    params.append('pageNumber', productParams.pageNumber.toString())
    params.append('pageSize', productParams.pageSize.toString())
    params.append('orderBy', productParams.orderBy)

    if(productParams.searchTerm){
      params.append('searchTerm', productParams.searchTerm)
    }

    if(productParams.types){
      params.append('types', productParams.types.toString())
    }

    if(productParams.roastLevels){
      params.append('roastLevels', productParams.roastLevels?.toString())
    }

    return params
  }
  
  export const fetchProductsAsync = createAsyncThunk<Products, void, {state: RootState}>(
    'products/fetchProductsAsync',
    async (_, thunkAPI) => {
      const params = getAxiosParams(thunkAPI.getState().product.productParams)
      try {
        return await getProducts(params);
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
        return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  const initParams = () => {
    return{
      pageNumber: 1,
      pageSize: 12,
      orderBy: "name",
    }
  }  
  
  
  export const productSlice = createSlice({
    name: 'product',
      initialState: productsAdapter.getInitialState<ProductState>({
      productsLoaded: false,
      filtersLoaded: false,
      status: 'idle',
      types: [] as string[],
      roastLevels: [] as string[],
      productParams: initParams()
    }),
    reducers: {
      setProductParamas: (state, action) => {
        state.productsLoaded = false
        state.productParams = {...state.productParams, ...action.payload}
      },
      resetProductParams: (state) => {
        state.productParams = initParams()
      } 
    },
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
        state.types = action.payload.type;
        state.roastLevels = action.payload.roastLevel;
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

  export const { setProductParamas, resetProductParams } = productSlice.actions
  