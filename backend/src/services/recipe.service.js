const client = require("../external/mealdb.client");
const { transformMeal } = require("../utils/transform");

exports.getRecipes = async (q) => {
  if (q && q.trim()) {
    const meals = await client.searchMeals(q);

    return meals.map(transformMeal);
  }

  const meals = [];

  for (let i = 0; i < 5; i++) {
    const meal = await client.getRandomMeal();

    if (meal) {
      meals.push(meal);
    }
  }

  return meals.map(transformMeal);
};

exports.getRecipeById = async (id) => {
  const meal = await client.getMealById(id);

  if (!meal) {
    return null;
  }

  return transformMeal(meal);
};