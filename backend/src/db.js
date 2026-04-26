const { Pool } = require("pg");

const pool = new Pool(); // otomatik .env'den okur

module.exports = pool;