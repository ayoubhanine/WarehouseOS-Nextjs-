import { NextRequest, NextResponse } from "next/server";

import { productSchema } from "@/validators/productSchema";
import {
  archiveProduct,
  getProductById,
  updateProduct,
} from "@/services/product.service";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json(
      { message: "Produit introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

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

  const product = await updateProduct(
    id,
    result.data
  );

  return NextResponse.json(product);
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  await archiveProduct(id);

  return NextResponse.json({
    message: "Produit archivé",
  });
}