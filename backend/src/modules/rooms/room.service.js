const Room = require("./room.model");
const Property = require("../properties/property.model");
const ApiError = require("../../utils/ApiError");
const ApiFeatures = require("../../utils/ApiFeatures");

const createRoom = async (propertyId, data) => {
  const property = await Property.exists({ _id: propertyId });

  if (!property) {
    throw ApiError.notFound("Property not found");
  }
  return await Room.create({...data, property: propertyId,});
};

const getRooms = async (queryString) => {
  const features = new ApiFeatures(
    Room.find({ isActive: true }),
    queryString).filter().sort().limitFields().paginate();

  const rooms = await features.query;

  const total = await Room.countDocuments({ isActive: true });

  return {
    rooms,
    total,
    page: Number(queryString.page) || 1,
    limit: Number(queryString.limit) || 10,
    pages: Math.ceil(total / (Number(queryString.limit) || 10)),
  };
};

const getRoomById = async (id) => {
  const room = await Room.findById(id);

  if (!room) {
    throw ApiError.notFound("Room not found");
  }
  return room;
};

const updateRoom = async (id, updates) => {
  const room = await Room.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    throw ApiError.notFound("Room not found");
  }
  return room;
};

const deleteRoom = async (id) => {
  const room = await Room.findByIdAndDelete(id);

  if (!room) {
    throw ApiError.notFound("Room not found");
  }
  return room;
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};