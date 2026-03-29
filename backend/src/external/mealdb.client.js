const axios = require("axios");

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

exports.searchMeals = async (query) => {
  const res = await axios.get(`${BASE_URL}/search.php?s=${query}`);
  return res.data.meals || [];
};

exports.getMealById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  return res.data.meals?.[0];
};