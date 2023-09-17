const { HttpError } = require("../helpers");
// приймаю схему повертаю функцію валідації
const bodyValidFavorite = (schema) => {
  const validessa = (req, _, next) => {
    if (Object.values(req.body).length === 0) {
      next(HttpError(400, "missing field favorite"));
    }
    const { error } = schema.validate(req.body);
    if (error) {
      // console.log( Object.values(req.body).length === 0)
      next(HttpError(400, error.message));
    }
    next();
  };

  return validessa;
};

module.exports = bodyValidFavorite;