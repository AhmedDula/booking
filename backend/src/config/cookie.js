const { env } = require("../config/env.js");

const isProduction = env.app.nodeEnv === "production";


exports.accessTokenCookieOptions = {
  httpOnly: true,       // Not accessible via JavaScript
  secure: isProduction, // HTTPS only in production
  sameSite: "strict",   // Prevent CSRF attacks
  maxAge: env.cookies.accessMaxAge,
};

exports.refreshTokenCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "strict",
  maxAge: env.cookies.refreshMaxAge ,
};