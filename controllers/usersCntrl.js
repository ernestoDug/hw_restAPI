// з експерементальними версіями ноди не товаришує
const bcrypt = require("bcrypt");

const { Users } = require("../models/userModel");
// wrapperCntrl відловлює помилки замість сотні трайкетчів 
const { wrapperCntrl, HttpError } = require("../helpers");

// контролер регістрації
const register = async (req, res) => {
  const { email, password } = req.body;
  // 1й запит для перевірки имейлу в базі
  const user = await Users.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  // хешування пароля* 10 - сіль, для випадкових сиmволів
    const hashPassword = await bcrypt.hash(password, 10);
    // для  свіряння при вводі пароля 
    // const comparePassword = await bcrypt.compare(password, hashPassword);
    // ********************************************************************
  // запит на створення юзера
    const newUser = await Users.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription, 
    },
  });
};

// контролер логинизації




// const login = async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) throw HttpError(401, "Email or password is wrong");
  
//     const passCompare = await bcrypt.compare(password, user.password);
//     if (!passCompare) throw HttpError(401, "Email or password is wrong");
  
//     const payload = {
//       id: user._id, 
//     };
//     const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
//     await User.findOneAndUpdate(user._id, { token });
  
//     res.json({
//       token,
//       user: {
//         email: user.email,
//         subscription: user.subscription,
//       },
//     });
//   };





//   wrapperCntrl для помилок
  module.exports = {
    // login: wrapperCntrl(login),
    register: wrapperCntrl(register),
    // getContatAdd: wrapperCntrl(getContatAdd),
    // getRemoveContact: wrapperCntrl(getRemoveContact),
    // getContactUpdate: wrapperCntrl(getContactUpdate),
    // updateStatusContact : wrapperCntrl(updateStatusContact ),
  };