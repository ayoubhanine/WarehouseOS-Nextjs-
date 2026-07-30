import ProductForm from "@/components/products/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Ajouter un produit
        </h1>

        <p className="mt-2 text-gray-600">
          Remplissez les informations du produit pour l'ajouter à l'entrepôt.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}