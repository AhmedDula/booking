// Avoids writing try/catch in every controller. Any thrown error or
// rejected promise inside `fn` is forwarded to Express's error middleware.
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;