const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: [true, "Room property is required"],
      index: true,
    },

    name: {
      type: String,
      required: [true, "Room name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Minimum length is 3 characters"],
      maxlength: [30, "Maximum length is 30 characters"],
    },

    description: {
      type: String,
      required: [true, "Room description is required"],
      trim: true,
      minlength: [3, "Minimum length is 3 characters"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"],
    },

    maxGuests: {
      type: Number,
      required: [true, "Maximum guests is required"],
      min: [1, "At least one guest is allowed"],
    },

    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
      min: [1, "A room must have at least one bed"],
    },

    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [1, "A room must have at least one bathroom"],
    },

    size: {
      type: Number,
      required: [true, "Room size is required"],
      min: [1, "Room size must be positive"],
    },

    images: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);