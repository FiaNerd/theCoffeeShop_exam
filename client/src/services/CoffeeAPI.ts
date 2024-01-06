import axios from 'axios'
import { Product, Products } from '../types/ProductsAPI'
import { Basket } from '../types/Basket'

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

// /**
//  * Get products with pagination
//  * @param page The page number to fetch
//  * @param pageSize The number of items per page
//  */
// export const getProducts = async (page = 1, pageSize = 12, type = '') => {
//   try {
//     const headers = {
//       Accept: 'application/json',
//     }

//     const url = type
//       ? `${BASE_URL}/Products?Type=${type}&PageNumber=${page}&PageSize=${pageSize}`
//       : `${BASE_URL}/Products?PageNumber=${page}&PageSize=${pageSize}`

//     // console.log('Fetching URL:', url)

//     const response = await fetch(url, { headers: headers })

//     // console.log('URL esponse', response, url)

//     if (!response.ok) {
//       throw new Error(`Error fetching products: ${response.statusText}`)
//     }

//     const paginationHeaders = response.headers.get('pagination')

//     if (!paginationHeaders) {
//       throw new Error('Pagination information not found in header')
//     }

//     const paginationData = JSON.parse(paginationHeaders)

//     const items = await response.json()
//     // console.log('Number of items:', items.length)

//     const paginatedResponse: PaginatedResponse<Product> = {
//       items,
//       metaData: {
//         currentPage: paginationData?.currentPage,
//         totalPages: paginationData?.totalPages,
//         pageSize: paginationData?.pageSize.length,
//         totalCount: paginationData?.totalCount,
//       },
//     }
//     // console.log('Paginated response', paginatedResponse.metaData.pageSize)

//     return paginatedResponse
//   } catch (error) {
//     console.error('Error during GET request:', error)
//     throw error
//   }
// }

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
