const Joi = require("joi");

const addReview = Joi.object({
  rating: Joi.number()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string()
    .required(),

  user: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/),

  property: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/),
});

module.exports = addReview;