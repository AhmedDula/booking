const router = require("express").Router();

const {
  create,
  getAll,
  getById,
  Update,
  softDelete,
  Delete,
} = require("./review.controller");

const validate = require("../../middlewares/validate");
const protect = require("../../middlewares/protect");
const allowTo = require("../../middlewares/restrictTo");

const addReview = require("./review.validation");

router
  .route("/")
  .post(
    protect,
    validate(addReview),
    create
  )
  .get(getAll);

router
  .route("/soft-delete/:id")
  .patch(
    protect,
    softDelete
  );

router
  .route("/:id")
  .get(getById)
  .patch(
    protect,
    Update
  )
  .delete(
    protect,
    allowTo("admin"),
    Delete
  );

module.exports = router;