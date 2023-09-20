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
    const { 
      email,
      password } = req.body;
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
      { expiresIn: "10h" });
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





//   wrapperCntrl для хапання помилок
  module.exports = {
    login: wrapperCntrl(login),
    register: wrapperCntrl(register),
    // getContatAdd: wrapperCntrl(getContatAdd),
    // getRemoveContact: wrapperCntrl(getRemoveContact),
    // getContactUpdate: wrapperCntrl(getContactUpdate),
    // updateStatusContact : wrapperCntrl(updateStatusContact ),
  };