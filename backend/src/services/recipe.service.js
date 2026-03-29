const client = require("../external/mealdb.client");
const { transformMeal } = require("../utils/transform");

exports.getRecipes = async (query) => {
  const meals = await client.searchMeals(query || "chicken");
  return meals.map(transformMeal);
};

exports.getRecipeById = async (id) => {
  const meal = await client.getMealById(id);
  return transformMeal(meal);
};