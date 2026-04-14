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