const client = require("../external/mealdb.client");
const { transformMeal } = require("../utils/transform");

exports.getRecipes = async () => {
  const mealsMap = new Map();

  // 5 random meal 
  while (mealsMap.size < 5) {
    const meal = await client.getRandomMeal();
    if (meal) {
      mealsMap.set(meal.idMeal, meal);
    }
  }

  return Array.from(mealsMap.values()).map(transformMeal);
};

exports.getRecipeById = async (id) => {
  const meal = await client.getMealById(id);
  return transformMeal(meal);
};