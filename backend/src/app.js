const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const hpp = require("hpp");
const compression = require("compression");

const { env } = require("./config/env");
const errorMiddleware = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");

const app = express();

// ── Security ──────────────────────────────────────────
app.use(helmet()); // Secure HTTP headers
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
}); // Prevent NoSQL injection
app.use(hpp()); // Prevent HTTP parameter pollution

// ── CORS ──────────────────────────────────────────────
app.use(
  cors({
    origin: env.client.url,
    credentials: true, // Allow cookies to be sent
  })
);

// ── Body Parsing ──────────────────────────────────────
app.use(express.json({ limit: "10kb" })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// ── Compression ───────────────────────────────────────
app.use(compression());

// ── Logging ───────────────────────────────────────────
if (env.app.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// ── Health Check ──────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// ── Routes ────────────────────────────────────────────
// const authRoutes = require( "./modules/auth/auth.routes.js");
// app.use("/api/auth", authRoutes);


// ── 404 Handler ───────────────────────────────────────
app.use((req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

// ── Global Error Handler ──────────────────────────────Dula
app.use(errorMiddleware);

export default app;