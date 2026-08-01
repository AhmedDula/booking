const { env } = require("../config/env.js");

const isProduction = env.app.nodeEnv === "production";


exports.accessTokenCookieOptions = {
  httpOnly: true,       // Not accessible via JavaScript
  secure: isProduction, // HTTPS only in production
  sameSite: "strict",   // Prevent CSRF attacks
  maxAge: 15 * 60 * 1000, // 15 minutes in ms
};

exports.refreshTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};