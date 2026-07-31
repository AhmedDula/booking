
const ApiError = require('../utils/ApiError');

// Usage in a route:
//   const schema = Joi.object({ email: Joi.string().email().required() });
//   router.post('/', validate(schema), controller)
//
// Validates req.body by default. Pass a second arg to validate a different
// part of the request, e.g. validate(schema, 'query') or validate(schema, 'params').
const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,   // collect all errors, not just the first
    stripUnknown: true,  // drop fields not defined in the schema
  });

  if (!error) {
    req[property] = value; // use the validated (and coerced/stripped) value
    return next();
  }

  const message = error.details
    .map((d) => `${d.path.join('.')}: ${d.message}`)
    .join(', ');

  next(ApiError.badRequest(message));
};

module.exports = validate;

