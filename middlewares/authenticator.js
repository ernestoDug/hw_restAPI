const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { Users } = require("../models");

const { SECRET_KEY } = process.env;

const authenticator
= async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) next(HttpError(401));

  try {
    // перевірка терміна життя токена та шифрування
    //  конкретним ключем
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await Users.findById(id);
    if (!user || !user.token || user.token !== token)
    next(HttpError(401,  "Not authorized"));

    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticator;