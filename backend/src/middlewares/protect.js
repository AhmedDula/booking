
const asyncHandler = require("./asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const { verifyAccessToken } = require("../utils/token.js");


// Protect routes — verify JWT access token from cookie
const protect = asyncHandler(async (req, res, next) => {

  const token = req.cookies?.accessToken;

  if (!token) {
    return next(ApiError.unauthorized("Not authenticated"));
  }

  const decoded = verifyAccessToken(token);
  req.user = decoded;


  next();
});

module.exports = protect;
