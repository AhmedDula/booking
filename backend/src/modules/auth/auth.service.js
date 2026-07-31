// authentication service

// imports
const Users = require("../users/user.model");
const { hashPassword, comparePassword } = require("../../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/token");
const ApiError = require("../../utils/ApiError");

const generateTokens = async (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken };
};

// Register
exports.register = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    throw ApiError.conflict("Email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const { accessToken, refreshToken } = await generateTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// Login
exports.login = async (data) => {
  const { email, password } = data;

  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid Email or Password");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw ApiError.unauthorized("Invalid Email or Password");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

// Refresh access token
exports.refresh = async (token) => {
  if (!token) {
    throw ApiError.unauthorized("No refresh token");
  }

  let decoded;

  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const user = await Users.findById(decoded.id);

  if (!user) {
    throw ApiError.unauthorized("User not found");
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  return { accessToken };
};

// Logout
exports.logout = async () => {
  return;
};
