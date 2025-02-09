// з експерементальними версіями ноди не товаришує
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { Users } = require("../models/userModel");
// wrapperCntrl відловлює помилки замість сотні трайкетчів
const { wrapperCntrl, HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

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
// 2 контролер логинизації
const login = async (req, res) => {
  const { email, password } = req.body;
  // запит на правильність имейла
  const user = await Users.findOne({ email });
  if (!user) throw HttpError(401, "Email or password is wrong");
  // для  свіряння при вводі пароля введеного та хешованого
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw HttpError(401, "Email or password is wrong");
  // payload
  const payload = {
    id: user._id,
  };
  // створення токена
  const token = jwt.sign(
    payload,
    SECRET_KEY,
    // об єкт налаштувань токена з терміном життя
    { expiresIn: "15h" }
  );
  // запис токена у базу щоб видаляти при логауті
  await Users.findOneAndUpdate(user._id, { token });
  // відправлення токена
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};
// 3 контролер пошук айди юз разлогіненн
const logout = async (req, res) => {
  const { _id } = req.user;
  // видаляння токену з бази
  await Users.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

// 4 конролер пошук даних користувача за валідним токеном
const getCurrent = async (req, res) => {
  // взяти з рекв юз данні що в м/в аутенификатор
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

// 5 зміна підписки
const updateSubscr = async (req, res) => {
  const { _id } = req.user;
  if (!req.body) throw HttpError(400, "missing field subscription");

  const { email, subscription } = await Users.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!email || !subscription) throw HttpError(404, "Not found");

  res.status(201).json({ email, subscription });
};

//   wrapperCntrl для хапання помилок
module.exports = {
  login: wrapperCntrl(login),
  register: wrapperCntrl(register),
  logout: wrapperCntrl(logout),
  getCurrent: wrapperCntrl(getCurrent),
  updateSubscr: wrapperCntrl(updateSubscr),
};
