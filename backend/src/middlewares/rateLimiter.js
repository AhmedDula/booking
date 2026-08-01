const rateLimit = require('express-rate-limit');

// Applied broadly to /api — generous, mostly to blunt scraping/abuse
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 2,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Applied to auth routes specifically — tighter, to slow brute-force login attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
});

module.exports = { apiLimiter, authLimiter };