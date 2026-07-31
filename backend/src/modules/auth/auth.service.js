// authentication service

// imports
const Users = require("../users/user.model");
const { hashPassword, comparePassword } = require("../../utils/hash");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/token");
const ApiError = require("../../utils/ApiError");

// Generate both tokens and save refresh token in DB
const generateAndSaveTokens = async (user) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};

// Register new user
exports.register = async (data) => {
  const { name, email, password, role } = data;

  // Check if email already exists
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    throw ApiError.unauthorized("Invalid Email or Password");
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const { accessToken, refreshToken } = await generateAndSaveTokens(user);

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

// Login user
exports.login = async (data) => {
  const { email, password } = data;

  // Find user and include password
  const user = await Users.findOne({ email }).select("+password");

  if (!user) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  // Check if account is active
  if (!user.isActive) {
    throw ApiError.forbidden("Account is deactivated");
  }

  // Compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw ApiError.unauthorized("Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAndSaveTokens(user);

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

  // Find user with this refresh token
  const user = await Users.findOne({ refreshToken: token }).select(
    "+refreshToken"
  );

  if (!user) {
    throw ApiError.unauthorized("Invalid refresh token");
  }

  const payload = {
    id: user._id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  return { accessToken };
};

// Logout user
exports.logout = async (token) => {
  if (!token) return;

  // Clear refresh token from DB
  await Users.findOneAndUpdate(
    { refreshToken: token },
    {
      refreshToken: null,
    }
  );
};