const { Schema, model } = require('mongoose')

const Anime = new Schema({
    id: {type: Number, unique: true, required: true},
    name: {type: String, required: true},
    russian: {type: String, required: true},
    image: {
        original: {type: String, required: false},
        preview: {type: String, required: false},
        x96: {type: String, required: false},
        x48: {type: String, required: false}
    },
    url: {type: String, unique: true, required: true},
    kind: {type: String, required: false},
    score: {type: Number, required: false},
    status: {type: String, required: false},
    episodes: {type: Number, required: false},
    episodes_aired: {type: Number, required: false},
    aired_on: {type: String, required: false},
    released_on: {type: String, required: false},
    rating: {type: String, required: false},
    english: [String],
    japanese: [String],
    synonyms: [String],
    license_name_ru: {type: String, required: false},
    duration: {type: Number, required: false},
    description: {type: String, required: false},
    description_html: {type: String, required: false},
    franchise: {type: String, required: false},
    anons: {type: Boolean, required: false},
    ongoing: {type: Boolean, required: false},
    thread_id: {type: Number, required: false},
    topic_id: {type: Number, required: false},
    myanimelist_id: {type: Number, required: false},
    updated_at: {type: String, required: false},
    next_episode_at: {type: String, required: false},
    genres: [
        {
            id: Number,
            name: String,
            russian: String,
            kind: String
        }
    ],
    studios: [
        {
            id: Number,
            name: String,
            filtered_name: String,
            real: Boolean,
            image: String,
        }
    ],
    videos: [
        {
            id: Number,
            url: String,
            image_url: String,
            player_url: String,
            name: String,
            kind: String,
            hosting: String,
        }
    ],
    screenshots: [
        {
            original: String,
            preview: String,
        }
    ],
})

module.exports = model('Anime', Anime)