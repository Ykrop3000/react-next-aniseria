const { Schema, model } = require("mongoose");

const Role = new Schema({
  name: String,
});

module.exports = model("Role", Role);
