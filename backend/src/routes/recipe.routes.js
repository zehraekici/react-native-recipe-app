const express = require("express");
const router = express.Router();

const controller = require("../controllers/recipe.controller");

/**
 * @swagger
 * /recipes/random:
 *   get:
 *     summary: Get 5 random recipes
 */
router.get("/random", controller.getRandomRecipes); 
router.get("/", controller.getRecipes); // GET /recipes
router.get("/:id", controller.getRecipeById);

module.exports = router;

