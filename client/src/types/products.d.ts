export type Product = {
  id: number
  name: string
  blendDescription: string
  description: string
  imageUrl: string
  type: string[]
  roastLevel: string[]
  price: number
  quantityInStock: number
  createdDate?: Date
  updatedDate?: Date
}

export type Products = Product[]

export type ProductParams = {
  orderBy: string
  searchTerm?: string
  types?: string[]
  roastLevels?: string[]
  pageNumber: number
  pageSize: number
}