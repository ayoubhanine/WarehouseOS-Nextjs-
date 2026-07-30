// const API_URL = "/api/movements";

// export async function getMovements() {
//   const response = await fetch(API_URL);

//   if (!response.ok) {
//     throw new Error("Erreur lors du chargement des mouvements");
//   }

//   return response.json();
// }

// export async function createMovement(data: {
//   product: string;
//   type: "IN" | "OUT";
//   quantity: number;
//   note?: string;
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

const API_URL = "/api/movements";

export async function getMovements() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      "Erreur lors du chargement des mouvements"
    );
  }

  return response.json();
}

export async function createMovement(data: {
  product: string;
  type: "IN" | "OUT";
  quantity: number;
  note?: string;
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