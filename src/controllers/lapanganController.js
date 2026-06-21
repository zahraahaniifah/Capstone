const prisma = require('../lib/prisma.js');
const { z } = require('zod'); 

const lapanganSchema = z.object({
  nama_lapangan: z.string().min(3, { message: "Nama lapangan minimal 3 karakter" }),
  jenis_lapangan: z.string().min(2, { message: "Jenis lapangan harus diisi (misal: Futsal/Basket)" }),
  harga_perjam: z.number().positive({ message: "Harga per jam harus berupa angka positif" })
});

const tambahLapangan = async (req, res) => {
  try {
    const dataValid = lapanganSchema.parse(req.body);

    const hitungLapangan = await prisma.lapangan.count();
    const nomorUrut = String(hitungLapangan + 1).padStart(2, '0');
    const idBaru = `LP${nomorUrut}`; 

    const lapanganBaru = await prisma.lapangan.create({
      data: {
        id_lapangan: idBaru,
        nama_lapangan: dataValid.nama_lapangan,
        jenis_lapangan: dataValid.jenis_lapangan,
        harga_perjam: dataValid.harga_perjam
      }
    });

    res.status(201).json({
      message: "Lapangan berhasil ditambahkan!",
      data: lapanganBaru
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        message: "Validasi gagal", 
        errors: error.errors.map(err => err.message) 
      });
    }
    res.status(500).json({ message: "Gagal menambahkan lapangan", error: error.message });
  }
};

const getAllLapangan = async (req, res) => {
  try {
    const daftarLapangan = await prisma.lapangan.findMany();
    res.status(200).json(daftarLapangan);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data lapangan", error: error.message });
  }
};

module.exports = { tambahLapangan, getAllLapangan };