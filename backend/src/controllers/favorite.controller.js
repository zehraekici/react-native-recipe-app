const service = require("../services/favorite.service");

exports.getFavorites = async (req, res, next) => {
  try {
    res.json(await service.getFavorites());
  } catch (e) {
    next(e);
  }
};

exports.toggleFavorite = async (req, res, next) => {
  try {
    res.json(await service.toggleFavorite(req.body));
  } catch (e) {
    next(e);
  }
};