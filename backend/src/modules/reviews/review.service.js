const review = require("./review.model");
const ApiFeature = require("../../utils/ApiFeatures");

const create = async (data) => {
  return await review.create(data);
};

const getAll = async (query) => {
  const features = new ApiFeature(review.find({ isDeleted: false }), query)
    .filter()
    .fields()
    .sort()
    .search()
    .pagination();

  const reviews = await features.query;
  const reviewCount = await review.countDocuments({
    isDeleted: false,
    ...features.filterObj,
  });
  return { reviews, reviewCount, limit: +features.limit };
};

const getById = async (id) => {
  return await review.findOne({ _id: id, isDeleted: false });
};

const Update = async (id, data) => {
  return await review.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...data, updatedAt: new Date() },
    { runValidators: true, returnDocument: "after" }
  );
};

const softDelete = async (id) => {
  return await review.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, updatedAt: new Date() }
  );
};

const Delete = async (id) => {
  return await review.findOneAndDelete({ _id: id, isDeleted: false });
};

module.exports = {
  create,
  getAll,
  getById,
  Update,
  softDelete,
  Delete,
};