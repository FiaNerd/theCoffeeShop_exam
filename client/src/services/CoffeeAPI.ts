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
 * Get all products
 */
export const getProducts = async () => {
  return await get<Products>('/products')
}

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
    `${BASE_URL}/Basket?productId=${productId}&quantity=${quantity}`,
    {}
  )
  return res.data
}

export const removeItemFromBasket = async (productId: string, quantity = 1) => {
  console.log(`Delete Item with productId: ${productId}, quantity: ${quantity}`)
  const res = await axios.delete(
    `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`,
    {}
  )
  console.log('delete response:', res.data)
  return res.data
}
