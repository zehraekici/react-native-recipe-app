const service = require("../services/recipe.service");

exports.getRecipes = async (req, res, next) => {
  try {
    const data = await service.getRecipes(req.query.q);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getRecipeById = async (req, res, next) => {
  try {
    const data = await service.getRecipeById(req.params.id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

// YENI

exports.getRandomRecipes = async (req, res, next) => {
  try {
    const data = await service.getRecipes(); // senin mevcut fonksiyonun
    res.json(data);
  } catch (err) {
    next(err);
  }
};