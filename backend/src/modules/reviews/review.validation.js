const Joi = require("joi");

const addReview = Joi.object({
  rating: Joi.number()
    .min(1)
    .max(5)
    .required(),

  comment: Joi.string()
    .required(),


  
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