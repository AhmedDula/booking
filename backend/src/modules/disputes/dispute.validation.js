const Joi = require("joi");
const disputeStatus = require("../../constants/disputes");

const MONGO_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

// Reusable Mongo ObjectId validator to avoid repeating pattern + messages everywhere
const mongoIdField = (label) =>
  Joi.string()
    .trim()
    .pattern(MONGO_ID_PATTERN)
    .required()
    .messages({
      "string.empty": `${label} is required`,
      "any.required": `${label} is required`,
      "string.pattern.base": `${label} must be a valid Mongo id`,
    });

// Evidence entries are typically URLs/file references — validate as non-empty strings/URIs
const evidenceSchema = Joi.array()
  .items(
    Joi.string().trim().uri().messages({
      "string.uri": "Each evidence item must be a valid URL",
    })
  )
  .max(10)
  .messages({
    "array.max": "You can attach at most 10 evidence items",
  });

const createDisputeSchema = Joi.object({
  booking: mongoIdField("Booking id"),

  user: mongoIdField("User id"),

  reason: Joi.string()
    .trim()
    .min(3)
    .max(150)
    .required()
    .messages({
      "string.empty": "Reason is required",
      "any.required": "Reason is required",
      "string.min": "Reason must be at least {#limit} characters",
      "string.max": "Reason must not exceed {#limit} characters",
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required()
    .messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
      "string.min": "Description must be at least {#limit} characters",
      "string.max": "Description must not exceed {#limit} characters",
    }),

  evidence: evidenceSchema.optional(),
}).options({ stripUnknown: true });

const updateDisputeSchema = Joi.object({
  reason: Joi.string().trim().min(3).max(150).optional().messages({
    "string.min": "Reason must be at least {#limit} characters",
    "string.max": "Reason must not exceed {#limit} characters",
  }),

  description: Joi.string().trim().min(10).max(2000).optional().messages({
    "string.min": "Description must be at least {#limit} characters",
    "string.max": "Description must not exceed {#limit} characters",
  }),

  evidence: evidenceSchema.optional(),

  resolutionNotes: Joi.string().trim().max(2000).optional().messages({
    "string.max": "Resolution notes must not exceed {#limit} characters",
  }),
})
  .min(1) // prevent empty PATCH/PUT requests
  .messages({
    "object.min": "At least one field must be provided to update",
  })
  .options({ stripUnknown: true });

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid(...Object.values(disputeStatus))
    .required()
    .messages({
      "any.only": `Status must be one of: ${Object.values(disputeStatus).join(", ")}`,
      "string.empty": "Status is required",
      "any.required": "Status is required",
    }),

  resolutionNotes: Joi.string().trim().max(2000).optional().messages({
    "string.max": "Resolution notes must not exceed {#limit} characters",
  }),
}).options({ stripUnknown: true });

const idParamSchema = Joi.object({
  id: mongoIdField("Id"),
});

module.exports = {
  createDisputeSchema,
  updateDisputeSchema,
  updateStatusSchema,
  idParamSchema,
  MONGO_ID_PATTERN,
};