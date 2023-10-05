const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
require("dotenv").config();
const { nanoid } = require("nanoid");

const { HttpError, sendEmail } = require("../../helpers");
const { Users } = require("../../models/userModel");

const { BASE_URL } = process.env;

// 1 контролер регістрації
const register = async (req, res) => {
  const { email, password } = req.body;
  // 1й запит для перевірки имейлу в базі
  const user = await Users.findOne({ email });
  if (user) throw HttpError(409, "Email in use");
  // хешування пароля* 10 - сіль, для випадкових сиmволів
  const hashPassword = await bcrypt.hash(password, 10);
  // шаблонна авка новому юзеру
  const avatarURL = gravatar.url(email);
  // токен для підвтердженн імейла
  const verificationToken = nanoid();


  //  створення юзера з шаблонною авкою
  const newUser = await Users.create(
    { ...req.body, 
    password: hashPassword,
    avatarURL,
    verificationToken,
    });
// відправка листа новому юзеру
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<h5>hi, friend, please</h5> <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">click for verufy email</a>`,
    };

    await sendEmail(verifyEmail);


  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};


module.exports = register