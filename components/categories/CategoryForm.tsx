"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createCategory,
  updateCategory,
} from "@/api/category.api";
import { Category } from "@/types/category";

interface CategoryFormProps {
  category?: Category;
  isEdit?: boolean;
}

interface CategoryFormData {
  name: string;
  description: string;
}

interface ValidationErrors {
  name?: string[];
  description?: string[];
}

export default function CategoryForm({
  category,
  isEdit = false,
}: CategoryFormProps) {
  const router = useRouter();

  const [formData, setFormData] =
    useState<CategoryFormData>({
      name: category?.name ?? "",
      description: category?.description ?? "",
    });

  const [errors, setErrors] =
    useState<ValidationErrors>({});

  const [loading, setLoading] =
    useState(false);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setLoading(true);

    try {
      if (isEdit && category) {
        await updateCategory(
          category._id,
          formData
        );
      } else {
        await createCategory(formData);
      }

      router.push("/categories");
      router.refresh();
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
      className="space-y-6 rounded-lg border bg-white p-6 shadow"
    >      <div>
        <label className="mb-1 block text-sm font-medium">
          Nom
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nom de la catégorie"
          className="w-full rounded border p-2"
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Description de la catégorie"
          className="w-full rounded border p-2"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={() => router.push("/categories")}
          className="rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Enregistrement..."
            : isEdit
            ? "Modifier"
            : "Ajouter"}
        </button>

      </div>    </form>
  );
}