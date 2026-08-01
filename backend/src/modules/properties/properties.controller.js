const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const propertyService = require("./properties.service");
const { addProperty } = require("./properties.validation");

exports.getAll = catchAsync(async (req, res) => {
  const { properties, propertyCount, limit } =
    await propertyService.getAll(req.query);

  res.status(200).json({
    success: true,
    
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
   const propertyData = req.body;
  
   
   const property = await propertyService.create(req.user.id, propertyData);
   res.status(201).json({
     success: true,
     message: "property created successfully",
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
    
  });
});