const bcryptjs = require("bcryptjs");
const { env } = require("../config/env.js");

// Hash password with salt + pepper
exports.hashPassword = async (password) => {
  const peppered = password + env.security.pepper;
  return bcryptjs.hash(peppered, env.security.bcryptSaltRounds);
};

// Compare plain password with hashed password
exports.comparePassword = async (password, hashedPassword) => {
  const peppered = password + env.security.pepper;
  return bcryptjs.compare(peppered, hashedPassword);
};