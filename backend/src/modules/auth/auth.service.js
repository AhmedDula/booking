// authentication service

// imports
const Users = require("../users/users.model.js")
const { hashPassword, comparePassword } = require("../../utils/hash");
const {
  generateAccessToken,
  refreshAccessToken,
} = require("../../utils/token");
const ApiError = require("../../utils/ApiError");
const generateTokens = async (user) => {
  const payload = { id: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateAccessToken(payload);

  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

exports.register = async (data) => {
  const { name, email, password, role } = data;
  const existingUser = await Users.findOne({ email });
  if (existingUser) throw ApiError.unauthorized("Invalid Email or Password");
  const hashedPassword = await hashPassword(password);

  const user = await Users.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  const { accessToken, refreshToken } = await generateAccessToken(user);

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


exports.login = async (data) => {
  const {  email, password } = data;
  const user = await Users.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid Email or Password");

  // Check if account is active
  if (!user.isActive) throw ApiError.forbidden("Account is deactivated");
  const isMatch = await comparePassword(password,user.password);
  if (!isMatch) throw ApiError.unauthorized("Invalid Email or Password");



  const { accessToken, refreshToken } = await generateAccessToken(user);

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
  if (!token) throw ApiError.unauthorized("No refresh token");

  // Find user with this refresh token
  const user = await User.findOne({ refreshToken: token }).select("+refreshToken");
  if (!user) throw ApiError.unauthorized("Invalid refresh token");

  // Generate new access token only
  const payload = { id: user._id, role: user.role };
  const accessToken = generateAccessToken(payload);

  return { accessToken };
};

// Logout user
exports.logout = async (token) => {
  if (!token) return;

  // Clear refresh token from DB
  await User.findOneAndUpdate(
    { refreshToken: token },
    { refreshToken: null }
  );
};


