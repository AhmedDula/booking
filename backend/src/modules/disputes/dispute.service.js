const Dispute = require("./dispute.model");
const Booking = require("../bookings/booking.model");
const ApiError = require("../../utils/ApiError");
const disputeStatus = require("../../constants/disputes");


const createDispute = async (data) => {
  const booking = await Booking.findById(data.booking);
  if (!booking) {
    throw ApiError.notFound("Booking not found");
  }

  const exists = await Dispute.findOne({ booking: data.booking });
  if (exists) {
    throw ApiError.conflict("Dispute already exists for this booking");
  }

  return await Dispute.create(data);
};


const getDisputes = async (userId, role) => {
  let query = {};

  if (role !== "admin") {
    query.user = userId;
  }

  return await Dispute.find(query);
};


const getDispute = async (id, userId, role) => {
  const dispute = await Dispute.findById(id);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  if (role !== "admin" && dispute.user.toString() !== userId) {
    throw ApiError.forbidden("Not allowed");
  }

  return dispute;
};


const updateDispute = async (id, data, userId, role) => {
  const dispute = await Dispute.findById(id);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  if (role !== "admin" && dispute.user.toString() !== userId) {
    throw ApiError.forbidden("Not allowed");
  }

  Object.assign(dispute, data);
  return await dispute.save();
};


const deleteDispute = async (id, role) => {
  if (role !== "admin") {
    throw ApiError.forbidden("Only admin can delete");
  }

  const dispute = await Dispute.findByIdAndDelete(id);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  return dispute;
};


const updateStatus = async (id, status, role, resolvedBy) => {
  if (role !== "admin") {
    throw ApiError.forbidden("Only admin can update status");
  }

  const dispute = await Dispute.findById(id);

  if (!dispute) {
    throw ApiError.notFound("Dispute not found");
  }

  dispute.status = status;
  dispute.resolvedBy = resolvedBy;

  if (
    status === disputeStatus.RESOLVED ||
    status === disputeStatus.REJECTED
  ) {
    dispute.resolvedAt = new Date();
  }

  return await dispute.save();
};


module.exports = {
  createDispute,
  getDisputes,
  getDispute,
  updateDispute,
  deleteDispute,
  updateStatus,
};