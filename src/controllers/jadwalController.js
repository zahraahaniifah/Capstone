const prisma = require('../lib/prisma.js');
const { z } = require('zod'); 

const jadwalSchema = z.object({
 id_lapangan: z.string().min(2, { message: "ID Lapangan tidak valid" }),
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Format tanggal harus YYYY-MM-DD" }),
  jam_mulai: z.string().min(4, { message: "Format jam mulai tidak valid (contoh: 08:00)" }),
  jam_selesai: z.string().min(4, { message: "Format jam selesai tidak valid (contoh: 09:00)" })
});

const tambahJadwal = async (req, res) => {
  try {
  
    const dataValid = jadwalSchema.parse(req.body);

    const dateObj = new Date(dataValid.tanggal);
    const daftarHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const hariOtomatis = daftarHari[dateObj.getDay()];

    const hitungJadwal = await prisma.jadwal.count();
    const nomorUrut = String(hitungJadwal + 1).padStart(2, '0');
    const idJadwalBaru = `JD${nomorUrut}`;

    const jadwalBaru = await prisma.jadwal.create({
      data: {
        id_jadwal: idJadwalBaru,
        id_lapangan: dataValid.id_lapangan,
        tanggal: dateObj,
        hari: hariOtomatis,
        jam_mulai: dataValid.jam_mulai,
        jam_selesai: dataValid.jam_selesai,
        status: "TERSEDIA"
      }
    });

    res.status(201).json({
      message: `Slot jadwal berhasil dibuka untuk hari ${hariOtomatis}!`,
      data: jadwalBaru
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validasi gagal", 
        errors: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Gagal menambahkan jadwal", error: error.message });
  }
};

const getJadwalByLapangan = async (req, res) => {
  try {
    const { id_lapangan } = req.params;
    const { tanggal } = req.query;

    if (!id_lapangan) {
      return res.status(400).json({ message: "ID Lapangan harus dicantumkan!" });
    }

    let kondisiPencarian = { id_lapangan };

    if (tanggal) {
      kondisiPencarian.tanggal = new Date(tanggal);
    }

    const daftarJadwal = await prisma.jadwal.findMany({
      where: kondisiPencarian,
      orderBy: { jam_mulai: 'asc' }
    });

    res.status(200).json(daftarJadwal);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data jadwal", error: error.message });
  }
};

module.exports = { tambahJadwal, getJadwalByLapangan };