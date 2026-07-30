// const API_URL = "/api/categories";

// export async function getCategories() {
//   const response = await fetch(API_URL);

//   if (!response.ok) {
//     throw new Error("Erreur lors du chargement des catégories");
//   }

//   return response.json();
// }

const API_URL = "/api/categories";

export async function getCategories() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Erreur lors du chargement des catégories"
    );
  }

  return response.json();
}

export async function getCategory(id: string) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Catégorie introuvable");
  }

  return response.json();
}

export async function createCategory(data: {
  name: string;
  description: string;
}) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function updateCategory(
  id: string,
  data: {
    name: string;
    description: string;
  }
) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}

export async function archiveCategory(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(
      "Erreur lors de l'archivage de la catégorie"
    );
  }

  return response.json();
}