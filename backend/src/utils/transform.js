exports.transformMeal = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];

    if (ing && ing.trim()) {
      ingredients.push({ name: ing, measure: meas });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    ingredients
  };
};