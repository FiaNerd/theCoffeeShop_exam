export type Product = {
  id: string
  name: string
  blendDescription: string
  description: string
  imageUrl: string
  types: string[]
  roastLevel: string[]
  price: number
  quantityInStock: number
  createdDate?: Date
  updatedDate?: Date
}

export type Products = Product[]

