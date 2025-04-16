const mongoose = require("mongoose");

const TendorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tendor", TendorSchema);
