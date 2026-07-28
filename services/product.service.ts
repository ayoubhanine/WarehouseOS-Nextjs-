import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function getProducts() {
  await connectDB();

  return Product.find({ archived: false }).populate("category");
}

export async function getProductById(id: string) {
  await connectDB();

  return Product.findById(id).populate("category");
}

export async function createProduct(data: {
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}) {
  await connectDB();

  return Product.create(data);
}

export async function updateProduct(id: string, data: object) {
  await connectDB();

  return Product.findByIdAndUpdate(id, data, {
    new: true,
  });
}

export async function archiveProduct(id: string) {
  await connectDB();

  return Product.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true }
  );
}