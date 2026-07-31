const Dispute = require("./dispute.model");
const ApiError = require("../../utils/ApiError");
const ApiFeatures = require("../../utils/ApiFeatures");
const disputeStatus = require("../../constants/disputeStatus");

const createDispute = async (data) => {
  const existing = await Dispute.findOne({ booking: data.booking });

  if (existing) {
    throw ApiError.conflict("A dispute already exists for this booking");
  }
  return await Dispute.create(data);
};

const getDisputes = async (queryString, userId, role) => {
  let query = {};

  if (role !== "admin") {
    query.user = userId;
  }

  const features = new ApiFeatures(
    Dispute.find(query),
    queryString).filter().sort().limitFields().paginate();

  const disputes = await features.query;
  const total = await Dispute.countDocuments(query);

  return {
    disputes,
    total,
    page: Number(queryString.page) || 1,
    limit: Number(queryString.limit) || 10,
    pages: Math.ceil(total / (Number(queryString.limit) || 10)),
  };
};

const getDispute = async (id, userId, role) => {
  const dispute = await Dispute.findById(id);

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

  return dispute;
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
  dispute.resolvedAt =
    status === disputeStatus.RESOLVED ||
    status === disputeStatus.REJECTED
      ? new Date()
      : null;

  await dispute.save();

  return dispute;
};

module.exports = {
  createDispute,
  getDisputes,
  getDispute,
  updateDispute,
  deleteDispute,
  updateStatus,
};