const express = require("express");
const controller = require("./dispute.controller");
const validate = require("../../middlewares/validate");
const protect = require("../../middlewares/protect");

const allowTo = require("../../middlewares/restrictTo");
const {createDisputeSchema,updateDisputeSchema,updateStatusSchema}=require("./dispute.validation")



const router = express.Router();

router.route("/")
  .get(protect, controller.getDisputes)
  .post(protect, validate(createDisputeSchema), controller.createDispute);

router.route("/:id")
  .get(protect, controller.getDispute)
  .put(protect, validate(updateDisputeSchema), controller.updateDispute)
  .delete(protect, allowTo("admin"), controller.deleteDispute);

router.route("/:id/status")
  .patch(protect, allowTo("admin"), validate(updateStatusSchema), controller.updateStatus);

module.exports = router;