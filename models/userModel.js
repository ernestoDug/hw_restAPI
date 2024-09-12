const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { mongooseError } = require("../helpers");

const emailRegexp = /.+@.+\../;

const paswRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

// Типи підписки
const SUBSCRIPTIONS = ["starter", "pro", "business"];

// схема  Mонгуса юзеров
const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      // для контроля унікальності в колекції
      // після додавання першой спроби
      // в монгоДБ компас зайти в індекс
      // перевірити чи створилося те що унікальне
      // якщо ні тоді криат индекс обрати тип любий
      // а в оптионс обрати криат уникум індекс
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: {
        values: [...SUBSCRIPTIONS],
        message: `have only ${SUBSCRIPTIONS.join(", ")}`,
      },
      default: "starter",
    },
    avatarURL: String,
    token: String,
    // для веріфікації имейла 
    verify: {
      type: Boolean,
      default: false,
    },
        // токен для веріфікації имейла 
    verificationToken: {
      type: String,
      required: [true, "Veriffy token is required"],
    },
  },
  // обєкт налаштувань щоб без версій та було створено/онволено
  { versionKey: false, timestamps: true }
);
// м/в для викиду статусниx помилок
userSchema.post("save", mongooseError);

// модель (колекція,  валідаційна схема)
const Users = model("users", userSchema);

// джої схема для регістрації
const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base":
      "Email may contain letters, numbers, '@'For example Sherlok@ukr.ua, watson@gmail.net, lastradeD@mail.com",
  }),
  password: Joi.string()
    .min(6)
    .max(15)
    .pattern(paswRegexp)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters. Example Xxx489, 8Xxxxx.",
    }),
  subscription: Joi.string(),
});
// джої схема для логіна
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base":
      "Email may contain letters, numbers, '@'For example Sherlok@ukr.ua, watson@gmail.net, lastradeD@mail.com",
  }),
  password: Joi.string()
    .min(6)
    .max(12)
    .pattern(paswRegexp)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters. Example Xxx489, 8Xxxxx.",
    }),
});
// джої схема для зміни підписки
const updateSubsSchema = Joi.object({
  subscription: Joi.string().required(),
});
// джої схема для пошти
const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base":
    "Email may contain letters, numbers, '@'For example Sherlok@ukr.ua, watson@gmail.net, lastradeD@mail.com",
  }),
})




// схемоХаб
const userSchemas = {
  registerSchema,
  loginSchema,
  updateSubsSchema,
  emailSchema,
};

module.exports = { Users, userSchemas };
