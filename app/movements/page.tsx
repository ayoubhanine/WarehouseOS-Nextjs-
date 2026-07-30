"use client";

import { useEffect, useState } from "react";

import MovementForm from "@/components/movements/MovementForm";
import MovementTable from "@/components/movements/MovementTable";

import { getMovements } from "@/api/movement.api";
import { StockMovement } from "@/types/movement";

export default function MovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovements() {
      try {
        const data = await getMovements();
        setMovements(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovements();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        Chargement...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Mouvements de stock
        </h1>

        <p className="mt-2 text-gray-600">
          Enregistrez les entrées et sorties de stock et consultez l'historique.
        </p>
      </div>

      <MovementForm />

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">
          Historique des mouvements
        </h2>

        <MovementTable movements={movements} />
      </div>

    </div>
  );
}