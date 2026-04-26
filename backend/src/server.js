require("dotenv").config(); // YENI 

const app = require("./app");

const PORT = 3000;

console.log("Starting server...");

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
// });

// IMPORTANT: assign to variable
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// ADD THIS
server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});

//YENI
const pool = require("./db");

pool.query("SELECT NOW()")
  .then(res => console.log("DB OK:", res.rows[0]))
  .catch(err => console.error("DB ERROR:", err));