"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusIcon, PackageOpenIcon, AlertCircleIcon } from "lucide-react";

import ProductTable from "@/components/products/ProductTable";
import { getProducts } from "@/api/product.api";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setError(null);
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les produits. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      {/* En-tête de la page */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Produits
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Gérez votre catalogue de produits et leurs informations.
          </p>
        </div>

        <Link
          href="/products/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <PlusIcon className="h-4 w-4" />
          Ajouter un produit
        </Link>
      </div>

      {/* État : Chargement (Skeleton Loader) */}
      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <div className="h-10 w-full rounded-md bg-slate-100" />
            <div className="h-12 w-full rounded-md bg-slate-100" />
            <div className="h-12 w-full rounded-md bg-slate-100" />
            <div className="h-12 w-full rounded-md bg-slate-100" />
          </div>
        </div>
      )}

      {/* État : Erreur */}
      {!loading && error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircleIcon className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* État : Aucun produit (Empty State) */}
      {!loading && !error && products.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-12 text-center">
          <div className="rounded-full bg-slate-100 p-3">
            <PackageOpenIcon className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Aucun produit trouvé
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Commencez par ajouter votre premier produit à l'inventaire.
          </p>
          <Link
            href="/products/create"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter un produit
          </Link>
        </div>
      )}

      {/* Affichage du tableau */}
      {!loading && !error && products.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <ProductTable products={products} />
        </div>
      )}
    </div>
  );
}


