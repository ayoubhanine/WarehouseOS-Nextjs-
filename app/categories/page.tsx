"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import CategoryTable from "@/components/categories/CategoryTable";
import { getCategories } from "@/api/category.api";
import { Category } from "@/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
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

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Catégories
          </h1>

          <p className="mt-2 text-gray-600">
            Gérez les catégories de votre entrepôt.
          </p>
        </div>

        <Link
          href="/categories/create"
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Ajouter une catégorie
        </Link>

      </div>

      <CategoryTable categories={categories} />

    </div>
  );
}