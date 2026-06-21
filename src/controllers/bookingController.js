const prisma = require('../lib/prisma.js');
const { z } = require('zod');

// 1. KITA UBAH: string biasa, bukan UUID lagi! (Format: U01, JD01)
const bookingSchema = z.object({
  id_user: z.string().min(2, { message: "ID User tidak valid" }),
  id_jadwal: z.string().min(2, { message: "ID Jadwal tidak valid" })
});

const buatBooking = async (req, res) => {
  try {
    const dataValid = bookingSchema.parse(req.body);

    const jadwal = await prisma.jadwal.findUnique({
      where: { id_jadwal: dataValid.id_jadwal }
    });

    if (!jadwal) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan!" });
    }

    if (jadwal.status !== "TERSEDIA") {
      return res.status(400).json({ message: "Maaf, jadwal ini sudah dibooking orang lain!" });
    }

    const lapangan = await prisma.lapangan.findUnique({
      where: { id_lapangan: jadwal.id_lapangan }
    });

    // 2. KITA TAMBAH: Hitung total booking aktif buat generate ID custom (PM01, PM02, dst)
    const hitungBooking = await prisma.peminjaman.count();
    const nomorUrut = String(hitungBooking + 1).padStart(2, '0');
    const idPinjamBaru = `PM${nomorUrut}`;

    // 3. Eksekusi Transaction dengan aman
    const [bookingBaru, jadwalDiupdate] = await prisma.$transaction([
      prisma.peminjaman.create({
        data: {
          id_pinjam: idPinjamBaru, // <-- Kita pasang ID kustom buatan kita di sini!
          id_user: dataValid.id_user,
          id_jadwal: dataValid.id_jadwal,
          id_lapangan: jadwal.id_lapangan, // Kita ikut sertakan field ini dari data jadwal
          tgl_main: jadwal.tanggal,        // Otomatis samakan tanggal main dengan jadwal lapangan
          total_harga: lapangan.harga_perjam,
          status_pinjam: "PENDING"         // Sesuai field skema barumu
        }
      }),
      prisma.jadwal.update({
        where: { id_jadwal: dataValid.id_jadwal },
        data: { status: "DIBOOKING" }
      })
    ]);

    res.status(201).json({
      message: "Booking berhasil dibuat! Menunggu pembayaran.",
      data: bookingBaru
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validasi gagal", 
        errors: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Gagal membuat booking", error: error.message });
  }
};

module.exports = { buatBooking };