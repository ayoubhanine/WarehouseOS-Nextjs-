"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { archiveProduct } from '@/api/product.api';
import { Product } from '@/types/product';

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const router = useRouter();

  // async function handleArchive(id: string) {
  //   if (!confirm('Archiver ce produit ?')) return;

  //   await archiveProduct(id);
  //   router.refresh();
  // }
  async function handleArchive(id: string) {
  if (!confirm("Archiver ce produit ?")) {
    return;
  }

  try {
    await archiveProduct(id);
    router.refresh();
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'archivage du produit.");
  }
}

  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">SKU</th>
            <th className="p-3 text-left">Catégorie</th>
            <th className="p-3 text-left">Prix</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-t">
              <td className="p-3 font-medium">{product.name}</td>
              <td className="p-3">{product.sku}</td>
              <td className="p-3">{product.category?.name}</td>
              <td className="p-3">{product.price} MAD</td>
              <td className="p-3">{product.quantity}</td>

              <td className="p-3">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Voir
                  </Link>

                  <Link
                    href={`/products/${product._id}/edit`}
                    className="text-orange-600 hover:underline"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() => handleArchive(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Archiver
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}