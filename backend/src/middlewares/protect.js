const asyncHandler = require("./asyncHandler");
const ApiError = require("../utils/ApiError");
const { verifyAccessToken } = require("../utils/token");
const User = require("../modules/users/user.model");

// Verifies a JWT from either the Authorization header or the httpOnly cookie,
// then attaches the authenticated user to req.user for downstream handlers.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    throw ApiError.unauthorized("Not authorized, no token provided");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    throw ApiError.unauthorized("Not authorized, token invalid or expired");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw ApiError.unauthorized("Not authorized, user no longer exists");
  }
  console.log("Authenticated user:", user);
  req.user = user;
  next();
});

module.exports = protect;
