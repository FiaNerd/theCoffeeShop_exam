import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Product, Products } from "../../types/ProductsAPI.types";
import { getProducts } from "../../services/CoffeeAPI";


  const productsAdapter = createEntityAdapter<Product>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
  });

export const fetchProductAsync = createAsyncThunk<Products>(
    'product/fetchProductAsync',
    async () => {
        try {
            return await getProducts()
        } catch (error) {
            console.log(error)
        }
})

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {}
})