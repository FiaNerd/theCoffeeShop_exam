export type Basket = {
  Id: string;
  buyerId: string;
  items: BasketItems[];
};

export type BasketItems = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  type: string[];
  roastLevel: string;
  quantity: number;
};

export type Baskets = Basket[];
