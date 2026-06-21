const prisma = require('../lib/prisma.js');
const { z } = require('zod'); 

// KITA UBAH: id_pinjam sekarang string biasa (format PM01), bukan UUID lagi!
const konfirmasiSchema = z.object({
  id_pinjam: z.string().min(2, { message: "ID Peminjaman tidak valid" })
});

// KITA UBAH: id_user sekarang string biasa (format U01), bukan UUID lagi!
const paramUserSchema = z.string().min(2, { message: "ID User tidak valid" });

// 1. Fungsi Konfirmasi Pembayaran
const konfirmasiPembayaran = async (req, res) => {
  try {
    const dataValid = konfirmasiSchema.parse(req.body);

    // Cek apakah data peminjaman ada
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { id_pinjam: dataValid.id_pinjam } // Disesuaikan ke id_pinjam
    });

    if (!peminjaman) {
      return res.status(404).json({ message: "Data booking tidak ditemukan!" });
    }

    // Update status di tabel peminjaman menjadi lunas
    const bookingLunas = await prisma.peminjaman.update({
      where: { id_pinjam: dataValid.id_pinjam },
      data: {
        status_pinjam: "SUDAH_BAYAR" // Menyesuaikan enum/string status di skema kamu
      }
    });

    res.status(200).json({
      message: "Pembayaran berhasil dikonfirmasi! Status: SUDAH_BAYAR.",
      data: bookingLunas
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validasi gagal", 
        errors: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Gagal mengonfirmasi pembayaran", error: error.message });
  }
};

// 2. Fungsi Mengambil Riwayat Booking Per User
const getRiwayatUser = async (req, res) => {
  try {
    const idUserValid = paramUserSchema.parse(req.params.id_user);

    const riwayat = await prisma.peminjaman.findMany({
      where: { id_user: idUserValid },
      include: {
        jadwal: {
          include: {
            lapangan: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.status(200).json(riwayat);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validasi gagal", 
        errors: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Gagal mengambil riwayat", error: error.message });
  }
};

module.exports = { konfirmasiPembayaran, getRiwayatUser };