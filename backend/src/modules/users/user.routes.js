const express = require("express");
const userController = require("./user.controller");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("./user.validate");
const protect = require("../../middlewares/protect")
const allowTo = require("../../middlewares/restrictTo")
const router = express.Router();

// router.post("/", validateCreateUser, userController.createUser);
router.use(protect)

router.get("/",allowTo("admin") ,userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", validateUpdateUser, userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;