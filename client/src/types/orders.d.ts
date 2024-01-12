export type Order = {
  id: number;
  buyerId: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  orderStatus: string;
  total: number;
}

export type OrderItem = {
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export type ShippingAddress = {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  zip: string;
}

  

  export type Orders = Order[]