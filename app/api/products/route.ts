import { NextRequest, NextResponse } from "next/server";

import { productSchema } from "@/validators/productSchema";
import {
  createProduct,
  getProducts,
} from "@/services/product.service";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const product = await createProduct(result.data);

    return NextResponse.json(product, {
      status: 201,
    });
  } catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      message: error instanceof Error ? error.message : "Erreur serveur",
    },
    { status: 500 }
  );
}
}