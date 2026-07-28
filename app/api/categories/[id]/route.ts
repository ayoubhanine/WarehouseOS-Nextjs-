import { NextRequest, NextResponse } from "next/server";

import { categorySchema } from "@/validators/categorySchema";
import {
  archiveCategory,
  getCategoryById,
  updateCategory,
} from "@/services/category.service";

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

  const category = await getCategoryById(id);

  if (!category) {
    return NextResponse.json(
      { message: "Catégorie introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(category);
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  const body = await request.json();

  const result = categorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const category = await updateCategory(
    id,
    result.data
  );

  return NextResponse.json(category);
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;

  await archiveCategory(id);

  return NextResponse.json({
    message: "Catégorie archivée",
  });
}