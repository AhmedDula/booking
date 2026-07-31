const router = require("express").Router();
const {
  create,
  getAll,
  getById,
  Update,
  softDelete,
  Delete,
} = require("./properties.controller");
const validate = require("../../middlewares/validateYup");
const addProperty = require("./properties.validation");

router.route("/").post(validate(addProperty), create).get(getAll);

router.route("/soft-delete/:id").patch(softDelete);

router
  .route("/:id")
  .get(getById)
  .patch(validate(addProperty), Update)
  .delete(Delete);

module.exports = router;
