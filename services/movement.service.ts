import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import StockMovement from "@/models/StockMovement";

export async function createMovement(data: {
  product: string;
  type: "IN" | "OUT";
  quantity: number;
  note?: string;
}) {
  await connectDB();

  const product = await Product.findById(data.product);

  if (!product) {
    throw new Error("Produit introuvable");
  }

  if (
    data.type === "OUT" &&
    product.quantity < data.quantity
  ) {
    throw new Error("Stock insuffisant");
  }

  if (data.type === "IN") {
    product.quantity += data.quantity;
  } else {
    product.quantity -= data.quantity;
  }

  await product.save();

  return StockMovement.create(data);
}

export async function getMovements() {
  await connectDB();

  return StockMovement.find()
    .populate("product")
    .sort({
      createdAt: -1,
    });
}