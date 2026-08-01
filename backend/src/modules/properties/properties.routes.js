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
  .route("/soft-delete/:id")
  .patch(
    protect,
    allowTo("admin"),
    softDelete
  );

router
  .route("/:id")
  .get(getById)
  .patch(
    protect,
    allowTo("admin"),
    validate(updateProperty),
    update
  )
  .delete(
    protect,
    allowTo("admin"),
    remove
  );

module.exports = router;