require("dotenv").config();
const express = require("express");
import("node-fetch").then(({ default: fetch }) => {
  global.fetch = fetch;
});

const app = express();
const PORT = 3000;
const API_KEY = process.env.TMDB_API_KEY;

app.set("view engine", "ejs");
app.use(express.static("public")); // Folder untuk CSS & JS
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();

  res.render("index", { movies: data.results.slice(0, 3), page, totalPages: data.total_pages });
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
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res.render("search", { movies: [], error: "Film tidak ditemukan!", query, page, totalPages: 1 });
    }

    res.render("search", {
      movies: data.results.slice(0, 3),
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

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
