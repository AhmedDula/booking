const express = require("express");
const controller = require("./disputes.controller");
const validate = require("../../middlewares/validate");
const protect = require("../../middlewares/protect");
const allowTo = require("../../middlewares/allowTo");
const { createDisputeValidation, updateDisputeValidation, updateStatusValidation, disputeIdValidation } = require("./disputes.validation");

const router = express.Router();

router.route("/")
  .get(protect, controller.getDisputes)
  .post(protect, validate(createDisputeValidation), controller.createDispute);

router.route("/:id")
  .get(protect, validate(disputeIdValidation), controller.getDispute)
  .put(protect, validate(updateDisputeValidation), controller.updateDispute)
  .delete(protect, allowTo("admin"), validate(disputeIdValidation), controller.deleteDispute);

router.route("/:id/status")
  .patch(protect, allowTo("admin"), validate(updateStatusValidation), controller.updateStatus);

module.exports = router;