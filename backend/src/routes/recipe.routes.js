const express = require("express");
const router = express.Router();

const controller = require("../controllers/recipe.controller");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe endpoints
 */

/**
 * @swagger
 * /recipes/random:
 *   get:
 *     summary: Get 5 random recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/random", controller.getRandomRecipes); 

/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get recipes (optional search)
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of recipes
 */
router.get("/", controller.getRecipes); // GET /recipes

/**
 * @swagger
 * /recipes/{id}:
 *   get:
 *     summary: Get recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe detail
 *       404:
 *         description: Not found
 */
router.get("/:id", controller.getRecipeById);

module.exports = router;

