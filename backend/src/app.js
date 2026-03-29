const express = require("express"); // Express.js framework’ünü projeye alıyor
const recipeRoutes = require("./routes/recipe.routes");

const app = express(); // express instance == backend uygulamasını başlat

app.use(express.json()); // gelen request body'yi JSON a çevir

app.use("/recipes", recipeRoutes); // /recipes ile başlayan tüm istekleri recipe.routes.js dosyasına gönder

/* 
ORNEK MAPPING 
GET /recipes == router.get("/")
GET /recipes/123 == router.get("/:id")
*/

//!!!
module.exports = app; // Bu app’i başka dosyalar kullanabilsin (server.js içinde kullanılabiliyor)