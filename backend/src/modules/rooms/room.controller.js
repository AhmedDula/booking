const roomService = require("./room.service");
const asyncHandler = require("../../middlewares/asyncHandler");

const createRoom = asyncHandler(async (req, res) => {


const { property } = req.body;


  const room = await roomService.createRoom(property,req.body);
  console.log(room);
  
  res.status(201).json({
    success: true,
    message: "Room created successfully",
    data: room,
  });
});

const getRooms = asyncHandler(async (req, res) => {
  const result = await roomService.getRooms(req.query);
  res.status(200).json({
    success: true,
    message: "Rooms retrieved successfully",
    data: result.rooms,
    pagination: result.pagination,
  });
});

//get one room by id
const getRoom = asyncHandler(async (req, res) => {
  const room = await roomService.getRoomById(req.params.id);
  res.status(200).json({
    success: true,
    message: "Room retrieved successfully",
    data: room,
  });
});

//get all rooms in the same property
// const getRoomsByProperty = asyncHandler(async (req, res) => {
//   const rooms = await roomService.getRoomsByProperty(req.params.propertyId);
//   res.status(200).json({
//     success: true,
//     message: "Rooms retrieved successfully",
//     data: rooms,
//   });
// });

const updateRoom = asyncHandler(async (req, res) => {
  const room = await roomService.updateRoom(req.params.id, req.body);
  res.status(200).json({
    success: true,
    message: "Room updated successfully",
    data: room,
  });
});

const deleteRoom = asyncHandler(async (req, res) => {
  await roomService.deleteRoom(req.params.id);
  res.status(200).json({
    success: true,
    message: "Room deleted successfully",
    data: null,
  });
});

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};