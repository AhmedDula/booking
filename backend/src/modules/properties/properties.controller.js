const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const propertyService = require("./properties.service");
const { addProperty } = require("./properties.validation");


exports.getAll = catchAsync(async (req, res, next) => {
  const { properties, propertyCount, limit } =
    await propertyService.getAll(req.query);

  res.status(200).json({
    success: true,
    results: properties.length,
    propertyCount,
    limit,
    pages: Math.ceil(propertyCount / limit),
    data: properties,
  });
});


exports.getById = catchAsync(async (req, res, next) => {
  const property = await propertyService.getById(req.params.id);

  if (!property) {
    return next(
      ApiError.notFound(
        `Property not found with this id ${req.params.id}`
      )
    );
  }

  res.status(200).json({
    success: true,
    data: property,
  });
});


exports.create = catchAsync(async (req, res, next) => {
  const { error, value } = addProperty.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(
      ApiError.badRequest(
        error.details.map((err) => err.message).join(", ")
      )
    );
  }


  const property = await propertyService.create(value);


  res.status(201).json({
    success: true,
    message: "property created successfully",
    data: property,
  });
});


exports.Update = catchAsync(async (req, res, next) => {

  const property = await propertyService.Update(
    req.params.id,
    req.body
  );


  if (!property) {
    return next(
      ApiError.notFound(
        `Property not found with this id ${req.params.id}`
      )
    );
  }


  res.status(200).json({
    success: true,
    message: "property updated successfully",
    data: property,
  });
});


exports.softDelete = catchAsync(async (req, res, next) => {

  const property = await propertyService.softDelete(
    req.params.id
  );


  if (!property) {
    return next(
      ApiError.notFound(
        `Property not found with this id ${req.params.id}`
      )
    );
  }


  res.status(200).json({
    success: true,
    message: "property soft deleted successfully",
  });
});


exports.Delete = catchAsync(async (req, res, next) => {

  const property = await propertyService.Delete(
    req.params.id
  );


  if (!property) {
    return next(
      ApiError.notFound(
        `Property not found with this id ${req.params.id}`
      )
    );
  }


  res.status(200).json({
    success: true,
    message: "property deleted successfully",
    data: property,
  });
});