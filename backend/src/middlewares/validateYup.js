// const ApiError = require("../utils/ApiError");

// const validateYup =
//   (schema, property = "body") =>
//   async (req, res, next) => {
//     try {
//       const value = await schema.validate(req[property], {
//         abortEarly: false,
//         stripUnknown: true,
//       });

//       req[property] = value;
//       next();
//     } catch (err) {
//       const message = err.errors.join(", ");
//       next(ApiError.badRequest(message));
//     }
//   };

// module.exports = validateYup;

const ApiError = require("../utils/ApiError");

const validateYup =
  (schema, property = "body") =>
  async (req, res, next) => {
    try {
      const value = await schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      });

      req[property] = value;
      next();
    } catch (err) {
      console.log(err.errors);
      next(ApiError.badRequest(err.errors.join(", ")));
    }
  };

module.exports = validateYup;
