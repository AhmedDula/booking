const disputeService = require("./dispute.service");
const asyncHandler = require("../../middlewares/asyncHandler");


const createDispute = asyncHandler(async (req, res) => {
  const dispute = await disputeService.createDispute({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Dispute created successfully",
    data: dispute,
  });
});


const getDisputes = asyncHandler(async (req, res) => {
  const disputes = await disputeService.getDisputes(
    req.user.id,
    req.user.role
  );

  res.status(200).json({
    success: true,
    message: "Disputes retrieved successfully",
    data: disputes,
  });
});


const getDispute = asyncHandler(async (req, res) => {
  const dispute = await disputeService.getDispute(
    req.params.id,
    req.user?.id,
    req.user?.role
  );

  res.status(200).json({
    success: true,
    message: "Dispute retrieved successfully",
    data: dispute,
  });
});


const updateDispute = asyncHandler(async (req, res) => {
  const dispute = await disputeService.updateDispute(
    req.params.id,
    req.body,
    req.user?.id,
    req.user?.role
  );

  res.status(200).json({
    success: true,
    message: "Dispute updated successfully",
    data: dispute,
  });
});


const deleteDispute = asyncHandler(async (req, res) => {
  await disputeService.deleteDispute(
    req.params.id,
    req.user?.role
  );

  res.status(200).json({
    success: true,
    message: "Dispute deleted successfully",
    data: null,
  });
});


const updateStatus = asyncHandler(async (req, res) => {
  const dispute = await disputeService.updateStatus(
    req.params.id,
    req.body.status,
    req.user?.role,
    req.user?.id
  );

  res.status(200).json({
    success: true,
    message: "Dispute status updated successfully",
    data: dispute,
  });
});


module.exports = {
  createDispute,
  getDisputes,
  getDispute,
  updateDispute,
  deleteDispute,
  updateStatus,
};