import axios from 'axios'
import { Product, Products } from '../types/ProductsAPI.types'
import { Basket } from '../types/Basket.types'

const BASE_URL = import.meta.env.VITE_BASE_URL
const AXIOS_CREDENTIALS = import.meta.env.VITE_AXIOS_WITH_CREDENTIALS === 'true'

axios.defaults.withCredentials = AXIOS_CREDENTIALS

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const get = async <T>(endpoint: string) => {
  try {
    const resp = await instance.get<T>(endpoint)
    console.log(resp)
    return resp.data
  } catch (error) {
    console.error('Error during GET request:', error)
    throw error
  }
}

/**
 * Get products with pagination
 * @param page The page number to fetch
 * @param pageSize The number of items per page
 */
// export const getProducts = async (page = 1, pageSize = 8) => {
//   console.log('Page', page, 'PageSize', pageSize)
//   return await get<Products>(`/products?page=${page}&pageSize=${pageSize}`)
// }

export const getProducts = async (pageParam = 1, pageSize = 8) => {
  console.log('Page', pageParam, 'PageSize', pageSize);
  const response = await get<Products>(
    `/products?page=${pageParam}&pageSize=${pageSize}`
  );

  return {
    pages: [{ data: response, nextPage: pageParam + 1 }],
    pageParams: [pageParam + 1], 
  };
};

/**
 * Get single product
 * @param guid get GUID
 */
export const getProduct = async (guid: string) => {
  return await get<Product>(`/products/${guid}`)
}

/**
 * Get all basket
 */
export const getBasket = async () => {
  return await get<Basket>('/basket')
}

/**
 * Create a items in basket
 */
export const addItemToBasket = async (productId: string, quantity = 1) => {
  const res = await axios.post(
    `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`,
    {}
  )
  return res.data
}

/**
 * Delete a item
 */
export const removeItemFromBasket = async (productId: string, quantity = 1) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`
    )
    return res
  } catch (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}
