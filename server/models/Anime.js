const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Anime = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  russian: { type: String, required: true },
  image: {
    original: String,
    preview: String,
    x96: String,
    x48: String,
  },
  url: { type: String, unique: true, required: true },
  kind: String,
  score: Number,
  status: String,
  episodes: Number,
  episodes_aired: Number,
  aired_on: Date,
  released_on: Date,
  rating: String,
  english: [String],
  japanese: [String],
  synonyms: [String],
  license_name_ru: String,
  duration: Number,
  description: String,
  description_html: String,
  franchise: String,
  anons: Boolean,
  ongoing: Boolean,
  thread_id: Number,
  topic_id: Number,
  myanimelist_id: Number,
  updated_at: Date,
  next_episode_at: Date,
  rates_scores_stats: [
    {
      name: String,
      value: String,
    },
  ],
  genres: [
    {
      id: Number,
      name: String,
      russian: String,
      kind: String,
    },
  ],
  studios: [
    {
      id: Number,
      name: String,
      filtered_name: String,
      real: Boolean,
      image: String,
    },
  ],
  fandubbers: [String],
  videos: [
    {
      id: Number,
      url: String,
      image_url: String,
      player_url: String,
      name: String,
      kind: String,
      hosting: String,
    },
  ],
  screenshots: [
    {
      original: String,
      preview: String,
    },
  ],
  kp_id: String,
  imdb_id: String,
  worldart_id: String,
});

Anime.plugin(mongoosePaginate);

module.exports = model("Anime", Anime);
