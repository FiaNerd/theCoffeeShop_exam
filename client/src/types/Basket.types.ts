export type Basket = {
  basketId: string
  buyerId: string
  items: BasketItems[]
}

export type BasketItems = {
  productId: string
  name: string
  price: number
  imageUrl: string
  type: string[]
  roastLevel: string
  quantity: number
}

export type BasketProduct = Basket[]
