const mongoose = require("mongoose");
const BOOKING_STATUS = require("../../constants/bookingStatus");

const bookingShcema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: [1, "number of guests should be a positive value"],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "total price should be positive"],
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
    },
    specialRequests: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingShcema);

module.exports = Booking;
