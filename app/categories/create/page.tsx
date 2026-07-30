import CategoryForm from "@/components/categories/CategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Ajouter une catégorie
        </h1>

        <p className="mt-2 text-gray-600">
          Remplissez les informations de la catégorie.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}