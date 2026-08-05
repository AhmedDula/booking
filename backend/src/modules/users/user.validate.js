const {
  validateCreate,
  validateUpdate,
} = require("./user.validation");

const validateCreateUser = (req, res, next) => {
  const errors = validateCreate(req.body);

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
    
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const errors = validateUpdate(req.body);

  if (errors.length) {
    return res.status(400).json({
      success: false,
      errors,
    });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};