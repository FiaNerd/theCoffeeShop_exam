import axios from 'axios'
import { Basket } from '../types/basket'
import { Order, Orders } from '../types/orders'
import { Product, Products } from '../types/products'
import { User } from '../types/user'

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

/// Axios interceptor to dynamically add an Authorization header
// to each request if a user is logged in and has a valid token.
axios.interceptors.request.use((config) => {
  // Retrieve the user's token from local storage
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null

  // If a valid token exists, add Authorization header
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // Return the updated configuration for the request
  return config
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
export const getProducts = async (
  params?: URLSearchParams
): Promise<Products | []> => {
  const url = `/products${params ? `?${params.toString()}` : ''}`
  const response = await get<Products>(url)
  return response
}

/**
 * Get single product
 * @param guid get GUID
 */
export const getProduct = async (guid: string): Promise<Product | null> => {
  try {
    const response = await get<Product>(`/products/${guid}`)
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}
/**
 * Get all basket
 */
export const getBasket = async () => {
  const response = await get<Basket>('/basket')
  return response
}

/**
 * Create a items in basket
 * @param add basket
 */
export const addItemToBasket = async (productId: string, quantity = 1) => {
  const response = await axios.post(
    `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`,
    {}
  )
  return response.data
}

/*
 * Delete a item
 * @param delete items
 */
export const removeItemFromBasket = async (
  productId: string,
  quantity = 1
): Promise<void> => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/basket?productId=${productId}&quantity=${quantity}`
    )
    return response.data
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
export const login = async (values: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/login`, values)
    return response.data
  } catch (error) {
    console.log('Error when trying to login')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (values: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/register`, values)
    return response.data
  } catch (error) {
    console.log('Error when trying to create a account')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const currentUser = async ()  => {
  try {
    const response = await axios.get<User>(`${BASE_URL}/account/currentuser`)
    return response.data

  } catch (error) {
    throw new Error('Failed to fetch currentUser')
  }
}

export const getOrders = async () =>{
  try {
    const response = await axios.get<Orders>(`${BASE_URL}/orders`)
    console.log("Fetch Order axios", response)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

export const getOrder = async (id: number) =>{
  try {
    const response =  await axios.get<Order>(`${BASE_URL}/orders/${id}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrder = async (values: any) =>{
  try {
    const response = await axios.post(`${BASE_URL}/orders`, values)
    return response.data
  } catch (error) {
    throw new Error('Failed to create orders')
  }
}

export const getAddress = async () => {
  try {
    const response =  await axios.get(`${BASE_URL}/account/savedaddress`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch orders')
  }
}

/**
 * Admin
 * @param create products
/**
 */
export const createProduct = async (data: FormData) => {
  try {
    const response = await axios.post(`${BASE_URL}/products`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log("RESPONSE DATA POST", response.data);
    console.log("DATA", data);
    return response.data;
    
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};


/**
 * Admin
 * @param create products
/**
 */
export const editProduct = async (data: FormData) => {
  try {
    const response = await axios.put(`${BASE_URL}/products`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log("RESPONSE DATA POST", response);
    return response.data;

  } catch (error) {
    console.error("Error in createProduct:", error);
    throw error;
  }
};

/**
 * Admin
 * @param DELETE products
/**
 */
export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/products/${id}`)
    console.log("RESP", response)
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}


