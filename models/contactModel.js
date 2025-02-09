// монгус  валідує допуск у  базу
// джої валідує тіло
const Joi = require("joi");

const { Schema, model } = require("mongoose");

const { mongooseError } = require("../helpers");
// регулярки
const nameRegexp = /^([a-zA-Z])/;
const phoneRegexp = /^[:(:]\d{3}[:):]\s\d{3}-\d{4}$/;
const emailRegexp = /.+@.+\../;
// схема  Mонгуса
const contactsSchema = new Schema(
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
    // властивість для id власника для приватизації
    owner: {
      type: Schema.Types.ObjectId,
      // колекція
      ref: "users",
      required: [true, "Contact must have an owner"],
    },
  },
  // обєкт налаштувань щоб без версій та біло коли створено та онволено
  { versionKey: false, timestamps: true }
);

// м/в для викиду статусниx помилок
contactsSchema.post("save", mongooseError);

// модель (колекція,  валідаційна схема)
const Contacts = model("contacts", contactsSchema);

// джої схема
const addShema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .pattern(nameRegexp, "Correct: (Dik or dik  but dont 5dic...)")
    .required()
    .messages({
      "string.base": `"name" should be a type of 'text'`,
      "string.min": `"name" should have a minimum length of 3 of symbol`,
      "any.required": `missing required "name" field`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .pattern(emailRegexp, "Correct: shsrlok@hol.com or ...net or ...ua")
    .required()
    .messages({
      "string.base": `"email" should be a type of 'text and must belong to the domain .com or .net'`,
      "any.required": `missing required "email" field`,
    }),
  phone: Joi.string()
    .max(18)
    .pattern(phoneRegexp, "correct: (xxx) xxx-xxxx")
    .required()
    .messages({
      "string.base": `"phone" should be a type of 'string'`,
      "any.required": `missing required "phone" field`,
    }),
});

// схема для патча фейворіт
const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
  }),
});
module.exports = {
  addShema,
  Contacts,
  favoriteSchema,
};

// універсальне поле
// ,`missing required ${error.details[0].path[0]} field`
