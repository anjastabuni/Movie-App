const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true },
  title: String,
  poster: String,
  relaesaData: String,
  overview: String,
  popularity: String,
});

const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
