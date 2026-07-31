const Joi = require("joi");

const addProperty = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      "any.required": "title is required",
      "string.empty": "title is required",
    }),

  description: Joi.string()
    .required()
    .messages({
      "any.required": "description is required",
      "string.empty": "description is required",
    }),

  propertyType: Joi.string()
    .valid("Apartment", "House", "Villa", "Cabin", "Studio")
    .required()
    .messages({
      "any.required": "propertyType is required",
      "any.only": "invalid property type",
    }),

  location: Joi.object({
    country: Joi.string()
      .required()
      .messages({
        "any.required": "Country is required",
        "string.empty": "Country is required",
      }),

    city: Joi.string()
      .required()
      .messages({
        "any.required": "City is required",
        "string.empty": "City is required",
      }),

    address: Joi.string()
      .required()
      .messages({
        "any.required": "Address is required",
        "string.empty": "Address is required",
      }),
  })
    .required()
    .messages({
      "any.required": "location is required",
    }),

  amenities: Joi.array().items(Joi.string()),

  images: Joi.array().items(Joi.string()),

  available: Joi.boolean(),
});


const updateProperty = addProperty.fork(
  [
    "title",
    "description",
    "propertyType",
    "location",
  ],
  (schema) => schema.optional()
);


module.exports = {
  addProperty,
  updateProperty,
};