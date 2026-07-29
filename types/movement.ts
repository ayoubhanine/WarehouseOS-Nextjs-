export interface StockMovement {
  _id: string;
  productId: string;
  type: 'IN' | 'OUT';
  quantity: number;
  note?: string;
  createdAt: string;
}