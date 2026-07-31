const  mongoose  = require("mongoose");
const reviewSchema = new mongoose.Schema(
  { rating:{
      type:Number,
      required:true,
      min:1,
      max:5,
    },
   comment:{
    type:String,
    required:true,
    },
     user:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      },
     property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
        },
        isDeleted: {
          type: Boolean,
          default: false,
},
    },
    {
    timestamps: true,
  }

);
module.exports = mongoose.model("Review", reviewSchema);
