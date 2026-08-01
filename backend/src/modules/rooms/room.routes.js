const express = require("express");
const controller = require("./room.controller");
const validate = require("../../middlewares/validate");
const protect = require("../../middlewares/protect");
const allowTo = require("../../middlewares/restrictTo");
const { createRoomValidation, updateRoomValidation, roomIdValidation, propertyIdValidation } = require("./room.validation");

const router = express.Router();
router.use(protect)
router
  .route("/")
  .get(controller.getRooms)
  .post(protect, allowTo("admin"), validate(createRoomValidation), controller.createRoom);

// router
//   .route("/property/:propertyId")
//   .get(validate(propertyIdValidation, "params"), controller.getRoomsByProperty);

router
  .route("/:id")
  .get( controller.getRoom)
  .put(protect, allowTo("admin"), validate(updateRoomValidation), controller.updateRoom)
  .delete(protect, allowTo("admin"), controller.deleteRoom);

module.exports = router;