const pool = require("../db");

exports.getFavorites = async () => {
  const res = await pool.query(
    "SELECT recipe_id AS id, title, image FROM favorites ORDER BY created_at DESC"
  );
  return res.rows;
};

exports.toggleFavorite = async ({ id, title, image }) => {
  const exists = await pool.query(
    "SELECT 1 FROM favorites WHERE recipe_id = $1",
    [id]
  );

  if (exists.rowCount > 0) {
    await pool.query(
      "DELETE FROM favorites WHERE recipe_id = $1",
      [id]
    );
    return { removed: true };
  }

  await pool.query(
    "INSERT INTO favorites (recipe_id, title, image) VALUES ($1, $2, $3)",
    [id, title, image]
  );

  return { added: true };
};