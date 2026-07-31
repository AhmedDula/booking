// import dependencies
const router = require("express").Router();
const authController = require("./auth.controller");
const validate = require("../../middlewares/validate");
const { registerSchema, loginSchema } = require("./auth.validation");
const { authLimiter } = require("../../middlewares/rateLimiter");

// Apply rate limiter to all auth routes
router.use(authLimiter);

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

module.exports = router;