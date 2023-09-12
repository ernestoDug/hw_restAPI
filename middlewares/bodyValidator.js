const { HttpError } = require('../helpers');
// приймаю схему повертаю функцію валідації
const bodyValidator = schema => {
  const validessa = (req, res, next) => {
    const { error } = schema.validate(req.body);
       if (error) {
        next (HttpError(400,`missing required ${error.details[0].path[0]} field`))
      }
    next();
  };

  return validessa;
};



module.exports =  bodyValidator;