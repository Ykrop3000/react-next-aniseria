const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const AnimeKodik = new Schema({
    id: {type: String, unique: true, required: true},
    title: {type: String, required: true},
    title_orig: {type: String,  unique: true,},
    link: {type: String, },
    other_title: {type: String},
    
    url: {type: String },
    year: {type: Number, },

    last_season: {type: Number},
    last_episode: {type: Number,  },
    episodes_count: {type: Number,  },

    kinopoisk_id: {type: String,  },
    imdb_id: {type: String, },
    worldart_link: {type: String,  },
    shikimori_id: {type: String, },
    
    created_at: {type: String, },
    updated_at: {type: String, },

    material_data: Object
})
AnimeKodik.plugin(mongoosePaginate)

module.exports = model('AnimeKodik', AnimeKodik)