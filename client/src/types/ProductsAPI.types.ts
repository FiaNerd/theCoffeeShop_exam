
// export type Products = readonly Product[]

export type Product = {
  guid: string
  name: string
  blendDescription: string
  description: string
  imageUrl: string
  type: string[]
  roastLevel: string
  price: number
  quantityInStock: number
  createdDate?: Date
  updatedDate?: Date
}


export type Products = Product[]

