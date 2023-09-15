const { HttpError } = require("../helpers");
// приймаю схему повертаю функцію валідації
const bodyValidator = (schema) => {
  const validessa = (req, _, next) => {
    if (Object.values(req.body).length === 0) {
      next(HttpError(400, "missing fields"));
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

module.exports = bodyValidator;
