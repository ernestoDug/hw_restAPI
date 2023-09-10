const Joi = require("joi");

// // для вимог до полів боді
const addShema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().max(18).required(),
});

module.exports = {
  addShema,
};
