"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { archiveCategory } from "@/api/category.api";
import { Category } from "@/types/category";

interface CategoryTableProps {
  categories: Category[];
}

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  const router = useRouter();

  async function handleArchive(id: string) {
    const confirmed = confirm(
      "Voulez-vous vraiment archiver cette catégorie ?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await archiveCategory(id);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'archivage de la catégorie.");
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Date de création</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-gray-500"
              >
                Aucune catégorie trouvée.
              </td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr
                key={category._id}
                className="border-t"
              >
                <td className="p-3 font-medium">
                  {category.name}
                </td>

                <td className="p-3">
                  {category.description}
                </td>

                <td className="p-3">
                  {new Date(
                    category.createdAt
                  ).toLocaleDateString("fr-FR")}
                </td>

                <td className="p-3">
                  <div className="flex justify-end gap-3">

                    <Link
                      href={`/categories/${category._id}/edit`}
                      className="text-orange-600 hover:underline"
                    >
                      Modifier
                    </Link>

                    <button
                      onClick={() =>
                        handleArchive(category._id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Archiver
                    </button>

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}