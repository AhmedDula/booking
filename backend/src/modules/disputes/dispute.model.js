const mongoose = require("mongoose");
const disputeStatus = require("../../constants/disputes");

const disputeSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking reference is required"],
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User reference is required"],
      index: true,
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      trim: true,
      maxlength: [100, "Reason cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    evidence: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(disputeStatus),
      default: disputeStatus.PENDING,
    },
    resolutionNotes: {
      type: String,
      default: "",
      trim: true,
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey:false,
    timestamps: true,
  },
);





module.exports = mongoose.model("Dispute", disputeSchema);
