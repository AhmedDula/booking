const review = require("./review.model");
const ApiFeatures = require("../../utils/ApiFeature");

const create = async (data) => {
  const lastReview = await review
    .findOne({ id: { $exists: true } })
    .sort({ id: -1 });

  data.id = lastReview ? lastReview.id + 1 : 1;

  return await review.create(data);
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
    id: Number(id),
    isDeleted: false,
  });
};

const Update = async (id, data) => {
  return await review.findOneAndUpdate(
    {
      id: Number(id),
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
      id: Number(id),
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
    id: Number(id),
    isDeleted: false,
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