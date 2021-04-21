const { Schema, model } = require("mongoose");

const Genres = new Schema({
  id: Number,
  name: String,
  russian: String,
  kind: String,
});

module.exports = model("Genres", Genres);
