"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            Informations utilisateur
          </h2>

          <p>
            <strong>Nom :</strong> {session?.user?.name}
          </p>

          <p>
            <strong>Email :</strong> {session?.user?.email}
          </p>

          <p>
            <strong>ID :</strong> {session?.user?.id}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold text-lg mb-4">
            Session
          </h2>

          <p>
            <strong>Expire :</strong>
          </p>

          <p>{session?.expires}</p>
        </div>
      </div>
    </div>
  );
}