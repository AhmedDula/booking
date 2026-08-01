const Joi = require("joi");

const addProperty = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required",
    "string.empty": "Title is required",
  }),

  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description is required",
  }),

  propertyType: Joi.string()
    .valid("Apartment", "House", "Villa", "Cabin", "Studio")
    .required()
    .messages({
      "any.required": "Property type is required",
      "any.only": "Invalid property type",
    }),

  pricePerNight: Joi.number()
    .min(0)
    .required()
    .messages({
      "any.required": "Price per night is required",
      "number.base": "Price per night must be a number",
      "number.min": "Price cannot be negative",
    }),

  location: Joi.object({
    country: Joi.string().required(),

    city: Joi.string().required(),

    address: Joi.string().required(),
  }).required(),

  amenities: Joi.array().items(Joi.string()).default([]),

  images: Joi.array().items(Joi.string()).default([]),

  available: Joi.boolean().default(true),
});

const updateProperty = addProperty.fork(
  [
    "title",
    "description",
    "propertyType",
    "pricePerNight",
    "location",
  ],
  (schema) => schema.optional()
);

module.exports = {
  addProperty,
  updateProperty,
};