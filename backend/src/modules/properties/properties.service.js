const Property = require("./properties.model");
const ApiFeature = require("../../utils/ApiFeature");


const create = async (data) => {

  const lastProperty = await Property.findOne({
    id: { $exists: true }
  }).sort({ id: -1 });


  data.id = lastProperty ? lastProperty.id + 1 : 1;


  return await Property.create(data);
};



const getAll = async (query) => {

  const features = new ApiFeature(
    Property.find({ isDeleted: false }),
    query
  )
    .filter()
    .limitFields()
    .sort()
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



const Update = async (id, data) => {

  return await Property.findOneAndUpdate(
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

  return await Property.findOneAndUpdate(
    {
      id: Number(id),
      isDeleted: false,
    },
    {
      isDeleted: true,
      updatedAt: new Date(),
    },
    {
      returnDocument: "after",
    }
  );

};



const Delete = async (id) => {

  return await Property.findOneAndDelete({
    id: Number(id),
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