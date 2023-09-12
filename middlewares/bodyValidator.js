const { HttpError } = require('../helpers');
// приймаю схему повертаю функцію валідації
const bodyValidator = schema => {
  const validessa = (req, res, next) => {
    if (req.body.email === undefined && req.body.name === undefined && req.body.phone ===undefined) {
        next (HttpError(400, 'missing fields')); 
          }
    const { error } = schema.validate(req.body);
          if (error) {
        next (HttpError(400, error.message))
    }
    next();
  };

  return validessa;
};



module.exports =  bodyValidator;