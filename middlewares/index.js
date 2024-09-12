const bodyValidator = require("./bodyValidator");
const bodyValidFavorite = require("./bodyValidFavorite");
const idValidator = require("./idValidator");
const authenticator = require("./authenticator");
const fileLoader = require("./fileLoader");


module.exports = {
    bodyValidator, 
    bodyValidFavorite, 
    idValidator,
    authenticator,
    fileLoader,
}