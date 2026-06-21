const express = require('express');
const router = express.Router();

// Hubungkan ke Controller masing-masing
const authController = require('../controllers/authController.js');
const lapanganController = require('../controllers/lapanganController.js');
const jadwalController = require('../controllers/jadwalController.js');
const bookingController = require('../controllers/bookingController.js');
const pembayaranController = require('../controllers/pembayaranController.js');

/**
 * @openapi
 * /api/auth/register:
 * post:
 * summary: Registrasi user baru
 * tags: [Autentikasi]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nama:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * no_hp:
 * type: string
 * responses:
 * 201:
 * description: Berhasil
 */
router.post('/auth/register', authController.register);

/**
 * @openapi
 * /api/auth/login:
 * post:
 * summary: Login user
 * tags: [Autentikasi]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Berhasil
 */
router.post('/auth/login', authController.login);

/**
 * @openapi
 * /api/lapangan:
 * get:
 * summary: Ambil semua lapangan
 * tags: [Lapangan]
 * responses:
 * 200:
 * description: Berhasil
 * post:
 * summary: Tambah lapangan
 * tags: [Lapangan]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nama_lapangan:
 * type: string
 * jenis_lapangan:
 * type: string
 * harga_perjam:
 * type: integer
 * responses:
 * 201:
 * description: Berhasil
 */
router.get('/lapangan', lapanganController.getAllLapangan);
router.post('/lapangan', lapanganController.tambahLapangan);

/**
 * @openapi
 * /api/jadwal:
 * post:
 * summary: Tambah jadwal baru
 * tags: [Jadwal]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id_lapangan:
 * type: string
 * tanggal:
 * type: string
 * jam_mulai:
 * type: string
 * jam_selesai:
 * type: string
 * responses:
 * 201:
 * description: Berhasil
 */
router.post('/jadwal', jadwalController.tambahJadwal);

/**
 * @openapi
 * /api/jadwal/lapangan/{id_lapangan}:
 * get:
 * summary: Cari jadwal per lapangan
 * tags: [Jadwal]
 * parameters:
 * - in: path
 * name: id_lapangan
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Berhasil
 */
router.get('/jadwal/lapangan/:id_lapangan', jadwalController.getJadwalByLapangan);

/**
 * @openapi
 * /api/booking:
 * post:
 * summary: Buat booking baru
 * tags: [Booking]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id_user:
 * type: string
 * id_jadwal:
 * type: string
 * responses:
 * 201:
 * description: Berhasil
 */
router.post('/booking', bookingController.buatBooking);

/**
 * @openapi
 * /api/pembayaran/riwayat/{id_user}:
 * get:
 * summary: Riwayat booking user
 * tags: [Pembayaran]
 * parameters:
 * - in: path
 * name: id_user
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Berhasil
 */
router.get('/pembayaran/riwayat/:id_user', pembayaranController.getRiwayatUser);

/**
 * @openapi
 * /api/pembayaran/konfirmasi:
 * post:
 * summary: Konfirmasi pembayaran
 * tags: [Pembayaran]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id_pinjam:
 * type: string
 * responses:
 * 200:
 * description: Berhasil
 */
router.post('/pembayaran/konfirmasi', pembayaranController.konfirmasiPembayaran);

module.exports = router;