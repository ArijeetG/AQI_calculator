const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 200,
  },
  email: {
    type: String,
    required: true,
    max: 256,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 256,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
