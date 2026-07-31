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
const addReview = require("./review.validation");


router
  .route("/")
  .post(validate(addReview), create)
  .get(getAll);


router
  .route("/soft-delete/:id")
  .patch(softDelete);


router
  .route("/:id")
  .get(getById)
  .patch(Update)
  .delete(Delete);


module.exports = router;