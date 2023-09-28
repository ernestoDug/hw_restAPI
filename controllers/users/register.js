const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { HttpError } = require("../../helpers");
const { Users } = require("../../models/userModel");

// 1 контролер регістрації
const register = async (req, res) => {
  const { email, password } = req.body;
  // 1й запит для перевірки имейлу в базі
  const user = await Users.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  // хешування пароля* 10 - сіль, для випадкових сиmволів
  const hashPassword = await bcrypt.hash(password, 10);
  // авка новому юзеру
  const avatarURL = gravatar.url(email);
  //  створення юзера авкою
  const newUser = await Users.create(
    { ...req.body, 
    password: hashPassword,
    avatarURL,
    });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};


module.exports = register