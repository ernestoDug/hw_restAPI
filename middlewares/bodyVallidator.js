const { HttpError } = require('../helpers');


const bodyVallidator = schema => {
  const vallidessa = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (req.body.email === undefined && req.body.name === undefined && req.body.phone ===undefined) {
        next (HttpError(400, 'missing fields'));
          }
            if (error) {
        next (HttpError(400,`missing required ${error.details[0].path[0]} field`));
      }
    
    next();
  };

  return vallidessa;
};

module.exports =  bodyVallidator;