const Property = require("./properties.model");
const ApiFeature = require("../../utils/ApiFeature");

const create = async (data) => {
  const lastProperty = await Property.findOne()
    .sort({ id: -1 })
    .select("id");

  data.id = lastProperty ? lastProperty.id + 1 : 1;

  return await Property.create(data);
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
    id: Number(id),
    isDeleted: false,
  });
};

const update = async (id, data) => {
  return await Property.findOneAndUpdate(
    {
      id: Number(id),
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
      id: Number(id),
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
    id: Number(id),
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