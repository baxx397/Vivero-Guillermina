// src/services/api.js
export const API_URL = "https://690a0ff21a446bb9cc213245.mockapi.io/Vivero-Guillermina/products";

export async function getProducts() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}
