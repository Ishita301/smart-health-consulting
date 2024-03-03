const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
      default:
        "https://icon-library.com/images/698985-icon-138-certificate-512.png",
    },
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model("Doctor", schema);

module.exports = Doctor;
