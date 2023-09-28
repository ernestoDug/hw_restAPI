const { HttpError } = require("../../helpers");
const { Users } = require("../../models/userModel");
// з експерементальними версіями ноди не товаришує
const bcrypt = require("bcrypt");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");

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
        avatarURL: user.avatarURL,

      },
    });
  };


  module.exports = login