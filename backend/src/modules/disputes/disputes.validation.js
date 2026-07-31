const yup = require("yup");
const disputeStatus = require("../../constants/disputeStatus");

const mongoId = /^[0-9a-fA-F]{24}$/;

const createDisputeSchema = yup.object({
  booking: yup.string().required("Booking id is required")
    .matches(mongoId, "Booking id must be a valid Mongo id"),

  user: yup.string().required("User id is required")
    .matches(mongoId, "User id must be a valid Mongo id"),
  reason: yup.string().required("Reason is required"),
  description: yup.string().required("Description is required"),
  evidence: yup.array().optional(),
});

const updateDisputeSchema = yup.object({
  reason: yup.string().optional(),
  description: yup.string().optional(),
  evidence: yup.array().optional(),
  resolutionNotes: yup.string().optional(),
});

const updateStatusSchema = yup.object({
  status: yup.string()
    .oneOf(Object.values(disputeStatus),"Status must be a valid dispute status")
    .required("Status is required"),
});

const idParamSchema = yup.object({
  id: yup.string().required("Id is required")
    .matches(mongoId, "Invalid Mongo id"), 
});

module.exports = {
  createDisputeSchema,
  updateDisputeSchema,
  updateStatusSchema,
  idParamSchema,
};