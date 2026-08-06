const review = require("./review.model");
const ApiFeatures = require("../../utils/ApiFeature");

const create = async (userId, data) => {
const existingReview = await review.findOne({
    user: userId,
    
  });
  if (existingReview) {
    throw new Error("You have already reviewed this property");
  }
  return await review.create({...data,user: userId});
};

const getAll = async (query) => {
  const features = new ApiFeatures(
    review.find({ isDeleted: false }),
    query
  )
    .filter()
    .limitFields()
    .sort()
    .paginate();

  const reviews = await features.query;

  const reviewCount = await review.countDocuments({
    isDeleted: false,
  })

  return {
    reviews,
    reviewCount,
    limit: Number(query.limit) || 10,
  };
};

const getById = async (id) => {
  return await review.findOne({
    _id: id,
    isDeleted: false,
  });
};

const Update = async (id, data) => {
  return await review.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      ...data,
      updatedAt: new Date(),
    },
    {
      runValidators: true,
      returnDocument: "after",
    }
  );
};

const softDelete = async (id) => {
  return await review.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      isDeleted: true,
      updatedAt: new Date(),
    }
  );
};

const Delete = async (id) => {
  return await review.findOneAndDelete({
    _id: id,
    isDeleted: true,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  Update,
  softDelete,
  Delete,
};