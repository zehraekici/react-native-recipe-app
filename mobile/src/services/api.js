const BASE_URL = "http://10.0.2.2:3000"; // ?

export async function fetchRecipes(query = "chicken") {
  const res = await fetch(`${BASE_URL}/recipes?q=${query}`);
  return res.json();
}

export async function fetchRecipeById(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`);
  return res.json();
}