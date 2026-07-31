module.exports = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/feature/reviews
