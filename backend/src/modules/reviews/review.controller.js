const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const reviewService = require("./review.service");
const addReview = require("./review.validation");

exports.getAll = catchAsync(async (req, res, next) => {
  const { reviews, reviewCount, limit } = await reviewService.getAll(req.query);

  res.status(200).json({
    success: true,
    
    reviewCount,
    limit,
    pages: Math.ceil(reviewCount / limit),
    data: reviews,
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const review = await reviewService.getById(req.params.id);

  if (!review) {
    return next(
      ApiError.notFound(`Review not found with this id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

exports.create = catchAsync(async (req, res, next) => {
 const reviewData = req.body;

 
 const review = await reviewService.create(req.user.id, reviewData);
 res.status(201).json({
   success: true,
   message: "review created successfully",
   data: review,
 });
});




exports.Update = catchAsync(async (req, res, next) => {
  const review = await reviewService.Update(
    req.params.id,
    req.body
  );

  if (!review) {
    return next(
      ApiError.notFound(`Review not found with this id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "review updated successfully",
    data: review,
  });
});

exports.softDelete = catchAsync(async (req, res, next) => {
  console.log("Soft delete request received for review ID:", req.params.id);
  const review = await reviewService.softDelete(
    req.params.id
  );

  if (!review) {
    return next(
      ApiError.notFound(`Review not found with this id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "review soft deleted successfully",
  });
});

exports.Delete = catchAsync(async (req, res, next) => {
  const review = await reviewService.Delete(
    req.params.id
  );

  if (!review) {
    return next(
      ApiError.notFound(`Review not found with this id ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    message: "review deleted successfully",
  });
});