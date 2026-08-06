const express = require("express");
const userController = require("./user.controller");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("./user.validate");
const protect = require("../../middlewares/protect")
const allowTo = require("../../middlewares/restrictTo")
const ApiError = require("../../utils/ApiError");
const router = express.Router();

const allowSelfOrAdmin = (req, res, next) => {
  if (req.user.role === "admin" || req.user.id === req.params.id) {
    return next();
  }
  return next(ApiError.forbidden("You can only update your own profile"));
};

// router.post("/", validateCreateUser, userController.createUser);
router.use(protect)

router.get("/",allowTo("admin") ,userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", allowSelfOrAdmin, validateUpdateUser, userController.updateUser);

router.delete("/:id",allowTo("admin"), userController.deleteUser);

module.exports = router;