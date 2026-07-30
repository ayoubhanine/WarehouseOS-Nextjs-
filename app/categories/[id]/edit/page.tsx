"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CategoryForm from "@/components/categories/CategoryForm";
import { getCategory } from "@/api/category.api";
import { Category } from "@/types/category";

export default function EditCategoryPage() {
  const params = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategory() {
      try {
        const data = await getCategory(params.id as string);
        setCategory(data);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger la catégorie.");
      } finally {
        setLoading(false);
      }
    }

    loadCategory();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Chargement...
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="p-6 text-center text-red-500">
        {error || "Catégorie introuvable"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Modifier la catégorie
        </h1>

        <p className="mt-2 text-gray-600">
          Modifiez les informations de la catégorie.
        </p>
      </div>

      <CategoryForm
        category={category}
        isEdit={true}
      />
    </div>
  );
}