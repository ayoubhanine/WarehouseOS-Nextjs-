import { NextRequest, NextResponse } from "next/server";

import { movementSchema } from "@/validators/movementSchema";
import {
  createMovement,
  getMovements,
} from "@/services/movement.service";

export async function GET() {
  try {
    const movements = await getMovements();

    return NextResponse.json(movements);
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

    const result = movementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const movement = await createMovement(result.data);

    return NextResponse.json(movement, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erreur serveur",
      },
      { status: 400 }
    );
  }
}