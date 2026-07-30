"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Product, Category } from "@/types/product";
import {
  createProduct,
  updateProduct,
} from "@/api/product.api";
import { getCategories } from "@/api/category.api";

interface ProductFormProps {
  product?: Product;
  isEdit?: boolean;
}

export default function ProductForm({
  product,
  isEdit = false,
}: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Record<string, string[]>
  >({});

  const [formData, setFormData] = useState({
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    description: product?.description ?? "",
    category: product?.category?._id ?? "",
    price: product?.price ?? 0,
    quantity: product?.quantity ?? 0,
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadCategories();
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "quantity"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setErrors({});

    try {
      if (isEdit && product) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }

      router.push("/products");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg bg-white p-6 shadow"
    >

         <div>
        <label className="mb-1 block text-sm font-medium">
          Nom
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Nom du produit"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          SKU
        </label>

        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Référence"
        />

        {errors.sku && (
          <p className="mt-1 text-sm text-red-500">
            {errors.sku[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Description du produit"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Catégorie
        </label>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded border p-2"
        >
          <option value="">
            Sélectionner une catégorie
          </option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category[0]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
                <div>
          <label className="mb-1 block text-sm font-medium">
            Prix
          </label>

          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Quantité
          </label>

          <input
            type="number"
            name="quantity"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />

          {errors.quantity && (
            <p className="mt-1 text-sm text-red-500">
              {errors.quantity[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="rounded bg-gray-300 px-4 py-2 transition hover:bg-gray-400"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Enregistrement..."
            : isEdit
            ? "Modifier"
            : "Ajouter"}
        </button>
      </div>
    </form>
  );
}