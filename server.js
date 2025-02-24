require("dotenv").config();
const ejsMate = require("ejs-mate");
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
import("node-fetch").then(({ default: fetch }) => {
  global.fetch = fetch;
});

const app = express();
const PORT = 3000;
const API_KEY = process.env.TMDB_API_KEY;

// connect mongodb
mongoose
  .connect("mongodb://127.0.0.1/movie-search")
  .then((results) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.use(express.static("public")); // Folder untuk CSS & JS
app.use(express.urlencoded({ extended: true }));

const Favorite = require("./models/Favorit");
const SearchHistory = require("./models/SearchHistory");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();

  res.render("index", { movies: data.results.slice(0, 6), page, totalPages: data.total_pages });
});

app.get("/detail/:id", async (req, res) => {
  const movieId = req.params.id;
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
  const movie = await response.json();
  res.render("show", { movie });
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const page = parseInt(req.query.page) || 1; // Ambil nomor halaman dari query, default 1

  if (!query) {
    return res.render("search", { movies: [], error: "Masukkan judul film!", query, page, totalPages: 1 });
  }

  try {
    await SearchHistory.create({ query });
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();

    console.log(data);

    if (!data.results || data.results.length === 0) {
      return res.render("search", { movies: [], error: "Film tidak ditemukan!", query, page, totalPages: 1 });
    }

    res.render("search", {
      movies: data.results.slice(0, 6),
      query,
      page,
      totalPages: data.total_pages,
      error: null,
    });
  } catch (error) {
    console.error("Error Fetching API:", error);
    res.render("search", { movies: [], error: "Terjadi kesalahan saat mengambil data!", query, page, totalPages: 1 });
  }
});

app.get("/favorit", async (req, res) => {
  const favorites = await Favorite.find();
  res.render("favorit", { favorites });
});

app.post("/favorit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const existingFavorit = await Favorite.findOne({ movieId: id });
    if (existingFavorit) {
      return res.redirect("/favorit");
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
    const movie = await response.json();

    // simpan ke mongodb
    const newFavorite = new Favorite({
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      relaesaData: movie.release_data,
      overview: movie.overview,
      popularity: movie.popularity,
    });
    await newFavorite.save();
    res.redirect("/favorit");
  } catch (error) {
    console.error("Gagal menyimpan data Favorit", error);
    res.redirect("/");
  }
});

app.delete("/favorit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Favorite.findOneAndDelete({ movieId: id });
    res.redirect("/favorit");
  } catch (error) {
    console.error("Gagal menghapus data Favorit", error);
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus data" });
  }
});


app.get("/history", async (req, res) => {
  const history = await SearchHistory.find().sort({ createdAt: -1 }).limit(10);
  res.render("history", { history });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
