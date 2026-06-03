const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
    mobile: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);


const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
