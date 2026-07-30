const yup = require("yup");

const mongoId = /^[0-9a-fA-F]{24}$/;

const createRoomValidation = yup.object({
  property: yup.string().required("Room property is required").matches(mongoId, "Property must be a valid Mongo id"),
  name: yup.string().required("Room name is required").min(3, "Room name must be at least 3 characters"),
  description: yup.string().required("Room description is required"),
  price: yup.number().required("Price is required").positive("Price must be greater than 0"),
  maxGuests: yup.number().required("Maximum guests is required").min(1, "Maximum guests must be at least 1"),
  beds: yup.number().required("Beds are required").min(1, "Beds must be at least 1"),
  bathrooms: yup.number().required("Bathrooms are required").min(1, "Bathrooms must be at least 1"),
  size: yup.number().required("Room size is required").positive("Room size must be positive"),
  images: yup.array().of(yup.string()).optional(),
  amenities: yup.array().of(yup.string()).optional(),
  available: yup.boolean().optional(),
});

const updateRoomValidation = yup.object({
  property: yup.string().optional().matches(mongoId, "Property must be a valid Mongo id"),
  name: yup.string().optional().min(3, "Room name must be at least 3 characters"),
  description: yup.string().optional(),
  price: yup.number().optional().positive("Price must be greater than 0"),
  maxGuests: yup.number().optional().min(1, "Maximum guests must be at least 1"),
  beds: yup.number().optional().min(1, "Beds must be at least 1"),
  bathrooms: yup.number().optional().min(1, "Bathrooms must be at least 1"),
  size: yup.number().optional().positive("Room size must be positive"),
  images: yup.array().of(yup.string()).optional(),
  amenities: yup.array().of(yup.string()).optional(),
  available: yup.boolean().optional(),
});

const roomIdValidation = yup.object({
  id: yup.string().required("Room id is required").matches(mongoId, "Room id must be a valid Mongo id"),
});

const propertyIdValidation = yup.object({
  propertyId: yup.string().required("Property id is required").matches(mongoId, "Property id must be a valid Mongo id"),
});

module.exports = {
  createRoomValidation,
  updateRoomValidation,
  roomIdValidation,
  propertyIdValidation,
};