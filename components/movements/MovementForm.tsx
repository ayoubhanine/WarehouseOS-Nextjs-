"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { createMovement } from "@/api/movement.api";
import { getProducts } from "@/api/product.api";
import { Product } from "@/types/product";

interface MovementFormData {
  product: string;
  type: "IN" | "OUT";
  quantity: number;
  note: string;
}

interface ValidationErrors {
  product?: string[];
  type?: string[];
  quantity?: string[];
  note?: string[];
}

export default function MovementForm() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);

  const [formData, setFormData] =
    useState<MovementFormData>({
      product: "",
      type: "IN",
      quantity: 1,
      note: "",
    });

  const [errors, setErrors] =
    useState<ValidationErrors>({});

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProducts();
  }, []);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantity"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setLoading(true);

    try {
      await createMovement(formData);

      router.refresh();

      setFormData({
        product: "",
        type: "IN",
        quantity: 1,
        note: "",
      });
          } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error
      ) {
        setErrors(
          (error as {
            errors: ValidationErrors;
          }).errors
        );
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        alert((error as { message: string }).message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 space-y-6 rounded-lg border bg-white p-6 shadow"
    >

      <div>
        <label className="mb-1 block text-sm font-medium">
          Produit
        </label>

        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="w-full rounded border p-2"
        >
          <option value="">
            -- Sélectionner un produit --
          </option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.name}
            </option>
          ))}
        </select>

        {errors.product && (
          <p className="mt-1 text-sm text-red-500">
            {errors.product[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Type de mouvement
        </label>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full rounded border p-2"
        >
          <option value="IN">
            Entrée
          </option>

          <option value="OUT">
            Sortie
          </option>
        </select>

        {errors.type && (
          <p className="mt-1 text-sm text-red-500">
            {errors.type[0]}
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
          min={1}
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

      <div>
        <label className="mb-1 block text-sm font-medium">
          Note (optionnelle)
        </label>

        <textarea
          name="note"
          rows={4}
          value={formData.note}
          onChange={handleChange}
          className="w-full rounded border p-2"
          placeholder="Ajouter une note..."
        />

        {errors.note && (
          <p className="mt-1 text-sm text-red-500">
            {errors.note[0]}
          </p>
        )}
      </div>
            <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() =>
            setFormData({
              product: "",
              type: "IN",
              quantity: 1,
              note: "",
            })
          }
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Réinitialiser
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer le mouvement"}
        </button>

      </div>

    </form>
  );
}