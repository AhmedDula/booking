const Joi = require("joi");
const BOOKING_STATUS = require("../../constants/bookingStatus");

const MONGO_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

const createBookingSchema = Joi.object({
  user: Joi.string()
    .trim()
    .pattern(MONGO_ID_PATTERN)
    .required()
    .messages({
      "string.empty": "User is required",
      "any.required": "User is required",
      "string.pattern.base": "User must be a valid Mongo id",
    }),

  room: Joi.string()
    .trim()
    .pattern(MONGO_ID_PATTERN)
    .required()
    .messages({
      "string.empty": "Room is required",
      "any.required": "Room is required",
      "string.pattern.base": "Room must be a valid Mongo id",
    }),

  checkIn: Joi.date()
    .required()
    .messages({
      "date.base": "Check-in date must be a valid date",
      "any.required": "Check-in date is required",
    }),

  checkOut: Joi.date()
    .required()
    .greater(Joi.ref("checkIn"))
    .messages({
      "date.base": "Check-out date must be a valid date",
      "any.required": "Check-out date is required",
      "date.greater": "Check-out date must be after check-in date",
    }),

  guests: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Guests must be a number",
      "number.integer": "Guests must be an integer",
      "number.min": "Guests must be at least 1",
      "any.required": "Guests is required",
    }),

  specialRequests: Joi.string().trim().allow(null, "").optional(),
});

const updateBookingStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(BOOKING_STATUS))
    .required()
    .messages({
      "any.only": "Invalid booking status",
      "string.empty": "Status is required",
      "any.required": "Status is required",
    }),
});

module.exports = {
  createBookingSchema,
  updateBookingStatusSchema,
};