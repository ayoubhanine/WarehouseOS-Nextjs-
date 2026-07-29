"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/api/product.api";
import { Product } from "@/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Produits
      </h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-3">Nom</th>
            <th className="border p-3">SKU</th>
            <th className="border p-3">Catégorie</th>
            <th className="border p-3">Prix</th>
            <th className="border p-3">Stock</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border p-3">{product.name}</td>
              <td className="border p-3">{product.sku}</td>
              <td className="border p-3">
                {product.category.name}
              </td>
              <td className="border p-3">
                {product.price} MAD
              </td>
              <td className="border p-3">
                {product.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}