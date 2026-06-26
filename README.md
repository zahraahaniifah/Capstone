# Sistem Peminjaman Lapangan Olahraga 

Proyek ini adalah RESTful API untuk sistem manajemen dan peminjaman fasilitas publik berupa lapangan olahraga. API ini dibangun menggunakan **Node.js**, **Express.js**, **Prisma ORM**, dan database **MySQL**. Dokumentasi API terintegrasi penuh menggunakan **Swagger UI**.

## Fitur Utama
- **Autentikasi & Otorisasi:** Registrasi, Login, hashing password dengan `bcrypt`, dan proteksi rute menggunakan `JWT Middleware`.
- **Manajemen Lapangan:** Mengambil daftar lapangan yang tersedia.
- **Manajemen Jadwal:** Menyediakan informasi slot waktu penggunaan lapangan yang tersinkronisasi.
- **Peminjaman & Pembayaran:** Mengelola alur peminjaman slot jadwal dan pencatatan riwayat transaksi.
- **Database Seeding:** Menyediakan data awal (dummy) otomatis untuk pengujian lapangan dan jadwal.

## Link Live Deployment
- **URL API / Swagger UI:** `https://capstone-production-f4f6.up.railway.app/api-docs`

## Fitur & Endpoint Utama
1. `POST /api/auth/register` - Untuk melakukan registrasi user baru.
2. `POST /api//auth/login` - Untuk login user.
3. `GET /api/lapangan` - Untuk mengambil semua daftar lapangan.
4. `POST /api/lapangan` - Untuk membooking lapangan baru
5. `POST /api/jadwal` - Untuk membooking jadwal baru.
6. `GET /api/jadwal/lapangan/(id)` -Untuk mencari jadwal per lapangan
7. `POST /api/booking` -Untuk membuat booking baru
8. `GET /api/pembayaran/riwayat/(id)` -Untuk menampilkan riwayat user
9. `POST /api/pembayaran/konfirmasi` -Untuk konfirmasi booking


## Cara Menjalankan Proyek Secara Lokal (Local Setup)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/zahraahaniifah/Capstone.git](https://github.com/zahraahaniifah/Capstone.git)
cd Capstone