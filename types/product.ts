export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  sku: string;
  description: string;
  category: Category;
  price: number;
  quantity: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}