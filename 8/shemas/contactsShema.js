const Joi = require("joi");

// // для вимог до полів боді
const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  addShema,
};
