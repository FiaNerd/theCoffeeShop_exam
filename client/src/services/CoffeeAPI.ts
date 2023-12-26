import axios from 'axios'
import { Product, Products } from '../types/ProductsAPI.types'
import { Baskets } from '../types/Basket.types'

const BASE_URL = import.meta.env.VITE_BASE_URL

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
  return await get<Products>('/Products')
}

/**
 * Get single product
 * @param guid get GUID
 */
export const getProduct = async (guid: string) => {
  return await get<Product>(`/Products/${guid}`)
}

/**
 * Get all basket
 */
export const getBaskets = async () => {
  return  await get<Baskets>('/Basket')
}

/**
 * Create a basket
 */
export const createBasket = async (productId: string, quantity = 1) => {
  const res = await axios.post(`${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`, {})
  return res.data
}

