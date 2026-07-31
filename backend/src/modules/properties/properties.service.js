const Property = require("./properties.model");
const ApiFeature = require("../../utils/ApiFeatures");

const create = async (data) => {
  return await Property.create(data);
};

const getAll = async (query) => {
  const features = new ApiFeature(Property.find({ isDeleted: false }), query)
    .filter()
    .fields()
    .sort()
    .search()
    .pagination();

  const properties = await features.query;
  const propertyCount = await Property.countDocuments({
    isDeleted: false,
    ...features.filterObj,
  });
  return { properties, propertyCount, limit: +features.limit };
};

const getById = async (id) => {
  return await Property.findOne({ _id: id, isDeleted: false });
};

const Update = async (id, data) => {
  return await Property.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { ...data, updatedAt: new Date() },
    { runValidators: true, returnDocument: "after" }
  );
};

const softDelete = async (id) => {
  return await Property.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, updatedAt: new Date() }
  );
};

const Delete = async (id) => {
  return await Property.findOneAndDelete({ _id: id, isDeleted: false });
};

module.exports = {
  create,
  getAll,
  getById,
  Update,
  softDelete,
  Delete,
};