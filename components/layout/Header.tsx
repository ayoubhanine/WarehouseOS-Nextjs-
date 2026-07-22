"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-slate-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-blue-400"
          >
            WarehouseOS
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-blue-300"
          >
            Dashboard
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="text-sm text-center md:text-right">
            <p>{session?.user?.name}</p>
            <p className="text-gray-300">
              {session?.user?.email}
            </p>
          </div>

          <button
            onClick={() =>
              signOut({
                callbackUrl: "/login",
              })
            }
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </header>
  );
}