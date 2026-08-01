const Joi = require("joi");

const addReview = Joi.object({
  rating: Joi.number()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string()
    .required(),


  property: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/).required(),
});

const updateReview = Joi.object({
  rating: Joi.number()
    .min(1)
    .max(5).required(),

  comment: Joi.string()
    .optional().required()
  

 
});

module.exports = {
  addReview,
  updateReview
};