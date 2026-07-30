const Dispute = require("./disputes.model");
const ApiError = require("../../utils/ApiError");
const disputeStatus = require("../../constants/disputeStatus");

const populateFields = [
  { path: "booking" },
  { path: "user" },
  { path: "resolvedBy" },
];

const createDispute = async (data) => {
  const existing = await Dispute.findOne({ booking: data.booking });
  if (existing) {
    throw ApiError.conflict("A dispute already exists for this booking");
  }

  const dispute = await Dispute.create(data);
  return dispute.populate(populateFields);
};

const getDisputes = async ({ page = 1, limit = 10, userId, role }) => {
  const query = {};

  if (role !== "admin") {
    query.user = userId;
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [disputes, total] = await Promise.all([
    Dispute.find(query).populate(populateFields).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Dispute.countDocuments(query),
  ]);

  return {
    disputes,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getDispute = async (id, userId, role) => {
  const dispute = await Dispute.findById(id).populate(populateFields);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  if (role !== "admin" && dispute.user.toString() !== userId) {
    throw ApiError.forbidden("You do not have permission to view this dispute");
  }

  return dispute;
};

const updateDispute = async (id, data, userId, role) => {
  const dispute = await Dispute.findById(id);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  if (role !== "admin" && dispute.user.toString() !== userId) {
    throw ApiError.forbidden("You do not have permission to update this dispute");
  }

  Object.assign(dispute, data);
  await dispute.save();
  return dispute.populate(populateFields);
};

const deleteDispute = async (id, role) => {
  if (role !== "admin") {
    throw ApiError.forbidden("Only admins can delete disputes");
  }

  const dispute = await Dispute.findByIdAndDelete(id);
  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }
  return dispute;
};

const updateStatus = async (id, status, role, resolvedBy) => {
  if (role !== "admin") {
    throw ApiError.forbidden("Only admins can update dispute status");
  }

  const dispute = await Dispute.findById(id);
  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  dispute.status = status;
  dispute.resolvedBy = resolvedBy;
  dispute.resolvedAt = status === disputeStatus.RESOLVED || status === disputeStatus.REJECTED ? new Date() : null;
  await dispute.save();
  return dispute.populate(populateFields);
};

module.exports = {
  createDispute,
  getDisputes,
  getDispute,
  updateDispute,
  deleteDispute,
  updateStatus,
};