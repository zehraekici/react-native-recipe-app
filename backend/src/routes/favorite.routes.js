/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites
 *     responses:
 *       200:
 *         description: List of favorites
 */

/**
 * @swagger
 * /favorites/toggle:
 *   post:
 *     summary: Toggle favorite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Toggle result
 */

const router = require("express").Router();
const c = require("../controllers/favorite.controller");

router.get("/", c.getFavorites);          // GET /favorites
router.post("/toggle", c.toggleFavorite); // POST /favorites/toggle

module.exports = router;