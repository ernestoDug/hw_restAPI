const { HttpError } = require("../../helpers");
const { Users } = require("../../models/userModel");
const bcrypt = require("bcrypt");


// 1 контролер регістрації
const register = async (req, res) => {
  const { email, password } = req.body;
  // 1й запит для перевірки имейлу в базі
  const user = await Users.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  // хешування пароля* 10 - сіль, для випадкових сиmволів
  const hashPassword = await bcrypt.hash(password, 10);
  // запит на створення юзера
  const newUser = await Users.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};


module.exports = register