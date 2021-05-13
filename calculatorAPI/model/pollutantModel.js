const { Schema, model } = require("mongoose");

const polutantSchema = new Schema({
  pollutantName: {
    type: String,
    required: true,
  },
  pollutantValue: {
    type: Number,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmailId: {
    type: String,
    required: true,
  },
  username: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  }
});

const pollutant = model("PollutantModel", polutantSchema);

module.exports = pollutant

