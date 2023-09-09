const { HttpError } = require("../helpers");
// 1
const validateBody = (schema) => {
  const validatorForBody = (req, res, next) => {
    const body = req.body;
    const { error } = schema.validate(body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    }
    next();
  };
  return validatorForBody;
};
module.exports = validateBody;
// 2
