import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function getCategories() {
  await connectDB();

  return Category.find({ archived: false });
}

export async function createCategory(data: {
  name: string;
  description: string;
}) {
  await connectDB();

  return Category.create(data);
}

export async function getCategoryById(id: string) {
  await connectDB();

  return Category.findById(id);
}

export async function updateCategory(
  id: string,
  data: {
    name: string;
    description: string;
  }
) {
  await connectDB();

  return Category.findByIdAndUpdate(id, data, {
    new: true,
  });
}

export async function archiveCategory(id: string) {
  await connectDB();

  return Category.findByIdAndUpdate(
    id,
    { archived: true },
    { new: true }
  );
}