const router = require("express").Router();
const c = require("../controllers/favorite.controller");

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Favorite recipes
 */

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorite recipes
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of favorites
 */
router.get("/", c.getFavorites);          // GET /favorites

/**
 * @swagger
 * /favorites/toggle:
 *   post:
 *     summary: Toggle favorite (add/remove)
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, title, image]
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Toggled successfully
 */
router.post("/toggle", c.toggleFavorite); // POST /favorites/toggle

module.exports = router;