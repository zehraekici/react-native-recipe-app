const express = require("express");
const router = express.Router();

const controller = require("../controllers/recipe.controller");

router.get("/", controller.getRecipes); // GET /recipes
router.get("/:id", controller.getRecipeById);

module.exports = router;

