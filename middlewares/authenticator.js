const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { Users } = require("../models/userModel");

const { SECRET_KEY } = process.env;

const authenticator = async (req, res, next) => {
  // ="" щоб запобігти зламу коли нема токена і був би не сплітемій андефайнд
  const { authorization = "" } = req.headers;
  // сплітемо через "" хедер забираемо слово биарер та сам токен
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) next(HttpError(401, "Not authorized"));
  try {
    // перевірка терміна життя токена та шифрування
    //  конкретним ключем
    const { id } = jwt.verify(token, SECRET_KEY);
    // пошук юзера у базі  
    const user = await Users.findById(id);
    if (!user || !user.token || user.token !== token)
      next(HttpError(401, "Not authorized"));
    // запис користувача у об'єкт відповіді щоб знати хто робить запит
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticator;
