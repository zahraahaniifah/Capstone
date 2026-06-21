# API Peminjaman Lapangan Olahraga Publik

RESTful API ini dirancang untuk mengelola fasilitas lapangan olahraga publik dan transaksi peminjaman jadwal oleh masyarakat umum.

# Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database: PostgreSQL / MySQL
- ORM: Prisma / Sequelize
- Security: JWT, bcrypt, Zod Validation
- Documentation: Swagger UI

# Fitur & Endpoint Utama (Minimal 5 Endpoint)
1. `GET /api/lapangans` - Menampilkan daftar lapangan olahraga publik yang tersedia.
2. `GET /api/bookings/ketersediaan` - Mengecek jadwal kosong lapangan berdasarkan tanggal agar tidak bentrok.
3. `POST /api/bookings` - Melakukan booking lapangan (Terproteksi Middleware JWT).
4. `GET /api/bookings/me` - Pengguna melihat riwayat booking milik mereka sendiri.
5. `PATCH /api/admin/bookings/:id` - Mengubah status transaksi booking (Khusus role Admin).