const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };
