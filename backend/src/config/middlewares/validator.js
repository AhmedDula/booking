const validator = (schema) => async (req, res, next) => {
  try {
    const validated = await schema.validate(req.body, { abortEarly: false });
    req.body = validated;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      errors: err.errors,
    });
  }
};

module.exports = validator;