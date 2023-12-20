export type Product = {
  Guid: number,
  Name: string;
  BlendDescription: string;
  Description: string;
  ImageUrl: string;
  Type: string[];
  RoastLevel: string;
  Price: number;
  QuantityInStock: number;
  CreatedDate: Date;
  UpdatedDate: Date;
}

export type Products = Product[]