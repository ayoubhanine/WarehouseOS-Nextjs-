// export interface StockMovement {
//   _id: string;
//   productId: string;
//   type: 'IN' | 'OUT';
//   quantity: number;
//   note?: string;
//   createdAt: string;
// }

import { Product } from "./product";

export interface StockMovement {
  _id: string;
  product: Product;
  type: "IN" | "OUT";
  quantity: number;
  note?: string;
  createdAt: string;
}