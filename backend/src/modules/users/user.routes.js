const express = require("express");
const userController = require("./user.controller");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("./user.validate");

const router = express.Router();

router.post("/", validateCreateUser, userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", validateUpdateUser, userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;