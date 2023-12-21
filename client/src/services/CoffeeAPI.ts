import axios from 'axios'
import { Products } from '../types/ProductsAPI.types'

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
export const getProducts = () => {
  return get<Products>('/Products')
}