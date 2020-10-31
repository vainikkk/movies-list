let mongoose = require("mongoose");

let Movie = mongoose.Schema({
    title: String,
    directors: Array,
    cast: Array,
    genres: Array,
    year: Number,
    imdb: Object,
    plot: String,
    fullplot: String,
    released: Date,
    type: String
}, {collection : "movies"})

module.exports = mongoose.model("Movie", Movie)