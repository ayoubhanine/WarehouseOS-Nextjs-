"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Product } from "@/types/product";
import { getProduct } from "@/api/product.api";

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(params.id as string);
        setProduct(data);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger le produit.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Chargement...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center text-red-500">
        {error || "Produit introuvable"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-500">
            Détails du produit
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/products"
            className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Retour
          </Link>

          <Link
            href={`/products/${product._id}/edit`}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Modifier
          </Link>

        </div>

      </div>

      <div className="rounded-lg border bg-white p-6 shadow">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Nom
            </p>

            <p className="mt-1 text-lg">
              {product.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              SKU
            </p>

            <p className="mt-1 text-lg">
              {product.sku}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Catégorie
            </p>

            <p className="mt-1 text-lg">
              {product.category.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Prix
            </p>

            <p className="mt-1 text-lg font-semibold text-green-600">
              {product.price} MAD
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Quantité en stock
            </p>

            <p className="mt-1 text-lg">
              {product.quantity}
            </p>
          </div>

        </div>

        <div className="mt-8">

          <p className="text-sm font-semibold text-gray-500">
            Description
          </p>

          <div className="mt-2 rounded border p-4">
            {product.description}
          </div>

        </div>

      </div>

    </div>
  );
}