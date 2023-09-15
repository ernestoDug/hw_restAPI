// монгус  валідує допуск у  базу
// джої валідує тіло
const Joi = require("joi");

const mongoose = require("mongoose");
const { mongooseError } = require("../helpers");
// регулярки
const nameRegexp = /^([a-zA-Z])/;
const phoneRegexp = /^[:(:]\d{3}[:):]\s\d{3}-\d{4}$/;
const emailRegexp = /.+@.+\../;
// схема  Mонгуса
const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: true,
     },
    phone: {
      type: String,
      match: phoneRegexp,
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
  name: Joi.string().min(3).max(20)
  .pattern(nameRegexp, "Correct Example: (Dik or dik  but dont 8dic...)" )
  .required()
  .messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of 3 of symbol`,
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .pattern(emailRegexp, "Correct example: (shsrlok@hol.com or shsrlok@hol.net)")
    .required()
    .messages({
      "string.base": `"email" should be a type of 'text and must belong to the domain .com or .net'`,
      "any.required": `missing required "email" field`,
    }),
  phone: Joi.string().max(18)
  .pattern(phoneRegexp)
  .required()
  .messages({
    "string.base": `"phone" should be a type of 'string'`,
    "string.min": `"phone" should have a min  length of 18 symbol`,
    "any.required": `missing required "phone" field`,
  }),
});

// схема для патча фейворіт
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addShema,
  Contacts,
  favoriteSchema
};

// універсальне поле 
// ,`missing required ${error.details[0].path[0]} field`
