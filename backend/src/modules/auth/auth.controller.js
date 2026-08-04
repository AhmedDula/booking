// imports
const asyncHandler = require("../../middlewares/asyncHandler");
const authService = require("./auth.service");
const {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} = require("../../config/cookie");
// POST /api/v1/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.register(
    req.body,
  );
  res
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .status(201)
    .json({
      success: true,
      message: "Registered successfully",
      data: { user },
    });
});

// POST /api/v1/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.login(req.body);
  res
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
    .status(200)
    .json({
      success: true,
      message: "Logged in successfully",
      data: { user },
    });
});

// POST /api/v1/auth/logout
exports.logout = asyncHandler(async (req, res) => {

  const token=req.cookies?.refreshToken;

  await authService.logout(token);
  res
    .clearCookie("accessToken", accessTokenCookieOptions)
    .clearCookie("refreshToken", refreshTokenCookieOptions)
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// GET /api/v1/auth/me
exports.getCurrentUser = asyncHandler(async (req, res) => {
  
  
  const user = await authService.getCurrentUser(req.cookies?.accessToken);
  res.status(200).json({
    success: true,
    data: { user },
  });
});

// POST /api/auth/refresh
exports.refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const { accessToken } = await authService.refresh(token);

  res
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .status(200)
    .json({
      success: true,
      message: "Token refreshed successfully",
    });
});
