// монгус  валідує допуск у  базу
// джої валідує тіло
const Joi = require("joi");

const mongoose = require("mongoose");
const { mongooseError } = require("../helpers");

// const phoneRegexp = /^(\d{3})[[:space:]]\d{3}-\d{4}$/;

// схема  монгуса
const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // match: phoneRegexp,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  // обєкт налаштувань
  { versionKey: false, timestamps: true }
);

// м/в для викиду статусниx помилок
contactsSchema.post("save", mongooseError);

// модель (колекція,  валідаційна схема)
const Contacts = mongoose.model("contacts", contactsSchema);

// джої схема
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
  phone: Joi.string().max(18)
  .required()
  .messages({
    "string.base": `"phone" should be a type of 'string'`,
    "string.min": `"phone" should have a min  length of 18 symbol`,
    "any.required": `missing required "phone" field`,
  }),
  favorite: Joi.boolean()
  .required()
  .messages({
    "any.required": `missing field favorite`,
  }),
});

module.exports = {
  addShema,
  Contacts,
};

// ,`missing required ${error.details[0].path[0]} field`
