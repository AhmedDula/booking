const { env } = require("./config/env.js");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const app = require("./app.js");
const { connectDB } = require("./config/db.js");

// Handle unexpected errors before app starts
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  process.exit(1);
});

// Connect to DB then start server
connectDB().then(() => {
  const server = app.listen(env.app.port, () => {
    console.log(`Server running on port ${env.app.port} [${env.app.nodeEnv}]`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.message);
    server.close(() => process.exit(1));
  });
});
