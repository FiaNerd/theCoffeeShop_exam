export type Order = {
    saveAddress: boolean
    shippingAddress: ShippingAddress
  }
  
  export type ShippingAddress = {
    fullName: string
    address1: string
    address2: string
    city: string
    zip: string
  }
  

  export type Orders = Order[]