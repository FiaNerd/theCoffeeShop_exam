import axios from 'axios'
import { Basket } from '../types/Basket'
import { Product, Products } from '../types/ProductsAPI'

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
    return resp.data
  } catch (error) {
    console.error('Error during GET request:', error)
    throw error
  }
}

/**
 * Get single product
 * @param all products
 */
export const getProducts = async (params?: URLSearchParams): Promise<Products | []> => {
  const url = `/products${params ? `?${params.toString()}` : ''}`;
  const res = await get<Products>(url);
  return res;
};

/**
 * Get single product
 * @param guid get GUID
 */
export const getProduct = async (guid: string): Promise<Product | null> => {
  try {
    const res = await get<Product>(`/products/${guid}`);
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
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
export const removeItemFromBasket = async (productId: string, quantity = 1) : Promise<void> => {
  try {
    const res =  await axios.delete(
      `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`
    )
    return res.data
  } catch (error) {
    console.error('Error deleting item:', error)
    throw error
  }
}

export const getFilters = async () => {
  try {
    return await get<Product>('/products/filters')

  } catch (error) {
    console.error('Error fetching filters:', error)
    throw error
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Login = async (values: any) => {
  try {
    const response = await axios.post(`/account/login`, values)
    return response.data
  } catch (error) {
    console.log("Error when trying to login")
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Register = async (values: any) => {
  try {
    const response = await axios.post(`/account/register`, values)
    return response.data
  } catch (error) {
    console.log("Error when trying to create a account")
  }
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentUser = async () => {
  try {
    return await get(`/account/currentUser`)
  } catch (error) {
    console.log("Error when fetching currenUser")
  }
}