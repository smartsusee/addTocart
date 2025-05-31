const mongoose = require("mongoose");

const regSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  resetPass: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("regSchemadata", regSchema);
