"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProductForm from "@/components/products/ProductForm";
import { getProduct } from "@/api/product.api";
import { Product } from "@/types/product";

export default function EditProductPage() {
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
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Modifier le produit
        </h1>

        <p className="mt-2 text-gray-600">
          Modifiez les informations du produit.
        </p>
      </div>

      <ProductForm
        product={product}
        isEdit={true}
      />
    </div>
  );
}