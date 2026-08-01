const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const propertyService = require("./properties.service");
const { addProperty } = require("./properties.validation");

exports.getAll = catchAsync(async (req, res) => {
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
      ApiError.notFound(`Property not found with id ${req.params.id}`)
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
    message: "Property created successfully",
    data: property,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const property = await propertyService.update(
    req.params.id,
    req.body
  );

  if (!property) {
    return next(
      ApiError.notFound(`Property not found with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
    data: property,
  });
});

exports.softDelete = catchAsync(async (req, res, next) => {
  const property = await propertyService.softDelete(req.params.id);

  if (!property) {
    return next(
      ApiError.notFound(`Property not found with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "Property soft deleted successfully",
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const property = await propertyService.remove(req.params.id);

  if (!property) {
    return next(
      ApiError.notFound(`Property not found with id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "Property deleted successfully",
    data: property,
  });
});