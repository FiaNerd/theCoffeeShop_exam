import { EntityState } from "@reduxjs/toolkit"

export type Product = {
  id: string
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

export interface ProductsData extends EntityState<Product, string> {
  selectedProductId?: string | number;
  loading: boolean;
  error?: string | null;
}