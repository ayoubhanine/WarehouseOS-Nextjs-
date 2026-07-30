"use client";

import { StockMovement } from "@/types/movement";

interface MovementTableProps {
  movements: StockMovement[];
}

export default function MovementTable({
  movements,
}: MovementTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Produit</th>
            <th className="p-3 text-center">Type</th>
            <th className="p-3 text-center">Quantité</th>
            <th className="p-3 text-left">Note</th>
            <th className="p-3 text-center">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="p-6 text-center text-gray-500"
              >
                Aucun mouvement enregistré.
              </td>
            </tr>
          ) : (
            movements.map((movement) => (
              <tr
                key={movement._id}
                className="border-t"
              >
                <td className="p-3 font-medium">
                  {movement.product.name}
                </td>

                <td className="p-3 text-center">
                  <span
                    className={`rounded px-2 py-1 text-sm font-medium text-white ${
                      movement.type === "IN"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {movement.type}
                  </span>
                </td>

                <td className="p-3 text-center">
                  {movement.quantity}
                </td>

                <td className="p-3">
                  {movement.note || "-"}
                </td>

                <td className="p-3 text-center">
                  {new Date(
                    movement.createdAt
                  ).toLocaleDateString("fr-FR")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}