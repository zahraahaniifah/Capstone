const prisma = require('../lib/prisma.js');
const { z } = require('zod');

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

    const hitungBooking = await prisma.peminjaman.count();
    const nomorUrut = String(hitungBooking + 1).padStart(2, '0');
    const idPinjamBaru = `PM${nomorUrut}`;

    const [bookingBaru, jadwalDiupdate] = await prisma.$transaction([
      prisma.peminjaman.create({
        data: {
          id_pinjam: idPinjamBaru, 
          id_user: dataValid.id_user,
          id_jadwal: dataValid.id_jadwal,
          id_lapangan: jadwal.id_lapangan, 
          tgl_main: jadwal.tanggal,        
          total_harga: lapangan.harga_perjam,
          status_pinjam: "PENDING"         
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