const Joi = require("joi");

const mongoId = /^[0-9a-fA-F]{24}$/;

const createRoomValidation = Joi.object({
  property: Joi.string()
    .required()
    .pattern(mongoId)
    .messages({
      "string.empty": "Room property is required",
      "string.pattern.base": "Property must be a valid Mongo id",
      "any.required": "Room property is required",
    }),

  name: Joi.string()
    .required()
    .min(3)
    .messages({
      "string.empty": "Room name is required",
      "string.min": "Room name must be at least 3 characters",
      "any.required": "Room name is required",
    }),

  description: Joi.string()
    .required()
    .messages({
      "string.empty": "Room description is required",
      "any.required": "Room description is required",
    }),

  price: Joi.number()
    .required()
    .positive()
    .messages({
      "number.positive": "Price must be greater than 0",
      "any.required": "Price is required",
    }),

  maxGuests: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.min": "Maximum guests must be at least 1",
      "any.required": "Maximum guests is required",
    }),

  beds: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.min": "Beds must be at least 1",
      "any.required": "Beds are required",
    }),

  bathrooms: Joi.number()
    .required()
    .min(1)
    .messages({
      "number.min": "Bathrooms must be at least 1",
      "any.required": "Bathrooms are required",
    }),

  roomSize: Joi.number()
    .required()
    .positive()
    .messages({
      "number.positive": "Room size must be positive",
      "any.required": "Room size is required",
    }),

  images: Joi.array()
    .items(Joi.string())
    .optional(),

  amenities: Joi.array()
    .items(Joi.string())
    .optional(),

  available: Joi.boolean()
    .optional(),
});

const updateRoomValidation = Joi.object({
  property: Joi.string()
    .optional()
    .pattern(mongoId)
    .messages({
      "string.pattern.base": "Property must be a valid Mongo id",
    }),

  name: Joi.string()
    .optional()
    .min(3)
    .messages({
      "string.min": "Room name must be at least 3 characters",
    }),

  description: Joi.string()
    .optional(),

  price: Joi.number()
    .optional()
    .positive()
    .messages({
      "number.positive": "Price must be greater than 0",
    }),

  maxGuests: Joi.number()
    .optional()
    .min(1)
    .messages({
      "number.min": "Maximum guests must be at least 1",
    }),

  beds: Joi.number()
    .optional()
    .min(1)
    .messages({
      "number.min": "Beds must be at least 1",
    }),

  bathrooms: Joi.number()
    .optional()
    .min(1)
    .messages({
      "number.min": "Bathrooms must be at least 1",
    }),

  size: Joi.number()
    .optional()
    .positive()
    .messages({
      "number.positive": "Room size must be positive",
    }),

  images: Joi.array()
    .items(Joi.string())
    .optional(),

  amenities: Joi.array()
    .items(Joi.string())
    .optional(),

  available: Joi.boolean()
    .optional(),
});

const roomIdValidation = Joi.object({
  id: Joi.string()
    .required()
    .pattern(mongoId)
    .messages({
      "string.empty": "Room id is required",
      "string.pattern.base": "Room id must be a valid Mongo id",
      "any.required": "Room id is required",
    }),
});

const propertyIdValidation = Joi.object({
  propertyId: Joi.string()
    .required()
    .pattern(mongoId)
    .messages({
      "string.empty": "Property id is required",
      "string.pattern.base": "Property id must be a valid Mongo id",
      "any.required": "Property id is required",
    }),
});

module.exports = {
  createRoomValidation,
  updateRoomValidation,
  roomIdValidation,
  propertyIdValidation,
};
