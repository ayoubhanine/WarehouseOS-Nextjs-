import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { registerSchema } from "@/validators/registerSchema";

export async function POST(request: Request) {
  try {
    // Connexion à MongoDB
    await connectDB();

    // Récupérer les données envoyées par le client
    const body = await request.json();

    // Validation avec Zod
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Erreur de validation",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, password } = result.data;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Cet email est déjà utilisé.",
        },
        { status: 409 }
      );
    }

    // Chiffrer le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "Utilisateur créé avec succès.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Erreur interne du serveur.",
      },
      { status: 500 }
    );
  }
}