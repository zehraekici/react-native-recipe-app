const express = require("express"); // Express.js framework’ünü projeye alıyor

const swaggerUi = require("swagger-ui-express");   
const swaggerJsdoc = require("swagger-jsdoc"); 

console.log("Loading recipe routes...");

const recipeRoutes = require("./routes/recipe.routes");
const favoriteRoutes = require("./routes/favorite.routes");


console.log("Recipe routes loaded");

const app = express(); // express instance == backend uygulamasını başlat

app.use(express.json()); // gelen request body'yi JSON a çevir

app.use("/recipes", recipeRoutes); // /recipes ile başlayan tüm istekleri recipe.routes.js dosyasına gönder

app.use("/favorites", favoriteRoutes);


// Swagger config
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipe API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000", // 🔴 EN KRİTİK SATIR
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get("/", (req, res) => {
  res.send("Server works");
});

/* 
ORNEK MAPPING 
GET /recipes == router.get("/")
GET /recipes/123 == router.get("/:id")
*/

//!!!
module.exports = app; // Bu app’i başka dosyalar kullanabilsin (server.js içinde kullanılabiliyor)