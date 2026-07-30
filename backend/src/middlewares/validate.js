const ApiError = require("../utils/ApiError");

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    next();
  } catch (err) {
    next(new ApiError(400, err.errors.join(", ")));
  }
};

module.exports = validate;
