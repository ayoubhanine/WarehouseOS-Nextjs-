"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  if (!session) {
    return <p>Aucune session trouvée.</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard WarehouseOS
        </h1>

        <div className="space-y-3">
          <p><strong>Nom :</strong> {session.user?.name}</p>
          <p><strong>Email :</strong> {session.user?.email}</p>
          <p><strong>ID :</strong> {session.user?.id}</p>
          <p><strong>Expire :</strong> {session.expires}</p>
        </div>

        <button
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>
    </main>
  );
}