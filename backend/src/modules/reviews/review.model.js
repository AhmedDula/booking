const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
   
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }

);
module.exports = mongoose.model("review", reviewSchema);