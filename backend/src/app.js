const { env } = require("./config/env");
const { apiLimiter } = require("./middlewares/rateLimiter");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");
const compression = require("compression");

const { errorMiddleware } = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");

const app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet());

app.use((req, res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === "object") {
      Object.keys(obj).forEach((key) => {
        if (key.startsWith("$") || key.includes(".")) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      });
    }
  };

  sanitize(req.body);
  sanitize(req.params);
  next();
});

app.use(hpp());

// ── Rate Limiting ─────────────────────────────────────
app.use("/api", apiLimiter);

// ── CORS ──────────────────────────────────────────────
app.use(
  cors({
    origin: env.client.url,
    credentials: true,
  }),
);

// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ── Compression ───────────────────────────────────────
app.use(compression());

// ── Logging ───────────────────────────────────────────
if (env.app.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ── Health Check ──────────────────────────────────────
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────
app.use("/api/v1/auth", require("./modules/auth/auth.routes"));
app.use("/api/v1/bookings", require("./modules/bookings/booking.routes"));
app.use("/api/v1/properties", require("./modules/properties/properties.routes"));
app.use("/api/v1/users", require("./modules/users/user.routes"));
app.use("/api/v1/rooms", require("./modules/rooms/room.routes"));
app.use("/api/v1/disputes", require("./modules/disputes/dispute.routes"));
app.use("/api/v1/admin", require("./modules/admin/admin.routes"));
app.use("/api/v1/reviews", require("./modules/reviews/review.routes"));

// ── 404 Handler ───────────────────────────────────────
app.use((req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

// ── Global Error Handler ──────────────────────────────
app.use(errorMiddleware);

module.exports = app;