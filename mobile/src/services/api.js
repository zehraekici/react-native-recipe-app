const BASE_URL = "http://10.0.2.2:3000"; // ?

// 🔴 RANDOM RECIPES
export async function fetchRecipes() {
  const res = await fetch(`${BASE_URL}/recipes/random`);
  return res.json();
}

// 🔴 DETAIL
export async function fetchRecipeById(id) {
  const res = await fetch(`${BASE_URL}/recipes/${id}`);
  return res.json();
}

// SEARCH
export async function searchRecipes(query) {
  const res = await fetch(
    `${BASE_URL}/recipes?q=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Search failed");
  }

  return data;
}

// 🔴 FAVORITES
export async function fetchFavorites() {
  const res = await fetch(`${BASE_URL}/favorites`);
  return res.json();
}

// 🔴 TOGGLE
export async function toggleFavorite(recipe) {
  const res = await fetch(`${BASE_URL}/favorites/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
    }),
  });

  return res.json();
}