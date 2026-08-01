const Property = require("./properties.model");
const ApiFeature = require("../../utils/ApiFeature");

const create = async (userId, data) => {
const existingProperty = await Property.findOne({
    user: userId,
    property: data.property,
  });
  if (existingProperty ) {
    throw new Error("You have already reviewed this property");
  }
  return await review.create({...data,user: userId});
};

const getAll = async (query) => {
  const features = new ApiFeature(
    Property.find({ isDeleted: false }),
    query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const properties = await features.query;

  const propertyCount = await Property.countDocuments({
    isDeleted: false,
  });

  return {
    properties,
    propertyCount,
    limit: Number(query.limit) || 10,
  };
};

const getById = async (id) => {
  return await Property.findOne({
    _id: id,
    isDeleted: false,
  });
};

const update = async (id, data) => {
  return await Property.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const softDelete = async (id) => {
  return await Property.findOneAndUpdate(
    {
      _id: id,
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
};

const remove = async (id) => {
  return await Property.findOneAndDelete({
    _id: id,
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  softDelete,
  remove,
};