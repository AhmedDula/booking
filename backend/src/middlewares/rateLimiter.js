const rateLimit = require('express-rate-limit');

// Applied broadly to /api — generous, mostly to blunt scraping/abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
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