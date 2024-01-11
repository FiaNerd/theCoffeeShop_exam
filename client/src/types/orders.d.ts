export type Order = {
    saveAddress: boolean
    shippingAddress: ShippingAddress
  }
  
  export type ShippingAddress = {
    fullName: string
    address1: string
    address2: string | undefined
    city: string
    zip: string
  }
  

  export type Orders = Order[]