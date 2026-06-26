const { PrismaClient } = require('../src/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data...');

  await prisma.jadwal.deleteMany({});
  await prisma.lapangan.deleteMany({});

  const lapanganFutsal = await prisma.lapangan.create({
    data: {
      id_lapangan: "LP01",
      nama_lapangan: 'Lapangan Futsal A',
      jenis_lapangan: 'Futsal',
      harga_perjam: 120000
    },
  });

  const lapanganBadminton = await prisma.lapangan.create({
    data: {
      id_lapangan: "LP02",
      nama_lapangan: 'Lapangan Badminton A',
      jenis_lapangan: 'Badminton',
      harga_perjam: 50000,
    },
  });

  console.log('✅ Data lapangan berhasil dibuat.');

  const slotJadwal = [
    { id_lapangan: lapanganFutsal.id_lapangan, jam_mulai: '08:00', jam_selesai: '09:00' },
    { id_lapangan: lapanganFutsal.id_lapangan, jam_mulai: '09:00', jam_selesai: '10:00' },
    { id_lapangan: lapanganFutsal.id_lapangan, jam_mulai: '19:00', jam_selesai: '20:00' },
    { id_lapangan: lapanganBadminton.id_lapangan, jam_mulai: '08:00', jam_selesai: '09:00' },
    { id_lapangan: lapanganBadminton.id_lapangan, jam_mulai: '16:00', jam_selesai: '17:00' },
  ];

  let counter = 1;

  for (const jadwal of slotJadwal) {
    const idJadwalCustom = `JD0${counter++}`;

    await prisma.jadwal.create({
      data: {
        id_jadwal: idJadwalCustom,                 
        id_lapangan: jadwal.id_lapangan,           
        tanggal: new Date('2026-06-26'),           
        hari: 'Jumat',                            
        jam_mulai: jadwal.jam_mulai,
        jam_selesai: jadwal.jam_selesai,
        status: 'TERSEDIA',                        
      },
    });
  }

  console.log('Data slot jadwal berhasil dibuat!.');
  console.log('Proses seeding selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('Eror saat proses seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });