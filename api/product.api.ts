// const API_URL = "/api/products";

// export async function getProducts() {
//   const response = await fetch(API_URL);

//   if (!response.ok) {
//     throw new Error("Erreur lors de la récupération des produits");
//   }

//   return response.json();
// }

// export async function getProduct(id: string) {
//   const response = await fetch(`${API_URL}/${id}`);

//   if (!response.ok) {
//     throw new Error("Produit introuvable");
//   }

//   return response.json();
// }

// export async function createProduct(data: {
//   name: string;
//   sku: string;
//   description: string;
//   category: string;
//   price: number;
//   quantity: number;
// }) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return response.json();
// }

// export async function updateProduct(id: string, data: object) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   return response.json();
// }

// export async function archiveProduct(id: string) {
//   const response = await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });

//   return response.json();
// }
const API_URL = "/api/products";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des produits");
  }

  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Produit introuvable");
  }

  return response.json();
}

export async function createProduct(data: {
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
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

export async function updateProduct(
  id: string,
  data: {
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
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

export async function archiveProduct(id: string) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'archivage");
  }

  return response.json();
}