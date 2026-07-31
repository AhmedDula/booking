const Room = require("./room.model");
const ApiError = require("../../utils/ApiError");

const populateFields = [{ path: "property", select: "name location category" }];

const createRoom = async (data) => {
  const room = await Room.create(data);
  return room.populate(populateFields);
};

const getRooms = async ({ page = 1, limit = 10, property } = {}) => {
  const query = {};
  if (property) query.property = property;

  const skip = (Number(page) - 1) * Number(limit);
  const [rooms, total] = await Promise.all([
    Room.find(query).populate(populateFields).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
    Room.countDocuments(query),
  ]);

  return {
    rooms,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId).populate(populateFields);
  if (!room) {
    throw ApiError.notFound("Room not found");
  }
  return room;
};

const getRoomsByProperty = async (propertyId) => {
  const rooms = await Room.find({ property: propertyId }).populate(populateFields);
  return rooms;
};

const updateRoom = async (roomId, data) => {
  const room = await Room.findByIdAndUpdate(roomId, data, {
    new: true,
    runValidators: true,
  }).populate(populateFields);

  if (!room) {
    throw ApiError.notFound("Room not found");
  }

  return room;
};

const deleteRoom = async (roomId) => {
  const room = await Room.findByIdAndDelete(roomId);
  if (!room) {
    throw ApiError.notFound("Room not found");
  }
  return room;
};

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  getRoomsByProperty,
  updateRoom,
  deleteRoom,
};