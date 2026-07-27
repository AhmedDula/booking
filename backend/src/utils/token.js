const jwt = require("jsonwebtoken");
const { env } = require("../config/env.js");

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

// Verify access token
const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwt.accessSecret);
};

// Verify refresh token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwt.refreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};