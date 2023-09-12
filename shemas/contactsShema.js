const Joi = require("joi");

// // для вимог до полів боді
const addShema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of 3 of symbol`,
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": `"email" should be a type of 'text and must belong to the domain .com or .net'`,
      "any.required": `missing required "email" field`,
    }),
  phone: Joi.string().max(18).required().messages({
    "string.base": `"phone" should be a type of 'string'`,
    "string.min": `"phone" should have a min  length of 18 symbol`,
    "any.required": `missing required "phone" field`,
  }),
});

module.exports = {
  addShema,
};

// ,`missing required ${error.details[0].path[0]} field`
