const router = require("express").Router();

const validate = require("../../middlewares/validate");
const protect = require("../../middlewares/protect");
const allowTo = require("../../middlewares/restrictTo");

const {
  addProperty,
  updateProperty,
} = require("./properties.validation");

const {
  create,
  getAll,
  getById,
  update,
  softDelete,
  remove,
} = require("./properties.controller");

const { getRoomsByProperty } = require("../rooms/room.controller");

router
  .route("/")
  .post(
    protect,
    allowTo("admin"),
    validate(addProperty),
    create
  )
  .get(getAll);

router
  .route("/:id/rooms").get(getRoomsByProperty);  

router
  .route("/soft-delete/:id")
  .patch(
    protect,
    allowTo("admin"),
    softDelete
  );

router
  .route("/update/:id")
  .get(getById)
  .patch(
    protect,
    allowTo("admin"),
    validate(updateProperty),
    update
  );

router
  .route("/remove/:id")
  .delete(
    protect,
    allowTo("admin"),
    remove
  );

module.exports = router;