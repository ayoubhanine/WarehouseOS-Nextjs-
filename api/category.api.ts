const API_URL = "/api/categories";

export async function getCategories() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des catégories");
  }

  return response.json();
}