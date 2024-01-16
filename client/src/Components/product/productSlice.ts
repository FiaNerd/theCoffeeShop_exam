  import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "../../redux/configureStore";
import { getFilters, getProduct, getProducts } from "../../services/CoffeeAPI";
import { MetaData } from "../../types/pagination";
import { Product, ProductParams, Products } from "../../types/products";

  interface ProductState {
    allProducts: Product[];
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    types: string[];
    roastLevels: string[];
    productParams: ProductParams;
    metaData: MetaData | null
  }

  const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });

  const getAxiosParams = (productParams: ProductParams) : URLSearchParams => {
    const params = new URLSearchParams();

    params.append("pageNumber", productParams.pageNumber.toString());
    params.append("pageSize", productParams.pageSize.toString());
    params.append("orderBy", productParams.orderBy);

    if (productParams.searchTerm) {
      params.append("searchTerm", productParams.searchTerm);
    }

    if (productParams.types?.length) {
      console.log(productParams.types.toString());
      params.append("types", productParams.types.toString());
    }

    if (productParams.roastLevels) {
      params.append("roastLevels", productParams.roastLevels?.toString());
    }

    return params;
  };
  
  // export const fetchProductsAsync = createAsyncThunk<Products, ProductParams, { state: RootState }>(
  //   'products/fetchProductsAsync',
  //   async (params, thunkAPI) => {
  //     // Use params directly, no need to get it from getState
  //     try {
  //       const allProducts = await getProducts(getAxiosParams(params));
  //       thunkAPI.dispatch(setMetaData(allProducts.metaData));
  //       return allProducts.items;
  //     } catch (error: any) {
  //       return thunkAPI.rejectWithValue({ error: error.data })
  //     }
  //   }
  // );

  export const fetchProductsAsync = createAsyncThunk<Products, void, {state: RootState}>(
    'products/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().product.productParams);

        try {
            const allProducts = await getProducts(params);
            thunkAPI.dispatch(setMetaData(allProducts.metaData));
            return allProducts.items;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

  export const fetchProductAsync = createAsyncThunk<
    Product,
    number,
    { rejectValue: { error: string } }
  >("products/fetchProductAsync", async (productId, thunkAPI) => {
    try {
      const product = await getProduct(productId);
      return product as Product;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  });

  export const fetchFilters = createAsyncThunk(
    "product/fetchFilters",
    async (_, thunkAPI) => {
      try {
        const response = await getFilters();
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  const initParams = () => {
    return {
      pageNumber: 1,
      pageSize: 12,
      orderBy: "name",
      types: [],
      roastLevels: []
    };
  };

  export const productSlice = createSlice({
    name: "product",
    initialState: productsAdapter.getInitialState<ProductState>({
      allProducts: [],
      productsLoaded: false,
      filtersLoaded: false,
      status: "idle",
      types: [] as string[],
      roastLevels: [] as string[],
      productParams: initParams(),
      metaData: null
    }),
    reducers: {
      setAllProducts: (state, action) => {
        state.productsLoaded = true;
        state.allProducts = action.payload;
      },
      setPageNumber: (state, action) => {
        state.productsLoaded = false;
        state.productParams = {...state.productParams, ...action.payload}
      },
      setProductParams: (state, action) => {
        state.productsLoaded = false;
        state.productParams = { ...state.productParams, ...action.payload };
      },
      setMetaData: (state, action) => {
        state.metaData = action.payload
      },
      resetProductParams: (state) => {
        state.productParams = initParams();
      },
      setProduct: (state, action) => {
        state.productsLoaded = false
        // productsAdapter.upsertOne(state, action)
        productsAdapter.upsertOne(state, action.payload)
      },
      removeProduct: (state, action) => {
        productsAdapter.removeOne(state, action.payload)
        state.productsLoaded = false
        console.log("Action", action.payload, "state" ,state, )
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchProductsAsync.pending, (state) => {
        state.status = "pendingFetchProducts";
      });
      builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
        productsAdapter.setAll(state, action.payload);
        state.allProducts = action.payload;
        state.status = "idle";
        state.productsLoaded = true;
      });
      builder.addCase(fetchProductsAsync.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "idle";
      });
      builder.addCase(fetchProductAsync.pending, (state) => {
        state.status = "pendingFetchProduct";
      });
      builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
        if (action.payload) {
          productsAdapter.upsertOne(state, action.payload);
        }
        state.status = "idle";
      });
      builder.addCase(fetchProductAsync.rejected, (state, action) => {
        console.log(action);
        state.status = "idle";
      });
      builder.addCase(fetchFilters.pending, (state) => {
        state.status = "pendingFetchFilters";
      });
      builder.addCase(fetchFilters.fulfilled, (state, action) => {
        state.types = action.payload.data.type;
        state.roastLevels = action.payload.data.roastLevel;
        state.status = "idle";
        state.filtersLoaded = true;
      });
      builder.addCase(fetchFilters.rejected, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
      });
    },
  });

  export const productSelectors = productsAdapter.getSelectors(
    (state: RootState) => state.product
  );

  export const { setProductParams, resetProductParams, setMetaData, setPageNumber, setProduct, removeProduct } = productSlice.actions;
