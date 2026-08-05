const jwt = require("jsonwebtoken");
const { env } = require("../config/env.js");
const ApiError = require("./ApiError"); // adjust path to match your project

// Generate access token — short lived
const generateAccessToken = (payload) => {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: env.jwt.accessExpires,
  });
};

// Generate refresh token — long lived
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpires,
  });
};

// Shared helper: maps any jsonwebtoken error into a proper 401 ApiError
const handleJwtError = (err) => {
  if (err.name === "TokenExpiredError") {
    throw ApiError.unauthorized("Token expired");
  }
  if (err.name === "JsonWebTokenError") {
    throw ApiError.unauthorized("Invalid token");
  }
  // Any other unexpected error from jwt.verify
  throw ApiError.unauthorized("Token verification failed");
};

// Verify access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.accessSecret);
  } catch (err) {
    handleJwtError(err);
  }
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, env.jwt.refreshSecret);
  } catch (err) {
    handleJwtError(err);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
