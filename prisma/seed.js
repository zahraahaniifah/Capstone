const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data...');

  await prisma.jadwal.deleteMany({});
  await prisma.lapangan.deleteMany({});

  // 2. Tambah Data Lapangan Tiruan
  const lapanganFutsal = await prisma.lapangan.create({
    data: {
      nama_lapangan: 'Lapangan Futsal A',
      jenis_lapangan: 'Futsal',
      harga_per_jam: 120000,
      deskripsi: 'Lapangan futsal dengan rumput sintetis standar internasional.',
    },
  });

  const lapanganBadminton = await prisma.lapangan.create({
    data: {
      nama_lapangan: 'Lapangan Badminton A',
      jenis_lapangan: 'Badminton',
      harga_per_jam: 50000,
      deskripsi: 'Lapangan badminton indoor dengan lantai karpet vinyl.',
    },
  });

  console.log('✅ Data lapangan berhasil dibuat.');

  // 3. Tambah Slot Jadwal Tiruan untuk Tanggal Hari Ini (26 Juni 2026)
  const tanggalHariIni = '2026-06-26';

  const slotJadwal = [
    { id_lapangan: lapanganFutsal.id, jam_mulai: '08:00', jam_selesai: '09:00' },
    { id_lapangan: lapanganFutsal.id, jam_mulai: '09:00', jam_selesai: '10:00' },
    { id_lapangan: lapanganFutsal.id, jam_mulai: '19:00', jam_selesai: '20:00' },
    { id_lapangan: lapanganBadminton.id, jam_mulai: '08:00', jam_selesai: '09:00' },
    { id_lapangan: lapanganBadminton.id, jam_mulai: '16:00', jam_selesai: '17:00' },
  ];

  for (const jadwal of slotJadwal) {
    await prisma.jadwal.create({
      data: {
        lapanganId: jadwal.id_lapangan, // Sesuaikan dengan nama field relasi di schema.prisma kamu
        tanggal: tanggalHariIni,
        jam_mulai: jadwal.jam_mulai,
        jam_selesai: jadwal.jam_selesai,
        status: 'tersedia',
      },
    });
  }

  console.log('✅ Data slot jadwal berhasil dibuat.');
  console.log('Proses seeding selesai dengan sukses! 🎉');
}

main()
  .catch((e) => {
    console.error('Eror saat proses seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });