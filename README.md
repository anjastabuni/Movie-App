# Movie Search App

Saya Membuat Proyek ini hanya untuk mengaplikasikan pemahaman saya di express.js, tailwind, API dan belajar kembangkan repo open source.

Movie Search App adalah aplikasi berbasis web yang memungkinkan pengguna mencari informasi tentang film menggunakan **The Movie Database (TMDb) API**. Aplikasi ini dibangun dengan **Express.js, EJS, dan Tailwind CSS**.

## 🎬 Fitur

- 🔍 Mencari film berdasarkan judul
- 📌 Menampilkan daftar film populer
- 📌 Menampilkan detail film
- ⭐ Menambahkan film ke daftar favorit (disimpan dalam MongoDB) (belum buat)
- 🔍 Menampilkan riwayat pencarian ke halaman riwayat pencarian (belum buat)
- 🔄 Pagination untuk pencarian film
- 🎨 UI responsif menggunakan **Tailwind CSS**

---

## 🚀 Instalasi & Menjalankan Aplikasi

### 1️⃣ Clone Repository

```sh
git clone https://github.com/anjastabuni/Movie-App.git
cd Movie-App
```

### 2️⃣ Install Dependencies

```sh
npm install express ejs dotenv
```

### 3️⃣ Konfigurasi Environment Variables

Buat file `.env` di root project dan tambahkan:

```sh
TMDB_API_KEY=your_tmdb_api_key
```

> **Catatan:**
>
> - Dapatkan API Key dari **[TMDb](https://www.themoviedb.org/settings/api)**

### 4️⃣ Menjalankan Server

```sh
nodemon server.js
```

Aplikasi akan berjalan di `http://localhost:3000`

---

## 🏗️ Struktur Folder

```
movie-search-app/
│── views/          # Template EJS
│   ├── index.ejs   # Halaman utama
│   ├── search.ejs  # Halaman hasil pencarian
│   ├── favorit.ejs # Halaman film favorit
│   ├── show.ejs    # Halaman detail film
│── server.js       # Entry point aplikasi
│── .env            # Konfigurasi API Key
│── package.json    # Dependencies
```

---

## ⚡ API Endpoints

| Method | Endpoint      | Description                            |
| ------ | ------------- | -------------------------------------- |
| GET    | `/`           | Menampilkan film populer               |
| GET    | `/search`     | Mencari film berdasarkan judul         |
| GET    | `/favorit`    | Menampilkan daftar film favorit        |
| GET    | `/detail/:id` | Menampilkan detail film berdasarkan id |

---

## 💡 Kontribusi

saya terbuka untuk kontribusi guna belajar bersama dalam menyempurnakan code, fitur, dan mempercantik halaman 🚀

### Cara Berkontribusi

1. **Fork** repository ini.
2. Buat branch baru (`git checkout -b feature-anda`).
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`).
4. Push ke branch Anda (`git push origin feature-anda`).
5. Buat **Pull Request**.

### Issue & Feedback

Jika menemukan bug atau memiliki saran, silakan buat **Issue** di repository ini. 🙌

---

## 📜 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**. Silakan gunakan dan modifikasi sesuai kebutuhan!

---

**🎉 Selamat Coding! 🎬**
