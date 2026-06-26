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

## Fitur & Endpoint Utama (Minimal 5 Endpoint)
1. `GET /api/lapangans` - Menampilkan daftar lapangan olahraga publik yang tersedia.
2. `GET /api/bookings/ketersediaan` - Mengecek jadwal kosong lapangan berdasarkan tanggal agar tidak bentrok.
3. `POST /api/bookings` - Melakukan booking lapangan (Terproteksi Middleware JWT).
4. `GET /api/bookings/me` - Pengguna melihat riwayat booking milik mereka sendiri.
5. `PATCH /api/admin/bookings/:id` - Mengubah status transaksi booking (Khusus role Admin).

---

## Cara Menjalankan Proyek Secara Lokal (Local Setup)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/zahraahaniifah/Capstone.git](https://github.com/zahraahaniifah/Capstone.git)
cd Capstone